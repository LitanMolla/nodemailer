const express = require('express')
const { sentOTPController } = require('../controllers/usersControllers')
const router = express.Router()
router.post('/sendotp',sentOTPController)
module.exports=router