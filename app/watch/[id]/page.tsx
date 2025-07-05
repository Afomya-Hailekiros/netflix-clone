// app/watch/[id]/page.tsx
import { notFound } from "next/navigation"
import dbConnect from "@/lib/mongoose"
import { Movie } from "@/lib/models/movie"
import PlayerClient from "./PlayerClient"

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  await dbConnect()
  const movie = await Movie.findById(params.id).lean()
  if (!movie || Array.isArray(movie)) {
    return { title: "Not Found" }
  }
  return { title: movie.title, description: movie.description }
}

export default async function WatchPage({ params }: Props) {
  await dbConnect()
  const movie = await Movie.findById(params.id).lean()
  if (!movie || Array.isArray(movie)) return notFound()

  // Pass plain data to client component
  const movieData = {
    _id: (movie._id as string | { toString(): string }).toString(),
    title: movie.title,
    description: movie.description,
    videoUrl: movie.videoUrl,
    thumbnailUrl: movie.thumbnailUrl,
    genre: movie.genre,
    views: movie.views,
    likes: (movie as any).likes, // Use 'as any' if 'likes' is not typed, or update your Movie schema/type
  }

  return <PlayerClient movie={movieData} />
}
