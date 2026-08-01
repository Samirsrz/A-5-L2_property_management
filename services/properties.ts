



export async function getAllProperties(searchParams: { [key: string]: string | undefined }) {
  const params = new URLSearchParams()

  if (searchParams.location) params.set("location", searchParams.location)
  if (searchParams.type) params.set("type", searchParams.type)
  if (searchParams.minPrice) params.set("minPrice", searchParams.minPrice)
  if (searchParams.maxPrice) params.set("maxPrice", searchParams.maxPrice)
  if (searchParams.sortBy) params.set("sortBy", searchParams.sortBy)
  if (searchParams.sortOrder) params.set("sortOrder", searchParams.sortOrder)

  const res = await fetch(`http://localhost:5000/api/landlord/properties?${params.toString()}`, {
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
  const res = await fetch(`http://localhost:5000/api/landlord/properties/${id}`, {
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
       const res = await fetch("http://localhost:5000/api/landlord/myproperties",{
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