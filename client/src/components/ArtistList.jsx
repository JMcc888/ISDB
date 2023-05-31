import './ArtistList.css'
import { Link } from 'react-router-dom'

const ArtistList = ({ artist }) => {
    return (
        <div className='artist-list-wrap'>
            {artist.map((artist) => {
                return (
                    <>
                        <Link to={`/artists/${artist._id}`} key={artist._id}>
                            <div className='artist-list-item' >
                                <img className='artist-list-photo' src={`${artist.photo}`} alt="" />
                                <p>{artist.name}</p>
                                <p>Debut: {artist.debut}</p>
                                <p>Origin: {artist.origin}</p>
                            </div>
                        </Link>
                    </>
                )
            })}
        </div>
    )
}

export default ArtistList