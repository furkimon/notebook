import * as api from '../api/api.js'
import { returnErrors } from './errorActions'
import {cleanNotes} from './noteActions'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from '../constants/actionTypes'


//Check token and load user
export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING }) //isloading = true

    try {
        const { data } = await api.loadUser(tokenConfig(getState))
        dispatch({ type: USER_LOADED, payload: data })
    } catch (error) {
        console.log(error)
        dispatch(returnErrors(error.data, error.status, REGISTER_FAIL)) //response.data
        dispatch({ type: AUTH_ERROR })
    }
}

export const tokenConfig = (getState) => {
    const token = getState().auth.token
    //headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) config.headers['x-auth-token'] = token

    return config
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

export const login = (user) => async (dispatch) => {
    try {
        const config = { headers: { 'Content-Type': 'application/json'} }
        const {email, password} = user  // user object, body json
        const body = JSON.stringify({email, password})

        const {data} = await api.login(body, config)

        dispatch({type: LOGIN_SUCCESS, payload : data})
    } catch (error) {
        console.log(error)
        dispatch({ type: LOGIN_FAIL })
        dispatch(returnErrors(error.response.data.message, error.response.status, LOGIN_FAIL))
    }
}

export const logOut = () => async (dispatch) => {
   await dispatch({type: LOGOUT_SUCCESS})
   await dispatch(cleanNotes())
}