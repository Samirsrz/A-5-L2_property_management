



export async function createReview(token: string, rentalRequestId: string, rating: number, comment: string) {
  const res = await fetch("http://localhost:5000/api/reviews", {
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