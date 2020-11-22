import React, {useState, useEffect} from 'react'
import './Header.css'
import { NavLink, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../actions/authActions'

const Header = () => {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector(state => state.auth)
    

    return (
        <div className="header__container" id="header-container">
            <NavLink className="navlink" to="/"><div className="list__item">Home</div></NavLink>
            <NavLink className="navlink" to="/profile"><div className="list__item">Profile</div></NavLink>
            {!isAuthenticated
                ? <NavLink className="navlink" to="/registration"><div className="list__item">Login</div></NavLink>
                : <><div className="list__item">Welcome, {user ? user['name'] : null}</div>
                    <div className="list__item" onClick={() => dispatch(logOut())}>Logout</div></>}
        </div>
    )
}

export default Header
