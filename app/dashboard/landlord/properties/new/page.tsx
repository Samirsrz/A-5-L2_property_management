'use client'

import { Plus, DollarSign } from 'lucide-react'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { createPropertyAction } from '../../_actions/createProperty'


export default function AddPropertyPage() {
  const router = useRouter()

  async function handleCreate(formData: FormData) {
    const result = await createPropertyAction(formData)
    if (!result.success) {
      toast.error(result.message)
      return
    }
    toast.success("Property created successfully")
    router.push("/dashboard/landlord/properties")
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Add Property</h1>
        <p className="mt-2 text-muted-foreground">
          Create a new rental property listing to start receiving inquiries from tenants
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Fill in the information about your rental property</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleCreate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-medium">Property Title</Label>
              <Input id="title" name="title" type="text" placeholder="e.g. Modern Downtown Apartment" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-medium">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe your property, amenities, nearby attractions, and what makes it special..." rows={5} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="font-medium">Location</Label>
              <Input id="location" name="location" type="text" placeholder="e.g. Downtown, San Francisco, CA" required />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price" className="font-medium">Price per Month</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="price" name="price" type="number" placeholder="2500" className="pl-8" min="0" step="50" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="font-medium">Property Type</Label>
                <select
                  id="type"
                  name="type"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a type</option>
                  <option value="APARTMENT">Apartment</option>
                  <option value="HOUSE">House</option>
                  <option value="STUDIO">Studio</option>
                  <option value="CONDO">Condo</option>
                  <option value="ROOM">Room</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amenities" className="font-medium">Amenities</Label>
              <Input id="amenities" name="amenities" type="text" placeholder="Wifi, Parking, Gym" />
              <p className="text-xs text-muted-foreground">Separate amenities with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="images" className="font-medium">Image URLs</Label>
              <Input id="images" name="images" type="text" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
              <p className="text-xs text-muted-foreground">Separate multiple URLs with commas (recommended: 3-5 images)</p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Create Property
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}