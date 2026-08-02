import { cookies } from "next/headers"
import { getLandlordRequests } from "@/services/rentals"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RequestActions } from "../_components/request-actions"
import Link from "next/link"
// import { RequestActions } from "./_components/request-actions"




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

export default async function LandlordRequestsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getLandlordRequests(token)
  const requests: Rental[] = result.data.result

  console.log("landlord requests page, count:", requests?.length)

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
          <h1 className="text-3xl font-bold text-foreground">Rental Requests</h1>

          <Card className="mt-8">
            <CardHeader><CardTitle>Incoming Requests</CardTitle></CardHeader>
            <CardContent>
              {requests?.length > 0 ? (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <Link href={`/dashboard/landlord/requests/${request.id}`} key={request.id} className="flex items-center justify-between border-b pb-4 last:border-0 hover:bg-muted/50 rounded px-2 -mx-2 transition-colors">
                      <div>
                        <p className="font-medium text-sm">{request.property?.title}</p>
                        <p className="text-xs text-muted-foreground">Tenant: {request.tenant?.name}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={statusStyles[request.status]}>{request.status}</Badge>
                        {request.status === "PENDING" && (
                          <RequestActions requestId={request.id} />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No requests yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}