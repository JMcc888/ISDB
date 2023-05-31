import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AdminCheck = () => {
    const { status } = useAuth()

    const navigate = useNavigate()


    let content

    if (status == "wiwam") {
        content = (
            <Outlet />
        )
    } else {
        content = (<><p>Bruh, what doing</p></>)
        useEffect(() => {
            navigate('/')
        }, [])
    }

    return <>
        {content}
    </>
}

export default AdminCheck