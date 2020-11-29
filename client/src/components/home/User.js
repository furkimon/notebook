import React from 'react'
import './Home.css'
import { useDispatch } from 'react-redux'
import { followUser } from '../../actions/userActions'

const User = ({user, otherUser}) => {
    const dispatch = useDispatch()

    let followedToBe = otherUser['_id']
    
    const handleFollow = () => {
        dispatch(followUser(followedToBe, {follower : user['_id']}))
    } //dispatch(getFollowedNotes(user['_id'])).then(console.log(users)) 

    return (
        <div className="user__container">
            {otherUser.name}
            <div className="followBtn" onClick={()=> handleFollow()}>
                {user.following.includes(followedToBe) ? 'unf' : 'follow'}
            </div>
        </div>
    )
}

export default User
