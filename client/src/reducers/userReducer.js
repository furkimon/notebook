

const initialState = {
    following: null,
    followers: null
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'FOLLOW_SUCCESS':
            return {
                ...state,
                followers : action.payload.followed.followers.length,
                following : action.payload.follower.following.length
            }
        default:
            return state
    }
}