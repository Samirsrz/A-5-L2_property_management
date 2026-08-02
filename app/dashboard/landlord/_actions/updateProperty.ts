"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { updateProperty } from "@/services/properties"

export async function updatePropertyAction(propertyId: string, formData: FormData): Promise<
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
  const isAvailable = formData.get("isAvailable") === "on"

  const amenities = amenitiesRaw ? amenitiesRaw.split(",").map((a) => a.trim()).filter(Boolean) : []
  const images = imagesRaw ? imagesRaw.split(",").map((i) => i.trim()).filter(Boolean) : []

  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string

//   console.log("updatePropertyAction called:", propertyId, title)

  try {
    await updateProperty(token, propertyId, { title, description, location, price, type, amenities, images, isAvailable })
    revalidatePath("/dashboard/landlord/properties")
    revalidatePath(`/dashboard/landlord/properties/${propertyId}/edit`)
    return { success: true }
  } catch (err) {
    console.error("updatePropertyAction error:", err)
    return { success: false, message: err instanceof Error ? err.message : "Failed to update property" }
  }
}