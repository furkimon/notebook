import React, { useEffect, useState } from 'react'
import './Notes.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNotesForUser, getFollowedNotes } from '../../actions/noteActions'

import Note from './note/Note'

const Notes = ({ isProfile, notes, selectedId, setSelectedId }) => {
    const dispatch = useDispatch()
    const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth)

    const [selectedCategory, setSelectedCategory] = useState(null)  //for show all button

    var notesGetter = document.getElementById("notes-getter") // show all button

    var loading = 'loading...'.split('')
    var loadAnimation
    var loadTimer1
    var loadTimer2

    useEffect(() => {  // for show all button after category choice
        if (selectedCategory !== null) {
            notesGetter.style.transform = 'translateY(-27px)'
            notesGetter.style.visibility = 'visible'
        }
    }, [selectedCategory])

    useEffect(() => {  // for loading animation
        if (isLoading && notes) {
            runAnimation()
        } else {
            document.getElementById('loading').style.display = "none"
            clearTimeout(loadTimer1)
            clearTimeout(loadTimer2)
            clearInterval(loadAnimation)
        }
    }, [notes, isLoading])

    const showAll = () => {
        // dispatch(getNotes())
        dispatch(getNotesForUser(user['id']))
        setSelectedCategory(null)
        notesGetter.style.transform = 'translateY(0)'
        notesGetter.style.visibility = 'hidden'
    }

    const animateLoading = () => {  // loading animation
        if(isLoading){
            for (let i = 0; i < loading.length; i++) {
            loadTimer1 = setTimeout(() => {
                document.getElementById(`member${i}`).style.animation = "hop 0.6s ease-in-out"
            }, (i + 1) * 100)

            loadTimer2 = setTimeout(() => {
                document.getElementById(`member${i}`).style.animation = "none"
            }, (i + 1) * 100 + 600)
        }}
    }

    const runAnimation = () => {  // "animateLoading" runs right away and with interval afterwards
        if (isLoading) {
            animateLoading()
            loadAnimation = setInterval(() => {
                animateLoading()
            }, 1000)
        }
    }
    return (
        <div className="notes__container" id="notes-container">
            <div className="loading" id="loading">
                {loading.map((member, i) => {
                    return <h1 id={`member${i}`} className={`loadingMember member${i}`}>{member}</h1>
                })}
            </div>
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
