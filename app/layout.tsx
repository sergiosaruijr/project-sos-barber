import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import AuthProvider from "./_providers/auth"
import { Footer } from "./_components/footer"
import { Nunito } from "next/font/google"
import { KeepAliveTrigger } from "./_components/keep-alive-trigger"

const inter = Inter({ subsets: ["latin"] })

const nunito = Nunito({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${nunito.className} ${inter.className}`}>
        <AuthProvider>
          <div className="flex h-full flex-col">
            <div className="flex-1">
              <KeepAliveTrigger />
              {children}
            </div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
