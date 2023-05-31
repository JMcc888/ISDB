const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const ErrorHandler = require('../utils/errorResponse');


exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        data: users
    })
})

exports.getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User not found with ID of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: user
    })
})

exports.createUser = asyncHandler(async (req, res) => {

    const { username, password, roles} = req.body
    
    if(!username || !password || !roles || !roles.length) {
        return next(new ErrorHandler(`All fields are required`, 400));
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return next(new ErrorHandler(`Username already in use`, 409));
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, roles }

    // Create and store new user 
    const user = await User.create(userObject)

    res.status(201).json({
        success: true,
        message: `New User ${user.username} created`,
        data: user
    })
})

exports.updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    // See if user exists
    const user = await User.findById(id).exec()

    if (!user) {
        return next(new ErrorHandler(`User not found with ID of ${id}`, 400));
    }

    // Update fields
    user.username = username
    user.roles = roles
    user.active = active

    // Re-hash password
    if (password) {
        // Hash new password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    // Save changes
    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm user ID is given
    if (!id) {
        return next(new ErrorHandler(`User ID required`, 400));
    }

    // Confirm user exists to delete 
    const user = await User.findById(id).exec()

    if (!user) {
        return next(new ErrorHandler(`User not found with ID of ${id}`, 400));
    }

    const result = await user.remove()

    const reply = `User '${result.username}' with ID ${result._id} deleted`

    res.status(200).json({success: true, reply})
})