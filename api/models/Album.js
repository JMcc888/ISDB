const mongoose = require('mongoose')

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // Associate collection with artist
    artistId: {
        type: mongoose.Schema.ObjectId,
        ref: "Artist",
        required: true
    },
    // Used to validate for edits
    artistOwnerID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    // Image URL
    image: {
        type: String
    },
    // Filter singles and albums/EPs
    isSingle: {
        type: Boolean,
    },
    released: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// Cascade Deletion - Remove songs related to the collection
AlbumSchema.pre('remove', async function (next) {
    console.log(`Removing items related to collection: ${this.title}`)
    await this.model('Song').deleteMany({albumId: this._id})
    next()
})

module.exports = mongoose.model("Album", AlbumSchema)