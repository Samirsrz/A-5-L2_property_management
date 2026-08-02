


const API_URL = process.env.NEXT_PUBLIC_API_URL



export async function createRentalRequest(token: string, propertyId: string, startTime: string, endTime: string) {
  const res = await fetch(`${API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ propertyId, startTime, endTime }),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("create rental request response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to submit request")
  }

  return data
}


export async function getMyRentals(token: string) {
  const res = await fetch(`${API_URL}/api/rentals`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  // console.log("my rentals response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch rentals")
  }

  return data
}

export async function getLandlordRequests(token: string) {
  const res = await fetch(`${API_URL}/api/landlord/requests`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  console.log("landlord requests response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch requests")
  }

  return data
}

export async function updateRequestStatus(token: string, requestId: string, status: "APPROVED" | "REJECTED") {
  const res = await fetch(`${API_URL}/api/landlord/requests/${requestId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("update request status response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to update request")
  }

  return data
}


export async function getRentalRequestById(token: string, id: string) {
  const res = await fetch(`${API_URL}/api/rentals/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  console.log("rental request detail response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch request")
  }

  return data
}