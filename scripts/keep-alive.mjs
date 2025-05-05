import fetch from "node-fetch"
import dotenv from "dotenv"
dotenv.config()

const PING_URL = "http://localhost:3000/api/keep-alive"
const INTERVAL = 2 * 60 * 1000 // 2 minutos

console.log("🔄 Keep-alive iniciado -", new Date().toLocaleTimeString())

setInterval(async () => {
  try {
    const start = Date.now()
    const res = await fetch(PING_URL, {
      headers: {
        Authorization: `Bearer ${process.env.KEEP_ALIVE_SECRET}`,
      },
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    console.log(
      `✅ [${new Date().toLocaleTimeString()}] Ping OK (${Date.now() - start}ms)`,
    )
  } catch (err) {
    console.error(`❌ [${new Date().toLocaleTimeString()}] Erro:`, err.message)
  }
}, INTERVAL)
