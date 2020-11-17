import React from 'react'
import './Header.css'
import { NavLink, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../actions/authActions'

const Header = () => {
    var history = useHistory()
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector(state => state.auth)

    // if(!isAuthenticated) history.push("/registration")
    return (
        <div className="header__container" id="header-container">
            <NavLink className="navlink" to="/"><div className="list__item">Home</div></NavLink>
            <NavLink className="navlink" to="/profile"><div className="list__item">Profile</div></NavLink>
            {!isAuthenticated
                ? <NavLink className="navlink" to="/registration"><div className="list__item">Login</div></NavLink>
                : <div className="list__item" onClick={() => dispatch(logOut())}>Logout</div>}
        </div>
    )
}

export default Header
