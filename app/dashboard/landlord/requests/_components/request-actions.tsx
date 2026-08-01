'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { updateStatusAction } from "../_actions/updateStatus"

export function RequestActions({ requestId }: { requestId: string }) {
  const [isPending, setIsPending] = useState(false)

  async function handle(status: "APPROVED" | "REJECTED") {
    setIsPending(true)
    const result = await updateStatusAction(requestId, status)
    setIsPending(false)

    if (!result.success) {
      toast.error(result.message)
      return
    }
    toast.success(status === "APPROVED" ? "Request approved" : "Request rejected")
  }

  return (
 
   
    <div className="flex gap-2">
      <Button size="sm" disabled={isPending} onClick={() => handle("APPROVED")}>Approve</Button>
      <Button size="sm" variant="outline" disabled={isPending} onClick={() => handle("REJECTED")}>Reject</Button>
    </div>
  )
}