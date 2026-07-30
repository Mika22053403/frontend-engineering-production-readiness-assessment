# CampaignHQ Frontend Engineering Assessment

A production-ready Contacts Management module built with Next.js 16 as part of the Frontend Engineering Production Readiness Assessment.

---

## Features

### Contacts

- View all contacts
- Contact Details page
- Create Contact
- Edit Contact
- Delete Contact
- Delete confirmation dialog

### Table Features

- Global Search
- Sorting
- Pagination
- Row Selection
- Export Selected Contacts as CSV
- Column Visibility Toggle

### User Experience

- Loading Skeleton
- Empty State
- Error State
- Toast Notifications
- Status Badges

---

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- TanStack Table
- Zod
- React Hook Form
- MSW (Mock Service Worker)

---

## Folder Structure

```
app/
components/
features/
lib/
mocks/
providers/
public/
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/Mika22053403/frontend-engineering-production-readiness-assessment.git
```

Go into the project

```bash
cd frontend-engineering-production-readiness-assessment
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## Build

```bash
npm run build
```

---

## Project Highlights

- Production folder structure
- Feature-based architecture
- Type-safe forms using Zod
- Server state management using TanStack Query
- Mock API using MSW
- Responsive UI
- Clean reusable components
- Production build passes successfully

---

## Notes

This project uses Mock Service Worker (MSW) to simulate backend APIs. Therefore, Create, Edit, and Delete operations are mocked and are not persisted after a full page refresh.

---

## Author

**Arosree Satapathy**

GitHub:
https://github.com/Mika22053403
