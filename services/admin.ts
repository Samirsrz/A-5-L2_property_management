export async function getAllUsers(token: string) {
  const res = await fetch("http://localhost:5000/api/admin/users", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  console.log("admin users response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch users")
  }

  return data
}

export async function getAllPropertiesAdmin(token: string) {
  const res = await fetch("http://localhost:5000/api/admin/properties", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  console.log("admin properties response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch properties")
  }

  return data
}

export async function getAllRentalsAdmin(token: string) {
  const res = await fetch("http://localhost:5000/api/admin/rentals", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  console.log("admin rentals response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch rentals")
  }

  return data
}

export async function updateUserStatus(token: string, userId: string, status: "ACTIVE" | "BANNED") {
  const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("update user status response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to update user status")
  }

  return data
}


export async function getAllPaymentsAdmin(token: string) {
  const res = await fetch("http://localhost:5000/api/admin/payments", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  console.log("admin payments response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch payments")
  }

  return data
}