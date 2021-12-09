import cors from "cors"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import nodemailer from "nodemailer"
import * as SMTPTransport from "nodemailer/lib/smtp-transport"
import "regenerator-runtime/runtime.js"

interface ContactBody {
  name: string
  email: string
  subject: string
  message: string
}

dotenv.config()

const nodemailerOptions: SMTPTransport.Options = {
  host: process.env.NODEMAILER_HOST,
  port: parseInt(process.env.NODEMAILER_PORT as string),
  secure: process.env.NODEMAILER_SECURE === "true",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
}
const transporter = nodemailer.createTransport(nodemailerOptions)

const app = express()
const port: number = 3000

app.use(cors())

app.post("/contact", express.json(), async (req: Request, res: Response) => {
  const { name, email, subject, message }: ContactBody = req.body

  if ([name, email, subject, message].some(x => x === "")) {
    res.sendStatus(400)
    return
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.NODEMAILER_TO,
      subject,
      text: `${message}\n\nSent via jaredcleghorn.com`,
    })

    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
})

app.listen(port, () =>
  console.log(`jaredcleghorn.com API listening at http://localhost:${port}`)
)
