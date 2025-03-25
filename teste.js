const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log("Conexão bem-sucedida ao banco de dados!")
  } catch (e) {
    console.error("Erro ao conectar ao banco de dados:", e)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
