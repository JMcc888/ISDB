const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @route /api/auth
exports.login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    // Missing Fields
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ username }).exec()

    // User not found
    if (!foundUser) {
        return res.status(401).json({ message: 'Invalid Credentials' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    // Failed Login
    if (!match) return res.status(401).json({ message: 'Invalid Credentials' })

    // Return Access Token
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles,
                "userID": foundUser._id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    // Return Refresh Token
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    // Send accessToken containing username and user's roles 
    res.json({ accessToken })
})

// @route /api/auth/refresh
exports.refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' }) 

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles,
                        "userID": foundUser._id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}

// @route POST /api/auth/logout
exports.logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

// @route /api/auth/register
exports.register = asyncHandler(async (req, res) => {

    const { username, password, roles} = req.body

    // Check for missing fields
    if(!username || !password || !roles || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // See if username is available
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Username is already in use' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, roles }

    // Create and store new user 
    const user = await User.create(userObject)

    
    // Return Access & Refresh Token to new user
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": user.username,
                "roles": user.roles,
                "userID": user._id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        success: true,
        message: `New User ${user.username} created`,
        data: user,
        accessToken
    })


})