const express = require('express')
const router = express.Router()

const { getAllArtists, createArtist, getArtist, updateArtist, deleteArtist} = require('../controllers/artists')

const verifyJWT = require('../middleware/verifyJWT')

// Require album router for nesting
const albumRouter = require('./albums')
const reviewRouter = require('./review')

// Nest albums under artists
router.use('/:id/albums', albumRouter)
router.use('/:id/reviews', reviewRouter)

router.route('/').get(getAllArtists).post(verifyJWT, createArtist).patch(verifyJWT, updateArtist).delete(verifyJWT, deleteArtist)
router.route('/:id').get(getArtist)

module.exports = router