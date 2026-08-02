"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { deleteProperty } from "@/services/properties"

export async function deletePropertyAction(propertyId: string): Promise<
  | { success: true }
  | { success: false; message: string }
> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string

  console.log("deletePropertyAction called:", propertyId)

  try {
    await deleteProperty(token, propertyId)
    revalidatePath("/dashboard/landlord/properties")
    return { success: true }
  } catch (err) {
    console.error("deletePropertyAction error:", err)
    return { success: false, message: err instanceof Error ? err.message : "Failed to delete property" }
  }
}