const express = require('express')
const { getAllAlbums, createAlbum, getAlbum, updateAlbum, deleteAlbum } = require('../controllers/album')
const router = express.Router({mergeParams:true})

const verifyJWT = require('../middleware/verifyJWT')

// Require song router for tracklist
const songRouter = require('./songs')

// Nest Routes
router.use('/:id/songs', songRouter)

router.route('/').get(getAllAlbums).post(verifyJWT, createAlbum).patch(verifyJWT, updateAlbum).delete(verifyJWT, deleteAlbum)
router.route('/:albumId').get(getAlbum)

module.exports = router