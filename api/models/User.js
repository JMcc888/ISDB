const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    roles: [{
        type: String,
        default: "User"
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// Cascade Deletion
UserSchema.pre('remove', async function (next) {
    console.log(`Removing items related to ${this.username}`)
    await this.model('Artist').deleteMany({artistOwnerID: this._id})
    await this.model('Song').deleteMany({artistOwnerID: this._id})
    await this.model('Album').deleteMany({artistOwnerID: this._id})
    await this.model('Review').deleteMany({userId: this._id})
    next()
})

module.exports = mongoose.model("User", UserSchema)