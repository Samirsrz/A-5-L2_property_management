import { cookies } from "next/headers"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { confirmPayment } from "@/services/payments"
import { Button } from "@/components/ui/button"

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string

  if (!session_id) {
    return <div className="p-8">Missing session information.</div>
  }

  const result = await confirmPayment(token, session_id)

  console.log("payment success page, confirm result:", result)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
      <h1 className="text-2xl font-bold text-foreground">Payment Successful</h1>
      <p className="text-muted-foreground mt-2">Your rental is now active. Welcome home!</p>
      <Button asChild className="mt-6">
        <Link href="/dashboard/tenant">Go to Dashboard</Link>
      </Button>
    </div>
  )
}