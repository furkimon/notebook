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

export const getNotesForUser = (userID) => async (dispatch, getState) => {
    try {
        const { data } = await api.getNotesForUser(tokenConfig(getState), userID)
        dispatch({ type: GETALL, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const filterNotes = (userID, item) => async (dispatch, getState) => {
    try{
        const { data } = await api.filterNotes(tokenConfig(getState), userID, item )
        dispatch({type: FILTER, payload : data})
    }catch(error){
        console.log(error)
    }
}

export const createNote = (note, id) => async (dispatch, getState) => {
    console.log(note)
    console.log(id)
    try {
        const { data } = await api.createNotes(note, id, tokenConfig(getState))
        console.log(data)
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



export const cleanNotes = () => async (dispatch) => {
    dispatch({type: CLEAN_NOTES})
}
