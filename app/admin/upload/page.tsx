'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function UploadPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    genre: '',
    thumbnailUrl: '',
    videoUrl: '',
    isFeatured: false,
  })

  const [loading, setLoading] = useState(false)

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

    const res = await fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, genre: genreArray }),
    })

    if (res.ok) {
      alert('✅ Movie uploaded successfully!')
      router.push('/')
    } else {
      alert('❌ Failed to upload movie.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-red-600 font-bold">Upload New Movie</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input name="title" placeholder="Movie Title" required onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea name="description" placeholder="Movie Description" required onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="genre">Genres (comma separated)</Label>
              <Input name="genre" placeholder="e.g. Action, Drama" required onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
              <Input name="thumbnailUrl" placeholder="https://image-url.com/image.jpg" required onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input name="videoUrl" placeholder="https://video-url.com/video.mp4" required onChange={handleChange} />
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="isFeatured" checked={form.isFeatured} onCheckedChange={(val: boolean) => handleCheckbox(val)} />
              <Label htmlFor="isFeatured">Mark as Featured</Label>
            </div>

            <Button type="submit" disabled={loading} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold">
              {loading ? 'Uploading...' : 'Upload Movie'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
