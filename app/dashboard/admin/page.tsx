import { cookies } from "next/headers"
import { getAllUsers, getAllPropertiesAdmin, getAllRentalsAdmin } from "@/services/admin"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



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

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const [usersResult, propertiesResult, rentalsResult] = await Promise.all([
    getAllUsers(token),
    getAllPropertiesAdmin(token),
    getAllRentalsAdmin(token),
  ])

  const users = usersResult.data
  const properties = propertiesResult.data
  const rentals:Rental[] = rentalsResult.data

//   console.log("admin dashboard, counts:", users?.length, properties?.length, rentals?.length)

  const pendingCount = rentals?.filter((r) => r.status === "PENDING").length || 0

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Platform Overview</h1>
            <p className="text-muted-foreground mt-2">Global stats across RentHub.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Total Users</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Tenants & landlords</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Total Properties</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{properties?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Listed platform-wide</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Pending Requests</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting landlord action</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}