import { useGetArtistsQuery } from "./artistsApiSlice"
import ArtistList from "../../components/ArtistList"
import { Link } from "react-router-dom"
import "./Artists.css"
import useAuth from "../../hooks/useAuth"

const Artists = () => {
    const { userID, username } = useAuth()

    const {
        data: artists,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetArtistsQuery(null, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // console.log("Response: ", artists)

    // console.log(artists.isArray())

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        content = (
            <>
                <div className="data-wrap">
                    {/* <p>Fetched Successfully. Now MAP!</p> */}
                    <div className="data-wrap-heading">
                        <p className="data-wrap-artist-count">Currently serving info from {artists.length} artists.</p>
                        {username ? (<><p>Someone missing? Feel free to contribute.</p>
                            <Link to={'/artists/new'}>
                                <button className="new-artist-button">Create Artist</button>
                            </Link></>) : (<><p>Someone missing? Create an account to add an artist.</p>
                                <Link to={'/register'}>
                                    <button className="new-artist-button">Register</button>
                                </Link>
                                <p>Already have an account?</p>
                                <Link to={"/login"}><p>Login</p></Link></>)}

                    </div>

                    {/* <p>{artists[0].name}</p>
                <p>{artists[2].name}</p>
                <p>{artists[4].name}</p> */}
                    <ArtistList artist={artists} key={artists._id} />
                </div>

            </>
        )

    }
    return content
}

export default Artists