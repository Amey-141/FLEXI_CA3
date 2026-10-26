# SkyRoute

SkyRoute is a full-stack airline-booking demonstration built with React + Vite, Express, and MongoDB. It uses seeded **demonstration** schedules and a clearly labelled simulated payment/check-in flow — it has no connection to a real airline, inventory system, or financial provider.

## Project layout

```
SkyRoute/
├── client/                 React + Vite frontend
│   └── src/                pages, components, auth context, API client and CSS
└── server/                 Express + MongoDB backend
    ├── config/             database configuration
    ├── controllers/        application logic
    ├── middleware/         auth, validation and errors
    ├── models/             User, Flight, Booking, Payment, Newsletter schemas
    ├── routes/             REST API routes
    └── scripts/seed.js     idempotent demonstration-flight seed
```

## Prerequisites (Windows)

1. Install current Node.js LTS from https://nodejs.org and verify it in a terminal:

   ```powershell
   node --version
   npm --version
   ```

2. Install MongoDB Community Server, then start the **MongoDB** Windows service. Install MongoDB Compass if it is not included.

3. In MongoDB Compass, create a connection using:

   ```
   mongodb://127.0.0.1:27017
   ```

   The `skyroute` database will appear after seeding or creating the first account.

## Setup

Open two terminals in the `SkyRoute` folder.

**Terminal 1 — API**

```powershell
cd server
Copy-Item .env.example .env
npm install
npm run seed
npm run dev
```

**Terminal 2 — website**

```powershell
cd client
Copy-Item .env.example .env
npm install
npm run dev
```

Open the Vite address shown in Terminal 2, normally http://localhost:5173.

The backend listens on http://localhost:5000. `server/.env` is intentionally ignored/not supplied; use the included example and replace `JWT_SECRET` with a long random value before a real deployment.

## Demonstrating the application

1. Register an account.
2. On Home, select departure and arrival airports, a future date, passenger count, and cabin, then search.
3. Select a seeded flight, add passengers, and continue.
4. Choose a payment method and use the labelled simulated payment flow.
5. Review the MongoDB collections in Compass: `users`, `flights`, `bookings`, `payments`, and `newslettersubscribers`.
6. Visit **My bookings** to inspect or cancel your own booking. A paid cancellation restores demo inventory.
7. Try Flight Status with a seeded number such as `SR101`, or check in with a completed booking reference and passenger surname.

## API highlights

- Auth: `/api/auth/register`, `/login`, `/me`, `/logout`, `/change-password`
- Flights: `/api/flights/search`, `/api/flights/:id`, `/api/flights/status`
- Bookings: `/api/bookings`, `/api/bookings/my`, `/api/bookings/:id/cancel`
- Payment: `/api/payments/simulate`
- Profile, check-in, and newsletter endpoints are also included.

## Important limitations

- Flights, pricing, availability, payment, and check-in are simulated only.
- The booking payment flow atomically decrements a demonstration flight’s seats. For multi-document production financial workflows, add a replica-set-backed MongoDB transaction and a real payment provider.
- The password reset link is intentionally an email contact placeholder; no email delivery provider is configured.
