"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

type Movie = {
  _id: string
  title: string
  thumbnailUrl: string
  videoUrl: string
  description?: string
  genre?: string[]
  isFeatured?: boolean
}

type Props = {
  title: string
  movies: Movie[]
}

export default function MovieRow({ title, movies }: Props) {
  const { data: session } = useSession()
  const [favoritedIds, setFavoritedIds] = useState<string[]>([])

  // Fetch user favorites on mount
  useEffect(() => {
    if (!session?.user?.email) {
      setFavoritedIds([])
      return
    }

    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites")
        if (!res.ok) throw new Error("Failed to fetch favorites")
        const data: { movieId: string }[] = await res.json()
        setFavoritedIds(data.map((fav) => fav.movieId))
      } catch (error) {
        console.error(error)
      }
    }
    fetchFavorites()
  }, [session])

  // Toggle favorite status for a movie
  const toggleFavorite = async (movieId: string) => {
    if (!session) {
      alert("Please log in to favorite movies.")
      return
    }

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId }),
      })

      if (res.ok) {
        setFavoritedIds((prev) =>
          prev.includes(movieId)
            ? prev.filter((id) => id !== movieId)
            : [...prev, movieId]
        )
      } else {
        console.error("Failed to toggle favorite")
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!movies.length) return null

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="relative min-w-[160px] md:min-w-[200px] group flex-shrink-0"
          >
            {/* ❤️ Favorite button */}
            <button
              onClick={() => toggleFavorite(movie._id)}
              className="absolute top-2 right-2 z-10 text-white text-lg bg-black/60 rounded-full p-1 hover:scale-110 transition"
              title={
                favoritedIds.includes(movie._id)
                  ? "Remove from My List"
                  : "Add to My List"
              }
              aria-label={
                favoritedIds.includes(movie._id)
                  ? "Remove from My List"
                  : "Add to My List"
              }
            >
              {favoritedIds.includes(movie._id) ? "💖" : "🤍"}
            </button>

            {/* Poster + title */}
            <Link href={`/watch/${movie._id}`}>
              <div className="overflow-hidden rounded-lg border border-zinc-700 hover:scale-105 transition-transform cursor-pointer">
                <img
                  src={movie.thumbnailUrl}
                  alt={movie.title}
                  className="w-full h-auto object-cover group-hover:opacity-80"
                  loading="lazy"
                />
              </div>
              <p className="mt-1 text-sm truncate text-center">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
