export default function AdminUsersLoading() {
  return (
    <div className="flex">
      <div className="hidden md:block w-64 h-screen border-r border-border bg-card" />
      <main className="flex-1 p-8 max-w-5xl">
        <div className="h-9 w-32 bg-muted rounded animate-pulse mb-8" />
        <div className="border border-border rounded-lg p-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-48 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                <div className="h-8 w-16 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}