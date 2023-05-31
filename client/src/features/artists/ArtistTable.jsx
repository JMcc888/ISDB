import React from 'react'
import { Link } from 'react-router-dom'

const ArtistTable = ({ props }) => {
    const DisplayData = props.map(
        (artist) => {
            return (
                <tr>
                    <Link to={`/artists/${artist._id}`}>
                        <td>{artist.name}</td>
                    </Link>
                    <td>{artist.artistOwner}</td>
                    <td>{artist._id}</td>
                    <td>
                        <Link to={`/artists/${artist._id}`}>
                            <button>Edit Artist</button>
                        </Link>
                    </td>

                </tr>
            )
        }
    )
    return (
        <>
            <div>
                <table className="">
                    <thead>
                        <tr>
                            <th>Artist Name</th>
                            <th>Owner</th>
                            <th>Artist ID</th>
                            <th>Edit</th>
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

export default ArtistTable