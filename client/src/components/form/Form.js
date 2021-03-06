import React, { useState, useEffect } from 'react'
import './Form.css'
import CreateCategorySection from './CreateCategorySection'

import { useDispatch, useSelector } from 'react-redux'
import { createNote, updateNote } from '../../actions/noteActions'

const Form = ({ selectedId, setSelectedId }) => {
    
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.notes)
    const selectedNote = notes ? notes.find((note) => note._id === selectedId) : null
    
    const [holdString, setHoldString] = useState({})  // for category
    const [note, setNote] = useState({ title: '', content: '', category: []})
    const [categoryCount, setCategoryCount] = useState(['herro'])
    
    const CATEGORY_LIMIT = 5

    var categoryPlus = document.getElementById("category-plus")

    useEffect(() => {
        if (selectedNote) setNote(selectedNote)
    }, [selectedNote])

    useEffect(()=>{
        if (categoryCount.length === CATEGORY_LIMIT) {
            categoryPlus.style.border = "2px solid red"
            categoryPlus.style.cursor = "not-allowed"
        }
    },[categoryCount])

    const onSubmit = () => {
        if (selectedId) {
            dispatch(updateNote(selectedId, note)) // Object.entries(note)
        } else {
            dispatch(createNote(note, user['_id']))
        }

        clearFields()
    }

    const clearFields = () => {
        setSelectedId(null)
        setNote({ title: '', content: '', category: [] })
        setHoldString({})

        for (let i = 0; i < categoryCount.length; i++) {
            document.getElementById(`input-category${i}`).value = ""
        }
        setCategoryCount(["herro"])
    }

    const createCategorySection = () => {
        return (categoryCount.map((c, i) => {
            return (
                <CreateCategorySection
                    selectedNote={selectedNote}
                    note={note}
                    setNote={setNote}
                    holdString={holdString}
                    setHoldString={setHoldString}
                    i={i}
                />
            )
        }))
    }

    const handleCategoryPlus = (i) => {
        setCategoryCount([...categoryCount, 'herro'])
    }


    return (
        <div className="form__container" id="form-container">
            <div className="form__wrapper">
                <h1>{selectedId ? 'Edit ' : 'Create '}Note</h1>
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
                        <div className="category__plus form__button" id="category-plus" onClick={() => categoryCount.length < 5 ? handleCategoryPlus(categoryCount.length) : null}>{categoryCount.length === CATEGORY_LIMIT ? 'maximum' : '+'}</div>
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
