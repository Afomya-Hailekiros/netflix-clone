import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import { Movie } from "@/lib/models/movie"

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await dbConnect()

    const movie = await Movie.findById(context.params.id).lean()

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json(movie)
  } catch (error) {
    console.error("Error fetching movie:", error)
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 })
  }
}
