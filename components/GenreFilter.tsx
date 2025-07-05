"use client"

import { useState } from "react"

const genres = ["All", "Action", "Drama", "Sci-Fi", "Thriller", "Adventure", "History", "Fantasy"]

type Props = {
  onSelect: (genre: string) => void
}

export default function GenreFilter({ onSelect }: Props) {
  const [active, setActive] = useState("All")

  const handleClick = (genre: string) => {
    setActive(genre)
    onSelect(genre)
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mb-4">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleClick(genre)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
            ${active === genre ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
