import React, { useState } from 'react'
import './Profile.css'

import {Notes, Form} from '..'


const Profile = () => {
    const[selectedId, setSelectedId] = useState(null)


    return (
        <div className="profile__container" id="profile-container">
            <div className="profile__wrapper">
                <Notes selectedId = {selectedId} setSelectedId={setSelectedId}/>
                <Form selectedId = {selectedId} setSelectedId={setSelectedId}/>
            </div>
        </div>
    )
}

export default Profile
