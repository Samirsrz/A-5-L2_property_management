import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createPayment } from "@/services/payments"

export default async function PayPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string

  const result = await createPayment(token, id)

  console.log("pay page, checkout url:", result.data.checkoutUrl)

  redirect(result.data.checkoutUrl)
}