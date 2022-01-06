const express = require('express')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

const commentController = require('../controllers/comment')

router.post('/create', isAuth, commentController.createComment)

router.get('/post/get/:id', isAuth, commentController.getCommentsForPost)

module.exports = router
