import React from 'react'
import "./NewSongForm.css"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { useGetArtistAlbumsQuery } from '../artists/artistsApiSlice'
import { useAddNewSongMutation } from './songsApiSlice'

const NewSongForm = () => {

    const navigate = useNavigate()

    // Get ID from url Params
    const { id } = useParams()

    const { userID, status, } = useAuth()

    // Get artist's collections
    const {
        data: albums,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetArtistAlbumsQuery(id, {
        pollingInterval: 20000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // Save song
    const [addNewSong, {
        isLoading: isLoadingNew,
        isSuccess: isSuccessNew,
        isError: isErrorNew,
        error: errorNew
    }] = useAddNewSongMutation()

    // Get values from first existing collection
    // This is why the page won't show until at least one collection exists for said artist
    const artistId = albums.data[0].artistId
    const artistOwnerId = albums.data[0].artistOwnerID

    // const [artistHasAlbums, setArtistHasAlbums] = useState(false)

    const [title, setTitle] = useState('')
    const [songLine, setSongLine] = useState('')
    const [billboardPeak, setBillboardPeak] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    const [spotifyLink, setSpotifyLink] = useState('')
    const [appleMusicLink, setAppleMusicLink] = useState('')
    const [recorded, setRecorded] = useState('')
    const [collection, setCollection] = useState('')

    const [canEdit, setCanEdit] = useState(false)


    const onTitleChanged = e => setTitle(e.target.value)
    const onSongLineChanged = e => setSongLine(e.target.value)
    const onBillboardPeakChanged = e => setBillboardPeak(e.target.value)
    const onYoutubeLinkChanged = e => setYoutubeLink(e.target.value)
    const onSpotifyLinkChanged = e => setSpotifyLink(e.target.value)
    const onAppleMusicLinkChanged = e => setAppleMusicLink(e.target.value)
    const onRecordedChanged = e => setRecorded(e.target.value)

    const handleShow = () => {
        if (userID == albums.data.artistOwnerID || status === "wiwam") {
            setCanEdit(true)
        }
    }

    const onCreateSongClicked = async (e) => {
        e.preventDefault()
        await addNewSong({ title, songLine, billboardPeak, youtubeLink, spotifyLink, appleMusicLink, recorded, artistId, artistOwnerId, albumId: collection })
    }


    let content


    useEffect(() => {
        if (isSuccessNew) {
            setTitle(''),
                setSongLine(''),
                setBillboardPeak(''),
                setYoutubeLink(''),
                setSpotifyLink(''),
                setAppleMusicLink(''),
                setRecorded('')
            navigate(`/albums/${collection}`)
        }
    }, [isSuccessNew, navigate])

    if (isLoading) content = (<p>Loading...</p>)

    if (isError) {
        content = (<p className="errmsg">{error?.data?.message}</p>)
    }

    if (isSuccess) {
        content = (
            <>
                <div className="song-form-wrap">
                    <h1>Add New Song To Collection</h1>
                    <form onSubmit={onCreateSongClicked} className="add-album-form">
                        <span className="required">Song's Title</span>
                        <input required value={title} type="text" onChange={onTitleChanged} className="add-album-form-input" placeholder="Enter the Album's title" />
                        <span className="required">Notable Line</span>
                        <input required type="text" onChange={onSongLineChanged} value={songLine} className="add-album-form-input" placeholder="Enter a recognizable line from the song (ex: refrain)" />
                        <span>Billboard Peak</span>
                        <input type="number" className="add-album-form-input" placeholder="Enter the song's peak billboard position (if available)" onChange={onBillboardPeakChanged} value={billboardPeak} />
                        <span className="required">Recorded</span>
                        <input type="number" className="add-album-form-input" placeholder="Enter the song's recording year" onChange={onRecordedChanged} required value={recorded} />
                        <span>Youtube Link</span>
                        <input value={youtubeLink} type="text" onChange={onYoutubeLinkChanged} className="add-artist-form-input" placeholder="Sumbit a link to the song's Youtube page" />
                        <span>Spotify Link</span>
                        <input value={spotifyLink} type="text" onChange={onSpotifyLinkChanged} className="add-artist-form-input" placeholder="Submit a link to the song's Spotify page" />
                        <span>Apple Music Link</span>
                        <input value={appleMusicLink} type="text" onChange={onAppleMusicLinkChanged} className="add-artist-form-input" placeholder="Submit a link to the song's Apple Music page" />
                        <span required className="required">Collection</span>
                        <select value={collection} onChange={(e) => setCollection(e.target.value)}>
                            <option value="">Select The Song's Collection</option>
                            {/* 
                        {albums.data.filter(artistAlbums => artistAlbums.isSingle != true).map(filteredAlbums => */}
                            {albums.data.map(Albums =>
                            (
                                <>
                                    <option value={Albums._id} key={Albums._id}>{Albums.title}</option>
                                </>
                            ))}
                        </select>


                        <button className="form-button">Submit</button>
                    </form>
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

export default NewSongForm