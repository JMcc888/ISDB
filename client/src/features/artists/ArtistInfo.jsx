import { useParams, Link } from 'react-router-dom'
import { useGetArtistQuery } from './artistsApiSlice'
import "./ArtistInfo.css"
import AlbumList from '../albums/AlbumList'
import useAuth from '../../hooks/useAuth'
// Logos
import spotify from "../../img/spot.png"
import youtube from "../../img/yt.png"
import apm from "../../img/apm.png"
import ReviewsList from '../reviews/ReviewsList'

const ArtistInfo = () => {

    // Working
    const { id } = useParams()

    const { userID, status } = useAuth()

    const {
        data: artist,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetArtistQuery(id, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // console.log(artist)

    // console.log("Thing : ", artist)

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    // console.log(artist.data.description.length)



    if (isSuccess) {
        content = (
            <>
                <div className="artist-info-wrap">
                    <h1 className='artist-name'>{artist.data.name}</h1>
                    <img className='artist-photo' src={`${artist.data.photo}`} alt="" />
                    <p className="artist-data-text">{`Origin: ${artist.data.origin}`}</p>
                    <p className="artist-data-text">{`Debut: ${artist.data.debut}`}</p>
                    <p className="artist-data-text">{`Top Song: ${artist.data.topSong}`}</p>
                    <p className="artist-data-text">Artist Description: </p>
                    <div className="artist-description-wrap">
                        <p className="artist-data-text">{`${artist.data.description}`}</p>
                    </div>

                    <p className="artist-data-text">{`Submitted By: ${artist.data.artistOwner}`}</p>
                    {/* <p>{artist.data.artistOwnerID}</p> */}
                    {artist.data.active == true ? (<p className="artist-data-text">This artist is still active</p>) : (<p className="artist-data-text">This artist is inactive</p>)}
                    <div class="music-links">
                        <a href={`${artist.data.spotifyLink}`} target="_blank">
                            <img className='music-links-img' src={spotify} alt="Spotify" />
                        </a>
                        <a href={`${artist.data.youtubeLink}`} target="_blank">
                            <img className='music-links-img' src={youtube} alt="Youtube" />
                        </a>
                        <a href={`${artist.data.appleMusicLink}`} target="_blank">
                            <img className='music-links-img' src={apm} alt="Apple Music" />
                        </a>
                    </div>

                    {
                        userID == artist.data.artistOwnerID || status == "wiwam" ?
                            (<>
                                <div className="settings-buttons">
                                    <Link to={`/artists/${id}/edit`}>
                                        <button className='artist-settings-button'>Edit Artist</button>
                                    </Link>
                                    <Link to={`/artists/${id}/albums/new`}>
                                        <button className='artist-settings-button'>Add Collection</button>
                                    </Link>
                                </div>
                            </>
                            ) : ""
                    }
                    <AlbumList />

                    {userID ? (<>
                        <Link to={`/artists/${id}/reviews/new`}>
                            <button className='artist-review-button'>
                                Add review
                            </button>
                        </Link>
                    </>) : ''}
                    <ReviewsList />
                </div >
            </>
        )
    }

    // console.log(artist)

    return (
        <div>
            {content}
        </div>
    )
}

export default ArtistInfo