import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetUserQuery } from "./usersApiSlice";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

import React from 'react'

const UserInfo = () => {
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

  return (
    <>
      <Link to={'edit'}>
        <button>Edit User</button>
      </Link>
      <form action="">
        <span>Username</span>
        <input onChange={onUsernameChanged} value={username} type="text" />
        <span>Password</span>
        <input onChange={onPasswordChanged} value={password} type="text" />
        <span>Roles</span>
        <select onChange={onRolesChanged} value={roles} placeholder='roles' name="" id="">
          <option value="User">User</option>
          <option value="wiwam">SuperUser</option>
        </select>
      </form>
    </>
  )
}

export default UserInfo