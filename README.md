# CampaignHQ Contacts Module

A production-ready Contacts Management module built for the CampaignHQ Frontend Engineering Assessment using the modern Next.js ecosystem.

The application allows authenticated users to manage contacts with Create, Read, Update, Delete (CRUD) operations, advanced table features, client-side validation, optimistic updates, and automated testing. The UI is themed to match CampaignHQ's real brand (navy / cream / amber, official logo assets) and includes a full mocked login + signup flow.

---

# Project Overview

CampaignHQ is a WhatsApp/email marketing platform where businesses manage customer contacts.

This project implements a Contacts Module that allows users to:

- Sign up for a workspace
- Log in
- View contacts
- Search contacts
- Filter contacts
- Sort contacts
- Create contacts
- Edit contacts
- Delete contacts
- View contact details
- Export contacts
- Handle loading and error states

The application is built using scalable frontend architecture and follows production-ready development practices.

---

# Features

## Authentication

- Mock login (demo credentials, pre-filled)
- Mock signup (work email, password, company/workspace name — validated client-side)
- Persistent authentication state via Zustand
- Note: routes are not access-controlled server-side — see [Known Limitations](#known-limitations)

## Contacts

- View all contacts
- Contact details page
- Create Contact
- Edit Contact
- Delete Contact

## Table Features

- Search by first name
- Search by tags
- Status filter
- Company filter
- Sorting
- Pagination
- Row selection
- Export contacts to CSV
- Responsive: table view on desktop/tablet, card list view on mobile (single-mount, no duplicate DOM — see `hooks/use-mobile.ts`)

## Forms

- Built using TanStack Form
- Validation using Zod
- Accessible form controls
- Inline validation messages

## Data Fetching

- TanStack Query
- Optimistic Updates
- Query Invalidation
- Loading Skeletons
- Error Handling

## UI

- CampaignHQ brand design system (navy / cream / amber, official logo + mascot assets, token-driven theme in `app/globals.css`)
- Split-screen login/signup pages matching the production app's visual design
- Light/dark mode via `next-themes`, toggle in the app header
- Responsive layout, mobile nav via a `Sheet` menu
- Tailwind CSS
- shadcn/ui components
- Dynamic imports for better performance

---

# Technologies Used

| Technology             | Purpose                  |
| ----------------------- | -------------------------- |
| Next.js 16              | React Framework             |
| React 19                | UI Library                  |
| TypeScript              | Type Safety                 |
| Tailwind CSS 4          | Styling                     |
| shadcn/ui               | UI Components               |
| TanStack Query          | Server State Management     |
| TanStack Form           | Form Management             |
| TanStack Table          | Data Table                  |
| Zustand                 | Authentication State        |
| Zod                     | Schema Validation           |
| Axios                   | API Requests                |
| MSW                     | Mock Backend                |
| next-themes             | Light / dark mode           |
| lucide-react            | Icons                       |
| Playwright              | End-to-End Testing          |
| Jest                    | Unit Testing                |
| React Testing Library   | Component Testing           |

---

# Folder Structure

```
campaignhq/
│
├── app/
│   ├── (app)/              # route group: authenticated pages, wrapped in AppShell
│   │   ├── contacts/
│   │   └── settings/
│   ├── login/
│   ├── signup/
│   └── api/                # real Next.js route handlers (contacts CRUD)
│
├── components/
│   ├── ui/                 # shadcn primitives
│   └── layout/              # app shell, header, logo, auth marketing panels
│
├── features/
│   ├── auth/
│   │   └── components/      # login-form, signup-form
│   └── contacts/
│       ├── components/
│       ├── mutations/
│       ├── table/
│       └── hooks/
│
├── hooks/                   # includes use-mobile.ts (responsive breakpoint hook)
│
├── lib/
│
├── queries/
│
├── schemas/
│
├── services/
│
├── stores/
│
├── types/
│
├── mocks/                    # MSW handlers (auth, contacts) + fixture data
│
├── public/
│   └── brand/                 # official CampaignHQ logo/mark assets
│
├── e2e/
│
├── __tests__/
│
└── README.md
```

---

# Setup Instructions

## 1. Clone the repository

```bash
git clone <repository-url>
```

## 2. Move into the project

```bash
cd campaignhq
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# Available Scripts

## Development

```bash
npm run dev
```

Starts the development server.

---

## Build

```bash
npm run build
```

Creates a production build.

---

## Lint

```bash
npm run lint
```

Runs ESLint.

---

## Type Checking

```bash
npm run type-check
```

Runs TypeScript compiler without emitting files.

---

## Unit Tests

```bash
npm test
```

Runs Jest unit tests.

---

## End-to-End Tests

```bash
npm run e2e
```

Runs Playwright end-to-end tests.

---

# Testing

## Unit Tests

The project includes automated tests for:

- Contact form validation
- Contact table rendering
- Search functionality
- Contact service methods
- Zustand authentication store
- Signup form rendering, validation, and disabled/enabled submit state

## End-to-End Tests

Playwright tests cover:

- Login
- Signup (including navigation back to login)
- Create Contact
- Edit Contact
- Delete Contact

---

# Assumptions

- Authentication is mocked for assessment purposes.
- Backend APIs are simulated using Mock Service Worker (MSW) in development and e2e tests; `app/api/contacts` provides a real in-memory implementation for the deployed environment.
- Contacts are stored in mock data during development.
- CSV export is performed entirely on the client.
- The project focuses on frontend architecture and user experience.

---

# Known Limitations

- No real backend integration.
- Authentication is not production-secure.
- **Routes are not access-controlled** — there is no middleware/route guard, so `/contacts` and `/settings` are reachable without logging in; authentication state currently only gates what the UI shows (e.g. header account info), not route access.
- Signup does not verify email or enforce password strength beyond a minimum length.
- Data is reset when the mock server restarts.
- File/image uploads are not implemented.
- Bulk edit and bulk delete operations are not included.
- Real-time synchronization between users is not implemented.

---

# Performance Optimizations

- Dynamic imports
- Memoized table cells
- TanStack Query caching
- Optimistic UI updates
- Loading skeletons
- Code splitting
- Client-side caching
- Single-mount responsive rendering for the contacts table (no duplicate desktop+mobile DOM)

See `ARCHITECTURE.md` for details on why the responsive table was changed from a CSS-hidden dual-render to a single `useIsMobile()`-driven mount.

---

# Accessibility

The application includes:

- Keyboard accessible components
- Proper labels
- ARIA attributes
- Accessible dialogs
- Accessible forms
- Semantic HTML

---

# Author

**Arosree Satapathy**

Frontend Engineering Assessment

CampaignHQ Contacts Module