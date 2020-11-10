import React, { useState, useEffect } from 'react'
import './Form.css'

import { useDispatch, useSelector } from 'react-redux'
import { createNote, updateNote } from '../../actions/noteActions'

const Form = ({ selectedId, setSelectedId }) => {
    const [note, setNote] = useState({ title: null, content: null, category: [] })
    const dispatch = useDispatch()
    const selectedNote = useSelector(state => state.notes.find((note) => note._id === selectedId))
    const notes = useSelector(state => state.notes)

    const [categoryCount, setCategoryCount] = useState(['herro'])
    var selectCategory = document.getElementById("select")
    var categoryPlus = document.getElementById("category-plus")

    useEffect(() => {
        if (selectedNote) setNote(selectedNote)
        if(categoryCount.length===5){
            categoryPlus.style.border = "2px solid red"
            categoryPlus.style.cursor = "not-allowed"
        }
    }, [selectedNote, categoryCount])

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
        setSelectedId(null)
        setNote({ title: '', content: '', category: [] })
    }

    const getCategories = () => {
        var allCategories = ['choose category']
        notes.map((note) => note.category.map(c => !allCategories.includes(c) ? allCategories.push(c) : null))
        return allCategories
    }

    const createCategorySection = () => {
        return (categoryCount.map((c, i) => {
            return (
                <div className="category">
                    <div className="form__row">
                        <label>add {i+1}. category</label>
                        <input id="category-input"
                            id="input-category" value={note.category}
                            type="text" rows="10" name="category"
                            onChange={(e) =>
                                selectCategory.value === 'choose category'
                                    ? setNote({ ...note, category: [e.target.value] })
                                    : null}
                        />
                    </div>
                    <div className="form__row">
                        <label>choose category</label>
                        <select id="select" onChange={(e) => setNote({ ...note, category: e.target.value !== 'choose category' ? e.target.value : null })}>
                            {getCategories().map((category) => {
                                return <option value={category}>{category}</option>
                            })}
                        </select>
                    </div>
                </div>
            )
        }))
    }


    console.log(categoryCount)

    return (
        <div className="form__container" id="form-container">
            <div className="form__wrapper">
                <h1>{selectedNote ? 'Edit ' : 'Create '}Note</h1>
                <div className="form">
                    <div className="form__row title">
                        <label>title</label>
                        <input value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} type="text" name="title" required />
                    </div>
                    <div className="form__row content">
                        <label>note</label>
                        <textarea required value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} type="text" rows="10" name="content" />
                    </div>
                    <div className="categories__section">
                        <div className="categories">
                            {createCategorySection()}
                        </div>
                        <div className="category__plus form__button" id="category-plus" onClick={() => categoryCount.length < 5 ? setCategoryCount([...categoryCount, 'herro' ]) : null}>{categoryCount.length === 5 ? 'maximum' : '+'}</div>
                    </div>
                    <div className="form__row button">
                        <div className="form__button" onClick={() => onSubmit()}>save</div>
                        <div className="form__button deleteBtn" onClick={() => clearFields()}>clear</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
