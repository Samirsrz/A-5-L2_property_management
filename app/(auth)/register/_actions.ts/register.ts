"use server"

import { registerUser } from "@/services/auth"
import { redirect } from "next/navigation"


export async function registerAction(formData:FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string


//  console.log("registerAction called with:", email, role)

  await registerUser(name, email, password, role)

  redirect("/login")

}