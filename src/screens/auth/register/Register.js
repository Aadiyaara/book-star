import React from 'react'
import RegisterForm from './form/RegisterForm'

export default function Register({setAuthMode}) {
    return (
        <div>
            <RegisterForm setAuthMode={setAuthMode}/>
        </div>
    )
}
