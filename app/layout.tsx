import { Geist, Geist_Mono } from "next/font/google"
import { cookies } from "next/headers"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
// import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const name = cookieStore.get('name')?.value

  const isLoggedIn = !!accessToken
  const initials = name ? name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase() : undefined

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>
          <Navbar isLoggedIn={isLoggedIn} initials={initials} name={name} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}