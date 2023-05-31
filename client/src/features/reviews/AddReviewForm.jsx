import { useParams, useNavigate } from "react-router-dom"
import { useAddNewReviewMutation } from "./reviewsApiSlice"
import useAuth from "../../hooks/useAuth"
import { useState, useEffect } from "react"
import './AddReviewForm.css'

const AddReviewForm = () => {

    // Get ID from url Params
    const { id } = useParams()

    const navigate = useNavigate()

    // Get auth state values
    const { username, userID } = useAuth()

    const userId = userID

    // Create review query
    const [addNewReview, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewReviewMutation()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const onTitleChanged = e => setTitle(e.target.value)
    const onBodyChanged = e => setBody(e.target.value)

    const onSubmitReview = async (e) => {
        e.preventDefault()
        await addNewReview({ title, body, artistId: id, username, userId })
    }

    useEffect(() => {
        if (isSuccess) {
            setTitle(''),
                setBody(''),
                navigate(`/artists/${id}`)
        }
    }, [isSuccess, navigate])

    return (
        <>
            <div className="review-form-wrapper">
                <h1 className="add-review-title">Add Review</h1>
                <p>Leave a comment regarding your thoughts on this artist.</p>
                <form onSubmit={onSubmitReview} className="add-review-form" action="">
                    <span className="required">Title</span>
                    <input value={title} placeholder="Title your review" className="add-review-form-input" onChange={onTitleChanged} type="text" />
                    <span className="required">Body</span>
                    <textarea value={body} placeholder="Leave a comment about this artist" onChange={onBodyChanged} type="text" />
                    <button className="form-button">Submit Review</button>
                </form>
            </div>

        </>
    )
}

export default AddReviewForm