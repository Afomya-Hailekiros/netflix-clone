import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import dbConnect from "@/lib/mongoose"
import { Movie } from "@/lib/models/movie"

import Favorite from "@/lib/models/Favorite"
import MovieRow from "@/components/MovieRow"

export default async function MyListPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return <p className="p-6 text-center text-red-500">Please log in to view your list.</p>
  }

  await dbConnect()

  const favorites = await Favorite.find({ userEmail: session.user.email }).lean()
  const movieIds = favorites.map((fav) => fav.movieId)
  const moviesRaw = await Movie.find({ _id: { $in: movieIds } }).lean()

  if (moviesRaw.length === 0) {
    return <p className="p-6 text-center text-gray-400">Your list is empty.</p>
  }

  // Map raw documents to Movie type
 const movies = moviesRaw.map((movie: any) => ({
  _id: movie._id.toString(), // 🔥 convert ObjectId to plain string
  title: movie.title,
  thumbnailUrl: movie.thumbnailUrl,
  videoUrl: movie.videoUrl,
  description: movie.description,
  genre: movie.genre,
  isFeatured: movie.isFeatured,
}))


  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My List</h1>
      <MovieRow title="My Favorites" movies={movies} />
    </main>
  )
}
