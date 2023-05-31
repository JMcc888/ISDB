import React from 'react'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/apiAuthSlice'

const Footer = () => {
    const navigate = useNavigate()

    // Check state for username
    const { username } = useAuth()

    // Logout button query
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const content = (
        <footer className="footer">
            <p>Current User: {username}</p>
            <button className='' onClick={sendLogout}>Logout</button>
        </footer>
    )
    return content
}

export default Footer