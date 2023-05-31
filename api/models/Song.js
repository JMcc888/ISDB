const mongoose = require('mongoose')

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter the song title"]
    },
    songLine: {
        type: String,
        required: [true, "Enter a recognizable line from the song"]
    },
    billboardPeak: {
        type: Number,
    },
    recorded: {
        type: Number,
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
    genres: { 
        type: [String]
    },
    // Associate song with artist
    artistId: {
        type: mongoose.Schema.ObjectId,
        ref: "Artist",
        required: true
    },
    // Song Collection ID
    albumId: {
        type: mongoose.Schema.ObjectId,
        ref: "Album",
        required: true
    },
    // Required for admin filtering from panel
    artistOwnerID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("Song", SongSchema)