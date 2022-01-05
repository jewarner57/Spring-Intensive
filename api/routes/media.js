const express = require('express')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

const mediaController = require('../controllers/media')

router.post('/save', isAuth, mediaController.savemedia)
router.get('/get/:id', isAuth, mediaController.getmediabyid)
router.get('/get/user/:id', isAuth, mediaController.getusermedia)
router.get('/get/:start/:end', mediaController.getmedia)

module.exports = router
