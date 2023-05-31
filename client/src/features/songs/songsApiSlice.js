import { apiSlice } from "../../app/api/apiSlice"

export const songsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSongs: builder.query({
            query: () => '/songs',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        getSong: builder.query({
            query: (id) => `songs/${id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },

        }),
        getSongSongs: builder.query({
            query: (id) => `songs/${id}/songs`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
        addNewSong: builder.mutation({
            query: initialSong => ({
                url: '/songs',
                method: 'POST',
                body: {
                    ...initialSong,
                }
            })
        }),
        updateSong: builder.mutation({
            query: initialSongData => ({
                url: '/songs',
                method: 'PATCH',
                body: {
                    ...initialSongData,
                }
            })
        }),
        deleteSong: builder.mutation({
            query: ({ id }) => ({
                url: `/songs`,
                method: 'DELETE',
                body: { id }
            }),
        })
    })

    })


export const {
    useGetSongsQuery,
    useGetSongQuery,
    useGetSongSongsQuery,
    useAddNewSongMutation,
    useUpdateSongMutation,
    useDeleteSongMutation
} = songsApiSlice