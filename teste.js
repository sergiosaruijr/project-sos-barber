// const { PrismaClient } = require("@prisma/client")
// const prisma = new PrismaClient()

// async function testConnection() {
//   try {
//     await prisma.$connect()
//     console.log("Conexão bem-sucedida ao banco de dados!")
//   } catch (e) {
//     console.error("Erro ao conectar ao banco de dados:", e)
//   } finally {
//     await prisma.$disconnect()
//   }
// }

// testConnection()
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "",
    },
  },
})

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1`
    console.log("Conexão bem-sucedida:", result)
  } catch (err) {
    console.error("Erro na conexão:", err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
