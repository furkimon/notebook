import React from 'react'
import './Note.css'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../../../actions/noteActions'


const Note = ({ note, setSelectedId }) => {
    const dispatch = useDispatch()

    const handleEditButton = () => {
        setSelectedId(note._id)
        var formContainer = document.getElementById("form-container")
        formContainer.scrollIntoView({
        behavior: "smooth",
        block: "center",
    })
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
                <div className="note__button edit" onClick={()=> handleEditButton()}>⚙️</div>
                <div className="note__button delete" onClick={()=> dispatch(deleteNote(note._id))}>❌</div>
            </div>
            <div className="note__category">
                {note.category.length === 1 && note.category[0].length < 1
                ? <h6 onClick={()=> handleEditButton()}>Add category</h6>
                : note.category.map((item) => {
                    return <h6>{item}</h6>
                })
            }
            </div>
        </div>
    )
}

export default Note
