const Song = require('../models/Song')
const Album = require('../models/Album')
const asyncHandler = require('express-async-handler')
const ErrorHandler = require('../utils/errorResponse');

// @route GET /api/songs
exports.getAllSongs = asyncHandler(async (req,res,next) => {
    // Check if Album ID was passed
    if (req.params.id) {
        // Return tracks for that album
        const tracklist = await Song.find({albumId: req.params.id})
        return res.status(200).json({
            success: true,
            count: `${tracklist.length} Tracks Found: `,
            data: tracklist
        })} 
        // Return All Songs Otherwise
        else {
    const songs = await Song.find()
    res.status(200).json({
        success: true,
        data: songs
    })}
})

// @route GET /api/songs/:id
exports.getSong = asyncHandler(async (req, res, next) => {
    const song = await Song.findById(req.params.id)
    if (!song) {
        return next(new ErrorHandler(`Song not found with ID of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: song
    })
})

// @route POST /api/songs
exports.createSong = asyncHandler(async (req, res, next) => {
    const newSong = await Song.create(req.body)
    res.status(201).json({
        success: true,
        message: `Song: ${newSong.title} Created `,
        data: newSong
    })
})

// @route PATCH /api/songs
exports.updateSong = asyncHandler(async(req, res) => {
    const { id, title, songLine, billboardPeak, recorded, youtubeLink, spotifyLink, appleMusicLink, albumId } = req.body

    // Confirm song ID is given
    const song = await Song.findById(id).exec()

    if (!song) {
        return next(new ErrorHandler(`Song not found with ID of ${id}`, 400));
    }

    // Update fields
    song.title = title
    song.songLine = songLine
    song.billboardPeak = billboardPeak
    song.recorded = recorded
    song.youtubeLink = youtubeLink
    song.spotifyLink = spotifyLink
    song.appleMusicLink = appleMusicLink
    song.albumId = albumId

    // Save changes
    const updatedSong = await song.save()

    res.json(`'${updatedSong.title}' updated`)

})

// @route DELETE /api/songs
exports.deleteSong = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm song ID is given
    if (!id) {
        return next(new ErrorHandler(`Song ID required`, 400));
    }

    // Confirm song exists to delete 
    const song = await Song.findById(id).exec()

    if (!song) {
        return next(new ErrorHandler(`Song not found with ID of ${id}`, 400));
    }

    const result = await song.deleteOne()

    const reply = `Song '${result.title}' with ID ${result._id} deleted`

    res.status(200).json({success: true, reply})
})