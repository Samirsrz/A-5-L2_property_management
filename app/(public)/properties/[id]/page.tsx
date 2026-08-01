import { getPropertyById } from "@/services/properties"
import { cookies } from "next/headers"
import { MapPin, Wifi, Car, Dumbbell, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookingCard } from "../_components/booking_card"
import { ImageGallery } from "../_components/image_gallery"
import type { LucideIcon } from "lucide-react"
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
  landlord?: {
    id: string
    name: string
    email: string
    role: string
  }
}


const amenityIcons: Record<string, LucideIcon> = {
  wifi: Wifi,
  parking: Car,
  gym: Dumbbell,
  elevator: Zap,
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const result = await getPropertyById(id)
  const property: Property = result.data

  console.log("rendering property details for:", property?.title)

  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get("accessToken")?.value
  const role = cookieStore.get("role")?.value

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ImageGallery images={property.images} title={property.title} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span>{property.location || "Location not specified"}</span>
              </div>
              <Badge className="mb-4">{property.type}</Badge>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {property.amenities.length > 0 ? (
                  property.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity.toLowerCase()] || Wifi
                    return (
                      <Badge key={amenity} variant="secondary" className="flex items-center gap-2 py-2 px-3 text-sm">
                        <Icon className="w-4 h-4" />
                        {amenity}
                      </Badge>
                    )
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">No amenities listed</p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <BookingCard
                propertyId={property.id}
                price={property.price}
                landlordName={property.landlord?.name || "Landlord"}
                isLoggedIn={isLoggedIn}
                role={role}
              />

              <Card className="border-border">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-foreground mb-3">Questions?</p>
                  <p className="text-sm text-muted-foreground mb-4">Contact the landlord to learn more about this property.</p>
                  <Button variant="outline" className="w-full" disabled>Send Message</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}