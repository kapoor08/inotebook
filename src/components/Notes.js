import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote} = context;

  useEffect(() => {
    getNotes();
    console.log(note);
  }, []);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };


  const handleClick = (e) =>{
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    console.log("Updating the note", note);
}


const onChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value});
}


  const ref = useRef(null);
  const refClose = useRef(null);


  return (
    <>
      <AddNote />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"> Launch demo modal</button>  
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>

              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" minLength={5} onChange={onChange} required/>
                <div id="emailHelp" className="form-text"></div>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label"> Description </label>
                <input type="text" className="form-control" value={note.edescription} name="edescription" id="edescription" minLength={5} onChange={onChange} required/>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label"> Tag </label>
                <input type="text" className="form-control" value={note.etag} name="etag" id="etag" onChange={onChange}/>
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleClick}> Add Note</button>
            </form>
            
            </div>
            <div className="modal-footer">
              <button type="button"  ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
        {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes
