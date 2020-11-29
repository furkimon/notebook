import { GETALL, CREATE, UPDATE, DELETE, FILTER, FILTER_TIMELINE, CLEAN_NOTES, FOLLOWED_NOTES, FOLLOW_NOTES_UPDATE, PERSONAL_NOTES } from '../constants/actionTypes'

const initialState = {
    notes: [],
    personalNotes: [],
    followedNotes: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GETALL:
            return {
                ...state,
                notes: action.payload
            }
        case PERSONAL_NOTES:
            return {
                ...state,
                personalNotes: action.payload
            }
        case FOLLOWED_NOTES:
            return {
                ...state,
                followedNotes: action.payload
            }
        case CREATE:
            return {
                ...state,
                personalNotes: [...state.personalNotes, action.payload],
                followedNotes: [...state.followedNotes, action.payload]
            }
        case UPDATE:
            return {
                ...state,
                personalNotes: state.personalNotes.map((note) => note._id === action.payload._id ? action.payload : note)
            }
        case DELETE:
            return {
                ...state,
                personalNotes: state.personalNotes.filter((note) => note._id !== action.payload),
                followedNotes: state.followedNotes.filter((note) => note._id !== action.payload)
            }
        case FILTER:
            return {
                ...state,
                personalNotes: action.payload
            }
        case FILTER_TIMELINE:
            return {
                ...state,
                followedNotes: action.payload
            }
        case FOLLOW_NOTES_UPDATE:
            let followed
            let unfollowed
            var addFollowedNotes
            var subFollowedNotes
            if (action.payload.followed) {
                followed = action.payload.followed
                addFollowedNotes = state.notes.filter(note => note.createdBy === followed._id)
                var newFollowed = state.followedNotes.concat(addFollowedNotes)
            } else if (action.payload.unfollowed) {
                unfollowed = action.payload.unfollowed
                subFollowedNotes = state.followedNotes.filter(note => note.createdBy !== unfollowed._id)
            }
            return {
                ...state,
                followedNotes: addFollowedNotes ? newFollowed : subFollowedNotes ? subFollowedNotes : state.followedNotes
            }
        case CLEAN_NOTES:
            return []
        default:
            return state;
    }
}