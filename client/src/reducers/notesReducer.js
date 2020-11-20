import { GETALL, CREATE, UPDATE, DELETE, FILTER, CLEAN_NOTES, FOLLOWED_NOTES } from '../constants/actionTypes'

const initialState = {
    notes : [],
    followedNotes : []
}

export default (state = initialState, action) => {
    switch (action.type){
        case GETALL:
            return {
                ...state,
                notes : action.payload
            }
        case FOLLOWED_NOTES:
            return {
                ...state,
                followedNotes : action.payload
            }
        case CREATE:
            return {
                ...state,
                notes : [...state.notes, action.payload]
            }
        case UPDATE:
            return {
                ...state,
                notes : state.notes.map((note) => note._id === action.payload._id ? action.payload : note)
            }
        case DELETE:
            return {
                ...state,
                notes: state.notes.filter((note) => note._id !== action.payload)
            }
        case FILTER:
            return {
                ...state,
                notes : action.payload
            }
        case CLEAN_NOTES:
            return []
        default:
            return state;
    }
}