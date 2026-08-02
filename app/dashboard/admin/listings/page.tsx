import { cookies } from "next/headers"
import { getAllPropertiesAdmin } from "@/services/admin"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
export default async function AdminListingsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getAllPropertiesAdmin(token)
  const properties:Property[] = result.data

  console.log("admin listings page, count:", properties?.length)

  const user = {
    name: name || "Admin",
    role: "Admin",
    initials: name ? name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() : "A",
  }

  return (
    <div className="flex">
      <DashboardSidebar role="ADMIN" user={user} onLogout={logoutAction} />

      <main className="flex-1 md:pt-0 pt-16">
        <div className="p-8 max-w-5xl">
          <h1 className="text-3xl font-bold text-foreground">All Listings</h1>

          <Card className="mt-8">
            <CardHeader><CardTitle>Properties</CardTitle></CardHeader>
            <CardContent>
              {properties?.length > 0 ? (
                <div className="space-y-4">
                  {properties.map((p) => (
                    <div key={p.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.location} · {p.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">${Number(p.price).toLocaleString()}/mo</p>
                        <Badge variant={p.isAvailable ? "default" : "secondary"}>
                          {p.isAvailable ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No properties found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}