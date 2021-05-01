import React, { useContext} from 'react'
import { AuthContext } from '../../services/context/AuthContext'
import Auth from '../auth/Auth'
import Dashboard from './Dashboard/Dashboard'

export default function Home() {
    const {user} = useContext(AuthContext)
    if(user)
        return <Dashboard />
    return <Auth />
}
