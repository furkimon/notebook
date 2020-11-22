import * as api from '../api/api.js'
import { REGISTER_SUCCESS, FOLLOW_SUCCESS, REGISTER_FAIL } from '../constants/actionTypes'
import { returnErrors } from './errorActions'

export const followUser = (id, follower) => async (dispatch) => {
    try {
        const { data } = await api.followUser(id, follower)
        dispatch({type : FOLLOW_SUCCESS, payload : data})
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