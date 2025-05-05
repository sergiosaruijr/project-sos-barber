import { db } from "@/app/_lib/prisma"

export const dynamic = "force-dynamic" // Importante!

export async function GET() {
  try {
    // Query que força uma conexão ativa
    await db.$queryRaw`SELECT pg_sleep(0.5)` // Mantém conexão por 500ms
    console.log("Keep-alive executado em:", new Date())
    return Response.json({
      status: "active",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json(
      {
        error: "Database ping failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
