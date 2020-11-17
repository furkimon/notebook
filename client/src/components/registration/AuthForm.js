import React from 'react'
import './Registration.css'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

import { login, register } from '../../actions/authActions'
import { REGISTER_FAIL, LOGIN_FAIL } from '../../constants/actionTypes'


const AuthForm = ({ holdUser, setHoldUser, isSignup }) => {
    const dispatch = useDispatch()
    var history = useHistory()
    const { id, message } = useSelector(state => state.error)
    const {isAuthenticated} = useSelector(state => state.auth)


    const onSubmit = (holdUser) => {
        if (isSignup) {
            dispatch(register(holdUser))
        }else{
            dispatch(login(holdUser))
        }
        clear()
    }

    const clear = () => {
        setHoldUser({ name: '', email: '', password: '' })
    }

    if(isAuthenticated) history.push("/profile")
    
    return (
        <div className="auth__container">
            <div className="auth__wrapper">
                <h3 className="auth__title">Sign {isSignup ? ' Up' : ' In'}</h3>
                {(isSignup && id === REGISTER_FAIL) || (!isSignup && id === LOGIN_FAIL) ? <div className="auth__row error">{message}</div>:  null}
                {isSignup
                    ? <div className="auth__row">
                        <label>name</label>
                        <input value={holdUser ? holdUser.name : null} type="name" required onChange={(e) => setHoldUser({ ...holdUser, name: e.target.value })} />
                    </div> : null
                }<div className="auth__row">
                    <label>email</label>
                    <input value={holdUser ? holdUser.email : null} type="email" required onChange={(e) => setHoldUser({ ...holdUser, email: e.target.value })} />
                </div>
                <div className="auth__row">
                    <label>password</label>
                    <input value={holdUser ? holdUser.password : null} type="password" required onChange={(e) => setHoldUser({ ...holdUser, password: e.target.value })} />
                </div>
                <div
                    className="auth__btn"
                    onClick={() => onSubmit(holdUser)}>OK
                </div>
            </div>
        </div>
    )
}

export default AuthForm
