import { cookies } from "next/headers"
import { getMyProperties } from "@/services/properties"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  rentalRequests?: {
    id: string
    status: string
  }[]
}
export default async function LandlordDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getMyProperties(token)
  const properties: Property[] = result.data

  // console.log("landlord dashboard, properties count:", properties?.length)

  const totalRequests = properties?.reduce(
    (sum, p) => sum + (p.rentalRequests?.length || 0),
    0
  ) || 0

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {name}!</h1>
            <p className="text-muted-foreground mt-2">Here is an overview of your properties.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Total Properties</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{properties?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Listed properties</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Total Requests</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRequests}</div>
                <p className="text-xs text-muted-foreground mt-1">Across all properties</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>My Properties</CardTitle></CardHeader>
            <CardContent>
              {properties?.length > 0 ? (
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{property.title}</p>
                        <p className="text-xs text-muted-foreground">{property.location}</p>
                      </div>
                      <p className="font-medium text-sm">${Number(property.price).toLocaleString()}/mo</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No properties listed yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}