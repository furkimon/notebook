import * as api from '../api/api.js'
import { GETALL, CREATE, UPDATE, DELETE, FILTER, CLEAN_NOTES } from '../constants/actionTypes'
import { tokenConfig } from './authActions.js'

export const getNotes = () => async (dispatch, getState) => {
    try {
        const { data } = await api.getNotes(tokenConfig(getState))
        dispatch({ type: GETALL, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const createNote = (note) => async (dispatch, getState) => {
    try {
        const { data } = await api.createNotes(note, tokenConfig(getState))
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updateNote = (id, post) => async (dispatch, getState) => {
    try {
        const { data } = await api.updateNotes(id, post, tokenConfig(getState))
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deleteNote = (id) => async (dispatch, getState) => {
    try {
        await api.deleteNote(id, tokenConfig(getState))
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const filterNotes = (item) => async (dispatch, getState) => {
    try{
        const { data } = await api.filterNotes(item, tokenConfig(getState))
        dispatch({type: FILTER, payload : data})
    }catch(error){
        console.log(error)
    }
}

export const cleanNotes = () => async (dispatch) => {
    dispatch({type: CLEAN_NOTES})
}
