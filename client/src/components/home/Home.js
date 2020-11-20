import React, { useEffect } from 'react'
import './Home.css'
import Timeline from './Timeline'
import { useSelector } from 'react-redux'

const Home = () => {
    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        var homeContainer = document.getElementById('home-container')
        isAuthenticated
            ? homeContainer.style.height = "max-content"
            : homeContainer.style.height = "calc(100vh - 50px)"
    }, [isAuthenticated])

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
                    : <p>OOO MMM GGG THIS IS THE BEST SERIOUSLY OMGOMGOMG</p>}
            </div>
            <div className="home__center">
                <div className="home__center__left home__section">

                </div>
                <div className="home__center__right home__section">

                </div>
            </div>
        </div>
    )
}

export default Home
