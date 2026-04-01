import "dotenv/config"

import cors from "cors"
import express from "express"
import QRCode from "qrcode"

import { checkSpelling } from "./lib/spellcheck.js"

const app = express()
const port = Number(process.env.PORT) || 4000
const clientUrl = process.env.CLIENT_URL || "*"

app.use(
  cors({
    origin: clientUrl === "*" ? "*" : clientUrl,
  })
)
app.use(express.json())

app.get("/health", (_request, response) => {
  response.json({ ok: true })
})

app.post("/api/tools/spellcheck", (request, response) => {
  const text = typeof request.body?.text === "string" ? request.body.text : ""
  response.json({ issues: checkSpelling(text) })
})

app.post("/api/tools/qr-code", async (request, response) => {
  const text = typeof request.body?.text === "string" ? request.body.text : ""
  const size = Number(request.body?.size) || 320

  if (!text) {
    response.status(400).json({ message: "text is required" })
    return
  }

  const svg = await QRCode.toString(text, {
    type: "svg",
    width: size,
    margin: 1,
  })

  response.json({ svg })
})

app.listen(port, () => {
  console.log(`CNVR server running on http://localhost:${port}`)
})
