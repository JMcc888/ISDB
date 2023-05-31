import { Link } from "react-router-dom"
const AlbumsSettingsTable = ({ props }) => {
    const DisplayData1 = props.filter(album => album.isSingle != true).map(
        (filteredAlbum) => {
            return (
                <tr>
                    <Link to={`/albums/${filteredAlbum._id}`}>
                        <td>{filteredAlbum.title}</td>
                    </Link>
                    <td>{filteredAlbum.artistOwner}</td>

                    <td>{filteredAlbum._id}</td>
                    <td>

                        <Link to={`/albums/${filteredAlbum._id}`}>
                            <button>Edit Collection</button>
                        </Link>
                    </td>
                    <td>{filteredAlbum.artistId}</td>

                </tr>
            )
        }


    )

    const DisplayData2 = props.filter(album => album.isSingle == true).map(
        (filteredAlbum) => {
            return (
                <tr>
                    <Link to={`/albums/${filteredAlbum._id}`}>
                        <td>{filteredAlbum.title}</td>
                    </Link>
                    <td>{filteredAlbum.artistOwner}</td>

                    <td>{filteredAlbum._id}</td>
                    <td>

                        <Link to={`/albums/${filteredAlbum._id}`}>
                            <button>Collection</button>
                        </Link>
                    </td>
                    <td>{filteredAlbum.artistId}</td>

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
                            <th>Title</th>
                            <th>Roles</th>
                            <th>Artist ID</th>
                        </tr>
                    </thead>
                    <tbody>


                        {DisplayData1}

                    </tbody>
                </table>

            </div>

            <div>
                <table className="">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Roles</th>
                            <th>Artist ID</th>
                        </tr>
                    </thead>
                    <tbody>


                        {DisplayData2}

                    </tbody>
                </table>

            </div>
        </>
    )
}

export default AlbumsSettingsTable