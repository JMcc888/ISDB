import { useGetArtistReviewsQuery } from "../artists/artistsApiSlice"
import { useParams, Link } from "react-router-dom"
import "./ReviewList.css"
import useAuth from "../../hooks/useAuth"

const ReviewsList = () => {

    // Get ID from url Params
    const { id } = useParams()

    // Get auth state values
    const { userID, status } = useAuth()

    // Get reviews associated with artist
    const {
        data: reviews,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetArtistReviewsQuery(id, {
        pollingInterval: 20000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess && !reviews.data.length) {
        content = (
            ''
        )
    }

    if (isSuccess) {
        const created = new Date(reviews.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        content = (
            <>
                <h5>Artist Reviews</h5>

                {reviews.data.map((review) => {
                    return (
                        <>
                            <div key={review._id} className="review-card">
                                <p className="review-title">{review.title}</p>
                                <p className="review-owner">Posted By: {review.username}</p>
                                {userID == review.userId || status == "wiwam"
                                    ? (<>
                                        <Link to={`/reviews/${review._id}/edit`}>
                                            <button className="edit-review-button">Edit Review</button>
                                        </Link>
                                    </>)
                                    : ''}
                                <p>Submitted: {new Date(review.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })}</p>
                                <p>{review.body}</p>

                            </div>
                        </>
                    )

                })}
            </>
        )
    }
    return (
        <>
            {content}
        </>
    )
}

export default ReviewsList