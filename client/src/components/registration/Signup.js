import React, { useState } from 'react'
import './Registration.css'
import AuthForm from './AuthForm'

const Signup = () => {
    const [holdUser, setHoldUser] = useState({ name : null, email: null, password: null })

    return (
        <div className="signup__container">
            <AuthForm
                holdUser={holdUser}
                setHoldUser={setHoldUser}
                isSignup
            />
        </div>
    )
}

export default Signup
