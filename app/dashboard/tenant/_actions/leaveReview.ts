"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createReview } from "@/services/reviews"

export async function leaveReviewAction(formData: FormData): Promise<
  | { success: true }
  | { success: false; message: string }
> {
  const rentalRequestId = formData.get("rentalRequestId") as string
  const rating = Number(formData.get("rating"))
  const comment = formData.get("comment") as string

  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string

  console.log("leaveReviewAction called:", rentalRequestId, rating)

  try {
    await createReview(token, rentalRequestId, rating, comment)
    revalidatePath("/dashboard/tenant")
    return { success: true }
  } catch (err) {
    console.error("leaveReviewAction error:", err)
    return { success: false, message: err instanceof Error ? err.message : "Failed to submit review" }
  }
}