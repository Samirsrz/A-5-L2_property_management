export default function DashboardLoading() {
  return (
    <div className="flex">
      <div className="hidden md:block w-64 h-screen border-r border-border bg-card" />
      <main className="flex-1 p-8">
        <div className="h-9 w-64 bg-muted rounded animate-pulse" />
        <div className="mt-2 h-5 w-40 bg-muted rounded animate-pulse" />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-7 w-16 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>

        <div className="mt-8 border border-border rounded-lg p-6 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div className="space-y-2">
                <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                <div className="h-3 w-28 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-6 w-16 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}