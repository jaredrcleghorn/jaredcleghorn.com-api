import cors from "cors"
import express, { Request, Response } from "express"

const app = express()
const port: number = 3000

app.use(cors())

app.get("/", (req: Request, res: Response) => res.send("hello, world"))

app.listen(port, () =>
  console.log(`jaredcleghorn.com API listening at http://localhost:${port}`)
)
