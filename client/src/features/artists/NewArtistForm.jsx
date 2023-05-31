import "./NewArtistForm.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewArtistMutation } from "./artistsApiSlice"
import useAuth from "../../hooks/useAuth"

const NewArtistForm = () => {

    // Save artist query
    const [addNewArtist, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewArtistMutation()

    const navigate = useNavigate()

    // Get auth values from state
    const { userID, username } = useAuth()

    const artistOwner = username
    const artistOwnerID = userID

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


    const onCreateArtistClicked = async (e) => {
        e.preventDefault()
        await addNewArtist({ name, photo, topSong, debut, origin, youtubeLink, spotifyLink, appleMusicLink, active, description, artistOwner, artistOwnerID })
    }

    useEffect(() => {
        if (isSuccess) {
            setArtistName(''),
                setPhoto(''),
                setOrigin(''),
                setYoutubeLink(''),
                setSpotifyLink(''),
                setAppleMusicLink(''),
                setActive(false),
                setDescription('')
            navigate('/artists')
        }
    }, [isSuccess, navigate])

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


    return (
        <>
            <div className="add-artist-form-wrap">
                <h1>Submit Artist</h1>

                <form onSubmit={onCreateArtistClicked} className="add-artist-form">
                    <span className="required">Artist's Name</span>
                    <input required value={name} type="text" onChange={onArtistNameChanged} className="add-artist-form-input" placeholder="Enter the Artist's name" />
                    <span className="required">Artist's Debut</span>
                    <input value={debut} type="text" onChange={onDebutChanged} className="add-artist-form-input" placeholder="Enter the Artist's debut year" />
                    <span className="required">Photo</span>
                    <input value={photo} type="text" onChange={onPhotoChanged} className="add-artist-form-input" placeholder="Submit a link to a photo of the artist" />
                    <span className="required">Origin</span>
                    <input value={origin} type="text" onChange={onOriginChanged} className="add-artist-form-input" placeholder="Where's the artist's home?" />
                    <span className="required">Top Song</span>
                    <input value={topSong} type="text" onChange={onTopSongChanged} className="add-artist-form-input" placeholder="Enter the Artist's #1 Song" />
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

                    <span className="required">Description</span>
                    <textarea value={description} onChange={onDescriptionChanged} placeholder="Give a breif description about the artist"></textarea>

                    <button className="form-button">Submit</button>
                </form>
            </div>
        </>
    )

}


export default NewArtistForm