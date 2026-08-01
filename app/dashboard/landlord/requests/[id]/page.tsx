import { cookies } from "next/headers"
import Link from "next/link"
import { ArrowLeft, Mail, Calendar } from "lucide-react"
import { getRentalRequestById } from "@/services/rentals"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  APPROVED: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  REJECTED: "bg-red-100 text-red-800 hover:bg-red-100",
  ACTIVE: "bg-green-100 text-green-800 hover:bg-green-100",
  COMPLETED: "bg-gray-100 text-gray-800 hover:bg-gray-100",
}

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string

  const result = await getRentalRequestById(token, id)
  const request = result.data.result

  console.log("request detail page:", request?.id)

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/dashboard/landlord/requests" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to requests
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">{request.property?.title}</h1>
        <Badge className={statusStyles[request.status]}>{request.status}</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle>Tenant</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <p className="font-medium">{request.tenant?.name}</p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" /> {request.tenant?.email}
          </p>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader><CardTitle>Booking Dates</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <p className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Move-in: {new Date(request.startTime).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Move-out: {new Date(request.endTime).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}