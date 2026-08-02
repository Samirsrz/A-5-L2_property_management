import { cookies } from "next/headers"
import { UserProfile } from "../../tenant/_components/user-profile"
// import { UserProfile } from "@/components/user-profile"

export default async function LandlordProfilePage() {
  const cookieStore = await cookies()
  const name = cookieStore.get("name")?.value
  const email = cookieStore.get("email")?.value

  return <UserProfile name={name} email={email} role="Landlord Account" />
}