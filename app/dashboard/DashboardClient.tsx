"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  session: any
  stats: { movies: number; favorites: number }
  genreStats: { _id: string; count: number }[]
  topMovies: {
    _id: string
    title: string
    likes: number
    views?: number
  }[]
}

export default function DashboardClient({ session, stats, genreStats, topMovies }: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white px-6 py-12 space-y-10">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {session.user?.email}</h1>
        <p className="text-zinc-400 mb-4">Here's what's happening in your app.</p>
        <Link href="/admin/upload">
          <Button className="bg-red-600 hover:bg-red-700">🎬 Upload New Movie</Button>
        </Link>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="bg-zinc-900 border-zinc-700">
          <CardHeader><CardTitle>Total Movies</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold text-red-500">{stats.movies}</p></CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-700">
          <CardHeader><CardTitle>Total Favorites</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold text-green-400">{stats.favorites}</p></CardContent>
        </Card>
      </div>

      {/* 🎯 Genre Chart */}
      <Card className="bg-zinc-900 border-zinc-700 max-w-5xl mx-auto">
        <CardHeader><CardTitle>Genre Distribution</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genreStats}>
              <XAxis dataKey="_id" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="count" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 🔥 Top Movies */}
      <Card className="bg-zinc-900 border-zinc-700 max-w-5xl mx-auto">
        <CardHeader><CardTitle>Top 5 Most Liked Movies</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {topMovies.map((movie, idx) => (
            <div key={movie._id} className="flex justify-between border-b border-zinc-700 pb-2">
              <span>{idx + 1}. {movie.title}</span>
              <span className="text-red-400">{movie.likes ?? 0} ❤️</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}
