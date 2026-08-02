import { cookies } from "next/headers"
import { getLandlordEarnings } from "@/services/payments"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import type { LandlordEarnings } from "@/types/payment"

export type LandlordEarnings = {
  totalEarnings: number
  paymentCount: number
  payments: {
    id: string
    amount: string
    paidAt: string | null
    rentalRequest: {
      property: { title: string }
      tenant: { name: string }
    }
  }[]
}


export default async function LandlordPaymentsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getLandlordEarnings(token)
  const earnings: LandlordEarnings = result.data

  console.log("landlord payments page, count:", earnings.payments.length)

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
          <h1 className="text-3xl font-bold text-foreground">Payment History</h1>
          <p className="text-muted-foreground mt-2">
            ${earnings.totalEarnings.toLocaleString()} earned across {earnings.paymentCount} payments
          </p>

          <Card className="mt-8">
            <CardHeader><CardTitle>All Payments</CardTitle></CardHeader>
            <CardContent>
              {earnings.payments.length > 0 ? (
                <div className="space-y-4">
                  {earnings.payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{payment.rentalRequest.property.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Paid by {payment.rentalRequest.tenant.name}
                          {payment.paidAt && ` · ${new Date(payment.paidAt).toLocaleDateString()}`}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">${Number(payment.amount).toLocaleString()}</p>
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