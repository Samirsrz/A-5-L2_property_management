'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { logoutAction } from '@/actions/auth'

type NavbarProps = {
  isLoggedIn: boolean
  initials?: string
  name?: string
  email?: string
  role?: string
}

export function Navbar({ isLoggedIn, initials, name, email, role }: NavbarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isActive = (path: string) => pathname === path
  const navLinks = [{ label: 'Browse Properties', href: '/properties' }]

  const dashboardHref =
    role === 'LANDLORD' ? '/dashboard/landlord'
    : role === 'ADMIN' ? '/dashboard/admin'
    : '/dashboard/tenant'

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-primary transition-colors hover:text-primary/90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
            <span className="text-primary font-bold text-sm">R</span>
          </div>
          <span className="tracking-tight">RentHub</span>
        </Link>

        {/* <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`transition-colors text-sm font-medium tracking-wide ${isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              {link.label}
            </Link>
          ))}
        </div> */}

        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Button variant="outline" asChild><Link href="/login">Log in</Link></Button>
              <Button asChild><Link href="/register">Sign up</Link></Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer border-0 bg-transparent">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">{initials}</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-foreground">{name}</p>
                    <p className="text-xs text-muted-foreground font-normal">{email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={dashboardHref}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <form action={logoutAction}>
                  <button type="submit" className="w-full">
                    <DropdownMenuItem variant="destructive">
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[60vw] flex flex-col">
              <div className="flex-1 flex flex-col gap-6 py-6">
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`transition-colors text-sm font-medium px-3 py-2 rounded-md ${isActive(link.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {!isLoggedIn ? (
                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  <Button variant="outline" asChild className="w-full"><Link href="/login">Log in</Link></Button>
                  <Button asChild className="w-full"><Link href="/register">Sign up</Link></Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 border-t border-border pt-4">
                  <div className="flex items-center gap-3 px-2 py-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                  </div>
                  <Link href={dashboardHref} onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <form action={logoutAction}>
                    <button type="submit" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left w-full">
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </form>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}