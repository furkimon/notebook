import * as api from '../api/api.js'
import { GETALL, FOLLOWED_NOTES, CREATE, UPDATE, DELETE, FILTER, CLEAN_NOTES, PERSONAL_NOTES} from '../constants/actionTypes'
import { tokenConfig } from './authActions.js'

export const getNotes = () => async (dispatch, getState) => {
    try {
        const { data } = await api.getNotes(tokenConfig(getState))
        dispatch({ type: GETALL, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getNotesForUser = (id) => async (dispatch, getState) => {
    try {
        const { data } = await api.getNotesForUser(tokenConfig(getState), id)
        dispatch({ type: PERSONAL_NOTES, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const getFollowedNotes = (id) => async (dispatch, getState) => {
    try {
        const { data } = await api.getFollowedNotes(tokenConfig(getState), id)
        dispatch({type : FOLLOWED_NOTES, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const filterNotes = (id, item) => async (dispatch, getState) => {
    try{
        const { data } = await api.filterNotes(tokenConfig(getState), id, item )
        dispatch({type: FILTER, payload : data})
    }catch(error){
        console.log(error)
    }
}

export const createNote = (note, id) => async (dispatch, getState) => {
    try {
        const { data } = await api.createNotes(note, id, tokenConfig(getState))
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updateNote = (id, note) => async (dispatch, getState) => {
    try {
        const { data } = await api.updateNotes(id, note, tokenConfig(getState))
        console.log(data)
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
