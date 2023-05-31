import { apiSlice } from "../../app/api/apiSlice"

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query({
            query: () => '/reviews',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        getReview: builder.query({
            query: (id) => `reviews/${id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },

        }),
        getReviewSongs: builder.query({
            query: (id) => `reviews/${id}/songs`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        addNewReview: builder.mutation({
            query: initialReview => ({
                url: '/reviews',
                method: 'POST',
                body: {
                    ...initialReview,
                }
            })
        }),
        updateReview: builder.mutation({
            query: initialReviewData => ({
                url: '/reviews',
                method: 'PATCH',
                body: {
                    ...initialReviewData,
                }
            })
        }),
        deleteReview: builder.mutation({
            query: ({ id }) => ({
                url: `/reviews`,
                method: 'DELETE',
                body: { id }
            }),
        })
    })

    })


export const {
    useGetReviewsQuery,
    useGetReviewQuery,
    useGetReviewSongsQuery,
    useAddNewReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation
} = reviewsApiSlice