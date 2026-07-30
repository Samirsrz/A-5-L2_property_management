// const API_URL = "http://localhost:5000"

// type ApiOptions = {
//   method?: string
//   body?: any
// }

// export async function apiFetch(endpoint: string, options: ApiOptions = {}) {
//   const res = await fetch(API_URL + endpoint, {
//     method: options.method || "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: options.body ? JSON.stringify(options.body) : undefined,
//     cache: "no-store",
//   })

//   const data = await res.json()

//   console.log("apiFetch:", endpoint, data)

//   if (!res.ok) {
//     throw new Error(data.message || "Something went wrong")
//   }

//   return data
// }