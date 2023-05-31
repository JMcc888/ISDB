import "./LoginForm.css"
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useRegisterMutation } from './apiAuthSlice'

import usePersist from '../../hooks/usePersist'


const RegisterForm = () => {
    const userRef = useRef()
    // Credentials
    const [username, setUsername] = useState('')

    // Admin set elsewhere
    const [roles, setRoles] = useState(['User'])
    const [password, setPassword] = useState('')

    // Error message
    const [errMsg, setErrMsg] = useState('')

    // Persist Login check
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading }] = useRegisterMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await register({ username, password, roles }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('All Fields Required');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            console.log(err)
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    // Toggle error class
    const errClass = errMsg ? "errmsg" : "offscreen"

    return (
        <>
            <div className="form-container">
                <div className="register-wrap">
                    <h1 className="register-title">Register</h1>
                    <p className={errClass}>{errMsg}</p>
                    <p>Register now to begin sharing artists you enjoy.</p>
                    <p>Your submissions to this application will aid us in preserving the history of artists and their work throughout their careers.</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form" action="">
                    <span className="login-form-labels">Username</span>
                    <input autoComplete="off" className="login-form-input" type="text" onChange={handleUserInput}
                        ref={userRef}
                        value={username} />
                    <span className="login-form-labels">Password</span>
                    <input autoFocus={false} className="login-form-input" type="password" onChange={handlePwdInput}
                        value={password} />
                    <button className="login-form-button">Register</button>
                    <label htmlFor="persist" className="form__persist">
                        <input autoFocus={false}
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                </form>
            </div>
        </>
    )
}

export default RegisterForm