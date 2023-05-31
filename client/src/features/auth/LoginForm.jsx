import "./LoginForm.css"
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './apiAuthSlice'

import usePersist from '../../hooks/usePersist'

const LoginForm = () => {
    // Error message class
    const userRef = useRef()
    const errRef = useRef()

    // Credentials
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Error message
    const [errMsg, setErrMsg] = useState('')
    // Persist Login check
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
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
                setErrMsg('Invalid Credentials');
            } else {
                setErrMsg(err.data?.message);
            }
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
                <h1 className="login-title">Login</h1>
                <p className="login-para">Login to create or modify your existing artists.</p>
                <p ref={errRef} className={errClass}>{errMsg}</p>
                <form onSubmit={handleSubmit} className="login-form" action="">
                    <span className="login-form-labels">Username</span>
                    <input autoFocus={false} className="login-form-input" type="text" onChange={handleUserInput}
                        ref={userRef}
                        value={username} />
                    <span className="login-form-labels">Password</span>
                    <input autoFocus={false} className="login-form-input" type="password" onChange={handlePwdInput}
                        value={password} />
                    <button className="login-form-button">Login</button>
                    <label htmlFor="persist" className="form__persist">
                        <input
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

export default LoginForm