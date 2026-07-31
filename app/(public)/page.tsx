import { HeroSection } from './_components/hero-section'
import { FeaturesSection } from './_components/features-section'

import { StatsSection } from './_components/stats-section'
import { CTASection } from './_components/cta-section'
import { HowItWorksSection } from './_components/howItworkts'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />
    </>
  )
}