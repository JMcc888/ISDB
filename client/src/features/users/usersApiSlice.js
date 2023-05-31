import { apiSlice } from "../../app/api/apiSlice"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            }
        }),
        getUser: builder.query({
            query: (id) => `users/${id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },

        }),
        addNewUser: builder.mutation({
            query: initialUser => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUser,
                }
            })
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            })
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id }
            }),
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApiSlice