import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const client = await clientPromise
  const db = client.db()

  const userExists = await db.collection("users").findOne({ email })
  if (userExists)
    return NextResponse.json({ message: "User already exists" }, { status: 400 })

  const hashedPassword = await hash(password, 12)

  await db.collection("users").insertOne({ email, password: hashedPassword })
  return NextResponse.json({ message: "User created" })
}
