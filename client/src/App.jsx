import './App.css'
import { Routes, Route } from 'react-router-dom'
import Artists from './features/artists/Artists'
import Public from './components/Public'
import Layout from "./components/Layout"
import NewArtist from './features/artists/NewArtistForm'
import ArtistInfo from './features/artists/ArtistInfo'
import Prefetch from './features/auth/Prefetch'
import AllAlbums from './features/albums/AllAlbums'
import AlbumInfo from './features/albums/AlbumInfo'
import Login from './features/auth/Login'
import PersistLogin from './features/auth/PersistLogin'
import EditArtist from './features/artists/EditArtist'
import Settings from './components/Settings'
import Users from './features/users/Users'
import AdminCheck from './features/auth/AdminCheck'
import ArtistSettings from './features/artists/ArtistSettings'
import SongSettings from './features/songs/SongSettings'
import ReviewsSettings from './features/reviews/ReviewsSettings'
import AlbumSettings from './features/albums/AlbumSettings'
import NewAlbum from './features/albums/NewAlbum'
import NewSong from './features/songs/NewSong'
import AddReview from './features/reviews/AddReview'
import EditAlbum from './features/albums/EditAlbum'
import SongInfo from './features/songs/SongInfo'
import EditReview from './features/reviews/EditReview'
import Review from './features/reviews/Review'
import AddUserForm from './features/users/AddUserForm'
import UserInfo from './features/users/UserInfo'
import EditUser from './features/users/EditUser'
import EditSong from './features/songs/EditSong'
import Register from './features/auth/Register'

function App() {

  return (
    <Routes>
      {/* Parent Layout Component*/}
      <Route path="/" element={<Layout />}>
        {/* Home */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        {/* Data Subscription */}
        <Route element={<Prefetch />}>


          {/* Artist Routes */}
          <Route path='artists'>
            <Route index element={<Artists />} />
            <Route path=':id' element={<ArtistInfo />} />
            {/* Create Album for artist */}
            <Route path=':id/album/new' />
          </Route>
        </Route>

        {/* Album Routes */}
        <Route path='albums'>
          <Route index element={<AllAlbums />} />
          <Route path=':id' element={<AlbumInfo />} />
          <Route path='new' />
        </Route>

        {/* Song Routes */}
        <Route path='songs'>
          <Route path=':id' element={<SongInfo />} />
        </Route>

        {/* Review Routes */}
        <Route path='reviews'>
          <Route path=':id' element={<Review />} />

        </Route>

        {/* Refresh Token */}
        {/* RESTRICTS CONTENT */}
        <Route element={<PersistLogin />}>
          {/* Admin Routes */}
          <Route element={<AdminCheck />}>
            {/* Settings Path */}
            <Route path='settings'>
              <Route index element={<Settings />} />
              {/* Nested Settings */}
              {/* User Settings*/}
              <Route path='users' element={<Users />} />

              {/* Artist Settings */}
              <Route path='artists' element={<ArtistSettings />} />

              {/* Album Settings */}
              <Route path='albums' element={<AlbumSettings />} />

              {/* Song Settings */}
              <Route path='songs' element={<SongSettings />} />

              {/* Review Settings */}
              <Route path='reviews' element={<ReviewsSettings />} />

              {/* END OF SETTINGS */}
            </Route>
          </Route>
          {/* Create Artists */}
          <Route path='/artists/new' element={<NewArtist />} />
          {/* Edit Artists */}
          <Route path='/artists/:id/edit' element={<EditArtist />} />
          {/* Edit Albums */}
          <Route path='/albums/:id/edit' element={<EditAlbum />} />
          {/* New Album For Artist */}
          <Route path='/artists/:id/albums/new' element={<NewAlbum />} />
          {/* New Song for album */}
          <Route path='/artists/:id/songs/new' element={<NewSong />} />
          {/* Create Review For Artist */}
          <Route path='/artists/:id/reviews/new' element={<AddReview />} />
          {/* Edit Review */}
          <Route path='/reviews/:id/edit' element={<EditReview />} />
          {/* Add User */}
          <Route path='/settings/users/new' element={<AddUserForm />} />
          {/* View User */}
          <Route path='/settings/users/:id' element={<UserInfo />} />
          {/* Edit User */}
          <Route path='/settings/users/:id/edit' element={<EditUser />} />
          {/* Edit Song */}
          <Route path='/songs/:id/edit' element={<EditSong />} />
          {/* End of Prefetch */}
        </Route>
      </Route>
    </Routes>
  )
}

export default App
