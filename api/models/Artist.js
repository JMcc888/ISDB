const mongoose = require('mongoose')

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the artist's name"]
    },
    description: {
        type: String,
        required: [true, "Give a breif description of the artist"],
        maxlength: 600
    },
    origin: {
        type: String,
        required: [true, "Please enter the artist's origin"]
    },
    topSong: {
        type: String,
        required: [true, "Please enter the name of the artist's top song"]
    },
    photo: {
        type: String,
        required: [true, "Please submit a link to a photo of the artist"]
    },
    debut: {
        type: String,
        required: [true, "Please enter the artist's debut year"]
    },
    youtubeLink: {
        type: String,
    },
    spotifyLink: {
        type: String,
    },
    appleMusicLink: {
        type: String,
    },
    active: {
        type: Boolean,
        required: true
    },
    artistOwner: {
        type: String,
    },
    artistOwnerID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }

})

// Cascade Deletion - Remove songs, albums, and reviews related to the artist
ArtistSchema.pre('remove', async function (next) {
    console.log(`Removing items related to ${this.name}`)
    await this.model('Song').deleteMany({artistId: this._id})
    await this.model('Album').deleteMany({artistId: this._id})
    await this.model('Review').deleteMany({artistId: this._id})
    next()
})

module.exports = mongoose.model('Artist', ArtistSchema)