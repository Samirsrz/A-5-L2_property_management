import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function LandlordLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const role = cookieStore.get("role")?.value

  console.log("LANDLORD  layout check, role:", role)

  if (role !== "LANDLORD") {
    redirect("/login")
  }

  return <div>{children}</div>
}