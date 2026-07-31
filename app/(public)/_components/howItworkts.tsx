'use client'

import { motion } from 'framer-motion'
import { Search, FileText, Home } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const steps = [
  { number: '01', icon: Search, title: 'Browse Properties', description: 'Explore our extensive catalog of verified rental properties in your desired location.' },
  { number: '02', icon: FileText, title: 'Submit Request', description: 'Express your interest and connect directly with landlords. Chat and negotiate terms.' },
  { number: '03', icon: Home, title: 'Move In', description: 'Complete the rental process and move into your new home with confidence.' },
]

function Step({ index, number, icon: Icon, title, description, isLast }: {
  index: number
  number: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  isLast: boolean
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-10 h-10 text-primary" />
        </div>
        <span className="absolute -top-2 -left-2 text-4xl font-bold text-primary/20">{number}</span>
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {!isLast && (
        <div className="hidden md:block absolute right-0 top-1/4 w-8 h-1 bg-gradient-to-r from-primary to-transparent" />
      )}
    </motion.div>
  )
}

export function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">How it works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding your next rental is simple with RentHub. Three easy steps to your dream home.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Step key={index} index={index} {...step} isLast={index === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}