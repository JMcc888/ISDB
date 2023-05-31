import { apiSlice } from "../../app/api/apiSlice"

export const albumsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAlbums: builder.query({
            query: () => '/albums',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        getAlbum: builder.query({
            query: (id) => `albums/${id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },

        }),
        getAlbumSongs: builder.query({
            query: (id) => `albums/${id}/songs`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        addNewAlbum: builder.mutation({
            query: initialAlbum => ({
                url: '/albums',
                method: 'POST',
                body: {
                    ...initialAlbum,
                }
            })
        }),
        updateAlbum: builder.mutation({
            query: initialAlbumData => ({
                url: '/albums',
                method: 'PATCH',
                body: {
                    ...initialAlbumData,
                }
            })
        }),
        deleteAlbum: builder.mutation({
            query: ({ id }) => ({
                url: `/albums`,
                method: 'DELETE',
                body: { id }
            }),
        })
    })

    })


export const {
    useGetAlbumsQuery,
    useGetAlbumQuery,
    useGetAlbumSongsQuery,
    useAddNewAlbumMutation,
    useUpdateAlbumMutation,
    useDeleteAlbumMutation
} = albumsApiSlice