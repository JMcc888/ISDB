import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useAuth from "../../hooks/useAuth"
import { useGetSongQuery } from './songsApiSlice'
import "./SongInfo.css"

const SongInfo = () => {
    // Get ID from url Params
    const { id } = useParams()

    // Get auth state values
    const { userID, status } = useAuth()

    // Fetch song information
    const {
        data: song,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetSongQuery(id, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = (<p>Loading...</p>)

    if (isError) {
        content = (<p className="errmsg">{error?.data?.message}</p>)
    }

    if (isSuccess) {

        content = (
            <>
                <div className="songinfo-wrap">
                    <div className="songinfo-header">
                        <h1 className='song-title'>{song.data.title}</h1>
                        <h2 className='song-line'>{song.data.songLine}</h2>
                    </div>

                    <p>Peak Billboard Position: {song.data.billboardPeak}</p>
                    <p>Recorded in: {song.data.recorded}</p>
                    <Link to={`/artists/${song.data.artistId}`}><p>Song's Artist</p></Link>
                    <Link to={`/albums/${song.data.albumId}`}><p>Song's Collection</p></Link>



                    {
                        userID == song.data.artistOwnerID || status == "wiwam" ?
                            (<>
                                <Link to={`/songs/${id}/edit`}>
                                    <button className='artist-settings-button'>Edit Song</button>
                                </Link>
                                <Link to={`/artists/${song.data.artistId}/songs/new`}>
                                    <button className='artist-settings-button'>Add Tracks</button>
                                </Link>

                            </>
                            ) : ""
                    }
                </div>

            </>
        )

    }

    return (
        <>
            {content}
        </>
    )
}

export default SongInfo