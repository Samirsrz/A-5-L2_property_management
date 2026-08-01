import { cookies } from "next/headers"

export default async function TenantProfilePage() {
  const cookieStore = await cookies()
  const name = cookieStore.get("name")?.value
  const email = cookieStore.get("email")?.value

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-foreground">Profile</h1>
      <div className="mt-6 space-y-2">
        <p><span className="text-muted-foreground">Name:</span> {name}</p>
        <p><span className="text-muted-foreground">Email:</span> {email}</p>
        <p><span className="text-muted-foreground">Role:</span> Tenant</p>
      </div>
    </div>
  )
}