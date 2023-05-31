const express = require('express')
const router = express.Router()
const { login, logout, refresh, register  } = require('../controllers/auth')

router.route('/').post(login)

router.route('/register').post(register)

router.route('/refresh').get(refresh)

router.route('/logout').post(logout)

module.exports = router