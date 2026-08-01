'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { updateStatusAction } from "../requests/_actions/updateStatus"

export function RequestActions({ requestId }: { requestId: string }) {
  const [isPending, setIsPending] = useState(false)

  async function handle(status: "APPROVED" | "REJECTED") {
    setIsPending(true)
    await updateStatusAction(requestId, status)
    setIsPending(false)
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" disabled={isPending} onClick={() => handle("APPROVED")}>Approve</Button>
      <Button size="sm" variant="outline" disabled={isPending} onClick={() => handle("REJECTED")}>Reject</Button>
    </div>
  )
}