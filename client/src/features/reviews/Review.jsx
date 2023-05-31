import { useNavigate, useParams } from 'react-router-dom'
import { useGetReviewQuery } from './reviewsApiSlice'
import { useState, useEffect } from 'react'


const Review = () => {
    // Get ID from url Params
    const { id } = useParams()

    const navigate = useNavigate()

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

    let content

    if (isLoading) content = (<p>Loading...</p>)

    if (isError) {
        content = <p>Error</p>
    }


    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const onTitleChanged = e => setTitle(e.target.value)
    const onBodyChanged = e => setBody(e.target.value)

    useEffect(() => {
        setTitle(review?.data?.title)
        setBody(review?.data?.body)

    }, [isSuccess])


    if (isSuccess) {
        content = (<>
            <form className="add-review-form" action="">
                <span>Title</span>
                <input disabled value={title} placeholder="Title your review" className="add-review-form-input" onChange={onTitleChanged} type="text" />
                <span>Body</span>
                <textarea disabled value={body} placeholder="Leave a comment about this artist" onChange={onBodyChanged} type="text" />
            </form>

        </>)
    }
    return (
        <>
            {content}
        </>
    )
}

export default Review