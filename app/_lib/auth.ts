// import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions } from "next-auth"
// import { db } from "./prisma"
// import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
          redirect_uri:
            "https://project-sos-barber.vercel.app/api/auth/callback/google", // Fixo!
        },
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        domain: ".vercel.app", // Permite todos subdomínios
        secure: true,
        path: "/",
        sameSite: "lax",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}
