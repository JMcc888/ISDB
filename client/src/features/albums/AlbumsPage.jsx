import { useGetAlbumsQuery } from "./albumApiSlice"
import { Link } from "react-router-dom"
import "./AllAlbums.css"

const AlbumsPage = ({ data }) => {
    // Fetch albums from API
    const {
        data: albums,
        isLoading,
        isSuccess,
        isError,
        error

    } = useGetAlbumsQuery(null, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        content = (
            <>
                {/* Wrapper */}

                {/* Albums */}
                <div className="collections-albums-header-wrap">
                    <div className="collections-albums-header">
                        <h1>Collections</h1>
                        <p>Music can take many shapes, in some cases artists release their works as a single then later as an album track, or some may go neither way. Regardless, we honor the artist's creative prospects by including both single and album releases to ensure that as much of their work is honored as possible.</p>
                        <h2>Albums</h2>
                    </div>
                </div>


                <div className="wrap-test">
                    {albums.data.filter(album => album.isSingle != true).map((album) => {
                        return (
                            <>
                                <Link to={`/albums/${album._id}`}>
                                    <div className='albums-list-item' key={album._id}>
                                        <img className='albums-list-photo' src={`${album.image}`} alt="" />
                                        <p>{album.title}</p>
                                    </div>
                                </Link>
                            </>
                        )
                    })}
                </div>


                <div className="singles-wrap">
                    <h2>Singles</h2>
                    <div className='collections-singles'>
                        {albums.data.filter(album => album.isSingle == true).map((album) => {
                            return (
                                <>
                                    <Link to={`/albums/${album._id}`}>
                                        <div className='albums-list-item' key={album._id}>
                                            <img className='albums-list-photo' src={`${album.image}`} alt="" />
                                            <p>{album.title}</p>
                                        </div>
                                    </Link>
                                </>
                            )
                        })}
                    </div>

                </div>


            </>)
    }
    return (
        <>
            {content}
        </>

    )
}

export default AlbumsPage