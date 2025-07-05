"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-black text-white flex justify-between items-center px-6 py-4 border-b border-zinc-800 shadow-sm">
      <Link href="/" className="text-2xl font-bold text-red-600 tracking-wide">
        Netflix
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        {session ? (
          <>
            <Link
              href="/my-list"
              className="hover:text-red-500 transition-colors"
            >
              My List
            </Link>
            <button
              onClick={() => signOut()}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
