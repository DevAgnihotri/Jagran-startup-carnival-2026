# Supabase setup for event2 — Stall feature

This document explains the minimal, correct steps to configure Supabase for the stall/profile feature used by `event2`.
It covers the console actions, environment variables, running the provided SQL migration, storage, and basic checks.

---

## Quick checklist

- Create a Supabase project.
- Copy Project URL and keys into `./.env.local`.
- Configure Google OAuth in Google Cloud and in Supabase (redirects).
- Run the SQL migration to create `stall_profiles` and policies.
- Create a storage bucket for stall images (avatars/banners).
- Add production secrets to your host (Vercel, Cloud run, etc.).

---

## 1) Create a Supabase project

1. Open https://app.supabase.com and sign in.
2. Click **New project** → pick a name and database password → choose a region.
3. Wait for the project to provision.

Notes: keep the DB password safe — you won't need it in the app, but you will keep keys from the Project Settings.

---

## 2) Copy Project URL & keys (to `.env.local`)

1. In Supabase console, open **Settings → API**.
2. Copy **Project URL** and the **anon (public)** key.
3. Optionally, copy the **service_role** key (only store it on the server; never expose it to the browser).

Create `./.env.local` in the `event2` project root (do NOT commit this file). Example:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJ...
# Optional (server-only):
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJ...   # keep secret, do not expose to client
```

Add `.env.local` to `.gitignore` if it isn't already.

---

## 3) Configure Google OAuth

A. Create Google credentials

1. Visit Google Cloud Console: https://console.cloud.google.com/apis/credentials.
2. Configure **OAuth consent screen** (set app name, email). For local dev you can choose "External" and keep testing users limited.
3. Create **Credentials → OAuth 2.0 Client ID → Web application**.
4. Add the authorized redirect URIs (see B).
5. Copy the **Client ID** and **Client Secret**.



B. Set redirect URIs

- Local development redirect: `http://localhost:3000/auth/callback`
- Production redirect: `https://<your-production-domain>/auth/callback`

C. Configure Supabase

1. In Supabase console go to **Authentication → Providers → Google**.
2. Toggle Google ON and paste the **Client ID** and **Client Secret**.
3. Save.
4. Also add the same redirect URIs to **Authentication → Settings → Redirect URLs**.

---

## 4) Run the SQL migration (creates `stall_profiles` and RLS policies)

You can run the provided migration SQL from the console.

- File in repo: [event2/supabase/migrations/20260404_create_stall_profiles.sql](event2/supabase/migrations/20260404_create_stall_profiles.sql#L1)

Console method:

1. In Supabase console open **SQL Editor → New query**.
2. Open the file above and copy its contents into the editor.
3. Click **RUN**.
4. After success, visit **Table Editor** and confirm `stall_profiles` exists and policies are present.

Optional CLI method (if you prefer):

```bash
# install CLI (if not installed)
npm i -g supabase
# login and link to the project
supabase login
supabase link --project-ref <your-project-ref>
# run SQL file (or use migrations workflow)
supabase sql query < ./supabase/migrations/20260404_create_stall_profiles.sql
```

Note: the migration includes RLS policies and triggers — review them in Table Editor → Policies.

---

## 5) Storage: create a bucket for stall assets

1. In Supabase console open **Storage → Buckets → Create new bucket**.
2. Suggested bucket name: `stall-assets` (or `public` if you already use one).
3. Choose **Public** if you want direct public URLs for avatars/banners. If you need private uploads, keep it private and use signed URLs.
4. Create top-level folders you plan to use (e.g. `avatars/`, `banners/`, `cards/`).

Tip: prefer private buckets and signed uploads for production. For quick prototyping, public buckets are easier.

---

## 6) Confirm RLS / Policies

- Ensure Row Level Security (RLS) is enabled for `stall_profiles` (the migration usually enables it).
- Verify policies allow:
  - `INSERT` / `UPDATE` only by the owning user (authenticated user matching `owner_id`),
  - `SELECT` for published profiles (or `auth.role() = 'authenticated'` if you want owners to read drafts).

If you need to tweak, open **Table Editor → stall_profiles → Policies** and edit.

---

## 7) App settings & redirect URLs

- In Supabase Authentication → Settings → Site URL, set `http://localhost:3000` for local dev.
- Add redirect URLs shown above (local & production) to **Redirect URLs**.

---

## 8) Production deployment (Vercel / other hosts)

When you deploy, add the same env vars in your host's dashboard (Vercel, Netlify, etc.):

- `NEXT_PUBLIC_SUPABASE_URL` — public project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon key
- `SUPABASE_SERVICE_ROLE_KEY` — server-only secret (in Vercel set as a secret / environment variable, not exposed to client)

Also add your production redirect URL `https://<your-domain>/auth/callback` to both Google OAuth and Supabase Redirect URLs.

---

## 9) Testing checklist

- `npm run dev` in `event2` (ensure `.env.local` exists).
- Open `http://localhost:3000` and click the login flow.
- If redirect error occurs: check that the redirect URI in Google Cloud and Supabase exactly matches the app URL.
- If login returns but dashboard fails: confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct.

---

## 10) Common issues & fixes

- "Missing env key at build time": ensure `./.env.local` exists and contains the two `NEXT_PUBLIC_` vars. The app has defensive code, but some server-only flows will still require service keys at runtime.
- "Redirect URI mismatch": double-check Google OAuth and Supabase Redirect URLs for exact match, including protocol and trailing slashes.
- "403 on uploads": check storage bucket permissions (public vs private) and if private, use signed uploads.

---

## Notes & next steps

- The current app uses URL fields for banner/logo—consider implementing signed uploads to `stall-assets` and store the file path in `stall_profiles`.
- For production, rotate `service_role` keys if leaked and do not check them into source control.

If you want, I can:

- Run the SQL migration for you (requires your Supabase credentials or access), or
- Add a small upload flow that writes to the `stall-assets` bucket using signed uploads.

---

_File links:_

- Migration: [event2/supabase/migrations/20260404_create_stall_profiles.sql](event2/supabase/migrations/20260404_create_stall_profiles.sql#L1)
- This guide: [event2/SUPABASE_SETUP.md](event2/SUPABASE_SETUP.md#L1)
