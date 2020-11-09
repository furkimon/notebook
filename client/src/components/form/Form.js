import React, { useState, useEffect } from 'react'
import './Form.css'

import { useDispatch, useSelector } from 'react-redux'
import { createNote, updateNote } from '../../actions/noteActions'

const Form = ({ selectedId, setSelectedId }) => {
    const [note, setNote] = useState({ title: '', content: '', category: '' })
    const dispatch = useDispatch()
    const selectedNote = useSelector(state => state.notes.find((note) => note._id === selectedId))

    useEffect(() => {
        if(selectedNote) setNote(selectedNote)
    }, [selectedNote])

    const onSubmit = () => {

        if (selectedId) {
            dispatch(updateNote(selectedId, note))
        } else {
            dispatch(createNote(note))
        }

        clearFields()
        setSelectedId(null)
    }

    const clearFields = () => {
        setNote({ title: '', content: '', category: '' })
    }

    return (
        <div className="form__container" id="form-container">
            <div className="form__wrapper">
                <div className="form">
                    <div className="form__row title">
                        <label>title</label>
                        <input value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} type="text" name="title" />
                    </div>
                    <div className="form__row content">
                        <label>note</label>
                        <textarea value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} type="text" rows="10" name="content" />
                    </div>
                    <div className="form__row category">
                        <label>category</label>
                        <input value={note.category} onChange={(e) => e.target.value.length ? setNote({ ...note, category: e.target.value }) : setNote({ ...note, category: ' ' })} type="text" rows="10" name="category" />
                    </div>
                    <div className="form__row button">
                        <div className="form__button" onClick={() => onSubmit()}>save</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
