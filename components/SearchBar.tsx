"use client"

import { useState, useEffect, useRef } from "react"

type Props = {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(query.trim())
    }, 300) // debounce input by 300ms

    return () => clearTimeout(delayDebounce)
  }, [query, onSearch])

  return (
    <div className="flex items-center max-w-md mx-auto mb-6">
      <input
        ref={inputRef}
        type="search"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-4 py-2 rounded-l-md bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600"
      />
      {query && (
        <button
          onClick={() => {
            setQuery("")
            inputRef.current?.focus()
          }}
          className="px-4 py-2 bg-red-400 hover:bg-red-300 rounded-r-md text-white font-semibold"
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  )
}
