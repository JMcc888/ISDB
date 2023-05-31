import { useGetArtistQuery, useUpdateArtistMutation, useDeleteArtistMutation } from './artistsApiSlice'
import { useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { useNavigate, useParams } from "react-router-dom"
const EditArtistForm = () => {

    // Get ID from url Params
    const { id } = useParams()

    const navigate = useNavigate()

    // Fetch artist data
    const {
        data: artist,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetArtistQuery(id, {
        setPollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // Update artist query
    const [updateArtist, {
        isLoading: isLoadingEdit,
        isSuccess: isEditSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateArtistMutation()

    // Delete artist query
    const [deleteArtist, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteArtistMutation()

    // Get auth values from state
    const { userID, status } = useAuth()

    useEffect(() => {
        handleShow()
    }, [])

    useEffect(() => {
        if (isEditSuccess) {
            navigate(`/artists/${id}`)
        }
    }, [])

    const [name, setArtistName] = useState('')
    const [topSong, setTopSong] = useState('')
    const [debut, setDebut] = useState('')
    const [photo, setPhoto] = useState('')
    const [origin, setOrigin] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    const [spotifyLink, setSpotifyLink] = useState('')
    const [appleMusicLink, setAppleMusicLink] = useState('')
    const [active, setActive] = useState(false)
    const [description, setDescription] = useState('')
    const [canEdit, setCanEdit] = useState(false)
    const [t, setT] = useState()

    const onArtistNameChanged = e => setArtistName(e.target.value)
    const onPhotoChanged = e => setPhoto(e.target.value)
    const onOriginChanged = e => setOrigin(e.target.value)
    const onYoutubeLinkChanged = e => setYoutubeLink(e.target.value)
    const onSpotifyLinkChanged = e => setSpotifyLink(e.target.value)
    const onAppleMusicChanged = e => setAppleMusicLink(e.target.value)
    const onActiveChanged = e => setActive(prev => !prev)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onDebutChanged = e => setDebut(e.target.value)
    const onTopSongChanged = e => setTopSong(e.target.value)

    useEffect(() => {
        setArtistName(artist.data.name)
        setDebut(artist.data.debut)
        setPhoto(artist.data.photo)
        setOrigin(artist.data.origin)
        setTopSong(artist.data.topSong)
        setYoutubeLink(artist.data.youtubeLink)
        setSpotifyLink(artist.data.spotifyLink)
        setAppleMusicLink(artist.data.appleMusicLink)
        setActive(artist.data.active)
        setDescription(artist.data.description)
    }, [])

    const onSaveArtistClicked = async (e) => {
        e.preventDefault()
        // ID from params
        updateArtist({ id: id, name, photo, topSong, debut, origin, youtubeLink, spotifyLink, appleMusicLink, active, description })
        navigate(`/artists/${id}`)
    }

    const onDeleteArtistClicked = async () => {
        // ID from params
        await deleteArtist({ id: id })
        navigate(`/artists`)
    }

    let content

    if (isLoading) content = (<p>Loading...</p>)

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    // Restrict edits and deletion to owner or admin
    const handleShow = () => {
        if (userID == artist.data.artistOwnerID || status === "wiwam") {
            setCanEdit(true)
        }
    }

    if (canEdit == false) {
        content = (
            <><p>You are unauthorized to modify this resource</p></>
        )
    }

    if (isUpdateError) {
        console.log(isUpdateError)
        console.log(updateError)
    }

    if (isSuccess && canEdit == true) {
        content = (
            <>
                <div className="add-artist-form-wrap">

                    <button className='delete-button' onClick={onDeleteArtistClicked}>Delete Artist</button>
                    <form onSubmit={onSaveArtistClicked} className="add-artist-form">
                        <span className="required">Artist's Name</span>
                        <input required value={name} type="text" onChange={onArtistNameChanged} className="add-artist-form-input" placeholder="Enter the Artist's name" />
                        <span className="required">Artist's Debut</span>
                        <input required value={debut} type="text" onChange={onDebutChanged} className="add-artist-form-input" placeholder="Enter the Artist's debut year" />
                        <span>Photo</span>
                        <input value={photo} type="text" onChange={onPhotoChanged} className="add-artist-form-input" placeholder="Submit a link to a photo of the artist" />
                        <span className="required">Origin</span>
                        <input required value={origin} type="text" onChange={onOriginChanged} className="add-artist-form-input" placeholder="Where's the artist's home?" />
                        <span className="required">Top Song</span>
                        <input required value={topSong} type="text" onChange={onTopSongChanged} className="add-artist-form-input" placeholder="Enter the Artist's #1 Song" />
                        <span>Youtube Link</span>
                        <input value={youtubeLink} type="text" onChange={onYoutubeLinkChanged} className="add-artist-form-input" placeholder="Sumbit a link to the artist's Youtube page" />
                        <span>Spotify Link</span>
                        <input value={spotifyLink} type="text" onChange={onSpotifyLinkChanged} className="add-artist-form-input" placeholder="Submit a link to the artist's Spotify page" />
                        <span>Apple Music Link</span>
                        <input value={appleMusicLink} type="text" onChange={onAppleMusicChanged} className="add-artist-form-input" placeholder="Submit a link to the artist's Apple Music page" />
                        <span className="required">Is this artist/group still active?</span>
                        <div className="add-artist-form-active">
                            <input checked={active} name="active" onChange={onActiveChanged} type="checkbox" />
                        </div>

                        <span required className="required">Description</span>
                        <textarea value={description} onChange={onDescriptionChanged} placeholder="Give a breif description about the artist"></textarea>

                        <button className="form-button">Submit</button>
                    </form>
                </div>
            </>
        )
    }
    return (
        <div>{content}</div>
    )
}

export default EditArtistForm