import React, {useState} from 'react'
import './Registration.css'
import AuthForm from './AuthForm'

const Signin = () => {
    const [holdUser, setHoldUser] = useState({ email: null, password: null })

    return (
        <div>
            <AuthForm
                holdUser={holdUser}
                setHoldUser={setHoldUser}
            />
        </div>
    )
}

export default Signin
