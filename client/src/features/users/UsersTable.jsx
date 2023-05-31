import React from 'react'
import { Link } from 'react-router-dom'

const UsersTable = ({ props }) => {
    const DisplayData = props.map(
        (user) => {
            return (
                <tr>
                    <Link to={`/artists/${user._id}`}>
                        <td>{user.username}</td>
                    </Link>
                    <td>{user.artistOwner}</td>

                    <td>{user.roles.toString().replaceAll(',', ', ')}</td>
                    <td>{user._id}</td>
                    <td>

                        <Link to={`${user._id}`}>
                            <button>View Info</button>
                        </Link>
                    </td>

                </tr>
            )
        }
    )
    return (
        <>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Roles</th>
                            <th>Artist ID</th>
                        </tr>
                    </thead>
                    <tbody>


                        {DisplayData}

                    </tbody>
                </table>

            </div>
        </>
    )
}

export default UsersTable