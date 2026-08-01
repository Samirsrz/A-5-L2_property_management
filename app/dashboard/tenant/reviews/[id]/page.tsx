'use client'

import { useState } from "react"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { leaveReviewAction } from "../../_actions/leaveReview"

export default function LeaveReviewPage() {
  const params = useParams()
//   console.log("rentalRequestId in form:", params.id)
  const router = useRouter()
  const [rating, setRating] = useState(5)

  async function handleSubmit(formData: FormData) {
    const result = await leaveReviewAction(formData)
    if (!result.success) {
      toast.error(result.message)
      return
    }
    toast.success("Review submitted")
    router.push("/dashboard/tenant")
  }

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="mx-auto max-w-md px-4">
        <h1 className="text-2xl font-bold text-foreground">Leave a Review</h1>
        <form action={handleSubmit} className="mt-6 space-y-4">
          <input type="hidden" name="rentalRequestId" value={params.id as string} />
          <div>
            <label className="text-sm font-medium">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              min={1}
              max={5}
              required
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-1 block w-full border border-border rounded-md p-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Comment</label>
            <textarea name="comment" required className="mt-1 block w-full border border-border rounded-md p-2" />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground rounded-md py-2 font-semibold">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  )
}