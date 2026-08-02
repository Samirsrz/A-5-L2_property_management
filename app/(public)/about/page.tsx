'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, Lock, MessageSquare } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: CheckCircle2,
      title: 'Verified Listings',
      description: 'All properties are verified and vetted for authenticity'
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'Encrypted transactions and protected financial data'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Connect directly with property owners and tenants'
    }
  ]

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            About RentHub
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            RentHub connects tenants and landlords across Bangladesh with a platform built on trust. We provide verified listings, secure online payments, and direct communication tools to make renting seamless and transparent for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-6 text-center border border-border hover:bg-secondary/30 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
