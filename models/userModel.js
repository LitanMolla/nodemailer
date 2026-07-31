const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String
    },
    isLogin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)