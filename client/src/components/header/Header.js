import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className="header__container" id="header-container">
                <div className="list__item"><a href='/'>Home</a></div>
                <div className="list__item">Profile</div>
        </div>
    )
}

export default Header
