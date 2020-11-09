import React, { useEffect, useState } from 'react'
import './Notes.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getNotes } from '../../actions/noteActions'

import Note from './note/Note'

const Notes = ({ selectedId, setSelectedId }) => {
    const dispatch = useDispatch()
    const notes = useSelector((state) => state.notes)
    const [selectedCategory, setSelectedCategory] = useState(null)
    var notesGetter = document.getElementById("notes-getter")

    useEffect(() => {
        if(selectedCategory!==null){
            notesGetter.style.transform = 'translateY(-27px)'//'slideUp 1s ease-in forwards'
            notesGetter.style.visibility = 'visible'
        }
    },[selectedCategory])


    const showAll = () => {
        dispatch(getNotes())
        notesGetter.style.transform = 'translateY(0)'
        notesGetter.style.visibility = 'hidden'

    }

    return (
        <div className="notes__container" id="notes-container">
            <div className="notes__getter" id="notes-getter" onClick={() => showAll() }>show all</div>
            {!notes.length ? <div className="loading">Loading...</div>
                : <div className="notes__wrapper">
                    {notes.map((note) => {
                        return (
                            <Note
                                key={note.id}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                note={note}
                                setSelectedCategory={setSelectedCategory}
                            />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Notes
