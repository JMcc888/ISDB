import { useParams, Link } from "react-router-dom"
import { useGetAlbumSongsQuery } from "./albumApiSlice"

const AlbumSongs = () => {
    // Get ID from url Params
    const { id } = useParams()

    // Fetch songs associated with collection
    const {
        data: songs,
        isLoading: songIsLoading,
        isSuccess: songIsSuccess,
        isError: songIsError,
        error: songError
    } = useGetAlbumSongsQuery(id, {
        setPollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (songIsLoading) {

    }

    if (songIsError) {
        content = (<p className="errmsg">{songError?.data?.message}</p>)
    }

    if (songIsSuccess) {
        content = (
            <>
                <h4>{songs.count}</h4>
                <div className="">
                    {songs.data.map((song) => {
                        return (
                            <>
                                <Link to={`/songs/${song._id}`}>
                                    <div className="album-song-info" key={song._id}>
                                        <p>{song.title}</p>
                                    </div>
                                </Link>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
    return (
        <div>{content}</div>
    )
}

export default AlbumSongs