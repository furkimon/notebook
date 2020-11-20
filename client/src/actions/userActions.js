import * as api from '../api/api.js'
import { FOLLOW_SUCCESS } from '../constants/actionTypes'

export const followUser = (id, follower) => async (dispatch) => {
    try {
        const { data } = await api.followUser(id, follower)
        dispatch({type : FOLLOW_SUCCESS, payload : data})
    } catch (error) {
        console.log(error)
    }
}