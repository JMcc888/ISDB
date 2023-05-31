import { useParams, Link } from "react-router-dom"
import { useGetAlbumQuery } from "./albumApiSlice"
import useAuth from "../../hooks/useAuth"
import AlbumSongs from "./AlbumSongs"
import './AlbumInfo.css'

const AlbumInfo = () => {

    // Get ID from url Params
    const { id } = useParams()

    const { userID, status } = useAuth()


    const {
        data: album,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetAlbumQuery(id, {
        pollingInterval: 5000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })


    let content

    if (isLoading) content = (<p>Loading...</p>)

    if (isError) {
        content = (<p className="errmsg">{error?.data?.message}</p>)
    }

    if (isSuccess) {
        content = (<>
            <div className="album-info-wrap">
                <div className="album-title-wrap">
                    <h1 className="album-title">{album.data.title}</h1>
                </div>

                <img src={`${album.data.image}`} alt={`${album.data.title}`} />
                <p>{`Released: ${album.data.released}`}</p>
                <Link to={`/artists/${album.data.artistId}`}>
                    <p>Artist Page</p>
                </Link>
                {
                    userID == album.data.artistOwnerID || status == "wiwam" ?
                        (<>
                            <Link to={`/albums/${id}/edit`}>
                                <button>Edit Collection</button>
                            </Link>
                            <Link to={`/artists/${album.data.artistId}/songs/new`}>
                                <button>Add Tracks</button>
                            </Link>

                        </>
                        ) : ""
                }
                <AlbumSongs />
            </div>

        </>)
    }
    return (
        <div>{content}</div>
    )
}

export default AlbumInfo