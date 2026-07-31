const User = require('../models/userModel')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: 'litanmolla9@gmail.com',
        pass: 'awqknpcvleoincry',
    },
});
const sentOTPController = async (req, res) => {
    try {
        const { email } = req.body
        const otp = otpGenerator.generate(6)
        if (!email) {
            return res.status(400).json('email requred')
        }
        const isExist = await User.findOne({ email })
        if (isExist) {
            const data = await User.findOneAndUpdate({ email }, { otp })
            const info = await transporter.sendMail({
                from: '"Litan Molla" <litanmolla9@gmail.com>',
                to: email,
                subject: "Your OTP",
                html: `<b>Your otp: ${otp}</b>`,
            });
            return res.status(200).json({ success: true, message: 'OTP Updated' })
        } else {
            const user = await new User({ email, otp }).save()
            const info = await transporter.sendMail({
                from: '"Litan Molla" <litanmolla9@gmail.com>',
                to: email,
                subject: "Your OTP",
                html: `<b>Your otp: ${otp}</b>`,
            });
            return res.status(201).json({ success: true, message: 'User created successfully' })
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }

}

const loginController = async (req, res) => {
    const { email } = req.params
    const { otp } = req.body
    if (!otp || !email) {
        res.send('email and otp requierd')
    }
    const user = await User.findOne({ email })
    if (user.isLogin) {
        return res.send('this account logged in another device, please loguot frist')
    }
    if (user.otp == '') {
        return res.send('please send an otp before login')
    }
    if (otp == user.otp) {
        const data = await User.findOneAndUpdate({ email }, { isLogin: true, otp: '' })
        return res.send('Login success')
    } else {
        return res.send('Invalid otp')
    }
}

const logoutController = async (req, res) => {
    const { email } = req.params
    if (!email) {
        return res.send('email required')
    }
    const user = await User.findOneAndUpdate({ email }, { isLogin: false })
    if (!user) {
        return res.send('user not found')
    }
    return res.send('Logout success')
}

module.exports = { sentOTPController, loginController, logoutController }