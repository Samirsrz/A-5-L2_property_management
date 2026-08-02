


const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function createReview(token: string, rentalRequestId: string, rating: number, comment: string) {
  const res = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ rentalRequestId, rating, comment }),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("create review response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to submit review")
  }

  return data
}