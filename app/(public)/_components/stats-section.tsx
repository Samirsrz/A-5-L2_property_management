'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

const stats = [
  { number: 500, label: 'Properties', suffix: '+' },
  { number: 1200, label: 'Happy Tenants', suffix: '+' },
  { number: 50, label: 'Cities Covered', suffix: '+' },
  { number: 98, label: 'Satisfaction Rate', suffix: '%' },
]

function StatCounter({ number, label, suffix }: { number: number; label: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const increment = number / (duration / 50)

    const timer = setInterval(() => {
      start += increment
      if (start >= number) {
        setCount(number)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [inView, number])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-lg text-muted-foreground">{label}</div>
    </motion.div>
  )
}

export function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 px-4 bg-primary/5 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <StatCounter key={index} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
