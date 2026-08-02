# API Integration

Maps frontend routes/components to the backend endpoints they consume.
Backend: Express + Prisma (Assignment 4), deployed separately on Vercel.

| Next.js Route | Component/Feature | Backend API Consumption |
|---|---|---|
| `/` | Home, featured properties | `GET /api/properties` |
| `/properties` | Browse & filter | `GET /api/properties`, `GET /api/categories` |
| `/properties/[id]` | Details + request CTA | `GET /api/properties/:id` |
| `/auth/register` | Registration form | `POST /api/auth/register` |
| `/auth/login` | Login form | `POST /api/auth/login` |
| `/dashboard/tenant` | Rental history overview | `GET /api/rentals`, `GET /api/payments` |
| `/dashboard/tenant/requests/[id]/pay` | Payment initiation | `POST /api/payments/create` |
| `/payment/success` | Payment outcome, confirms with backend | `POST /api/payments/confirm` |
| `/payment/cancel` | Static cancellation page | none |
| `/dashboard/tenant/reviews/[id]` | Leave a review | `POST /api/reviews` |
| `/dashboard/landlord` | Overview, property list | `GET /api/landlord/properties` |
| `/dashboard/landlord/properties/new` | Create listing | `POST /api/landlord/properties` |
| `/dashboard/landlord/properties/[id]/edit` | Edit listing | `GET /api/properties/:id`, `PUT /api/landlord/properties/:id` |
| Delete button (landlord properties list) | Remove listing | `DELETE /api/landlord/properties/:id` |
| `/dashboard/landlord/requests` | Approve/reject incoming requests | `GET /api/landlord/requests`, `PATCH /api/landlord/requests/:id` |
| `/dashboard/admin` | Platform overview | `GET /api/admin/users`, `GET /api/admin/properties`, `GET /api/admin/rentals` |
| `/dashboard/admin/users` | Ban/unban | `GET /api/admin/users`, `PATCH /api/admin/users/:id` |
| `/dashboard/admin/payments` | Platform-wide payments view | `GET /api/admin/payments` |

## Auth & Route Protection

- JWT (access + refresh) stored in httpOnly cookies, set by the backend on login
- Next.js Middleware (`middleware.ts` / `proxy.ts` depending on Next.js version) checks for cookie presence before allowing access to any `/dashboard/*` route
- Role-based UI rendering reads the `role` cookie/value to conditionally show navigation and dashboard content per Tenant/Landlord/Admin
