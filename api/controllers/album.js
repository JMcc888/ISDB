const Album = require('../models/Album')
const Artist = require('../models/Artist')
const asyncHandler = require('express-async-handler')
const ErrorHandler = require('../utils/errorResponse');

// @route GET /api/albums
exports.getAllAlbums = asyncHandler(async (req, res) => {
    // Check if Album ID was passed
    if (req.params.id) {
        const artistAlbums = await Album.find({artistId: req.params.id})
        // Return all collections associated with the artist ID
        return res.status(200).json({
            success: true,
            count: artistAlbums.length,
            data: artistAlbums
        })} 
        // Return all collections
        else {
    const albums = await Album.find()
    res.status(200).json({
        success: true,
        data: albums
    })}
})

// @route GET /api/albums/:id
exports.getAlbum = asyncHandler(async (req, res, next) => {
    const album = await Album.findById(req.params.albumId)
    if (!album) {
        return next(new ErrorHandler(`Collection not found with ID of ${req.params.albumId}`, 404));
    }
    res.status(200).json({
        success: true,
        data: album
    })
})

// @route POST /api/albums
exports.createAlbum = asyncHandler(async (req, res, next) => {
    // Ensure there's an existing artist ID submitted
    const artistExists = Artist.findById(req.body.artistId)
    if (!artistExists) {
        return next(new ErrorHandler(`Artist not found with ID of ${req.params.artistId}`, 404));
    }
    const newAlbum = await Album.create(req.body)

    res.status(201).json({
        success: true,
        message: `Collection: ${req.body.title} created`,
        data: newAlbum
    })
})

exports.updateAlbum = asyncHandler(async(req, res) => {
    const { id, title, image, isSingle, released, } = req.body

    const album = await Album.findById(id).exec()

    if (!album) {
        return next(new ErrorHandler(`Collection not found with ID of ${id}`, 400));
    }

    // Update fields
    album.title = title
    album.image = image
    album.isSingle = isSingle
    album.released = released

    // Save changes
    const updatedAlbum = await album.save()

    res.json(`'${updatedAlbum.title}' updated`)

})

exports.deleteAlbum = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm album ID is given
    if (!id) {
        return next(new ErrorHandler(`Collection ID required`, 400));
    }

    // Confirm album exists to delete 
    const album = await Album.findById(id).exec()

    if (!album) {
        return next(new ErrorHandler(`Collection not found with ID of ${id}`, 400));
    }

    const result = await album.remove()

    const reply = `Collection '${result.title}' with ID ${result._id} has been deleted`

    res.status(200).json({success: true, reply})
})