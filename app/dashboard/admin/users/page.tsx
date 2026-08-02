import { cookies } from "next/headers"
import { getAllUsers } from "@/services/admin"
import { logoutAction } from "@/actions/auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserStatusToggle } from "../_components/user-status-toggle"


type User = {
  id: string
  name: string
  email: string
  role: "TENANT" | "LANDLORD" | "ADMIN"
  status: "ACTIVE" | "BANNED"
  createdAt: string
}



export default async function AdminUsersPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value as string
  const name = cookieStore.get("name")?.value

  const result = await getAllUsers(token)
  const users:User[] = result.data

  console.log("admin users page, count:", users?.length)

  const user = {
    name: name || "Admin",
    role: "Admin",
    initials: name ? name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() : "A",
  }

  return (
    <div className="flex">
      <DashboardSidebar role="ADMIN" user={user} onLogout={logoutAction} />

      <main className="flex-1 md:pt-0 pt-16">
        <div className="p-8 max-w-5xl">
          <h1 className="text-3xl font-bold text-foreground">Users</h1>

          <Card className="mt-8">
            <CardHeader><CardTitle>All Users</CardTitle></CardHeader>
            <CardContent>
              {users?.length > 0 ? (
                <div className="space-y-4">
                  {users.map((u) => (
                    <div key={u.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium text-sm">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email} · {u.role}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={u.status === "ACTIVE" ? "default" : "destructive"}>{u.status}</Badge>
                        <UserStatusToggle userId={u.id} currentStatus={u.status} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No users found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}