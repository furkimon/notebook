import React, { useEffect } from 'react'
import './Home.css'
import User from './User'
import Timeline from './Timeline'
import { useSelector } from 'react-redux'

const Home = () => {
    const { user, isAuthenticated } = useSelector(state => state.auth)
    const {followedNotes} = useSelector(state => state.notes)
    const {users} = useSelector(state => state.user)

    useEffect(() => {
        var homeContainer = document.getElementById('home-container')
        isAuthenticated && followedNotes.length
            ? homeContainer.style.height = "max-content"// homeContainer.offsetHeight + "px"
            : homeContainer.style.height = "calc(100vh - 50px)"
    }, [isAuthenticated, followedNotes.length])


    return (
        <div className="home__container" id="home-container">
            <div className="home__left home__section">
                {!isAuthenticated
                    ? <p>Sign in to continue your work on the best organizer.</p>
                    : (<><br /><h3>Timeline goes here :</h3>
                        <Timeline />
                    </>)}
            </div>
            <div className="home__right home__section">
                {!isAuthenticated
                    ? <p>Sign up now for free to the best note organizer.</p>
                    : <p>users : <br/>
                    {users.map(otherUser => otherUser._id !== user._id ? <User user={user} otherUser={otherUser}/> : null)}</p>}
            </div>
            {/* <div className="home__center">
                <div className="home__center__left home__section">

                </div>
                <div className="home__center__right home__section">

                </div>
            </div> */}
        </div>
    )
}

export default Home
