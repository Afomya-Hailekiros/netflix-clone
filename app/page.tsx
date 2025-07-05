"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import MovieRow from "@/components/MovieRow"
import GenreFilter from "@/components/GenreFilter"
import SearchBar from "@/components/SearchBar"

type Movie = {
  _id: string
  title: string
  thumbnailUrl: string
  videoUrl: string
  description: string
  genre: string[]
  isFeatured: boolean
}

export default function HomePage() {
  const router = useRouter()
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

 useEffect(() => {
  async function fetchMovies() {
    try {
      const res = await fetch("/api/movies")
      const data = await res.json()

      if (Array.isArray(data)) {
        setMovies(data)
      } else {
        console.error("Invalid movies data:", data)
        setMovies([]) // fallback
      }
    } catch (err) {
      console.error("Failed to fetch movies", err)
      setMovies([]) // fallback
    }
  }
  fetchMovies()
}, [])


  const filteredByGenre =
    selectedGenre === "All"
      ? movies
      : movies.filter((m) => m.genre.includes(selectedGenre))

  const filteredBySearch = searchQuery
    ? filteredByGenre.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByGenre

  const featured = movies.filter((m) => m.isFeatured)

  const genres = Array.from(new Set(movies.flatMap((m) => m.genre)))
  const moviesByGenre = genres
    .map((genre) => ({
      genre,
      movies: filteredBySearch.filter((m) => m.genre.includes(genre)),
    }))
    .filter((g) => g.movies.length > 0)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section ... (same as before) */}

      <section className="p-6 pt-20 bg-gradient-to-b from-black to-zinc-900 text-center">
        <Image src="/background.png" alt="Netflix Logo" width={150} height={50} className="mx-auto mb-8" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Netflix Clone</h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-6">
          Watch unlimited movies, series, and more. Sign up now to start your journey!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={() => router.push("/login")}
            className="bg-red-400 hover:bg-red-700 transition-colors px-6 py-2 rounded text-white text-lg font-medium"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-gray-800 hover:bg-gray-700 transition-colors px-6 py-2 rounded text-white text-lg font-medium"
          >
            Register
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={setSearchQuery} />

        {/* Genre Filter */}
        <GenreFilter onSelect={setSelectedGenre} />
      </section>

      {/* Movie Rows */}
      <main className="px-4 sm:px-10 py-10 space-y-12 max-w-7xl mx-auto">
        {selectedGenre === "All" && !searchQuery && featured.length > 0 && (
          <MovieRow title="🔥 Featured" movies={featured} />
        )}

        {moviesByGenre.map(({ genre, movies }) => (
          <MovieRow key={genre} title={genre} movies={movies} />
        ))}

        {filteredBySearch.length === 0 && (
          <p className="text-center text-gray-400">No movies found.</p>
        )}
      </main>
    </div>
  )
}
