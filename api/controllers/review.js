const asyncHandler = require('express-async-handler')
const Review = require('../models/Review')
const ErrorHandler = require('../utils/errorResponse');

// @route GET /api/reviews
exports.getReviews = asyncHandler(async (req, res) => {
    // Check for passed Artist ID
    if (req.params.id) {
        // Return all reviews associated with the artist
        const artistReviews = await Review.find({artistId: req.params.id})
        return res.status(200).json({
            success: true,
            count: artistReviews.length,
            data: artistReviews
        })} 
        // Return All Reviews Otherwise
        else {
    const reviews = await Review.find()
    res.status(200).json({
        success: true,
        data: reviews
    })}
})

// @route POST /api/reviews
exports.createReview = asyncHandler(async (req, res) => {
    const review = await Review.create(req.body)
    res.status(201).json({
        success: true,
        data: review
    })
})

// @route GET /api/reviews/:id
exports.getReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)
    if (!review) {
        return next(new ErrorHandler(`Review not found with ID of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: review
    })
})

// @route PATCH /api/reviews
exports.updateReview = asyncHandler(async(req, res) => {
    const { id, title, body, } = req.body

    const review = await Review.findById(id).exec()

    if (!review) {
        return next(new ErrorHandler(`Review not found with ID of ${id}`, 400));
    }

    // Update fields
    review.title = title
    review.body = body

    // Save changes
    const updatedReview = await review.save()

    res.json(`'${updatedReview.title}' updated`)

})

// @route DELETE /api/reviews
exports.deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm review ID is given
    if (!id) {
        return next(new ErrorHandler(`Review ID required`, 400));
    }

    // Confirm review exists to delete 
    const review = await Review.findById(id).exec()

    if (!review) {
        return next(new ErrorHandler(`Review not found with ID of ${id}`, 400));
    }

    const result = await review.deleteOne()

    const reply = `Review '${result.name}' with ID ${result._id} deleted`

    res.status(200).json({success: true, reply})
})