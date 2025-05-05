import { db } from "@/app/_lib/prisma"

export async function GET() {
  try {
    const result = await db.$queryRaw`SELECT 1`
    return Response.json({ status: "OK", result })
  } catch (error: any) {
    return Response.json(
      {
        error: "Database connection failed",
        details: error.message,
        solution: "Check your Neon connection settings",
      },
      { status: 500 },
    )
  }
}
