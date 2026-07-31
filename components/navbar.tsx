'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { logoutAction } from '@/actions/auth'

type NavbarProps = {
  isLoggedIn: boolean
  initials?: string
  name?: string
}

export function Navbar({ isLoggedIn, initials, name }: NavbarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isActive = (path: string) => pathname === path
  const navLinks = [{ label: 'Browse Properties', href: '/properties' }]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-primary font-bold">R</span>
          </div>
          RentHub
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors ${isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {isLoggedIn ? (
          <div className="hidden md:flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">{initials}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" asChild><Link href="/login">Log in</Link></Button>
            <Button asChild><Link href="/register">Sign up</Link></Button>
          </div>
        )}

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[60vw]">
              <div className="flex flex-col gap-6 py-6">
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${isActive(link.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>

                {isLoggedIn ? (
                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{name}</p>
                      <form action={logoutAction}>
                        <button type="submit" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Log out</button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 border-t border-border pt-4">
                    <Button variant="outline" asChild className="w-full"><Link href="/login">Log in</Link></Button>
                    <Button asChild className="w-full"><Link href="/register">Sign up</Link></Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}