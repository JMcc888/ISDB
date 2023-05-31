import React from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddUserForm = () => {

    const navigate = useNavigate()


    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState(['User'])


    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const onNewUserClicked = async (e) => {
        e.preventDefault()
        await addNewUser({ username, password, roles })
    }

    useEffect(() => {
        if (isSuccess) {
            setUsername(''),
                setPassword(''),
                setRoles(['User'])
            navigate('/settings/users')
        }
    }, [isSuccess, navigate])

    return (
        <>
            <form onSubmit={onNewUserClicked} action="">
                <span>Username</span>
                <input onChange={onUsernameChanged} value={username} type="text" />
                <span>Password</span>
                <input onChange={onPasswordChanged} value={password} type="text" />
                <span>Roles</span>
                <select onChange={onRolesChanged} value={roles} placeholder='roles' name="" id="">
                    <option value="User">User</option>
                    <option value="wiwam">SuperUser</option>
                </select>
                <button>Submit</button>
            </form>
        </>
    )
}

export default AddUserForm