const express = require('express')
const { getAllUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/user')
const router = express.Router()

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/').get(getAllUsers).post(createUser).patch(updateUser).delete(deleteUser)
router.route('/:id').get(getUser)

module.exports = router