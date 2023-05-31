import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

import React from 'react'

const EditUserForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userID, status } = useAuth()
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetUserQuery(id, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const [updateUser, {
        isLoading: isLoadingEdit,
        isSuccess: isEditSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()


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

    useEffect(() => {
        setUsername(user?.data?.username)
        setRoles(user?.data?.roles?.[0])
    }, [isSuccess])

    const onSubmitUser = async (e) => {
        e.preventDefault()
        updateUser({ id: id, username, password, roles })
        navigate(`/settings/users/${id}`)
    }

    const onDeleteUserClicked = async () => {
        // ID grabbed from useParams
        await deleteUser({ id: id })
        navigate(`/settings/users/`)
    }

    let content

    if (isLoading) content = <p>Loading...</p>
    if (isSuccess) {
        content = (
            <>
                <button onClick={onDeleteUserClicked}>Delete User</button>
                <form onSubmit={onSubmitUser} action="">
                    <span>Username</span>
                    <input onChange={onUsernameChanged} value={username} type="text" />
                    <span>Password</span>
                    <input onChange={onPasswordChanged} value={password} type="text" />
                    <span>Roles</span>
                    <select onChange={onRolesChanged} value={roles} placeholder='roles' name="" id="">
                        <option value="User">User</option>
                        <option value="wiwam">SuperUser</option>
                    </select>
                    <button>Submit Changes</button>
                </form>
            </>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default EditUserForm