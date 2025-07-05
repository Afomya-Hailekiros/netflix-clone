// app/api/movies/[id]/route.ts
import dbConnect from "@/lib/mongoose"
import { Movie } from "@/lib/models/movie"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const movie = await Movie.findById(params.id).lean()
  if (!movie) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const related = await Movie.find({
    _id: { $ne: (movie as any)._id },
    genre: { $in: (movie as any).genre },
  })
    .limit(6)
    .lean()

  return NextResponse.json({ movie, related })
}
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const deleted = await Movie.findByIdAndDelete(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Movie deleted successfully" })
  } catch (error) {
    console.error("Failed to delete movie:", error)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const body = await req.json()
    const updatedMovie = await Movie.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    ).lean()

    if (!updatedMovie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json(updatedMovie)
  } catch (error) {
    console.error("Failed to update movie:", error)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}