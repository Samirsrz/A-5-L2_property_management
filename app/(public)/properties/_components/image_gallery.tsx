'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Home } from 'lucide-react'

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="mb-8 rounded-xl overflow-hidden bg-muted aspect-video flex items-center justify-center">
        <Home className="w-16 h-16 text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="mb-8 rounded-xl overflow-hidden">
      <div className="relative w-full bg-muted">
        <Image src={images[selectedIndex]} alt={title} width={1200} height={600} className="w-full h-auto aspect-video object-cover" priority />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === idx ? 'border-primary' : 'border-border hover:border-primary/50'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} width={80} height={80} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}