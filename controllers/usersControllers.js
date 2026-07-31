const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const otp = otpGenerator.generate(6)
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
    const { email } = req.body
    const info = await transporter.sendMail({
        from: '"Litan Molla" <litanmolla9@gmail.com>',
        to: email,
        subject: "Your OTP",
        html: `<b>Your otp: ${otp}</b>`,
    });
    res.send('success')
}

module.exports = { sentOTPController }