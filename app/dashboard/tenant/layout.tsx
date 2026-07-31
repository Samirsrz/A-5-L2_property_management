import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function TenantLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const role = cookieStore.get("role")?.value

  console.log("tenant layout check, role:", role)

  if (role !== "TENANT") {
    redirect("/login")
  }

  return <div>{children}</div>
}