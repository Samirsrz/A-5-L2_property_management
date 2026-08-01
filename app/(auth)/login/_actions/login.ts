// "use server"

// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
// import { loginUserDB } from "@/services/auth"


// export async function loginAction(formData: FormData) {
//   const email = formData.get("email") as string
//   const password = formData.get("password") as string

//   console.log("loginAction called with:", email)

//   const result = await loginUserDB(email, password)

//   console.log("login response:", result)

//   const data = result.data

//   const cookieStore = await cookies()

//   cookieStore.set("accessToken", data.accessToken, {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: false,
//     path: "/",
//     maxAge:60*60*24
//   })

//   cookieStore.set("refreshToken", data.refreshToken, {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: false,
//     path: "/",
//     maxAge:60*60*24*7
//   })

//   cookieStore.set("role", data.user.role, {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: false,
//     path: "/",
//     maxAge:60*60*24
//   })
//  cookieStore.set("name", data.user.name, {
//          httpOnly: true,
//          sameSite: "lax", 
//          secure: false,
//          path: "/" ,
//          maxAge:60*60*24
//     })
// cookieStore.set("email", data.user.email, { httpOnly: true, sameSite: "lax", secure: false, path: "/",maxAge:60*60*24 })
 
 

//   if (data.user.role === "LANDLORD") {
//     redirect("/dashboard/landlord")
//   } else if (data.user.role === "ADMIN") {
//     redirect("/dashboard/admin")
//   } else {
//     redirect("/dashboard/tenant")
//   }
// }


"use server"

import { cookies } from "next/headers"
import { loginUserDB } from "@/services/auth"

export async function loginAction(formData: FormData): Promise<
  | { success: true; redirectTo: string }
  | { success: false; message: string }
> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    const result = await loginUserDB(email, password)
    const data = result.data

    const cookieStore = await cookies()
    cookieStore.set("accessToken", data.accessToken, { httpOnly: true, sameSite: "lax", secure: false, path: "/" })
    cookieStore.set("refreshToken", data.refreshToken, { httpOnly: true, sameSite: "lax", secure: false, path: "/" })
    cookieStore.set("role", data.user.role, { httpOnly: true, sameSite: "lax", secure: false, path: "/" })
    cookieStore.set("name", data.user.name, { httpOnly: true, sameSite: "lax", secure: false, path: "/" })
    cookieStore.set("email", data.user.email, { httpOnly: true, sameSite: "lax", secure: false, path: "/" })

    const redirectTo =
      data.user.role === "LANDLORD" ? "/dashboard/landlord"
      : data.user.role === "ADMIN" ? "/dashboard/admin"
      : "/dashboard/tenant"

    return { success: true, redirectTo }
  } catch (err) {
    console.error("loginAction error:", err)
    return { success: false, message: err instanceof Error ? err.message : "Login failed" }
  }
}