import React, { useEffect, useState } from 'react'
import './Form.css'
import { useSelector } from 'react-redux'


const CreateCategorySection = ({ i, note, setNote, holdString, setHoldString }) => {

    const notes = useSelector(state => state.notes)

    useEffect(() => {
        var inputCategory = document.getElementById(`input-category${i}`)
        var selectCategory = document.getElementById(`select${i}`)
        if(i!==0) inputCategory.focus()

        if(holdString) {
            inputCategory.addEventListener('focusout', addNewItem )
            selectCategory.addEventListener('focusout', addNewItem )
        }

        return () => {
            document.removeEventListener('focusout', addNewItem)
        }
    }, [holdString])


    const addNewItem = () => { setNote({...note, category : Object.values(holdString) }) }

    const getCategories = () => {
        var allCategories = ['choose category']
        notes.map((note) => note.category.map(c => !allCategories.includes(c) ? allCategories.push(c) : null))
        return allCategories
    }

    return (
        <div className="category">
            <div className="form__row">
                <label>add {i + 1}. category</label>
                <input id={`input-category${i}`}
                    value={holdString[i]}
                    type="text" rows="10" name="category"
                    onChange={(e) =>
                        document.getElementById(`select${i}`).value === 'choose category'
                            ? setHoldString({ ...holdString, [i]: e.target.value })
                            : null}
                />
            </div>
            <div className="form__row">
                <label>choose category</label>
                <select id={`select${i}`} onChange={(e) => setHoldString({...holdString, [i] : e.target.value !== 'choose category' ? e.target.value : null})} >
                    {getCategories().map((category) => {
                        return <option value={category}>{category}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default CreateCategorySection
