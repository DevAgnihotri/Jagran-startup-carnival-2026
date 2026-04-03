# Stall Platform Backend + Dashboard Plan (Next.js + Supabase)

## Goal

Build a complete flow where:

- User clicks **Register** from a stall-related CTA.
- User is taken to a branded login page with **Login with Google**.
- After login, navbar shows a dropdown with:
  - **Dashboard**
  - **Your Page**
- **Your Page** opens a public Patreon-style stall page (dynamic route).
- **Dashboard** allows simple customization:
  - Banner image
  - Logo
  - About text
  - Video links
  - Basic contact/social links

---

## Product Scope

### In Scope

- Google OAuth login using Supabase Auth
- Protected dashboard for logged-in users
- Public dynamic stall profile pages
- Media upload (banner/logo) via Supabase Storage
- CRUD APIs via Next.js Route Handlers (App Router)
- Navbar user menu + Dashboard / Your Page shortcuts

### Out of Scope (Phase 2)

- Payments / subscriptions
- Team members / multi-admin per stall
- Analytics panel
- Rich CMS blocks

---

## Core User Journey

1. Visitor clicks **Register Expo Stall** (or relevant register button)
2. Redirect to `/auth/login`
3. Login page shows event-brand UI + **Continue with Google**
4. Supabase signs user in and redirects to `/dashboard`
5. First login auto-creates a profile + slug
6. Navbar dropdown appears:
   - Dashboard -> `/dashboard`
   - Your Page -> `/{slug}`
7. User edits profile content in dashboard and saves
8. Public can view `/{slug}` page

---

## Tech Decisions

- Framework: Next.js App Router (existing)
- Auth: Supabase Auth (Google provider)
- DB: Supabase Postgres
- Storage: Supabase Storage
- Server APIs: Next.js Route Handlers (`app/api/.../route.ts`)
- Validation: Zod
- Session handling: `@supabase/ssr` with server/client helpers

---

## Data Model (Supabase)

### Table: `stall_profiles`

- `id` UUID PK
- `user_id` UUID UNIQUE NOT NULL (references auth user)
- `slug` TEXT UNIQUE NOT NULL
- `stall_name` TEXT NOT NULL
- `tagline` TEXT
- `about` TEXT
- `banner_url` TEXT
- `logo_url` TEXT
- `video_links` JSONB DEFAULT `[]`
- `contact_email` TEXT
- `instagram_url` TEXT
- `linkedin_url` TEXT
- `website_url` TEXT
- `is_published` BOOLEAN DEFAULT true
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

### Optional Table: `stall_page_sections` (future)

- For flexible custom sections later

### Storage Buckets

- `stall-banners` (public)
- `stall-logos` (public)

---

## Security + RLS

Enable RLS on `stall_profiles`:

- Public read only for `is_published = true`
- Authenticated users can `select/update` only where `auth.uid() = user_id`
- Authenticated users can `insert` only for their own `user_id`

Storage policies:

- Public read for banner/logo buckets
- Authenticated write restricted to path pattern using user id prefix, e.g. `user_id/...`

---

## Route Plan

### App Pages

- `/auth/login` -> branded login page with Google button
- `/dashboard` -> profile editor (protected)
- `/[slug]` -> public stall page

### API Routes (Next.js)

- `GET /api/stall/me` -> return logged-in user profile
- `POST /api/stall/me` -> create initial profile on first login
- `PATCH /api/stall/me` -> update profile fields
- `POST /api/stall/upload` -> signed upload URL or direct upload helper
- `GET /api/stall/[slug]` -> public profile payload for page rendering

---

## Navbar Behavior

When user not logged in:

- Show Register / Login CTA

When user logged in:

- Show avatar/name trigger
- Dropdown items:
  - Dashboard -> `/dashboard`
  - Your Page -> dynamic URL from `slug`
  - Logout

Implementation notes:

- On app load, fetch session + `stall_profiles.slug`
- Cache slug client-side for quick dropdown navigation

---

## UI Pages

### 1) Login Page (`/auth/login`)

- Same brand vibe as event2 (colors/fonts/motion)
- Single clear action: **Login with Google**
- Secondary text: why login is needed (manage your stall page)

### 2) Dashboard (`/dashboard`)

Sections:

- Profile basics (stall name, tagline, about)
- Branding (banner upload, logo upload)
- Media (video links list add/remove)
- Social/contact links
- Preview + Save button
- "View Your Page" quick action

### 3) Public Stall Page (`/[slug]`)

- Banner hero
- Logo + stall identity block
- About section
- Video embeds from links
- Social links
- Event-themed visual consistency

---

## Register Button Integration

Update stall registration CTA logic:

- If not authenticated -> route to `/auth/login?next=/dashboard`
- If authenticated -> route to `/dashboard`

Buttons to wire first:

- "REGISTER EXPO STALL" in Pricing section
- Any other stall-specific register CTA

---

## Implementation Phases

### Phase 1: Foundation

- Install Supabase deps
- Add env keys
- Create Supabase client helpers (server/client/middleware)
- Enable Google provider in Supabase project

### Phase 2: Database + Policies

- Create `stall_profiles` table
- Add indexes + unique constraints (`user_id`, `slug`)
- Add RLS + storage policies

### Phase 3: Auth + Login UI

- Build `/auth/login`
- Implement Google OAuth redirect flow
- Handle callback/session restore

### Phase 4: Dashboard APIs

- Build `/api/stall/me` GET/POST/PATCH
- Add slug generation + collision handling
- Add validation with Zod

### Phase 5: Dashboard UI

- Build protected `/dashboard`
- Form + upload flows + save feedback

### Phase 6: Public Dynamic Page

- Build `/[slug]` page using server-side data fetch
- Handle not found/published checks

### Phase 7: Navbar + CTA Wiring

- Add user dropdown with Dashboard / Your Page
- Update register button routing behavior

### Phase 8: QA + Hardening

- Auth edge cases
- Slug uniqueness checks
- File upload limits/mime checks
- Empty-state + loading-state polish

---

## File/Folder Blueprint

- `app/auth/login/page.tsx`
- `app/dashboard/page.tsx`
- `app/[slug]/page.tsx`
- `app/api/stall/me/route.ts`
- `app/api/stall/[slug]/route.ts`
- `app/api/stall/upload/route.ts`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/middleware.ts`
- `middleware.ts`
- `components/dashboard/...`
- `components/auth/...`

---

## Acceptance Criteria

- Clicking stall register while logged-out opens branded login page
- Google login works end-to-end
- After login, dashboard is accessible
- User can upload banner + logo, add text and videos, and save
- Navbar shows Dashboard + Your Page items for authenticated user
- `/{slug}` public page renders saved content correctly
- Only owner can edit their page

---

## Risks and Mitigations

- Slug collision
  - Mitigation: deterministic slug + numeric suffix fallback
- Large media uploads
  - Mitigation: validate size/type; compress guidance
- Unauthorized edits
  - Mitigation: strict RLS + server-side ownership checks
- Inconsistent styling across new pages
  - Mitigation: reuse existing event2 design tokens/components

---

## Suggested Build Order (Practical)

1. Supabase setup + auth callback working
2. `stall_profiles` + RLS
3. Dashboard save/read APIs
4. Dashboard form UI
5. Public dynamic page
6. Navbar dropdown + register redirection
7. Upload polish + validation + QA
