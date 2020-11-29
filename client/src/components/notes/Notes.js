import React, { useEffect, useState } from 'react'
import './Notes.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNotesForUser, getFollowedNotes } from '../../actions/noteActions'

import Note from './note/Note'
import Loading from './Loading'

const Notes = ({ isProfile, notes, selectedId, setSelectedId }) => {
    const dispatch = useDispatch()
    const { isLoading, user } = useSelector((state) => state.auth)

    const [selectedCategory, setSelectedCategory] = useState(null)  //for show all button

    var notesGetter = document.getElementById("notes-getter") // show all button


    useEffect(() => {  // for show all button after category choice
        if (selectedCategory !== null) {
            notesGetter.style.transform = 'translateY(-27px)'
            notesGetter.style.visibility = 'visible'
        }
    }, [selectedCategory])

   

    const showAll = () => {
        // dispatch(getNotes())
        if(isProfile){
            dispatch(getNotesForUser(user['_id']))
        }else{
            dispatch(getFollowedNotes(user['_id']))
        }
        setSelectedCategory(null)
        notesGetter.style.transform = 'translateY(0)'
        notesGetter.style.visibility = 'hidden'
    }

    return (
        <div className="notes__container" id="notes-container">
            {notes ? notes.length === 0 : null || isLoading ? <Loading/> : null}
            <div className="notes__wrapper">
                <div className="notes__getter" id="notes-getter" onClick={() => showAll()}>show all</div>
                {notes ? notes.map((note) => {
                    return (
                        <Note
                            isProfile={isProfile}
                            key={note.id}
                            note={note}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            setSelectedCategory={setSelectedCategory}
                        />
                    )
                })
                    : null}
            </div>
        </div >
    )
}

export default Notes
