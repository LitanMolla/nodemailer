const express = require('express')
const { sentOTPController, loginController, logoutController } = require('../controllers/usersControllers')
const router = express.Router()
router.post('/sendotp',sentOTPController)
router.post('/login/:email',loginController)
router.get('/logout/:email',logoutController)
module.exports=router