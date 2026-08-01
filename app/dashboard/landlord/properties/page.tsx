import Link from "next/link"
import { cookies } from "next/headers"
import { Plus } from "lucide-react"
import { getMyProperties } from "@/services/properties"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

export default async function LandlordPropertiesPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getMyProperties(token)
  const properties: Property[] = result.data

  console.log("landlord properties page, count:", properties?.length)

  const user = {
    name: name || "Landlord",
    role: "Landlord",
    initials: name ? name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() : "L",
  }

  return (
    <div className="flex">
      <DashboardSidebar role="LANDLORD" user={user} onLogout={logoutAction} />

      <main className="flex-1 md:pt-0 pt-16">
        <div className="p-8 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Properties</h1>
            <Button asChild>
              <Link href="/dashboard/landlord/properties/new"><Plus className="h-4 w-4 mr-1" /> Add Property</Link>
            </Button>
          </div>

          {properties?.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{property.title}</CardTitle>
                      <Badge variant={property.isAvailable ? "default" : "secondary"}>
                        {property.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{property.location}</p>
                    <p className="font-semibold mt-1">${Number(property.price).toLocaleString()}/mo</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/landlord/properties/${property.id}/edit`}>Edit</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No properties listed yet.</p>
          )}
        </div>
      </main>
    </div>
  )
}