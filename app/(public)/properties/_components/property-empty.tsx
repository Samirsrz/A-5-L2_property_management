import { SearchX } from 'lucide-react'

export function PropertiesEmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-card/50 py-12 px-4">
      <SearchX className="h-16 w-16 text-muted-foreground" />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground">
          No properties found
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters to find available rentals
        </p>
      </div>
    </div>
  )
}
