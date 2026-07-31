import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const role = cookieStore.get("role")?.value

  console.log("ADMIN layout check, role:", role)

  if (role !== "ADMIN") {
    redirect("/login")
  }
  return <div>{children}</div>
}