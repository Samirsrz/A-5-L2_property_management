import { HeroSection } from './_components/hero-section'
import { FeaturesSection } from './_components/features-section'

import { StatsSection } from './_components/stats-section'
import { CTASection } from './_components/cta-section'
import { HowItWorksSection } from './_components/howItworkts'
import { cookies } from 'next/headers'

export default async function HomePage() {


   const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('accessToken')?.value
  const role = cookieStore.get('role')?.value
  return (
    <>
      <HeroSection isLoggedIn={isLoggedIn} role={role}/>
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />
    </>
  )
}