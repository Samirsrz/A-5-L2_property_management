import { cookies } from "next/headers"
import { getMyPayments } from "@/services/payments"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const paymentStatusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  COMPLETED: "bg-green-100 text-green-800 hover:bg-green-100",
  FAILED: "bg-red-100 text-red-800 hover:bg-red-100",
}
export type Payment = {
  id: string
  transactionId: string
  rentalRequestId: string
  amount: string
  method: "STRIPE" | "SSLCOMMERZ"
  status: "PENDING" | "COMPLETED" | "FAILED"
  paidAt: string | null
  createdAt: string
  rentalRequest?: {
    id: string
    property?: {
      id: string
      title: string
      location: string | null
    }
  }
}
export default async function TenantPaymentsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getMyPayments(token)
  const payments:Payment[] = result.data

//   console.log("tenant payments page, count:", payments?.length)

  const user = {
    name: name || "Tenant",
    role: "Tenant",
    initials: name ? name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() : "T",
  }

  return (
    <div className="flex">
      <DashboardSidebar role="TENANT" user={user} onLogout={logoutAction} />

      <main className="flex-1 md:pt-0 pt-16">
        <div className="p-8 max-w-5xl">
          <h1 className="text-3xl font-bold text-foreground">Payment History</h1>

          <Card className="mt-8">
            <CardHeader><CardTitle>Your Payments</CardTitle></CardHeader>
            <CardContent>
              {payments?.length > 0 ? (
                <div className="space-y-4">
                  {payments.map((payment: Payment) => (
                    <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{payment.rentalRequest?.property?.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "Not yet paid"}
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
                <p className="text-muted-foreground text-sm">No payments yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}