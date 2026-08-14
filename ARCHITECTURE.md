# CampaignHQ Contacts Module

## Architecture Overview

The application follows a feature-based architecture using Next.js 16 App Router.

```
app/
  (app)/          → route group: authenticated pages, wrapped in AppShell
    contacts/
    settings/
  login/
  signup/
  api/            → real Next.js route handlers (contacts CRUD, used on Vercel)
components/
  ui/             → shadcn primitives (button, input, table, dialog, ...)
  layout/         → app shell, header, logo, auth marketing panels
features/
  auth/
  contacts/
  settings/
hooks/
services/
queries/
schemas/
types/
mocks/            → MSW handlers + fixture data
utils/
lib/
```

Feature-specific logic is colocated within each feature to improve scalability and maintainability, while shared utilities and infrastructure are organized into common folders.

---

## Routing & Layout

Authenticated pages (`/contacts`, `/settings`) live inside the `app/(app)/` route group. The group has its own `layout.tsx` which wraps every page (and its `loading.tsx`) in `<AppShell>`, so the header, nav, and page container render consistently and without a flash of unstyled content on navigation.

`/login` and `/signup` sit outside the `(app)` group — they render their own full-bleed split-screen layout (`components/layout/auth-marketing-panel.tsx` / `signup-marketing-panel.tsx`) instead of the app shell, since unauthenticated users shouldn't see the product nav.

`AppShell` (`components/layout/app-shell.tsx`) composes:
- `AppHeader` — desktop nav, account dropdown, dark-mode toggle, and a mobile `Sheet` menu
- A centered, max-width content container

---

## Design System / Theming

Brand tokens (navy primary, cream surface, amber accent) live as CSS custom properties in `app/globals.css`, mapped through Tailwind's `@theme inline`. Every `components/ui/*` primitive reads from these tokens rather than hardcoded colors, so the whole app re-themes from one place. Dark mode is handled the same way via the `.dark` block and `next-themes`.

Border radius is also token-driven (`--radius` and derived `--radius-sm/md/lg/xl/2xl`) — component defaults (e.g. `Button`'s `rounded-lg`) are usually already correct for the brand; prefer adjusting the token or using the component's default size/variant over ad-hoc `rounded-*` overrides in `className`.

Brand imagery (wordmark, mascot mark, favicon) are static assets in `public/brand/`, sourced from the real logo files and processed to transparent PNGs — see `CampaignHQLogo` in `components/layout/campaignhq-logo.tsx`.

---

## State Management

### Client State

- Zustand
  - Authentication (`stores/auth-store.ts`)
  - Theme

- Local Component State
  - Dialog visibility
  - Table state
  - Form state
  - Responsive breakpoint (`hooks/use-mobile.ts`, see note below)

### Server State

TanStack Query manages all server state.

Implemented features include:

- useQuery
- useMutation
- Query Invalidation
- Optimistic Updates

Server state is never duplicated inside Zustand.

---

## Auth Feature

Login and signup follow the same layered pattern end-to-end:

```
UI (login-form.tsx / signup-form.tsx)
↓
queries/auth.query.ts        (authMutations.login / .signup)
↓
services/auth.service.ts     (authService.login / .signup)
↓
Axios (lib/api.ts, baseURL "/api")
↓
mocks/handlers/auth.ts       (MSW: POST /api/login, POST /api/signup)
```

- `login-form.tsx` uses static demo credentials (read-only fields) — intentional, this is a reviewer/demo login, not real credential entry.
- `signup-form.tsx` uses real client-side validation (`@tanstack/react-form` + `schemas/signup.schema.ts`) and disables the submit button until the form is valid.
- Payload shape is defined once in `types/auth.ts` (`SignupPayload`) and must stay in sync with the zod schema and the MSW handler's expected body — this has been a real source of build breaks (`tsc` catches it immediately if any one of the three drifts from the others).

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
Mock API (MSW, dev) / Next.js route handlers (app/api/*, deployed)
```

This separation keeps components focused on rendering while services handle API communication. MSW intercepts requests during local development (`npm run dev`) and in Playwright e2e runs; `app/api/contacts/route.ts` provides a real (in-memory) implementation for the deployed Vercel preview.

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
- Single-mount responsive rendering (see below) instead of dual-DOM CSS-hidden layouts.

---

## React Scan

React Scan was installed and evaluated during development.

Due to compatibility issues with the current project stack (Next.js 16, React 19, and Webpack), it could not be integrated into the development runtime without build errors. The package was therefore excluded from runtime usage while performance optimizations were implemented using Next.js best practices.

---

## Performance Issues Discovered

- Large UI components were initially included in the main bundle.
- Dialog components were eagerly loaded.
- Route transitions had no dedicated loading UI.
- The contacts table's mobile layout was initially implemented by rendering **both** the desktop `<Table>` and a mobile card list in the DOM simultaneously, toggling visibility with Tailwind's `hidden` / `sm:block` classes. This duplicated every contact's markup (and event handlers) in the tree at all times, and also broke test tooling that doesn't respect CSS visibility (Jest/jsdom, and Playwright's `getByText`), which found each contact twice.

---

## Optimizations Performed

- Added dynamic imports for heavy components.
- Added lazy loading for dialogs.
- Implemented route-level loading components.
- Used TanStack Query caching and optimistic updates.
- Reduced unnecessary component re-renders through memoization where appropriate.
- Replaced the dual-DOM responsive table with a single `useIsMobile()` hook (`hooks/use-mobile.ts`, backed by `window.matchMedia`) that mounts **either** the desktop table **or** the mobile card list — never both. This removed the duplicate markup entirely and fixed the test failures it caused.

---

## Why These Optimizations Were Necessary

These optimizations improve:

- Initial page load performance
- Bundle size
- Perceived loading speed
- UI responsiveness
- Maintainability
- Scalability
- Test reliability

while following modern Next.js production best practices.