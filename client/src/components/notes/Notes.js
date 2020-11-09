import React from 'react'
import './Notes.css'
import { useSelector } from 'react-redux'

import Note from './note/Note'

const Notes = ({selectedId, setSelectedId}) => {
    const notes = useSelector((state) => state.notes)
    return (
        <div className="notes__container">
            {!notes.length ? <div className="loading">Loading...</div>
                : <div className="notes__wrapper">
                    {notes.map((note) => {
                        return (
                            <Note 
                                key = {note.id} 
                                selectedId = {selectedId}
                                setSelectedId = {setSelectedId}
                                note={note} 
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Notes
