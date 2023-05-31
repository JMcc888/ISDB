import { apiSlice } from "../../app/api/apiSlice"


export const artistsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArtists: builder.query({
            query: () => '/artists',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // Restructure response
            transformResponse: responseData => {
                const loadedArtists = responseData.data.map(artist => {
                    artist.id = artist._id
                    return artist
                });
                return loadedArtists
            },
        }),
        getArtist: builder.query({
            query: (id) => `artists/${id}`,
            validateStatus: (response, result) => {
                // console.log("Query Response:", response)
                return response.status === 200 && !result.isError
            },
        }),
        // Get corresponding albums for the artist
        getArtistAlbums: builder.query({
            query: (id) => `artists/${id}/albums`,
            validateStatus: (response, result) => {
                // console.log("Query Response:", response)
                return response.status === 200 && !result.isError
            },
        }),
        getArtistReviews: builder.query({
            query: (id) => `artists/${id}/reviews`,
            validateStatus: (response, result) => {
                // console.log("Query Response:", response)
                return response.status === 200 && !result.isError
            },
        }),
        // Create Artist
        addNewArtist: builder.mutation({
            query: initialArtist => ({
                url: '/artists',
                method: 'POST',
                body: {
                    ...initialArtist,
                }
            })
        }),
        updateArtist: builder.mutation({
            query: initialArtistData => ({
                url: '/artists',
                method: 'PATCH',
                body: {
                    ...initialArtistData,
                }
            })
        }),
        deleteArtist: builder.mutation({
            query: ({ id }) => ({
                url: `/artists`,
                method: 'DELETE',
                body: { id }
            }),
        })
    })
})

export const {
    useGetArtistsQuery,
    useGetArtistQuery,
    useGetArtistAlbumsQuery,
    useGetArtistReviewsQuery,
    useAddNewArtistMutation,
    useUpdateArtistMutation,
    useDeleteArtistMutation
} = artistsApiSlice