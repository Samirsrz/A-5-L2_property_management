import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <XCircle className="h-16 w-16 text-red-600 mb-4" />
      <h1 className="text-2xl font-bold text-foreground">Payment Cancelled</h1>
      <p className="text-muted-foreground mt-2">No charge was made. You can try again anytime from your dashboard.</p>
      <Button asChild className="mt-6">
        <Link href="/dashboard/tenant">Back to Dashboard</Link>
      </Button>
    </div>
  )
}