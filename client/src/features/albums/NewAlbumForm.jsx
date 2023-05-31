import "./NewAlbumForm.css"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import { useGetArtistQuery } from "../artists/artistsApiSlice"
import { useAddNewAlbumMutation } from "./albumApiSlice"

const NewAlbumForm = () => {
    // Get ID from url Params
    const { id } = useParams()

    const navigate = useNavigate()

    // Auth state values
    const { userID, username, status } = useAuth()



    // Fetch collection's artist
    const {
        data: artist,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetArtistQuery(id, {
        pollingInterval: 20000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // Create collection query
    const [addNewAlbum, {
        isLoading: isLoadingNew,
        isSuccess: isSuccessNew,
        isError: isErrorNew,
        error: errorNew
    }] = useAddNewAlbumMutation()

    useEffect(() => {
        handleShow()
    }, [])


    const albumOwner = username
    const albumOwnerID = userID
    const artistOwnerID = artist.data.artistOwnerID



    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [release, setRelease] = useState('')
    const [isSingle, setIsSingle] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    const onTitleChanged = e => setTitle(e.target.value)
    const onImageChanged = e => setImage(e.target.value)
    const onReleaseChanged = e => setRelease(e.target.value)
    const onisSingleChanged = e => setIsSingle(prev => !prev)

    const handleShow = () => {
        if (userID == artist.data.artistOwnerID || status === "wiwam") {
            setCanEdit(true)
        }
    }

    const onCreateAlbumClicked = async (e) => {
        e.preventDefault()
        await addNewAlbum({ title, image, artistId: id, albumOwner: username, albumOwnerID, isSingle, artistOwnerID, released: release })
    }

    // Create collection and navigate to artist's page
    useEffect(() => {
        if (isSuccessNew) {
            setTitle('')
            setImage('')
            setRelease('')
            setIsSingle(false)
            navigate(`/artists/${id}`)
        }
    }, [isSuccessNew, navigate])





    let content

    if (canEdit == false) {
        content = (
            <><p>You are unauthorized to create an album for this artist.</p></>
        )
    }

    if (isSuccess && canEdit) {
        content = (
            <>
                <div className="add-album-wrap">
                    <h1>Create New Song Collection</h1>
                    <p>If your collection is a single, check the box in the form.</p>
                    <form onSubmit={onCreateAlbumClicked} className="add-album-form">
                        <span className="required">Collection's Title</span>
                        <input required value={title} type="text" onChange={onTitleChanged} className="add-album-form-input" placeholder="Enter the Album's title" />
                        <span>Collection Art</span>
                        <input value={image} type="text" onChange={onImageChanged} className="add-album-form-input" placeholder="Enter the Album's debut year" />
                        <span className="required">Collection Release Year</span>
                        <input value={release} type="number" onChange={onReleaseChanged} required className="add-album-form-input" placeholder="Enter the collection's release year" />
                        <span>Is this collection a Single?</span>
                        <div className="add-artist-form-active">
                            <input checked={isSingle} name="active" onChange={onisSingleChanged} type="checkbox" />
                        </div>

                        <button className="form-button">Submit</button>
                    </form>
                </div>

            </>
        )
    }


    return (<>
        <div className="">
            {content}
        </div>
    </>)
}

export default NewAlbumForm