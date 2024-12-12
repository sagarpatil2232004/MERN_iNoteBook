import React from 'react'
import AddNoteForm from './AddNoteForm'
import Notes from './Notes'
import Alert from './Alert'

export default function Home() {
  return (
    <div className="container">
      <Alert/>
      <h1>This is Home Page</h1>
      <AddNoteForm/>
      <Notes/>
    </div>
  )
}
