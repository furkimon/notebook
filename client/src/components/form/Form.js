import React, { useState, useEffect } from 'react'
import './Form.css'

import { useDispatch, useSelector } from 'react-redux'
import { getNotes, createNote, updateNote } from '../../actions/noteActions'

const Form = ({ selectedId, setSelectedId }) => {
    const [note, setNote] = useState({ title: null, content: null, category: [] })
    const dispatch = useDispatch()
    const selectedNote = useSelector(state => state.notes.find((note) => note._id === selectedId))
    const notes = useSelector(state => state.notes)

    var selectCategory = document.getElementById("select")
    var categoryInput = document.getElementById("category-input")


    useEffect(() => {
        if (selectedNote) setNote(selectedNote)
    }, [selectedNote])

    const onSubmit = () => {

        if (selectedId) {
            dispatch(updateNote(selectedId, note))
        } else {
            dispatch(createNote(note))
        }
        console.log(note)
        clearFields()
        setSelectedId(null)
    }

    const clearFields = () => {
        setNote({ title: '', content: '', category: [] })
    }

    const getCategories = () => {
        var allCategories = ['choose category']
        notes.map((note) => note.category.map(c => !allCategories.includes(c) ? allCategories.push(c) : null))
        return allCategories
    }

    return (
        <div className="form__container" id="form-container">
            <div className="form__wrapper">
                <div className="form">
                    <div className="form__row title">
                        <label>title</label>
                        <input required value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} type="text" name="title" />
                    </div>
                    <div className="form__row content">
                        <label>note</label>
                        <textarea required value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} type="text" rows="10" name="content" />
                    </div>
                    <div className="form__row category">
                        <label>add category</label>
                        <input id="category-input"
                            id="input-category" value={note.category}
                            type="text" rows="10" name="category"
                            onChange={(e) => selectCategory.value === 'choose category' ? setNote({ ...note, category: [e.target.value] }) : null}
                        />
                    </div>
                    <div className="form__row category2">
                        <label>choose category</label>
                        <select id="select" onChange={(e) => setNote({ ...note, category: e.target.value !== 'choose category' ? e.target.value : null })}>
                            {getCategories().map((category) => {
                                return <option value={category}>{category}</option>
                            })}
                        </select>
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
