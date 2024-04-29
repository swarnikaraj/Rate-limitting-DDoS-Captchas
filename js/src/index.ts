const express = require("express")
const app = express()
const { Request, Response, NextFunction } = require('express');

app.use(express.json())
const otpStore: Record<string, string> = {}
app.post("/generate-otp", (req: any, res: any) => {
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

app.post("/reset-password", (req: any, res: any) => {
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