const express = require('express')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

const mediaController = require('../controllers/media')

router.post('/save', isAuth, mediaController.savemedia)
router.get('/get/:id', mediaController.getmediabyid)
router.get('/get/user/:id', isAuth, mediaController.getusermedia)
router.get('/get/:start/:end/:sort', mediaController.getmedia)
router.post('/like', isAuth, mediaController.likeMedia)
router.post('/isliked', isAuth, mediaController.isLiked)
router.post('/share', isAuth, mediaController.sharePostWithCommunity)

module.exports = router
