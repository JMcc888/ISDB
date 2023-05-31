import { useGetAlbumsQuery } from './albumApiSlice'
import AlbumsSettingsTable from './AlbumsSettingsTable'

const AlbumSettings = () => {
    // Fetch all albums
    const {
        data: albums,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAlbumsQuery(null, {
        setPollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) {
        content = (<p>Loading...</p>)
    }

    if (isError) {
        content = (<p className="errmsg">{error?.data?.message}</p>)
    }

    if (isSuccess) {
        content = (
            <AlbumsSettingsTable props={albums.data} />
        )

    }
    return (
        <>
            <h1>Manage Collections</h1>
            {content}
        </>
    )
}

export default AlbumSettings