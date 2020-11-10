import React from 'react'
import './Note.css'
import moment from 'moment'

import { useDispatch } from 'react-redux'
import { deleteNote, filterNotes } from '../../../actions/noteActions'


const Note = ({ note, setSelectedId, setSelectedCategory }) => {
    const dispatch = useDispatch()
    
    const handleEditButton = (e) => {
        setSelectedId(note._id)
        if(e){
            var inputCategory = document.getElementById("input-category")
            inputCategory.focus()
            inputCategory.style.animation = "highlight 3s"
            setTimeout(() => {
                inputCategory.style.animation = "none"
            }, 3000);
        }

        window.scrollTo({top: 0, behavior: 'smooth'})

        setSelectedCategory(null)
    }

    const chooseCategory = (item) => {
        var homeContainer = document.getElementById("home-container")
        var value = homeContainer.scrollHeight + 'px' 
        homeContainer.style.height = value
        
        window.scrollTo({top: 0, behavior: 'smooth'})

        setSelectedCategory(item)
        dispatch(filterNotes(item))
    }

    return (
        <div className="note__container">
            <div className="note__wrapper">
                <div className="note__up">
                    <h1>{note.title}</h1>
                    <h6>{moment(note.createdAt).fromNow()}</h6>
                </div>
                <div className="note__down">
                    <h5>{note.content}</h5>
                </div>
                <div className="note__button edit" onClick={() => handleEditButton()}>⚙️</div>
                <div className="note__button delete" onClick={() => dispatch(deleteNote(note._id))}>❌</div>
            </div>
            <div className="note__category">
                {!note.category.length
                    ? <h6 onClick={(e) => handleEditButton(e)}>Add category</h6>
                    : note.category.map((item) => {
                        return <h6 onClick={() => chooseCategory(item)}>{item}</h6>
                    })
                }
            </div>
        </div>
    )
}

export default Note
