import React, {useState, useEffect} from 'react'
import './Header.css'
import { NavLink, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../actions/authActions'

const Header = () => {
    const [userName, setUserName] = useState('')
    var history = useHistory()
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector(state => state.auth)
    
    useEffect(() => {
        if (typeof(user) === 'string'){  // JSON
            setUserName(JSON.parse(user).name)
        }else if(typeof(user) === 'object' && user) {  // Object
            setUserName(user['name'])
        }else if(!user){  // after logout, object NULL
            console.log('user is null')
        }
    }, [user])


    return (
        <div className="header__container" id="header-container">
            <NavLink className="navlink" to="/"><div className="list__item">Home</div></NavLink>
            <NavLink className="navlink" to="/profile"><div className="list__item">Profile</div></NavLink>
            {!isAuthenticated
                ? <NavLink className="navlink" to="/registration"><div className="list__item">Login</div></NavLink>
                : <><div className="list__item">Welcome, {userName}</div>
                    <div className="list__item" onClick={() => dispatch(logOut())}>Logout</div></>}
        </div>
    )
}

export default Header
