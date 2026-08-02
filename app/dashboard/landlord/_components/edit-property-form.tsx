'use client'

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { updatePropertyAction } from "../_actions/updateProperty"




import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Save } from 'lucide-react'
import { FormEvent, useState } from 'react'


type Property = {
  id: string
  landlordId: string
  type: "APARTMENT" | "HOUSE" | "STUDIO" | "CONDO" | "ROOM"
  title: string
  description: string
  location: string | null
  price: string
  amenities: string[]
  images: string[]
  isAvailable: boolean
  createdAt: string
  updatedAt: string
  landlord?: {
    id: string
    name: string
    email: string
    role: string
  }
}





export function EditPropertyForm({ property }: { property: Property }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAvailable, setIsAvailable] = useState(property.isAvailable)
  const [propertyType, setPropertyType] = useState<string>(property.type)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formData.set('type', propertyType)
    formData.set('isAvailable', isAvailable ? 'on' : 'off')

    const result = await updatePropertyAction(property.id, formData)
    setIsSubmitting(false)

    if (!result.success) {
      toast.error(result.message)
      return
    }
    toast.success('Property updated successfully')
    router.push('/dashboard/landlord/properties')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-card border border-border rounded-lg p-8 shadow-sm"
    >
        <p className="font-bold text-4xl ">Make sure you click save button for update</p>
      <div className="my-6">
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">Title</label>
        <Input id="title" name="title" placeholder="e.g. Modern Downtown Apartment" defaultValue={property.title} required className="w-full" />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">Description</label>
        <Textarea id="description" name="description" placeholder="Describe your property in detail..." defaultValue={property.description} rows={5} className="w-full resize-none" />
      </div>

      <div className="mb-6">
        <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">Location</label>
        <Input id="location" name="location" placeholder="e.g. 123 Main St, San Francisco, CA" defaultValue={property.location || ''} required className="w-full" />
      </div>

      <div className="mb-6">
        <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">Price per month</label>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-foreground font-medium pointer-events-none">$</span>
          <Input id="price" name="price" type="number" placeholder="0" defaultValue={property.price} required min="0" step="100" className="w-full pl-8" />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">Property Type</label>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger id="type" className="w-full">
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="APARTMENT">Apartment</SelectItem>
            <SelectItem value="HOUSE">House</SelectItem>
            <SelectItem value="STUDIO">Studio</SelectItem>
            <SelectItem value="CONDO">Condo</SelectItem>
            <SelectItem value="ROOM">Room</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <label htmlFor="amenities" className="block text-sm font-medium text-foreground mb-2">Amenities</label>
        <Input id="amenities" name="amenities" placeholder="e.g. WiFi, Parking, Gym, Pool" defaultValue={property.amenities.join(', ')} className="w-full" />
        <p className="text-xs text-muted-foreground mt-1">Comma-separated list of amenities</p>
      </div>

      <div className="mb-6">
        <label htmlFor="images" className="block text-sm font-medium text-foreground mb-2">Image URLs</label>
        <Input id="images" name="images" placeholder="e.g. https://unsplash.com/image1.jpg" defaultValue={property.images.join(', ')} className="w-full" />
        <p className="text-xs text-muted-foreground mt-1">Comma-separated list of image URLs</p>
        <p className="text-red-500 font-extrabold italic">Use only images links from unsplash</p>
      </div>

      <div className="mb-8 flex items-center gap-4 p-4 bg-muted/40 rounded-lg border border-border">
        <Switch id="isAvailable" checked={isAvailable} onCheckedChange={setIsAvailable} className="data-[state=checked]:bg-primary" />
        <label htmlFor="isAvailable" className="text-sm font-medium text-foreground cursor-pointer flex-1">Available for rent</label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 rounded-lg flex items-center justify-center gap-2">
        <Save className="w-4 h-4" />
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}