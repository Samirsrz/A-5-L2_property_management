export async function createRentalRequest(token: string, propertyId: string, startTime: string, endTime: string) {
  const res = await fetch("http://localhost:5000/api/rentals", {
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
  const res = await fetch("http://localhost:5000/api/rentals", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  console.log("my rentals response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch rentals")
  }

  return data
}