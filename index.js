const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const port = process.env.PORT
const smtp_login = process.env.SMTP_LOGIN
const smtp_password = process.env.SMTP_PASSWORD
const refresh_token = process.env.REFRESH_TOKEN
const client_id = process.env.CLINT_ID
const client_secret = process.env.CLINT_ID

const transporter = nodemailer.createTransport({
    service: 'Gmail'
    ,
    auth: {
        type: 'OAuth2',
        user: smtp_login,
        refreshToken: refresh_token,
        clientId: client_id,
        clientSecret: client_secret,
    }
})
app.get('/', (req, res) => {
    res.send("Hello")
})

app.post('/sendMessage', async (req, res) => {
    let {message, contacts, name} = req.body
    try {
        let info = await transporter.sendMail({
            from: 'weblikeabc@gmail.com',
            to: 'alex.dev4web@gmail.com',
            subject: 'job offer',
            html: `<b>Message from portfolio site</b><div>name:${name}</div><div>contacts:${contacts}</div><div>message:${message}</div>`
        })
        res.send(message, contacts, name)
    } catch (e) {
        res.send(e)
    }

})
app.listen(port, function () {
    console.log('Example app listening !')
})
