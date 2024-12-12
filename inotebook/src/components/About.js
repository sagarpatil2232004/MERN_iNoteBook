import React, { useContext } from 'react'
import  NoteContext  from "../context/NoteContext";

export default function About() {
  const a = useContext(NoteContext);
  return (
    <div>
      <h1>This is About Page of {a.Name}</h1>
    </div>
  )
}
