import { cookies } from "next/headers"
import { getAllRentalsAdmin } from "@/services/admin"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export type Rental = {
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
  tenant?: {
    id: string
    name: string
    email: string
  }
}



const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  APPROVED: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  REJECTED: "bg-red-100 text-red-800 hover:bg-red-100",
  ACTIVE: "bg-green-100 text-green-800 hover:bg-green-100",
  COMPLETED: "bg-gray-100 text-gray-800 hover:bg-gray-100",
}

export default async function AdminRentalsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getAllRentalsAdmin(token)
  const rentals:Rental[] = result.data

  console.log("admin rentals page, count:", rentals?.length)

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
          <h1 className="text-3xl font-bold text-foreground">All Rental Requests</h1>

          <Card className="mt-8">
            <CardHeader><CardTitle>Rentals</CardTitle></CardHeader>
            <CardContent>
              {rentals?.length > 0 ? (
                <div className="space-y-4">
                  {rentals.map((r) => (
                    <div key={r.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{r.property?.title}</p>
                        <p className="text-xs text-muted-foreground">Tenant: {r.tenant?.name}</p>
                      </div>
                      <Badge className={statusStyles[r.status]}>{r.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No rental requests found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}