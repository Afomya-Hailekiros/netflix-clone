'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EditMoviePage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    genre: '',
    thumbnailUrl: '',
    videoUrl: '',
    isFeatured: false,
  })

  // Fetch movie
  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`/api/movies/${id}`)
      const movie = await res.json()
      setForm({
        title: movie.title,
        description: movie.description,
        genre: movie.genre.join(', '),
        thumbnailUrl: movie.thumbnailUrl,
        videoUrl: movie.videoUrl,
        isFeatured: movie.isFeatured,
      })
    }

    if (id) fetchMovie()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheckbox = (checked: boolean) => {
    setForm({ ...form, isFeatured: checked })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const genreArray = form.genre.split(',').map(g => g.trim())

    const res = await fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, genre: genreArray }),
    })

    if (res.ok) {
      alert('Movie updated successfully!')
      router.push('/admin/movies')
    } else {
      alert('Failed to update movie.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Edit Movie</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input name="title" value={form.title} onChange={handleChange} required />
            <Textarea name="description" value={form.description} onChange={handleChange} required />
            <Input name="genre" value={form.genre} onChange={handleChange} required />
            <Input name="thumbnailUrl" value={form.thumbnailUrl} onChange={handleChange} required />
            <Input name="videoUrl" value={form.videoUrl} onChange={handleChange} required />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={form.isFeatured}
                onCheckedChange={handleCheckbox}
              />
              <label htmlFor="isFeatured" className="text-sm">Mark as Featured</label>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Movie'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
