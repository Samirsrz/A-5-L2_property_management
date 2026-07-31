'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=800&fit=crop"
          alt="Beautiful apartment"
          fill
          priority
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary/20 z-10" />
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl text-balance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          Find your next home, faster
        </motion.h1>
        <motion.p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl text-balance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
          Discover verified rental properties in minutes, not months. Connect directly with landlords and move in with confidence.
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
          <Button asChild size="lg" className="px-8"><Link href="/properties">Browse Properties</Link></Button>
          <Button asChild variant="outline" size="lg" className="px-8 border-white text-white hover:bg-white/10"><Link href="/register">List Your Property</Link></Button>
        </motion.div>
      </motion.div>
    </section>
  )
}