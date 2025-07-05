// app/api/movies/[id]/route.ts

import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongoose"
import { Movie } from "@/lib/models/movie"

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: Params) {
  const { id } = params

  try {
    await dbConnect()

    const movie = await Movie.findById(id).lean()

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json(movie)
  } catch (error) {
    console.error("Error fetching movie:", error)
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params

  try {
    await dbConnect()

    const deleted = await Movie.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Movie deleted" })
  } catch (error) {
    console.error("Error deleting movie:", error)
    return NextResponse.json({ error: "Failed to delete movie" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = params

  try {
    const body = await request.json()

    await dbConnect()

    const updatedMovie = await Movie.findByIdAndUpdate(id, body, { new: true })

    if (!updatedMovie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json(updatedMovie)
  } catch (error) {
    console.error("Error updating movie:", error)
    return NextResponse.json({ error: "Failed to update movie" }, { status: 500 })
  }
}
