"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginUserDB } from "@/services/auth"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("loginAction called with:", email)

  const result = await loginUserDB(email, password)

  console.log("login response:", result)

  const data = result.data

  const cookieStore = await cookies()

  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge:60*60*24
  })

  cookieStore.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge:60*60*24*7
  })

  cookieStore.set("role", data.user.role, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge:60*60*24
  })
 cookieStore.set("name", data.user.name, {
         httpOnly: true,
         sameSite: "lax", 
         secure: false,
         path: "/" ,
         maxAge:60*60*24
    })
cookieStore.set("email", data.user.email, { httpOnly: true, sameSite: "lax", secure: false, path: "/",maxAge:60*60*24 })


  if (data.user.role === "LANDLORD") {
    redirect("/dashboard/landlord")
  } else if (data.user.role === "ADMIN") {
    redirect("/dashboard/admin")
  } else {
    redirect("/dashboard/tenant")
  }
}