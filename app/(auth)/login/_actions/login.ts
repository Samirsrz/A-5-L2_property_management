"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginUser } from "@/services/auth"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("loginAction called with:", email)

  const data = await loginUser(email, password)

  console.log("login response:", data)

  const cookieStore = await cookies()
  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge:60*60*24
  })

    if (data.refreshToken) {
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    })
  }

  cookieStore.set("role", data.user?.role || "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  })
 


  if (data.user?.role === "LANDLORD") {
    redirect("/dashboard/landlord")
  } else if (data.user?.role === "ADMIN") {
    redirect("/dashboard/admin")
  } else {
    redirect("/dashboard/tenant")
  }
}