import pkg from "pg"
const { Client } = pkg

const client = new Client({
  connectionString:
    "postgresql://neondb_owner:Tocomsono1998@ep-purple-voice-a5gghfrw.us-east-2.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false, // necessário para conexões SSL em ambientes sem root CA
  },
})

client
  .connect()
  .then(() => {
    console.log("Conexão bem-sucedida com pg")
    return client.end()
  })
  .catch((err) => {
    console.error("Erro com pg:", err)
  })
