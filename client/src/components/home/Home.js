import React, { useState, useEffect } from 'react'
import './Home.css'

import {Notes, Form} from '../../components'


const Home = () => {
    const[selectedId, setSelectedId] = useState(null)


    return (
        <div className="home__container" id="home-container">
            <div className="home__wrapper">
                <Notes selectedId = {selectedId} setSelectedId={setSelectedId}/>
                <Form selectedId = {selectedId} setSelectedId={setSelectedId}/>
            </div>
        </div>
    )
}

export default Home
