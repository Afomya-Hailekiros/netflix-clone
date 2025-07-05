// app/api/movies/[id]/view/route.ts
import dbConnect from "@/lib/mongoose"
import { Movie } from "@/lib/models/movie"
import { NextResponse } from "next/server"

export async function POST(_: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  await Movie.findByIdAndUpdate(params.id, { $inc: { views: 1 } })
  return NextResponse.json({ message: "View counted" })
}
export async function GET(_: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const movie = await Movie.findById(params.id).lean()
  if (!movie) return NextResponse.json({ error: "Not found" }, { status: 404 })
  
  return NextResponse.json(movie)
}
