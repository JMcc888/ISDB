const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    // Review owner
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    // Associate review to an artist
    artistId: {
        type: mongoose.Schema.ObjectId,
        ref: "Artist",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Review', ReviewSchema)