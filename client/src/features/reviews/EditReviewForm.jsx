import { useState, useEffect } from 'react'
import { useGetReviewQuery, useUpdateReviewMutation, useDeleteReviewMutation } from './reviewsApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const EditReviewForm = () => {

    // Get ID from url Params
    const { id } = useParams()

    const navigate = useNavigate()

    // Get auth state values
    const { userID, status } = useAuth()

    // Get review data
    const {
        data: review,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetReviewQuery(id, {
        pollingInterval: 3000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // Update review query
    const [updateReview, {
        isLoading: isLoadingEdit,
        isSuccess: isEditSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateReviewMutation()

    // Delete review query
    const [deleteReview, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteReviewMutation()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [canEdit, setCanEdit] = useState(false)


    const handleShow = () => {
        if (userID == review?.data?.userId || status === "wiwam") {
            setCanEdit(true)
        }
    }

    useEffect(() => {
        handleShow()
    }, [isSuccess])


    const onTitleChanged = e => setTitle(e.target.value)
    const onBodyChanged = e => setBody(e.target.value)

    useEffect(() => {
        setTitle(review?.data?.title)
        setBody(review?.data?.body)

    }, [isSuccess])


    const onSubmitReview = async (e) => {
        e.preventDefault()
        updateReview({ id: id, title, body })
        navigate(`/artists/${review?.data?.artistId}`)
    }

    const onDeleteReviewClicked = async () => {
        // ID grabbed from useParams
        await deleteReview({ id: id })
        navigate(`/artists/${review?.data?.artistId}`)
    }

    let content

    if (canEdit == false) {
        content = (
            <><p>You are unauthorized to create an review for this artist.</p></>
        )
    }

    if (isSuccess && canEdit) {
        content = (<>
            <div className="review-form-wrapper">
                <button className='delete-button' onClick={onDeleteReviewClicked}>Delete Review</button>

                <form onSubmit={onSubmitReview} className="add-review-form" action="">
                    <span>Title</span>
                    <input value={title} placeholder="Title your review" className="add-review-form-input" onChange={onTitleChanged} type="text" />
                    <span>Body</span>
                    <textarea value={body} placeholder="Leave a comment about this artist" onChange={onBodyChanged} type="text" />
                    <button className="form-button">Submit Changes</button>
                </form>
            </div>

        </>)
    }


    return (
        <>
            {content}
        </>
    )
}

export default EditReviewForm