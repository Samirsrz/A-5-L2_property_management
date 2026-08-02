import { cookies } from "next/headers"
import { getPropertyById } from "@/services/properties"
import { EditPropertyForm } from "../../../_components/edit-property-form"


type Property = {
  id: string
  landlordId: string
  type: "APARTMENT" | "HOUSE" | "STUDIO" | "CONDO" | "ROOM"
  title: string
  description: string
  location: string | null
  price: string
  amenities: string[]
  images: string[]
  isAvailable: boolean
  createdAt: string
  updatedAt: string
  landlord?: {
    id: string
    name: string
    email: string
    role: string
  }
}
export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string

  const result = await getPropertyById(id)
  const property: Property = result.data

  console.log("edit property page, loaded:", property?.title)

  return <EditPropertyForm property={property} />
}