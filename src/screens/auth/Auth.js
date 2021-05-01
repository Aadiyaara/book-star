import React, { useState } from 'react'
import { AuthMode } from '../../config/Constants'
import Login from './login/Login'
import Register from './register/Register'

export default function Auth() {

    const [authMode, setAuthMode] = useState(AuthMode.LOGIN)

    return (
        <div>
            {authMode === AuthMode.LOGIN ? <Login setAuthMode={setAuthMode} /> : <Register setAuthMode={setAuthMode} />}
        </div>
    )
}
