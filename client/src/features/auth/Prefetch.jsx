import { store } from '../../app/store'
import { artistsApiSlice } from '../artists/artistsApiSlice';
import { albumsApiSlice } from '../albums/albumApiSlice';
import { songsApiSlice } from '../songs/songsApiSlice';
import { reviewsApiSlice } from '../reviews/reviewsApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        // console.log('Now subscribing')
        const artists = store.dispatch(artistsApiSlice.endpoints.getArtists.initiate())
        const albums = store.dispatch(albumsApiSlice.endpoints.getAlbums.initiate())
        const songs = store.dispatch(songsApiSlice.endpoints.getSongs.initiate())
        const reviews = store.dispatch(reviewsApiSlice.endpoints.getReviews.initiate())

        return () => {
            // console.log('Unsubscribing')
            artists.unsubscribe()
            albums.unsubscribe()
            songs.unsubscribe()
            reviews.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch