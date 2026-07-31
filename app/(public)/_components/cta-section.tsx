'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

export function CTASection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 px-4 bg-background">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground text-balance">
          Ready to find your next rental?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of happy tenants and landlords using RentHub to find their perfect match.
        </p>
        <Button asChild size="lg" className="px-8">
          <Link href="/properties">Browse Properties Now</Link>
        </Button>
      </motion.div>
    </section>
  )
}
