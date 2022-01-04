const express = require('express')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

const mediaController = require('../controllers/media')

router.post('/save', isAuth, mediaController.savemedia)
router.get('/get/:id', isAuth, mediaController.getmedia)
router.get('/get/user/:id', isAuth, mediaController.getusermedia)

module.exports = router
