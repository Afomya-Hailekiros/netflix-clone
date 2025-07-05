import "./globals.css"
import type { Metadata } from "next"
import SessionWrapper from "@/components/SessionProvider"
import Navbar from "@/components/Navbar"
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "Stream unlimited movies and shows",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <SessionWrapper>
          <Toaster />
          <Navbar />
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
