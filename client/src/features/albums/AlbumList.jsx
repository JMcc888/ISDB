import { useParams, Link } from 'react-router-dom'
import { useGetArtistAlbumsQuery } from "../artists/artistsApiSlice"
import useAuth from '../../hooks/useAuth'

import "./AlbumList.css"

const AlbumList = ({ data }) => {

    // Auth State Values
    const { userID, status } = useAuth()

    // Get ID from url Params
    const { id } = useParams()

    // Fetch albums associated with artist
    const {
        data: albums,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetArtistAlbumsQuery(id, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        content = (
            <>
                <div className="album-wrap">
                    {albums.data[0] ? (<>
                        {userID == albums.data[0].artistOwnerID || status == "wiwam" ? (<><Link to={`/artists/${id}/songs/new`}>
                            <button className='artist-settings-button'>Add Songs</button>
                        </Link></>) : ""}
                        <h2>Albums By This Artist</h2>
                        <div className='artist-albums'>
                            <>
                                {albums.data.filter(album => album.isSingle != true).map(filteredAlbum => (
                                    <>
                                        <Link to={`/albums/${filteredAlbum._id}`}>
                                            <div className='albums-list-item' key={filteredAlbum._id}>

                                                <img className='albums-list-photo' src={`${filteredAlbum.image}`} alt="" />
                                                <p>{filteredAlbum.title}</p>
                                            </div>
                                        </Link>
                                    </>
                                ))}
                            </>
                        </div>

                        <h2>Singles By This Artist</h2>
                        <div className='singles-list'>

                            {albums.data.filter(album => album.isSingle == true).map(filteredAlbum => (
                                <>
                                    <div className='singles-list-item'>
                                        <Link to={`/albums/${filteredAlbum._id}`}>
                                            <div className='albums-list-item' key={filteredAlbum._id}>

                                                <img className='albums-list-photo' src={`${filteredAlbum.image}`} alt="" />
                                                <p>{filteredAlbum.title}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </>

                            ))}
                        </div></>) : ""}

                </div>

            </>)
    }
    return (
        <div>{content}</div>
    )
}

export default AlbumList