import React, { useContext, useRef } from 'react'
import NoteContext from '../context/NoteContext';

export default function NoteItem(props) {

  const { deleteNote } = useContext(NoteContext);

  const handleOnClick = () => {
    deleteNote(props.note);
  }
  const handleUpdateClick = () => {
    props.unUpdatedNote(props.note);
  }

  const ref = useRef();

  const readNote = () => {
    ref.current.click();
  }


  return (
    <>
      <div className="card col-md-4 m-4 "  style={{ width: "18rem" }}>
        <div className="card-body">
          <h4 className="card-title d-inline-block">{props.note.title}</h4>
          <i className="fa-regular fa-trash-can mx-2" onClick={handleOnClick} style={{ cursor: "pointer" }}></i>
          <i className="fa-regular fa-pen-to-square mx-1" onClick={handleUpdateClick} style={{ cursor: "pointer" }}></i>
          <p className="card-text " onClick={readNote} style={{ cursor: "pointer" }}>{props.note.description}</p>
          
          
           <button type="button" ref={ref} className="btn btn-sm btn-primary  d-none" data-toggle="modal" data-target="#exampleModalLong">
            Launch demo modal
          </button>


          <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header d-flex ">
                  <h5 className="modal-title" id="exampleModalLongTitle">{props.note.title}</h5>
                  <i className="fa-regular fa-trash-can mx-2" onClick={handleOnClick} style={{ cursor: "pointer" }}></i>
                  <i className="fa-regular fa-pen-to-square mx-1" onClick={handleUpdateClick} style={{ cursor: "pointer" }}></i>
                  <button type="button" className="close ms-auto" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" >
                  {props.note.description}
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <div>{props.note.tag}</div>
                  <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

