const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllProperties(searchParams: { [key: string]: string | undefined }) {
  const params = new URLSearchParams()

  if (searchParams.location) params.set("location", searchParams.location)
  if (searchParams.type) params.set("type", searchParams.type)
  if (searchParams.minPrice) params.set("minPrice", searchParams.minPrice)
  if (searchParams.maxPrice) params.set("maxPrice", searchParams.maxPrice)
  if (searchParams.sortBy) params.set("sortBy", searchParams.sortBy)
  if (searchParams.sortOrder) params.set("sortOrder", searchParams.sortOrder)

  const res = await fetch(`${API_URL}/api/landlord/properties?${params.toString()}`, {
    cache: "no-store",
  })

  const data = await res.json()

//   console.log("properties response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch properties")
  }

  return data
}


export async function getPropertyById(id: string) {
  const res = await fetch(`${API_URL}/api/landlord/properties/${id}`, {
    cache: "no-store",
  })

  const data = await res.json()

//   console.log("property detail response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch property")
  }

  return data
}



export async function getMyProperties(token:string) {
       const res = await fetch(`${API_URL}/api/landlord/myproperties`,{
        headers:{
          "Authorization":`Bearer ${token}`,
        },
        cache:"no-store"
       })
       
       const data = await res.json()
       console.log("My properties response",data);

         if (!res.ok) {
    throw new Error(data.message || "Failed to fetch properties")
  }

  return data

      }


export async function createProperty(token: string, propertyData: {
  title: string
  description: string
  location: string
  price: number
  type: string
  amenities: string[]
  images: string[]
}) {
  const res = await fetch(`${API_URL}/api/landlord/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("create property response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to create property")
  }

  return data
}      



export async function updateProperty(token: string, propertyId: string, propertyData: {
  title: string
  description: string
  location: string
  price: number
  type: string
  amenities: string[]
  images: string[]
  isAvailable: boolean
}) {
  const res = await fetch(`${API_URL}/api/landlord/properties/${propertyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
    cache: "no-store",
  })

  const data = await res.json()

  console.log("update property response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to update property")
  }

  return data
}

export async function deleteProperty(token: string, propertyId: string) {
  const res = await fetch(`${API_URL}/api/landlord/properties/${propertyId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",  
  })

  const data = await res.json()

  console.log("delete property response:", data)

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete property")
  }

  return data
}