// app/api/movies/route.ts

import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import { Movie } from "@/lib/models/movie"

export async function POST(req: Request) {
  try {
    await dbConnect()  // <-- fixed: call as function

    const body = await req.json()
    const { title, description, genre, thumbnailUrl, videoUrl, isFeatured } = body

    if (
      !title ||
      !description ||
      !genre ||
      !thumbnailUrl?.startsWith("https://") ||
      !videoUrl?.startsWith("https://")
    ) {
      return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 })
    }

    const newMovie = await Movie.create({
      title,
      description,
      genre: Array.isArray(genre) ? genre : [genre],
      thumbnailUrl,
      videoUrl,
      isFeatured: Boolean(isFeatured),
    })

    return NextResponse.json(newMovie, { status: 201 })
  } catch (error) {
    console.error("Error creating movie:", error)
    return NextResponse.json({ error: "Error uploading movie" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await dbConnect()  // <-- fixed: call as function
    const movies = await Movie.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json(movies)
  } catch (error) {
    console.error("Error fetching movies:", error)
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
  }
}
