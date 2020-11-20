import React, { useState, useEffect } from 'react'
import './Form.css'
import CreateCategorySection from './CreateCategorySection'

import { useDispatch, useSelector } from 'react-redux'
import { createNote, updateNote } from '../../actions/noteActions'

const Form = ({ selectedId, setSelectedId }) => {
    
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.notes)
    var selectedNote = notes ? notes.map((note) => note._id === selectedId) : null
    // const selectedNote = useSelector(state => state.notes.notes.find((note) => note._id === selectedId))
    
    const [holdString, setHoldString] = useState({})
    const [note, setNote] = useState({ title: null, content: null, category: [],  createdBy: null})
    const [userID, setUserID] = useState('')
    const [categoryCount, setCategoryCount] = useState(['herro'])
    
    const CATEGORY_LIMIT = 5

    var categoryPlus = document.getElementById("category-plus")

    useEffect(() => {
        if (selectedNote) setNote(selectedNote)

        if (categoryCount.length === CATEGORY_LIMIT) {
            categoryPlus.style.border = "2px solid red"
            categoryPlus.style.cursor = "not-allowed"
        }
    }, [selectedNote, categoryCount])

    useEffect(() => {
        if (typeof(user) === 'string'){  // JSON
            setUserID(JSON.parse(user).id)
            setNote({ ...note, createdBy: JSON.parse(user).id})
        }else if(typeof(user) === 'object' && user) {  // Object
            setUserID(user['id'])
            setNote({ ...note, createdBy: user['id']})
        }else if(!user){  // after logout, object NULL
            console.log('user is null')
        }
    }, [user])

    const onSubmit = () => {
        console.log(selectedId + ' ' + note + ' ' + userID)
        if (selectedId) {
            dispatch(updateNote(selectedId, note)) // Object.entries(note)
        } else {
            dispatch(createNote(note, userID))
        }

        clearFields()
    }

    const clearFields = () => {
        setSelectedId(null)
        setNote({ title: '', content: '', category: [], createdBy: note.createdBy })
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
                        <div className="category__plus form__button" id="category-plus" onClick={() => categoryCount.length < 5 ? handleCategoryPlus(categoryCount.length) : null}>{categoryCount.length === 5 ? 'maximum' : '+'}</div>
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
