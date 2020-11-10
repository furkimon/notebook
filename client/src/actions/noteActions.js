import * as api from '../api/api.js'
import { GETALL, CREATE, UPDATE, DELETE, FILTER } from '../constants/actionTypes'

export const getNotes = () => async (dispatch) => {
    try {
        const { data } = await api.getNotes()
        dispatch({ type: GETALL, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const createNote = (note) => async (dispatch) => {
    try {
        const { data } = await api.createNotes(note)
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updateNote = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateNotes(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deleteNote = (id) => async (dispatch) => {
    try {
        await api.deleteNote(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const filterNotes = (item) => async (dispatch) => {
    try{
        const { data } = await api.filterNotes(item)
        dispatch({type: FILTER, payload : data})
    }catch(error){
        console.log(error)
    }
}
