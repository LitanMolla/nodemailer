const nodemailer = require('nodemailer')
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
    const { to } = req.body
    const info = await transporter.sendMail({
        from: '"Example Team" <litanmolla9@gmail.com>', // sender address
        to,
        subject: "Your OTP",
        html: "<b>Hello world?</b>",
    });
    res.send('success')
}

module.exports = { sentOTPController }