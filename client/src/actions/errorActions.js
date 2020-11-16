import * as api from '../api/api.js'

import { GET_ERRORS, CLEAR_ERRORS } from '../constants/actionTypes'

//RETURN ERRORS
export const returnErrors = (message, status, id = null) => dispatch => {
    return dispatch({ type: GET_ERRORS, payload: { message, status, id } })
}

//CLEAR ERRORS 
export const clearErrors = () => {
    return { type: CLEAR_ERRORS }
}