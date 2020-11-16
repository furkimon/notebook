import React from 'react'
import Signin from './Signin'
import Signup from './Signup'
import {useSelector} from 'react-redux'

const Registration = () => {
    const {isAuthenticated} = useSelector(state => state.auth)

    return (
        <div>
            <br/>
            {!false ? <Signup/> : null}
            <br/>
            <br/>
            {!false ?  <Signin/> : null}
        </div>
    )
}

export default Registration
