'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, MessageCircle } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'All properties are verified and vetted by our team for authenticity and safety.',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'Stripe-backed secure payment processing with buyer and seller protection.',
  },
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    description: 'Chat directly with landlords and tenants. No middlemen, just clear conversations.',
  },
]

function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  index: number
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors"
    >
      <div className="mb-4 p-3 rounded-full bg-primary/10">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}

export function FeaturesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">Why choose RentHub</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re revolutionizing the rental experience with trust, security, and transparency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
