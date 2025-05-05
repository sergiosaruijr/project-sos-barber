import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log("✅ Conexão com o banco de dados foi bem-sucedida!")
  } catch (error) {
    console.error("❌ Erro ao conectar no banco de dados:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
