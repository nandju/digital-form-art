import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "DIGITAL Form Art - Accompagnement professionnel",
  description: "Valorisez votre parcours de carrière avec des CV et lettres de motivation professionnels. Accompagnement personnalisé pour votre réussite professionnelle.",
  generator: 'v0.app',
  icons: {
    icon: '/images/logo_sans_fond.png',
    shortcut: '/images/logo_sans_fond.png',
    apple: '/images/logo_sans_fond.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
