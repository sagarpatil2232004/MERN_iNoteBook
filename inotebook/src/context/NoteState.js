import { useNavigate } from "react-router-dom";
import NoteContext from "./NoteContext";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



const NoteState = (props) => {
  let location = useLocation();
  const [notes, setnotes] = useState([]);
  const navigate = useNavigate();
  const HostUrl = "https://mern-inotebook-e6ha.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
          
          getAllNotes();
        }
       catch (e) {
        localStorage.removeItem('token');
        
        navigate('/Login');
      }
    } else {
      navigate('/Login');  // No token found, redirect to login
    }
    console.log(location.pathname);
  }, [location.pathname === "/"]);

  const getAllNotes = async () => {
    try {
      const response = await fetch(HostUrl + "api/notes/getAllNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      const data = await response.json();
      setnotes(data.notes);
    } catch (e) {
      console.error("An error occurred while fetching notes:", e.message);
    }
  };

  const addNote = async (note) => {
    try {
      const response = await fetch(HostUrl + "api/notes/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();
      setnotes((prevNotes) => [...prevNotes, data]);
    } catch (e) {
      console.error("An error occurred while adding the note:", e.message);
    }
  };

  const deleteNote = async (userNote) => {
    try {
      const response = await fetch(HostUrl + "api/notes/deleteNote/" + userNote._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        setnotes((prevNotes) => prevNotes.filter(note => note._id !== userNote._id));
      }
    } catch (e) {
      console.error("An error occurred while deleting the note:", e.message);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      const response = await fetch(HostUrl + "api/notes/updateNote/" + updatedNote._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        setnotes((prevNotes) => prevNotes.map(note =>
          note._id === updatedNote._id ? updatedNote : note
        ));
      }
    } catch (e) {
      console.error("An error occurred while updating the note:", e.message);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
