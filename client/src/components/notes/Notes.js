import React, { useEffect, useState } from 'react'
import './Notes.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNotesForUser } from '../../actions/noteActions'

import Note from './note/Note'

const Notes = ({ selectedId, setSelectedId }) => {
    const dispatch = useDispatch()
    const notes = useSelector((state) => state.notes)
    const { isLoading, user } = useSelector((state) => state.auth)

    const [userID, setUserID] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)  //for show all button

    var notesGetter = document.getElementById("notes-getter")

    var loading = 'loading...'.split('')
    var loadAnimation
    var loadTimer1
    var loadTimer2
    
    useEffect(() => {
        if (typeof(user) === 'string'){  // JSON
            setUserID(JSON.parse(user).id)
        }else if(typeof(user) === 'object' && user) {  // Object
            setUserID(user['id'])
        }else if(!user){  // after logout, object NULL
            console.log('user is null')
        }
    }, [user, userID])

    useEffect(() => {
        // dispatch(getNotes())
        if (user !== null && userID) {
            console.log(userID)
            dispatch(getNotesForUser(userID))
        }
    }, [user,  userID])

    useEffect(() => {  // for show all button after category choice
        if (selectedCategory !== null) {
            notesGetter.style.transform = 'translateY(-27px)'
            notesGetter.style.visibility = 'visible'
        }
    }, [selectedCategory])

    useEffect(() => {  // for loading animation
        if (isLoading && notes.length) {
            runAnimation()
        } else {
            document.getElementById('loading').style.display = "none"
            clearTimeout(loadTimer1)
            clearTimeout(loadTimer2)
            clearInterval(loadAnimation)
        }

    }, [notes.length, isLoading])

    const showAll = () => {
        // dispatch(getNotes())
        dispatch(getNotesForUser(userID))
        setSelectedCategory(null)
        notesGetter.style.transform = 'translateY(0)'
        notesGetter.style.visibility = 'hidden'
    }

    const animateLoading = () => {  // loading animation
        for (let i = 0; i < loading.length; i++) {
            loadTimer1 = setTimeout(() => {
                document.getElementById(`member${i}`).style.animation = "hop 0.6s ease-in-out"
            }, (i + 1) * 100)

            loadTimer2 = setTimeout(() => {
                document.getElementById(`member${i}`).style.animation = "none"
            }, (i + 1) * 100 + 600)
        }
    }

    const runAnimation = () => {  // "animateLoading" runs right away and with interval afterwards
        animateLoading()
        loadAnimation = setInterval(() => {
            animateLoading()
        }, 1000)
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
                {notes.map((note) => {
                    return (
                        <Note
                            key={note.id}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            note={note}
                            setSelectedCategory={setSelectedCategory}
                            userID={userID}
                        />
                    )
                })
                }
            </div>
        </div >
    )
}

export default Notes
