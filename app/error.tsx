"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <p>Something went wrong.</p>
      <button onClick={reset} className="underline">Try again</button>
    </div>
  )
}