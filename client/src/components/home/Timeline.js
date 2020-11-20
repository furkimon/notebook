import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Notes from '../notes/Notes'

import {getFollowedNotes} from '../../actions/noteActions'

const Timeline = () => {
    const dispatch = useDispatch()
    const {followedNotes} = useSelector(state => state.notes) 
    const {isLoading, user} = useSelector(state => state.auth)
    const [selectedId, setSelectedId] = useState(null)
    const [userObj, setUserObj] = useState({id : null, name: null, following: null, followers: null})

    useEffect(() => {   // get userID based on user type, JSON or object
        if (typeof (user) === 'string') {  // JSON
            setUserObj({id : JSON.parse(user).id, name : JSON.parse(user).name , following: JSON.parse(user).following, followers: JSON.parse(user).followers})
        } else if (typeof (user) === 'object' && user) {  // Object
            setUserObj({id : user['id'], name : user['name'] , following: user['following'], followers: user['followers']})
        } else if (!user) {  // after logout, object NULL
            console.log('user is null')
        }
    }, [user, userObj])

    useEffect(()=>{
        if(user !== null && userObj.id){
            dispatch(getFollowedNotes(userObj.id))
        }
    }, [user, userObj.id])


    return (
        <div className="timeline__container">
            <div className="notes__wrapper">
                <Notes
                    notes={followedNotes}
                    isLoading={isLoading}
                    user={user}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
            </div>
        </div>
    )
}

export default Timeline
