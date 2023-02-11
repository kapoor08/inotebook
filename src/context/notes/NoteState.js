import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const notesInitial = 
    [
      {
        "_id": "63e535f2660b10668176005a",
        "user": "63e4f441c817fe63cc809b28",
        "title": "My Title ",
        "description": "Please wake up early",
        "tag": "personal",
        "date": "2023-02-09T18:05:38.992Z",
        "__v": 0
      },
      {
        "_id": "63e68fca57182b551828d341",
        "user": "63e4f441c817fe63cc809b28",
        "title": "New Note updated",
        "description": "Please acccess the playlist updated",
        "tag": "YouTube",
        "date": "2023-02-10T18:41:14.194Z",
        "__v": 0
      },
      {
        "_id": "63e68fca57182b551828d341",
        "user": "63e4f441c817fe63cc809b28",
        "title": "New Note updated",
        "description": "Please acccess the playlist updated",
        "tag": "YouTube",
        "date": "2023-02-10T18:41:14.194Z",
        "__v": 0
      },
      {
        "_id": "63e68fca57182b551828d341",
        "user": "63e4f441c817fe63cc809b28",
        "title": "New Note updated",
        "description": "Please acccess the playlist updated",
        "tag": "YouTube",
        "date": "2023-02-10T18:41:14.194Z",
        "__v": 0
      },
      {
        "_id": "63e68fca57182b551828d341",
        "user": "63e4f441c817fe63cc809b28",
        "title": "New Note updated",
        "description": "Please acccess the playlist updated",
        "tag": "YouTube",
        "date": "2023-02-10T18:41:14.194Z",
        "__v": 0
      },
      {
        "_id": "63e68fca57182b551828d341",
        "user": "63e4f441c817fe63cc809b28",
        "title": "New Note updated",
        "description": "Please acccess the playlist updated",
        "tag": "YouTube",
        "date": "2023-02-10T18:41:14.194Z",
        "__v": 0
      }
    ]
  
const [notes, setNoteState] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{notes, setNoteState}}>
      {props.children}
    </NoteContext.Provider>
  );
};



export default NoteState;
