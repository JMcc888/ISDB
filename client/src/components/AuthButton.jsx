import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const AuthButton = () => {

    const { status } = useAuth()

    let content

    if (status == "wiwam") {
        content = (
            <>
                <Link to={'/settings'}>
                    <button className='index-settings-button'>Settings</button>
                </Link>
            </>
        )
    }
    return (
        <>
            {content}
        </>
    )
}

export default AuthButton