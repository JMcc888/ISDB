import "./Nav.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Nav = () => {

    const { username } = useAuth()

    const [open, setOpen] = useState(false)
    const handleNav = () => {
        setOpen(!open)
    }

    return (
        <div>
            <>
                <div onClick={handleNav} className={`container ${open ? "change" : ""}`}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>

                <ul className={`navbar ${open ? "clicked change" : ""}`}>
                    <Link to="/"><li className="navbar-link">Home</li></Link>

                    <Link to="/artists">
                        <li className="navbar-link">Artists</li>
                    </Link>


                    <Link to="/albums">
                        <li className="navbar-link">Collections</li>
                    </Link>

                    {username ?
                        ("")
                        :
                        (<>
                            <Link to="/login">
                                <li className="navbar-link">Login</li>
                            </Link>
                            <Link to="/register">
                                <li className="navbar-link">Register</li>
                            </Link>
                        </>)}
                </ul>
            </>
        </div>
    )
}

export default Nav