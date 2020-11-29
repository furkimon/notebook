import * as api from '../api/api.js'
import { REGISTER_SUCCESS, GET_USERS, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS, REGISTER_FAIL, FOLLOW_NOTES_UPDATE, FOLLOW_USER_UPDATE } from '../constants/actionTypes'
import { returnErrors } from './errorActions'
import { getFollowedNotes } from './noteActions'


export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers()
        
        dispatch({type : GET_USERS, payload : data})
    } catch (error) {
        console.log(error)
    }
}

export const followUser = (id, follower) => async (dispatch) => {
    try {
        const { data } = await api.followUser(id, follower)
        console.log(data)
        if(data.followed){
            console.log('followed')
            dispatch({type : FOLLOW_SUCCESS, payload : data}) // userReducer
        } else if(data.unfollowed){
            console.log('unfollowed')
            dispatch({type : UNFOLLOW_SUCCESS, payload : data}) // userReducer
        }
        dispatch({type : FOLLOW_NOTES_UPDATE, payload: data}) // notesReducer
        dispatch({type : FOLLOW_USER_UPDATE, payload: data}) // authReducer

    } catch (error) {
        console.log(error)
    }
}

export const register = (user) => async (dispatch) => {
    //headers
    const config = { headers: { 'Content-Type': 'application/json'} }

    try {
        // const { name, email, password } = user
        const body = JSON.stringify(user)

        const { data } = await api.register(body, config)
        dispatch({ type: REGISTER_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: REGISTER_FAIL })
        dispatch(returnErrors(error.response.data.message, error.response.status, REGISTER_FAIL))
    }
} 