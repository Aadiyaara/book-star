import React from 'react'
import LoginForm from './form/LoginForm'

export default function Login({setAuthMode}) {
    return (
        <div>
            <LoginForm setAuthMode={setAuthMode} />
        </div>
    )
}
