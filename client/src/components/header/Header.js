import React from 'react'
import './Header.css'
import {useDispatch, useSelector} from 'react-redux'
import {logOut} from '../../actions/authActions'

const Header = () => {
    const dispatch = useDispatch()
    const {isAuthenticated, user} = useSelector(state => state.auth)
    return (
        <div className="header__container" id="header-container">
                <div className="list__item"><a href='/'>Home</a></div>
                <div className="list__item">Profile</div>
                {!isAuthenticated
                ? <div className="list__item"><a href='/auth'>Login</a></div>
                : <div className="list__item" onClick={()=>dispatch(logOut())}>Logout</div>}
        </div>
    )
}

export default Header
