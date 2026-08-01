import { cookies } from "next/headers"
import { Home, KeySquare } from "lucide-react"
import { getMyRentals } from "@/services/rentals"
import { logoutAction } from "@/actions/auth"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  APPROVED: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  REJECTED: "bg-red-100 text-red-800 hover:bg-red-100",
  ACTIVE: "bg-green-100 text-green-800 hover:bg-green-100",
  COMPLETED: "bg-gray-100 text-gray-800 hover:bg-gray-100",
}

type Rental = {
  id: string
  tenantId: string
  propertyId: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED" | "CANCELLED"
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
  property?: {
    id: string
    title: string
    location: string | null
    price: string
  }
}
export default async function TenantDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getMyRentals(token)
  const rentals: Rental[] = result.data.result

  console.log("tenant dashboard, rentals count:", rentals?.length)

  const activeCount = rentals?.filter((r) => r.status === "ACTIVE").length || 0
  const pendingCount = rentals?.filter((r) => r.status === "PENDING").length || 0

  const user = {
    name: name || "Tenant",
    role: "Tenant",
    initials: name ? name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() : "T",
  }

  return (
    <div className="flex">
      <DashboardSidebar role="TENANT" user={user} onLogout={logoutAction}  />

      <main className="flex-1 md:pt-0 pt-16">
        <div className="p-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {name}!</h1>
            <p className="text-muted-foreground mt-2">Here is an overview of your rental activity.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Active Rentals</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Currently renting</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Pending Requests</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting landlord approval</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>My Rental Requests</CardTitle></CardHeader>
            <CardContent>
              {rentals?.length > 0 ? (
                <div className="space-y-4">
                  {rentals.map((rental) => (
                    <div key={rental.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{rental.property?.title}</p>
                        <p className="text-xs text-muted-foreground">{rental.property?.location}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={statusStyles[rental.status]}>{rental.status}</Badge>
                        {rental.status === "APPROVED" && (
                          <p><a href={`/dashboard/tenant/requests/${rental.id}/pay`} className="text-xs text-primary underline block">Pay Now</a></p>
                        )}
                        {rental.status === "ACTIVE" && (
                          <p><a href={`/properties/${rental.propertyId}/review`} className="text-xs text-primary underline block">Leave Review</a></p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No rental requests yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}