import NoteContext from "./noteContext";
import { useState} from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);




  //Get all notes
  const getNotes = async () => {
    //Todo API call
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGY0NDFjODE3ZmU2M2NjODA5YjI4In0sImlhdCI6MTY3NTk2MjAxN30.SnFT28U8YEwKL9MOQnsg8YXQGWmX_R5W5YBQoc_2sfI",
        } 
      });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }  




  //Add a Note
  const addNote = async (title, description, tag) => {
    //Todo API call
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGY0NDFjODE3ZmU2M2NjODA5YjI4In0sImlhdCI6MTY3NTk2MjAxN30.SnFT28U8YEwKL9MOQnsg8YXQGWmX_R5W5YBQoc_2sfI",
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      console.log(json);

    const note = {
      _id: "63e535f2660b10668176005a",
      user: "63e4f441c817fe63cc809b28",
      title: title,
      description: description,
      tag: tag,
      date: "2023-02-09T18:05:38.992Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };



  //Delete a Note
  const deleteNote = async (id) => {
    //Todo API call
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGY0NDFjODE3ZmU2M2NjODA5YjI4In0sImlhdCI6MTY3NTk2MjAxN30.SnFT28U8YEwKL9MOQnsg8YXQGWmX_R5W5YBQoc_2sfI",
        }
      });
      const json = await response.json();
      console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };



  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNGY0NDFjODE3ZmU2M2NjODA5YjI4In0sImlhdCI6MTY3NTk2MjAxN30.SnFT28U8YEwKL9MOQnsg8YXQGWmX_R5W5YBQoc_2sfI",
        },
        body: JSON.stringify({title, description, tag})
      }
      );
      const json = response.json();
      console.log(json);

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
