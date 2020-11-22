import React, { useState } from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'

import { Notes, Form } from '../'


const Profile = () => {
    const {notes} = useSelector(state => state.notes)
    const [selectedId, setSelectedId] = useState(null)
    const isProfile = true

    return (
        <div className="profile__container" id="profile-container">
            <div className="profile__wrapper">
                <Notes
                    isProfile={isProfile}
                    notes={notes}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
                <Form selectedId={selectedId} setSelectedId={setSelectedId} />
            </div>
        </div>
    )
}

export default Profile
