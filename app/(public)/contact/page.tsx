import { Mail, Phone, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function ContactPage() {
  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'shahilahamed2001@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+8801805999267',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Dhaka, Bangladesh',
    },
  ]

  return (
    <main className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-lg w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Get in Touch
          </h1>
          <p className="text-base text-muted-foreground">
            We&apos;d love to hear from you
          </p>
        </div>

        {/* Contact Card */}
        <Card className="p-8">
          <div className="space-y-6">
            {contactItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary mt-0.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-base text-foreground break-words">
                      {item.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </main>
  )
}
