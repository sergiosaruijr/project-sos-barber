import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    secret: process.env.KEEP_ALIVE_SECRET, // Verifique se o nome da variável está igual ao do seu .env
  })
}
