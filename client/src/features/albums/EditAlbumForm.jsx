import { useState, useEffect } from 'react'
import { useGetAlbumQuery, useUpdateAlbumMutation, useDeleteAlbumMutation } from './albumApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import './NewAlbumForm.css'

const EditAlbumForm = () => {

    // Get ID from url Params
    const { id } = useParams()

    const navigate = useNavigate()

    // Get auth state values
    const { userID, status } = useAuth()

    // Get album's information
    const {
        data: album,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetAlbumQuery(id, {
        pollingInterval: 30000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })


    // Update collection query
    const [updateAlbum, {
        isLoading: isLoadingEdit,
        isSuccess: isEditSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateAlbumMutation()

    // Delete collection query
    const [deleteAlbum, {
        isLoading: isLoadingDelete,
        isSuccess: isEditDelete,
        isError: isDeleteeError,
        error: deleteError
    }] = useDeleteAlbumMutation()

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [released, setReleased] = useState('')
    const [isSingle, setIsSingle] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    const handleShow = () => {
        if (userID == album.data.artistOwnerID || status === "wiwam") {
            setCanEdit(true)
        }
    }

    // Toggle editing state
    useEffect(() => {
        handleShow()
    }, [])

    const onTitleChanged = e => setTitle(e.target.value)
    const onImageChanged = e => setImage(e.target.value)
    const onReleasedChanged = e => setReleased(e.target.value)
    const onisSingleChanged = e => setIsSingle(prev => !prev)

    useEffect(() => {
        setTitle(album.data.title)
        setImage(album.data.image)
        setReleased(album.data.released)
        setIsSingle(album.data.isSingle)

    }, [])

    const onSubmitAlbumClicked = async (e) => {
        e.preventDefault()
        // ID from params
        updateAlbum({ id, title, image, isSingle, released })
        navigate(`/albums/${id}`)
    }

    const onDeleteAlbumClicked = async () => {
        // ID from params
        await deleteAlbum({ id: id })
        navigate(`/artists/${album.data.artistId}`)
    }

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

                    <button className='delete-button' onClick={onDeleteAlbumClicked}>Delete Collection</button>
                    <h1>Edit Song Collection</h1>
                    <p>If your collection is a single, check the box in the form.</p>
                    <form onSubmit={onSubmitAlbumClicked} className="add-album-form">
                        <span>Collection's Title</span>
                        <input required value={title} type="text" onChange={onTitleChanged} className="add-album-form-input" placeholder="Enter the Album's title" />
                        <span>Collection Art</span>
                        <input value={image} type="text" onChange={onImageChanged} className="add-album-form-input" placeholder="Enter the Album's debut year" />
                        <span>Collection Release Year</span>
                        <input required value={released} type="number" onChange={onReleasedChanged} className="add-album-form-input" placeholder="Enter the collection's release year" />
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


    return (
        <>
            {content}

        </>
    )
}

export default EditAlbumForm