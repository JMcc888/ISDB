import UsersTable from "./UsersTable"
import { useGetUsersQuery } from "./usersApiSlice"
import { Link } from "react-router-dom"

const Users = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetUsersQuery(null, {
        pollingInterval: 40000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    // console.log(users)
    let content

    if (isSuccess) {
        content = (
            <>
                <UsersTable props={users.data} />
            </>
        )
    }


    return (
        <>

            <h1>Manage Current Users</h1>
            <Link to={'new'}>
                <button>Add User</button>
            </Link>

            {content}
        </>
    )
}

export default Users