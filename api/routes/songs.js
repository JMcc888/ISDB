const express = require('express')
const router = express.Router({mergeParams: true})

const { getAllSongs, createSong, updateSong, deleteSong, getSong } = require('../controllers/songs')

const verifyJWT = require('../middleware/verifyJWT')

router.route('/').get(getAllSongs).post(verifyJWT, createSong).patch(verifyJWT, updateSong).delete(verifyJWT, deleteSong)
router.route('/:id').get(getSong)

module.exports = router