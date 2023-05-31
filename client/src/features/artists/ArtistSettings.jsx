import ArtistTable from "./ArtistTable"
import { useGetArtistsQuery } from "./artistsApiSlice"
import { Link } from "react-router-dom"

const ArtistSettings = () => {
    // Fetch artists
    const {
        data: artists,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetArtistsQuery(null, {
        pollingInterval: 5000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isSuccess) {
        content = (
            <>
                <Link to={`/artists/new`}>
                    <button>Add Artist</button>
                </Link>

                <ArtistTable props={artists} />
            </>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default ArtistSettings