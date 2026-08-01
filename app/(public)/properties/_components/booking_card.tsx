import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type BookingCardProps = {
  propertyId: string
  price: string
  landlordName: string
  isLoggedIn: boolean
  role?: string
}

export function BookingCard({ propertyId, price, landlordName, isLoggedIn, role }: BookingCardProps) {
  const initials = landlordName.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()

  return (
    <Card className="mb-6 border-border shadow-md">
      <CardContent className="p-6">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-primary">${Number(price).toLocaleString()}</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
        </div>

        {!isLoggedIn ? (
          <Button className="w-full mb-3" size="lg" asChild>
            <Link href="/login">Log in to Request</Link>
          </Button>
        ) : role === 'TENANT' ? (
          <Button className="w-full mb-3" size="lg" asChild>
            <Link href={`/properties/${propertyId}/request`}>Request to Rent</Link>
          </Button>
        ) : (
          <div className="mb-3">
            <Button className="w-full" size="lg" disabled variant="outline">Request to Rent</Button>
            <p className="text-xs text-muted-foreground text-center mt-2">Only tenants can book properties</p>
          </div>
        )}

        <Button disabled variant="outline" className="w-full text-muted-foreground opacity-50 cursor-not-allowed">
          <Lock className="w-4 h-4 mr-2" />
          Pay Now
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-2">Available after your request is approved</p>

        <div className="my-6 border-t border-border" />

        <div>
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide font-semibold">Listed by</p>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{landlordName}</p>
              <p className="text-xs text-muted-foreground">Landlord</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}