"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createProperty } from "@/services/properties"

export async function createPropertyAction(formData: FormData): Promise<
  | { success: true }
  | { success: false; message: string }
> {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const location = formData.get("location") as string
  const price = Number(formData.get("price"))
  const type = formData.get("type") as string
  const amenitiesRaw = formData.get("amenities") as string
  const imagesRaw = formData.get("images") as string

  const amenities = amenitiesRaw ? amenitiesRaw.split(",").map((a) => a.trim()).filter(Boolean) : []
  const images = imagesRaw ? imagesRaw.split(",").map((i) => i.trim()).filter(Boolean) : []

  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string

  // console.log("createPropertyAction called:", title, type)

  try {
    await createProperty(token, { title, description, location, price, type, amenities, images })
    revalidatePath("/dashboard/landlord/properties")
    return { success: true }
  } catch (err) {
    // console.error("createPropertyAction error:", err)
    return { success: false, message: err instanceof Error ? err.message : "Failed to create property" }
  }
}