'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Mail, ShieldCheck } from 'lucide-react'

interface UserProfileProps {
  name?: string
  email?: string
  role?: string
}

export function UserProfile({
  name = 'Sarah Johnson',
  email = 'sarah.johnson@example.com',
  role = 'Tenant Account',
}: UserProfileProps) {
  // Generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const initials = getInitials(name)

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4 py-12">
      <Card className="w-full max-w-md p-8">
        {/* Avatar Section */}
        <div className="flex justify-center mb-6">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name and Role Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-3">{name}</h1>
          <Badge variant="secondary" className="inline-block">
            {role}
          </Badge>
        </div>

        {/* Info List Section */}
        <div className="space-y-4">
          {/* Email Info Row */}
          <div className="flex items-center gap-3 text-foreground">
            <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <span className="text-sm">{email}</span>
          </div>

          {/* Role Info Row */}
          <div className="flex items-center gap-3 text-foreground">
            <ShieldCheck className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <span className="text-sm">{role}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
