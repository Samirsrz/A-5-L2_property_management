

export async function loginUserDB(email: string, password: string) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("login response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Login failed")
  }

  return data
}


export async function registerUser(name: string, email: string, password: string, role: string) {
  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, role }),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("register response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Registration failed")
  }

  return data
}




