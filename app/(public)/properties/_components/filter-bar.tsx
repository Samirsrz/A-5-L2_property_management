'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || 'all')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [sortBy, setSortBy] = useState(() => {
    const sb = searchParams.get('sortBy')
    const so = searchParams.get('sortOrder')
    if (sb === 'price' && so === 'asc') return 'price-low'
    if (sb === 'price' && so === 'desc') return 'price-high'
    return 'newest'
  })

  function updateUrl(overrides: Record<string, string> = {}) {
    const values = { location, propertyType, minPrice, maxPrice, sortBy, ...overrides }
    const params = new URLSearchParams()

    if (values.location) params.set('location', values.location)
    if (values.propertyType && values.propertyType !== 'all') params.set('type', values.propertyType)
    if (values.minPrice) params.set('minPrice', values.minPrice)
    if (values.maxPrice) params.set('maxPrice', values.maxPrice)

    if (values.sortBy === 'price-low') {
      params.set('sortBy', 'price')
      params.set('sortOrder', 'asc')
    } else if (values.sortBy === 'price-high') {
      params.set('sortBy', 'price')
      params.set('sortOrder', 'desc')
    }

    router.push(`/properties?${params.toString()}`)
  }

  // location/price are free text — wait half a second after typing stops
  // before updating the URL, so we're not refetching on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => updateUrl(), 500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, minPrice, maxPrice])

  function handleTypeChange(value: string) {
    setPropertyType(value)
    updateUrl({ propertyType: value })
  }

  function handleSortChange(value: string) {
    setSortBy(value)
    updateUrl({ sortBy: value })
  }

  function handleClearFilters() {
    setLocation('')
    setPropertyType('all')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('newest')
    router.push('/properties')
  }

  return (
    <div className="rounded-lg border border-border bg-card/50 p-4">
      <form className="flex flex-wrap items-end gap-3" onSubmit={(e) => e.preventDefault()}>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Location</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input placeholder="City or neighborhood" value={location} onChange={(e) => setLocation(e.target.value)} className="pl-9 h-9" />
          </div>
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Property Type</label>
          <Select value={propertyType} onValueChange={handleTypeChange}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="room">Room</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2 flex-1 min-w-[260px]">
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Min Price</label>
            <Input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="h-9" />
          </div>
          <span className="text-muted-foreground mb-2">—</span>
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Max Price</label>
            <Input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-9" />
          </div>
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Sort By</label>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="button" variant="outline" size="sm" onClick={handleClearFilters} className="h-9 px-3 gap-1.5 self-end">
          <X className="h-4 w-4" />
          <span className="hidden sm:inline">Clear</span>
        </Button>
      </form>
    </div>
  )
}