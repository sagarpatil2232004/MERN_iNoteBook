import React, { useContext, useRef, useState } from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../context/NoteContext';




export default function Notes() {

  const Initialnote = {
    title: "",
    description: "",
    tag: "",
  }



  const [note, setnote] = useState(Initialnote);
  const { addNote, updateNote } = useContext(NoteContext);

  const handleOnchange = (e) => {
    setnote({ ...note, [e.target.id]: e.target.value });
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    updateNote(note);
    ref2.current.click();
    
  }


  const { notes } = useContext(NoteContext)

  const ref = useRef()
  const ref2 = useRef()

  const unUpdatedNote = (unUpdatednote) => {
    ref.current.click();
    setnote(unUpdatednote);
  }



  return (
    <>


      <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
            </div>
            <div className="modal-body">
              <form >
                <div className="m-2 form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" value={note.title} className="my-2 form-control" id="title" onChange={(e) => { handleOnchange(e) }} />
                </div>
                <div className="m-2 form-group">
                  <label htmlFor="description">Description</label>
                  <textarea type="text" value={note.description} className="my-2 form-control" id="description" onChange={(e) => { handleOnchange(e) }} />
                </div>
                <div className="m-2 form-group">
                  <label htmlFor="tag">Tag</label>
                  <input type="text" value={note.tag} className="my-2 form-control" id="tag" onChange={(e) => { handleOnchange(e) }} />
                </div>
                <button className=" m-2 btn-sm btn btn-primary" onClick={(e) => { handleOnClick(e) }}>Update Note</button>
              </form>
            </div>
            <div className="modal-footer ">
              <button type="button" ref={ref2} className="btn btn-secondary d-none" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} unUpdatedNote={unUpdatedNote} />
        ))}
      </div>
    </>
  );
}
