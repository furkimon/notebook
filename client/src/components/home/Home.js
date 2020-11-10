import React, { useState, useEffect } from 'react'
import './Home.css'

import { useDispatch } from 'react-redux'
import { getNotes } from '../../actions/noteActions'

import {Notes, Form} from '../../components'


const Home = () => {
    const dispatch = useDispatch()
    const[selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        dispatch(getNotes())
    }, [dispatch])

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
