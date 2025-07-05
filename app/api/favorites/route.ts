import dbConnect from "@/lib/mongoose"
import Favorite from "@/lib/models/Favorite"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // pass request to getServerSession
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 }) // Unauthorized returns empty array
  }

  try {
    await dbConnect()
    const favorites = await Favorite.find({ userEmail: session.user.email }).lean()
    return NextResponse.json(favorites)
  } catch (error) {
    console.error("Failed to fetch favorites:", error)
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { movieId } = await request.json()
    if (!movieId) {
      return NextResponse.json({ error: "Missing movieId" }, { status: 400 })
    }

    await dbConnect()

    const existing = await Favorite.findOne({
      userEmail: session.user.email,
      movieId,
    })

    if (existing) {
      await Favorite.deleteOne({ _id: existing._id })
      return NextResponse.json({ message: "Removed from favorites" })
    } else {
      await Favorite.create({ userEmail: session.user.email, movieId })
      return NextResponse.json({ message: "Added to favorites" })
    }
  } catch (error) {
    console.error("Failed to toggle favorite:", error)
    return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { movieId } = await request.json()
    if (!movieId) {
      return NextResponse.json({ error: "Missing movieId" }, { status: 400 })
    }

    await dbConnect()
    await Favorite.deleteOne({ userEmail: session.user.email, movieId })

    return NextResponse.json({ message: "Removed from favorites" })
  } catch (error) {
    console.error("Failed to remove favorite:", error)
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}
