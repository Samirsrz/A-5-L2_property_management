import { getAllProperties } from "@/services/properties"




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

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.map((property) => (
            <div key={property.id} className="border border-border rounded-lg p-4">
              <h2 className="font-semibold">{property.title}</h2>
              <p className="text-sm text-muted-foreground">{property.location}</p>
              <p className="mt-2 font-bold">${property.price}/mo</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}