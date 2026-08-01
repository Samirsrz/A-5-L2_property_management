"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createRentalRequest } from "@/services/rentals"

export async function submitRequestAction(formData: FormData) {
  const propertyId = formData.get("propertyId") as string
  const startTime = formData.get("startTime") as string
  const endTime = formData.get("endTime") as string

  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  console.log("submitRequestAction called for property:", propertyId)

  if (!token) {
    redirect("/login")
  }

  await createRentalRequest(token, propertyId, startTime, endTime)

  redirect(`/dashboard/tenant`)
}