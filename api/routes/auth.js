const express = require('express')
const isAuth = require('../middleware/isAuth')
const validateinput = require('../middleware/validateInput')

const router = express.Router()

const authController = require('../controllers/auth')

router.get('/', isAuth, authController.user)

router.get('/profile/:id', isAuth, authController.getuserprofile)

router.post('/signin', validateinput, authController.signin)

router.post('/signup', validateinput, authController.signup)

router.post('/signout', isAuth, authController.signout)

module.exports = router
