import { cookies } from "next/headers"
import { getAllPaymentsAdmin } from "@/services/admin"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"




type AdminPayment = {
  id: string
  transactionId: string
  amount: string
  method: "STRIPE" | "SSLCOMMERZ"
  status: "PENDING" | "COMPLETED" | "FAILED"
  paidAt: string | null
  createdAt: string
  rentalRequest: {
    property: {
      title: string
      landlord: { name: string; email: string }
    }
    tenant: { name: string; email: string }
  }
}

const paymentStatusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  COMPLETED: "bg-green-100 text-green-800 hover:bg-green-100",
  FAILED: "bg-red-100 text-red-800 hover:bg-red-100",
}

export default async function AdminPaymentsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getAllPaymentsAdmin(token)
  const payments: AdminPayment[] = result.data

  console.log("admin payments page, count:", payments?.length)

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
          <h1 className="text-3xl font-bold text-foreground">All Payments</h1>

          <Card className="mt-8">
            <CardHeader><CardTitle>Platform Payments</CardTitle></CardHeader>
            <CardContent>
              {payments?.length > 0 ? (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{payment.rentalRequest.property.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Tenant: {payment.rentalRequest.tenant.name} · Landlord: {payment.rentalRequest.property.landlord.name}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium text-sm">${Number(payment.amount).toLocaleString()}</p>
                        <Badge className={paymentStatusStyles[payment.status]}>{payment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No payments found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}