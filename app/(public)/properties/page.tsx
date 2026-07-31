import { getAllProperties } from "@/services/properties"

import { PropertyCard } from "./_components/property-card"
import { PropertiesEmptyState } from "./_components/property-empty"
import { Suspense } from "react"
import { FilterBar } from "./_components/filter-bar"



type Property = {
  id: string
  landlordId: string
  type: "APARTMENT" | "HOUSE" | "STUDIO" | "CONDO" | "ROOM"
  title: string
  description: string
  location: string | null
  price: string
  amenities: string[]
  images: string[]
  isAvailable: boolean
  createdAt: string
  updatedAt: string
}



export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const result = await getAllProperties(params)
  const properties: Property[] = result.data

  console.log("rendering properties page, count:", properties?.length)

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground">Browse Properties</h1>
        <p className="mt-2 text-muted-foreground">{properties?.length || 0} properties available</p>

       <div className="mt-6">
          <Suspense fallback={<div className="h-[88px] rounded-lg border border-border bg-card/50" />}>
            <FilterBar />
          </Suspense>
        </div>

        {properties && properties.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                location={property.location}
                price={property.price}
                type={property.type}
                image={property.images?.[0]}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <PropertiesEmptyState />
          </div>
        )}
      </div>
    </div>
  )
}