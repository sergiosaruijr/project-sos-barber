import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import { db } from "./prisma"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri:
            "https://project-sos-barber.vercel.app/api/auth/callback/google", // URL absoluta!
        },
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        domain: ".vercel.app", // Permite subdomínios
        path: "/",
        secure: true,
        sameSite: "lax",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Ativa logs detalhados
}
