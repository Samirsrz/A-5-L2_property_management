'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Home,
  KeySquare,
  Building2,
  ClipboardList,
  Users,
  ChevronLeft,
  Menu,
  LogOut,
  CreditCard,
  User,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const navByRole = {
  TENANT: [
    { label: 'Dashboard', href: '/dashboard/tenant', icon: Home },
    { label: 'Browse Properties', href: '/properties', icon: KeySquare },
    { label: 'Payments', href: '/dashboard/tenant/payments', icon: CreditCard },
    { label: 'Profile', href: '/dashboard/tenant/profile', icon: User },
  ],
  LANDLORD: [
    { label: 'Dashboard', href: '/dashboard/landlord', icon: Home },
    { label: 'My Properties', href: '/dashboard/landlord/properties', icon: Building2 },
    { label: 'Requests', href: '/dashboard/landlord/requests', icon: ClipboardList },
    { label: 'Payments', href: '/dashboard/landlord/payments', icon: CreditCard },
    { label: 'Profile', href: '/dashboard/landlord/profile', icon: User }
  ],
  ADMIN: [
    { label: 'Dashboard', href: '/dashboard/admin', icon: Home },
    { label: 'Users', href: '/dashboard/admin/users', icon: Users },
    { label: 'Listings', href: '/dashboard/admin/listings', icon: Building2 },
  ],
}

interface DashboardSidebarProps {
  role: 'TENANT' | 'LANDLORD' | 'ADMIN'
  user: {
    name: string
    role: string
    initials: string
  }
  onLogout: () => void
}

export function DashboardSidebar({ role, user, onLogout }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navItems = navByRole[role]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed left-0 top-0 h-screen border-r border-border bg-card transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                <span className="text-primary font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-sm">RentHub</span>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
            <ChevronLeft className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative group ${
                  active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r" />}
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium flex-1">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">{user.initials}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <Badge variant="secondary" className="text-xs mt-1">{user.role}</Badge>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size={isCollapsed ? 'icon' : 'sm'}
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 justify-start"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2 text-sm">Log out</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center gap-2 bg-card border-b border-border px-4 h-16">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 flex flex-col">
            <div className="flex items-center gap-2 h-16 px-4 border-b border-border">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                <span className="text-primary font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-sm">RentHub</span>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative ${
                      active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r" />}
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
            <div className="border-t border-border p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">{user.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <Badge variant="secondary" className="text-xs mt-1">{user.role}</Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 justify-start"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-2 text-sm">Log out</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <span className="text-primary font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-sm">Dashboard</span>
        </div>
      </div>

      <div className={`hidden md:block transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`} />
    </>
  )
}