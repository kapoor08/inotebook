const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchUser")

const JWT_SECRET = "Harryisagoodb$oy";




//ROUTE 1: Create a user using: POST "/api/auth/createuser" . does'nt require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Whether the User with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      res.json(authToken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);



//ROUTE 2: Authenticate a user using: POST "/api/auth/login" . No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    //If there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id
        }
      };
      //Generate JWT 
      const authToken = jwt.sign(data, JWT_SECRET); 
      res.json({success: true, authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send({error: "Internal server error"});
    }
  }
);



//ROUTE 3: Get logged in user details using: POST "/api/auth/getuser" . Login required

router.post(
  "/getuser", fetchuser, async (req, res) => {
try{
  var userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal server error");
}

});


module.exports = router;
