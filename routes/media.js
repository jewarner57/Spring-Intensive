const express = require('express')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

const mediaController = require('../controllers/media')

router.post('/save', isAuth, mediaController.savemedia)

module.exports = router
