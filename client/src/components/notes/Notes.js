import React, { useEffect, useState } from 'react'
import './Notes.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNotesForUser } from '../../actions/noteActions'

import Note from './note/Note'

const Notes = ({ isProfile, notes, user, selectedId, setSelectedId, isLoading }) => {
    const dispatch = useDispatch()
    const [userObj, setUserObj] = useState({id : null, name: null, following: null, followers: null})
    
    const [selectedCategory, setSelectedCategory] = useState(null)  //for show all button

    var notesGetter = document.getElementById("notes-getter") // show all button

    var loading = 'loading...'.split('')
    var loadAnimation
    var loadTimer1
    var loadTimer2
    
    useEffect(() => {   // get userID based on user type, JSON or object
        if (typeof (user) === 'string') {  // JSON
            setUserObj({id : JSON.parse(user).id, name : JSON.parse(user).name , following: JSON.parse(user).following, followers: JSON.parse(user).followers})
        } else if (typeof (user) === 'object' && user) {  // Object
            setUserObj({id : user['id'], name : user['name'] , following: user['following'], followers: user['followers']})
        } else if (!user) {  // after logout, object NULL
            console.log('user is null')
        }
    }, [user, userObj])

    useEffect(() => {  //bring all the notes for the user
        // dispatch(getNotes())
        if (user !== null && userObj.id) {
            dispatch(getNotesForUser(userObj.id))
        }
    }, [user, userObj.id])

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
        dispatch(getNotesForUser(userObj.id))
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
                            isProfile={isProfile}
                            key={note.id}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            note={note}
                            setSelectedCategory={setSelectedCategory}
                            userObj={userObj}
                        />
                    )
                })
                }
            </div>
        </div >
    )
}

export default Notes
