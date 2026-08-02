import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  // console.log("dashboard layout check, accessToken present:", !!accessToken)

  if (!accessToken) {
    redirect("/login")
  }

  return <div>{children}</div>
}