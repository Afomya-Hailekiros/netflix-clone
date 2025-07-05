'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Movie = {
  _id: string
  title: string
  genre: string[]
  isFeatured: boolean
}

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchMovies = async () => {
    const res = await fetch('/api/movies')
    const data = await res.json()
    setMovies(data)
  }

  const deleteMovie = async () => {
    if (!selectedId) return
    setLoading(true)
    const res = await fetch(`/api/movies/${selectedId}`, { method: 'DELETE' })
    if (res.ok) {
      setMovies(movies.filter(m => m._id !== selectedId))
    } else {
      alert('Delete failed')
    }
    setSelectedId(null)
    setLoading(false)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎬 Admin: Movies</h1>
      <table className="w-full text-left border-collapse border border-zinc-700">
        <thead className="bg-zinc-800">
          <tr>
            <th className="p-3 border border-zinc-700">Title</th>
            <th className="p-3 border border-zinc-700">Genre</th>
            <th className="p-3 border border-zinc-700">Featured</th>
            <th className="p-3 border border-zinc-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id} className="hover:bg-zinc-900">
              <td className="p-3 border border-zinc-700">{movie.title}</td>
              <td className="p-3 border border-zinc-700">{movie.genre.join(', ')}</td>
              <td className="p-3 border border-zinc-700">{movie.isFeatured ? 'Yes' : 'No'}</td>
              <td className="p-3 border border-zinc-700 space-x-2">
                <Link href={`/admin/movies/${movie._id}`}>
                  <Button size="sm" variant="outline">Edit</Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setSelectedId(movie._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={!!selectedId} onOpenChange={() => setSelectedId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this movie?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setSelectedId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={deleteMovie} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
