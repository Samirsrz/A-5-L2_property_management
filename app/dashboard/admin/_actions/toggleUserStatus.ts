"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { updateUserStatus } from "@/services/admin"

export async function toggleUserStatusAction(userId: string, currentStatus: string): Promise<
  | { success: true }
  | { success: false; message: string }
> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE"

  console.log("toggleUserStatusAction called:", userId, "→", newStatus)

  try {
    await updateUserStatus(token, userId, newStatus)
    revalidatePath("/dashboard/admin/users")
    return { success: true }
  } catch (err) {
    console.error("toggleUserStatusAction error:", err)
    return { success: false, message: err instanceof Error ? err.message : "Failed to update user" }
  }
}