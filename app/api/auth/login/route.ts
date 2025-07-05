import { compare } from "bcrypt"
import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const client = await clientPromise
  const db = client.db()

  const user = await db.collection("users").findOne({ email })
  if (!user) return NextResponse.json(null, { status: 401 })

  const isMatch = await compare(password, user.password)
  if (!isMatch) return NextResponse.json(null, { status: 401 })

  return NextResponse.json({ id: user._id, email: user.email })
}
