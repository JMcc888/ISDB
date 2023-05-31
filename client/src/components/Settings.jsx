import { Link } from "react-router-dom"

const Settings = () => {
    return (
        <>
            <h1>Settings</h1>
            <Link to={"/settings/users"}><button>Manage Users</button></Link>
            <Link to={"/settings/artists"}><button>Manage Artists</button></Link>
            <Link to={"/settings/albums"}><button>Manage Albums</button></Link>
            <Link to={"/settings/songs"}><button>Manage Songs</button></Link>
            <Link to={"/settings/reviews"}><button>Manage Reviews</button></Link>
        </>
    )
}

export default Settings