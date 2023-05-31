const express = require('express')
const { getReviews, createReview, getReview, updateReview, deleteReview } = require('../controllers/review')
const router = express.Router({mergeParams:true})

const verifyJWT = require('../middleware/verifyJWT')


router.route('/').get(getReviews).post(verifyJWT, createReview).patch(verifyJWT, updateReview).delete(verifyJWT, deleteReview)
router.route('/:id').get(getReview)

module.exports = router