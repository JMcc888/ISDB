import AuthButton from "./AuthButton"
import { Link } from "react-router-dom"
import "./Public.css"

const Public = () => {
    return (
        <>
            <div className="index-wrap">
                <AuthButton />
                <div className="index-landing">
                    <h1 className="index-landing-title">It only gets better with age.</h1>
                    <p>Music serves as a part of mankind's history. Various genres, various artists, and various pieces composed. This project aims to preserve and share this history to those wanting to learn more about artists and their work throughout their career.</p>
                    <div className="index-landing-buttons">
                        <Link to={'artists'}>
                            <button className="index-landing-button">Contribute Artists</button>
                        </Link>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Public