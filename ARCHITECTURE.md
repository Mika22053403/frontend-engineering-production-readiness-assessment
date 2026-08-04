# CampaignHQ Contacts Module

## Architecture Overview

The application follows a feature-based architecture using Next.js 16 App Router.

```
app/
components/
features/
  auth/
  contacts/
  settings/
hooks/
services/
queries/
types/
utils/
lib/
```

Feature-specific logic is colocated within each feature to improve scalability and maintainability, while shared utilities and infrastructure are organized into common folders.

---

## State Management

### Client State

- Zustand
  - Authentication
  - Theme

- Local Component State
  - Dialog visibility
  - Table state
  - Form state

### Server State

TanStack Query manages all server state.

Implemented features include:

- useQuery
- useMutation
- Query Invalidation
- Optimistic Updates

Server state is never duplicated inside Zustand.

---

## API Architecture

React components never call Axios directly.

Data flow:

```
UI
↓
Hooks
↓
TanStack Query
↓
Services
↓
Axios
↓
Mock API (MSW)
```

This separation keeps components focused on rendering while services handle API communication.

---

## Performance Optimizations

The following optimizations were implemented:

- Server Components by default using the Next.js App Router.
- Client Components only where interactivity is required.
- Route-level loading UI using `loading.tsx`.
- Dynamic Imports using `next/dynamic`.
- Lazy loading of dialogs and large UI components.
- TanStack Query caching.
- Query invalidation after mutations.
- Optimistic updates for delete operations.
- Skeleton loading states.
- Memoization (`React.memo` and `useMemo`) where appropriate to reduce unnecessary re-renders.

---

## React Scan

React Scan was installed and evaluated during development.

Due to compatibility issues with the current project stack (Next.js 16, React 19, and Webpack), it could not be integrated into the development runtime without build errors. The package was therefore excluded from runtime usage while performance optimizations were implemented using Next.js best practices.

---

## Performance Issues Discovered

The following potential performance issues were identified:

- Large UI components were initially included in the main bundle.
- Dialog components were eagerly loaded.
- Route transitions had no dedicated loading UI.

---

## Optimizations Performed

- Added dynamic imports for heavy components.
- Added lazy loading for dialogs.
- Implemented route-level loading components.
- Used TanStack Query caching and optimistic updates.
- Reduced unnecessary component re-renders through memoization where appropriate.

---

## Why These Optimizations Were Necessary

These optimizations improve:

- Initial page load performance
- Bundle size
- Perceived loading speed
- UI responsiveness
- Maintainability
- Scalability

while following modern Next.js production best practices.
