import React from 'react'
import { useState, useEffect } from 'react'
import { useGetSongQuery, useUpdateSongMutation, useDeleteSongMutation } from './songsApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetArtistAlbumsQuery } from '../artists/artistsApiSlice'

const EditSongForm = () => {
    // Get ID from url Params
    const { id } = useParams()

    const navigate = useNavigate()

    // Get song information
    const {
        data: song,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetSongQuery(id, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // Update song query
    const [updateSong, {
        isLoading: isLoadingEdit,
        isSuccess: isEditSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateSongMutation()

    // Delete song query
    const [deleteSong, {
        isLoading: isLoadingDelete,
        isSuccess: isEditDelete,
        isError: isDeleteeError,
        error: deleteError
    }] = useDeleteSongMutation()

    // Get artist's music collections
    const {
        data: albums,
        isLoading: isLoadingAlbums,
        isSuccess: isEditAlbums,
        isError: isAlbumseError,
        error: albumsError

    } = useGetArtistAlbumsQuery(song?.data?.artistId, {
        pollingInterval: 30000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

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

    const onSubmitEdit = async (e) => {
        e.preventDefault()
        updateSong({ id: id, title, songLine, billboardPeak, youtubeLink, spotifyLink, appleMusicLink, recorded, albumId: collection })
        navigate(`/songs/${id}`)
    }

    const onDeleteSongClicked = async () => {
        // ID grabbed from useParams
        await deleteSong({ id: id })
        navigate(`/artists/${song?.data?.artistId}`)
    }


    useEffect(() => {
        setTitle(song?.data?.title)
        setSongLine(song?.data?.songLine)
        setBillboardPeak(song?.data?.billboardPeak)
        setYoutubeLink(song?.data?.youtubeLink)
        setSpotifyLink(song?.data?.spotifyLink)
        setAppleMusicLink(song?.data?.appleMusicLink)
        setRecorded(song?.data?.recorded)
        setCollection(song?.data?.albumId)
    }, [isSuccess])

    let content

    if (isSuccess) {
        content = (
            <>
                <div className="song-form-wrap">

                    <h1>Edit Song</h1>
                    <button className='delete-button' onClick={onDeleteSongClicked}>Delete Song</button>
                    <form onSubmit={onSubmitEdit} className="add-album-form">
                        <span>Song's Title</span>
                        <input value={title} type="text" onChange={onTitleChanged} className="add-album-form-input" placeholder="Enter the Album's title" />
                        <span>Notable Line</span>
                        <input type="text" onChange={onSongLineChanged} value={songLine} className="add-album-form-input" placeholder="Enter a recognizable line from the song (ex: refrain)" />
                        <span>Billboard Peak</span>
                        <input type="number" className="add-album-form-input" placeholder="Enter the song's peak billboard position (if available)" onChange={onBillboardPeakChanged} value={billboardPeak} />
                        <span>Recorded</span>
                        <input type="number" className="add-album-form-input" placeholder="Enter the song's recording year" onChange={onRecordedChanged} value={recorded} />
                        <span>Youtube Link</span>
                        <input value={youtubeLink} type="text" onChange={onYoutubeLinkChanged} className="add-artist-form-input" placeholder="Sumbit a link to the song's Youtube page" />
                        <span>Spotify Link</span>
                        <input value={spotifyLink} type="text" onChange={onSpotifyLinkChanged} className="add-artist-form-input" placeholder="Submit a link to the song's Spotify page" />
                        <span>Apple Music Link</span>
                        <input value={appleMusicLink} type="text" onChange={onAppleMusicLinkChanged} className="add-artist-form-input" placeholder="Submit a link to the song's Apple Music page" />
                        <span>Collection</span>
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

export default EditSongForm