const asyncHandler = require('express-async-handler')
const Artist = require('../models/Artist')
const ErrorHandler = require('../utils/errorResponse');

// @route GET /api/artists
exports.getAllArtists = async (req, res, next) => {
    const artists = await Artist.find()
    res.status(200).json({
        success: true,
        data: artists
    })
}

// @route GET /api/artists/:id
exports.getArtist = asyncHandler(async (req, res, next) => {
    const artist = await Artist.findById(req.params.id)
    if (!artist) {
        return next(new ErrorHandler(`Artist not found with ID of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: artist
})

})

// @route POST /api/artists
exports.createArtist = asyncHandler(async (req, res, next) => {
    const newArtist = await Artist.create(req.body)

    res.status(201).json({
        message: `Artist Created`,
        data: newArtist
    })
})

// @route PATCH /api/artists
exports.updateArtist = asyncHandler(async (req, res) => {
    const { id, name, description, origin, topSong, photo, debut, active } = req.body

    // Confirm artist exists to update
    const artist = await Artist.findById(id).exec()

    if (!artist) {
        return next(new ErrorHandler(`Artist not found with ID of ${id}`, 400));
    }

    // Check for duplicate artist name
    const duplicate = await Artist.findOne({ name }).lean().exec()

    // Allow renaming of the original artist 
    if (duplicate && duplicate?._id.toString() !== id) {
        return next(new ErrorHandler(`Duplicate artist name entered`, 409))
    }

    // Update fields
    artist.name = name
    artist.description = description
    artist.origin = origin
    artist.topSong = topSong
    artist.photo = photo
    artist.debut = debut
    artist.active = active
    
    // Save changes
    const updatedArtist = await artist.save()

    res.json(`'${updatedArtist.name}' updated`)
})

// @route DELETE /api/artists
exports.deleteArtist = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm artist ID is given
    if (!id) {
        return next(new ErrorHandler(`Artist ID not provided`, 400))
    }

    // Confirm artist exists to delete 
    const artist = await Artist.findById(id).exec()

    if (!artist) {
        return next(new ErrorHandler(`Artist not found with ID of ${id}`, 400))
    }

    const result = await artist.remove()

    const reply = `Artist '${result.name}' with ID ${result._id} deleted`

    res.status(200).json({success: true, reply})
})