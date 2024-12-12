import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext';


export default function AddNoteForm() {
    const Initialnote = {
        title : "",
        description : "",
        tag : "",
    }
    const [note, setnote] = useState(Initialnote);
    const { addNote } = useContext(NoteContext);

    const handleOnchange= (e)=>{
        setnote({...note,[e.target.id]:e.target.value});
    }

    const handleOnClick= (e)=>{
        e.preventDefault();
        if (note.title !== "" || note.description !== "" ) {
            addNote(note);
           
        }
        setnote(Initialnote);
    }
    
    


    return (
        <div >
            <form >
                <div className="m-2 form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={note.title}  className="my-2 form-control" id="title" onChange={(e)=>{handleOnchange(e)}} />
                </div>
                <div className="m-2 form-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" value={note.description} className="my-2 form-control" id="description"  onChange={(e)=>{handleOnchange(e)}}/>
                </div>
                <div className="m-2 form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" value={note.tag} className="my-2 form-control" id="tag"  onChange={(e)=>{handleOnchange(e)}} />
                </div>
                <button  className= " m-2 btn-sm btn btn-primary" onClick={(e)=>{handleOnClick(e)}}>Add Note</button>
            </form>
        </div>
    )
}
