import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import DashboardClient from "./DashboardClient"
import dbConnect from "@/lib/mongoose"
import { Movie } from "@/lib/models/movie"
import Favorite from "@/lib/models/Favorite"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return redirect("/login")

  await dbConnect()

  const movieCount = await Movie.countDocuments()
  const favoriteCount = await Favorite.countDocuments()

  const genreCounts = await Movie.aggregate([
    { $unwind: "$genre" },
    { $group: { _id: "$genre", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])

  const topMoviesRaw = await Movie.find()
    .sort({ likes: -1 }) // you can use 'views' or 'favorites' if tracked
    .limit(5)
    .lean()

  const topMovies = topMoviesRaw.map((movie: any) => ({
    _id: movie._id.toString(),
    title: movie.title,
    likes: movie.likes,
    views: movie.views,
  }))

  return (
    <DashboardClient
      session={session}
      stats={{ movies: movieCount, favorites: favoriteCount }}
      genreStats={genreCounts}
      topMovies={topMovies}
    />
  )
}
