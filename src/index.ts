import cors from "cors"
import dotenv from "dotenv"
import express, { Request, Response } from "express"

dotenv.config()

const app = express()
const port: number = 3000

app.use(cors())

app.get("/", (req: Request, res: Response) => res.send("hello, world"))

app.listen(port, () =>
  console.log(`jaredcleghorn.com API listening at http://localhost:${port}`)
)
