# RentNest — Frontend 🏠

**Find & List Rental Properties with Ease**

A responsive Next.js (App Router) frontend for the RentNest rental property marketplace. This app consumes the RentNest backend API (built in Assignment 4) to provide a full property browsing, rental request, payment, and role-based dashboard experience for Tenants, Landlords, and Admins.

> This is a **frontend-only** project. All data, authentication, and business logic are handled by the separately deployed backend API.

---

## Project Overview

RentNest lets:
- **Tenants** browse and filter listings, submit rental requests, pay securely via Stripe once approved, and leave reviews after a completed rental.
- **Landlords** create and manage property listings, and approve or reject incoming rental requests from a dedicated dashboard.
- **Admins** oversee the platform — managing users (ban/unban) and reviewing all listings and rental activity across the system.

The UI adapts dynamically based on the authenticated user's role, and dashboard routes are protected using Next.js Middleware.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Framework, routing, Server/Client Components |
| TypeScript | Type safety |
| Tailwind CSS + shadcn/ui | Styling and UI components |
| React Hook Form + Zod | Form state and schema validation |
| TanStack Query | Server-state data fetching and caching |
| Zustand | Lightweight global state (current user/role) |
| Next.js Middleware | Route protection |
| Stripe.js | Payment gateway integration |

---

## Features

### Public
- Responsive property grid with images, price, location, amenities
- Search and filter by location, price range, property type
- Property details page with a "Request to Rent" call-to-action
- Loading skeletons and graceful error fallbacks

### Tenant
- Registration and login with Zod-validated forms
- Submit rental requests; track status (Pending / Approved / Rejected / Active / Completed)
- Stripe Checkout payment flow with dedicated success/cancel pages
- Tenant dashboard: rental history, payment history, leave a review after a completed rental

### Landlord
- Landlord dashboard: overview of properties and incoming requests
- Create, edit, and remove property listings; toggle availability
- Approve/reject incoming rental requests with toast feedback

### Admin
- Admin dashboard: platform overview (users, properties, requests)
- User management table with ban/unban actions
- View all listings and rental requests across the platform

---

## Prerequisites

- Node.js 18+
- The RentNest **backend** running and reachable (either locally at `http://localhost:5000` or your deployed Vercel backend URL)
- A Stripe account in **test mode** (for payment testing — no real charges)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/rentnest-frontend.git
cd rentnest-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

> `BACKEND_URL` should point to your running RentNest backend (local or deployed). Don't include a trailing slash.

### 4. Run the backend first

This frontend has no functionality of its own without the backend running. In a separate terminal, start the backend:

```bash
cd ../rentnest-backend
npm run dev
```

Confirm it's reachable at `http://localhost:5000` (or your configured `BACKEND_URL`) before continuing.

### 5. Run the frontend

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## Project Structure

```
src/
├── app/
│   ├── (public)/            → home, property browsing & details
│   ├── (auth)/               → login, register
│   ├── dashboard/
│   │   ├── tenant/
│   │   ├── landlord/
│   │   └── admin/
│   ├── payment/
│   │   ├── success/
│   │   └── cancel/
│   └── layout.tsx
├── components/
│   ├── ui/                   → shadcn components
│   └── features/             → feature-specific components
├── lib/                      → API client, utilities
├── schemas/                  → Zod validation schemas
├── hooks/
├── store/                    → Zustand store (current user/role)
├── types/
└── middleware.ts             → route protection
```

---

## Testing the App

### Test admin account

```
Admin Email      : admin@rentnest.com
Admin Password   : admin123
```

### Test payment (Stripe test mode)

When reaching the Stripe Checkout page during a rental payment, use:

```
Card number: 4242 4242 4242 4242
Expiry:      any future date
CVC:         any 3 digits
```

No real charge will be made.

---

## Deployment

This app is deployed on Vercel. To deploy your own copy:

1. Push this repository to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add the same environment variables (`BACKEND_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) under Project → Settings → Environment Variables
4. Deploy

---

## Backend Repository

This frontend depends on the RentNest backend, built separately:
`[https://github.com/your-username/rentnest-backend](https://github.com/Samirsrz/Level2_A4)`

Live backend API: `[(https://assignment4-level2.vercel.app/)]`
Live API URL: `[(https://a-5-l2-property-management-opal.vercel.app/)]`
