'use client'
import { Home, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface PropertyCardProps {
  id: string
  title: string
  location: string | null
  price: string
  type: 'APARTMENT' | 'HOUSE' | 'STUDIO' | 'CONDO' | 'ROOM'
  image?: string
}

export function PropertyCard({ id, title, location, price, type, image }: PropertyCardProps) {
  return (
    <div className="group h-full flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <Home className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground hover:bg-primary/90">
          {type}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg font-bold text-foreground truncate">{title}</h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{location || 'Location not specified'}</span>
        </div>
        <div className="flex-1" />
        <div className="text-2xl font-bold text-primary">
          ${Number(price).toLocaleString()}<span className="text-sm text-muted-foreground">/mo</span>
        </div>
        <Button asChild className="w-full">
          <a href={`/properties/${id}`}>View Details</a>
        </Button>
      </div>
    </div>
  )
}