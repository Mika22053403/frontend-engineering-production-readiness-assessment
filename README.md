# CampaignHQ Contacts Module

A production-ready Contacts Management module built for the CampaignHQ Frontend Engineering Assessment using the modern Next.js ecosystem.

The application allows authenticated users to manage contacts with Create, Read, Update, Delete (CRUD) operations, advanced table features, client-side validation, optimistic updates, and automated testing.

---

# Project Overview

CampaignHQ is an email marketing platform where businesses manage customer contacts.

This project implements a Contacts Module that allows users to:

- Authenticate into the application
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

- Mock login
- Protected routes using Zustand
- Persistent authentication state

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

- Responsive layout
- Tailwind CSS
- shadcn/ui components
- Dynamic imports for better performance

---

# Technologies Used

| Technology            | Purpose                 |
| --------------------- | ----------------------- |
| Next.js 16            | React Framework         |
| React 19              | UI Library              |
| TypeScript            | Type Safety             |
| Tailwind CSS 4        | Styling                 |
| shadcn/ui             | UI Components           |
| TanStack Query        | Server State Management |
| TanStack Form         | Form Management         |
| TanStack Table        | Data Table              |
| Zustand               | Authentication State    |
| Zod                   | Schema Validation       |
| Axios                 | API Requests            |
| MSW                   | Mock Backend            |
| Playwright            | End-to-End Testing      |
| Jest                  | Unit Testing            |
| React Testing Library | Component Testing       |

---

# Folder Structure

```
campaignhq/
│
├── app/
│   ├── contacts/
│   ├── login/
│   ├── settings/
│   └── api/
│
├── components/
│   └── ui/
│
├── features/
│   ├── auth/
│   └── contacts/
│       ├── components/
│       ├── mutations/
│       ├── table/
│       └── hooks/
│
├── hooks/
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
├── mocks/
│
├── public/
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

## End-to-End Tests

Playwright tests cover:

- Login
- Create Contact
- Edit Contact
- Delete Contact

---

# Assumptions

- Authentication is mocked for assessment purposes.
- Backend APIs are simulated using Mock Service Worker (MSW).
- Contacts are stored in mock data during development.
- CSV export is performed entirely on the client.
- The project focuses on frontend architecture and user experience.

---

# Known Limitations

- No real backend integration.
- Authentication is not production-secure.
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
