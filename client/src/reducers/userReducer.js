import { FOLLOW_SUCCESS, GET_USERS, UNFOLLOW_SUCCESS } from '../constants/actionTypes'

const initialState = {
    users: [],
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users : action.payload
            }
        case FOLLOW_SUCCESS:
            let follower
            let followed
            if(action.payload.follower) follower = action.payload.follower
            if(action.payload.followed) followed = action.payload.followed

            var newUsers = state.users.map(user => user._id === follower._id ? follower : user).map(user => user._id === followed._id ? followed : user)
            return {
                ...state,
                users : newUsers
            }
        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                users: state.users.map(user => user._id === action.payload.unfollower._id ? action.payload.unfollower : user).map( user => user._id === action.payload.unfollowed._id ? action.payload.unfollowed : user )
            }
        default:
            return state
    }
}