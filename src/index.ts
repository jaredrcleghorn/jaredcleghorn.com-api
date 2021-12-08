import cors from "cors"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
import nodemailer from "nodemailer"
import * as SMTPTransport from "nodemailer/lib/smtp-transport"

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

app.get("/", (req: Request, res: Response) => res.send("hello, world"))

app.listen(port, () =>
  console.log(`jaredcleghorn.com API listening at http://localhost:${port}`)
)
