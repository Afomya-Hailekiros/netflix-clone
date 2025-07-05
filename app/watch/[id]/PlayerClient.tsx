"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  movie: {
    _id: string
    title: string
    videoUrl: string
    thumbnailUrl: string
    description: string
  }
}

export default function PlayerClient({ movie }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [lastTime, setLastTime] = useState(0)

  const key = `progress-${movie._id}`

  // Load previous time
  useEffect(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      const parsed = parseFloat(saved)
      setLastTime(parsed)
    }
  }, [key])

  // Sync video time
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      localStorage.setItem(key, video.currentTime.toString())
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [key])

  useEffect(() => {
    const video = videoRef.current
    if (video && lastTime > 10) {
      video.currentTime = lastTime
    }
  }, [lastTime])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <video
        ref={videoRef}
        src={movie.videoUrl}
        controls
        className="w-full max-w-4xl rounded-lg shadow-lg"
        poster={movie.thumbnailUrl}
      />
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p className="text-gray-400 mt-2 max-w-xl">{movie.description}</p>
      </div>
    </div>
  )
}
