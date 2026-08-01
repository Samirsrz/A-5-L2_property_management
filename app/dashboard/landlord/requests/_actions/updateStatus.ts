"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { updateRequestStatus } from "@/services/rentals"

export async function updateStatusAction(requestId: string, status: "APPROVED" | "REJECTED"): Promise<
  | { success: true }
  | { success: false; message: string }
> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string

  console.log("updateStatusAction called:", requestId, status)

  try {
    await updateRequestStatus(token, requestId, status)
    revalidatePath("/dashboard/landlord/requests")
    return { success: true }
  } catch (err) {
    console.error("updateStatusAction error:", err)
    return { success: false, message: err instanceof Error ? err.message : "Failed to update request" }
  }
}