const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createPayment(token: string, rentalRequestId: string) {
  const res = await fetch(`${API_URL}/api/payments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ rentalRequestId }),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("create payment response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to start payment")
  }

  return data
}

export async function confirmPayment(token: string, sessionId: string) {
  const res = await fetch(`${API_URL}/api/payments/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ transactionId: sessionId }),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("confirm payment response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to confirm payment")
  }

  return data
}
export async function getMyPayments(token: string) {
  const res = await fetch(`${API_URL}/api/payments`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  // console.log("my payments response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch payments")
  }

  return data
}


export async function getLandlordEarnings(token: string) {
  const res = await fetch(`${API_URL}/api/payments/landlord/earnings`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

  console.log("landlord earnings response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch earnings")
  }

  return data
}