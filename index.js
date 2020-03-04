const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const port = process.env.PORT
const smptp_login = precess.env.SMTP_LOGIN
const smtp_password = precess.env.SMTP_PASSWORD


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smptp_login,
        pass: smtp_password
    }
})
app.get('/', (req, res) => {
    res.send("Hello")
})

app.post('/sendMessage', async (req, res) => {
    let {message, contacts, name} = req.body
    let info = await transporter.sendMail({
        from: 'Portfolio Site',
        to: 'alex.dev4web@gmail.com',
        subject: 'job offer',
        html: `<b>Message from portfolio site</b><div>name:${name}</div><div>contacts:${contacts}</div><div>message:${message}</div>`
    })

})
app.listen(port, () => {
})
