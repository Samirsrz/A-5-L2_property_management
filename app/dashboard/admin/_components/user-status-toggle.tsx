'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { toggleUserStatusAction } from "../_actions/toggleUserStatus"

export function UserStatusToggle({ userId, currentStatus }: { userId: string; currentStatus: string }) {
  const [isPending, setIsPending] = useState(false)

  async function handleToggle() {
    setIsPending(true)
    const result = await toggleUserStatusAction(userId, currentStatus)
    setIsPending(false)

    if (!result.success) {
      toast.error(result.message)
      return
    }
    toast.success(currentStatus === "ACTIVE" ? "User banned" : "User unbanned")
  }

  return (
    <Button size="sm" variant={currentStatus === "ACTIVE" ? "destructive" : "outline"} disabled={isPending} onClick={handleToggle}>
      {currentStatus === "ACTIVE" ? "Ban" : "Unban"}
    </Button>
  )
}