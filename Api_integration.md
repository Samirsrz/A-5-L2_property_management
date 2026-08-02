# API Integration

Maps frontend routes/components to the backend endpoints they consume. Backend: Express + Prisma (Assignment 4), deployed separately.

## Auth

| Frontend | Endpoint | Notes |
|---|---|---|
| `/login` | `POST /api/auth/login` | Sets `accessToken`, `refreshToken`, `role`, `name`, `email` as httpOnly cookies |
| `/register` | `POST /api/users/register` | Role selection (Tenant/Landlord) at signup |
| Navbar logout | — | Clears all auth cookies client-side via server action |

## Public — Properties

| Frontend | Endpoint | Notes |
|---|---|---|
| `/`, `/properties` | `GET /api/landlord/properties` | Public browse; supports `location`, `type`, `minPrice`, `maxPrice`, `sortBy`, `sortOrder` query params, driven by URL search params |
| `/properties/[id]` | `GET /api/landlord/properties/:id` | Details, gallery, landlord info |
| `/properties/[id]/request` | `POST /api/rentals` | Tenant submits a rental request |

## Tenant Dashboard

| Frontend | Endpoint | Notes |
|---|---|---|
| `/dashboard/tenant` | `GET /api/rentals` | Own rental request history, status badges |
| `/dashboard/tenant/payments` | `GET /api/payments` | Own payment history |
| `/dashboard/tenant/requests/[id]/pay` | `POST /api/payments/create` | Creates Stripe Checkout session, redirects to Stripe |
| `/payment/success` | `POST /api/payments/confirm` | Verifies payment with Stripe server-side, flips rental to `ACTIVE` |
| `/payment/cancel` | — | No API call, static page |
| `/dashboard/tenant/reviews/[id]` | `POST /api/reviews` | Leave a review (allowed at `ACTIVE` status) |
| `/dashboard/tenant/profile` | — | Reads name/email from cookies, no API call |

## Landlord Dashboard

| Frontend | Endpoint | Notes |
|---|---|---|
| `/dashboard/landlord` | `GET /api/landlord/myproperties`, `GET /api/payments/landlord/earnings` | Overview stats, earnings |
| `/dashboard/landlord/properties` | `GET /api/landlord/myproperties` | Own listings |
| `/dashboard/landlord/properties/new` | `POST /api/landlord/properties` | Create listing |
| `/dashboard/landlord/properties/[id]/edit` | `GET /api/landlord/properties/:id`, `PUT /api/landlord/properties/:id` | Edit listing |
| Delete button | `DELETE /api/landlord/properties/:id` | Blocked server-side if rental history exists |
| `/dashboard/landlord/requests` | `GET /api/landlord/requests`, `PATCH /api/landlord/requests/:id` | Approve/reject with toast + revalidation |
| `/dashboard/landlord/requests/[id]` | `GET /api/rentals/:id` | Request detail — tenant info, dates |
| `/dashboard/landlord/payments` | `GET /api/payments/landlord/earnings` | Full earnings history |

## Admin Dashboard

| Frontend | Endpoint | Notes |
|---|---|---|
| `/dashboard/admin` | `GET /api/admin/users`, `GET /api/admin/properties`, `GET /api/admin/rentals` | Platform-wide counts |
| `/dashboard/admin/users` | `GET /api/admin/users`, `PATCH /api/admin/users/:id` | Ban/unban |
| `/dashboard/admin/listings` | `GET /api/admin/properties` | Read-only moderation view |
| `/dashboard/admin/rentals` | `GET /api/admin/rentals` | Read-only moderation view |
| `/dashboard/admin/payments` | `GET /api/admin/payments` | Read-only, platform-wide payments |

## Auth & Route Protection

- JWT stored in httpOnly cookies, attached as `Authorization: Bearer` header on server-side requests requiring auth
- `proxy.ts` (Next.js 16's renamed middleware) + a `layout.tsx` at each dashboard segment (`tenant/`, `landlord/`, `admin/`) verify `accessToken` and `role` cookies server-side before rendering