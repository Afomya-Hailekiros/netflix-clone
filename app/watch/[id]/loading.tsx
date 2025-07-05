// app/watch/[id]/loading.tsx
export default function LoadingWatchPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6">
      {/* Skeleton video player */}
      <div className="w-full max-w-5xl aspect-video bg-zinc-800 rounded-lg animate-pulse mb-6" />

      {/* Title skeleton */}
      <div className="h-6 w-3/4 max-w-2xl bg-zinc-700 rounded animate-pulse mb-2" />

      {/* Description skeleton */}
      <div className="h-4 w-1/2 max-w-xl bg-zinc-700 rounded animate-pulse mb-4" />

      {/* Buttons skeleton */}
      <div className="flex gap-4">
        <div className="h-10 w-24 bg-zinc-700 rounded animate-pulse" />
        <div className="h-10 w-24 bg-zinc-700 rounded animate-pulse" />
      </div>

      {/* Next up section */}
      <div className="w-full max-w-5xl mt-10">
        <div className="h-5 w-32 bg-zinc-600 rounded animate-pulse mb-4" />
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="min-w-[160px] h-24 bg-zinc-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
