import { rateLimit } from 'express-rate-limit'

const express = require("express")
const app = express()

const otplimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Too many requests, please try again later",
    // limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

const passwordRatelimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Too many requests, please try again later",
    // limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.

app.use(express.json())
const otpStore: Record<string, string> = {}
app.post("/generate-otp", otplimiter, (req: any, res: any) => {
    const email = (req.body as any).email
    if (!email) {
        const data = { message: "email is required" };
        res.status(400).send(data)

    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    otpStore[email] = otp
    console.log(otp)
    res.status(200).send("otp sent")

})

app.post("/reset-password", passwordRatelimiter, (req: any, res: any) => {
    const { email, otp, newpassword } = req.body
    if (!email || !otp || !newpassword) {
        res.status(400).json({ message: "email, otp and newpassword are required" })
    }

    if (otpStore[email] == otp) {
        delete otpStore[email]

        res.status(200).json({ message: "password reset successful" })
    } else {
        res.status(400).json({ message: "invalid otp" })
    }

})

app.listen(3000, () => {
    console.log("server started:Running on port...", 3000)
})