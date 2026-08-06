# Digital Curd

Next.js marketing site with **Sanity** content and a **custom admin CMS** at `/admin` (production: `admin.digitalcurd.com`).

## Getting started

```bash
npm install --legacy-peer-deps
cp .env.example .env.local
# fill Sanity + ADMIN_EMAIL + ADMIN_PASSWORD + ADMIN_SESSION_SECRET
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Custom admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Sanity Studio (dev/debug): [http://localhost:3000/studio](http://localhost:3000/studio)

Until Sanity credentials are configured, public pages load from local JSON fallbacks in `src/content/`.

## Admin CMS (custom)

Primary editing UI is the custom admin — **not** Sanity Studio.

### Auth (single user, no database)

Set in `.env.local`:

```env
ADMIN_EMAIL=you@digitalcurd.com
ADMIN_PASSWORD=at-least-10-chars
ADMIN_SESSION_SECRET=long-random-string
ADMIN_NAME=Admin
```

No Postgres, Neon, or bootstrap script required. One fixed admin account from env vars.

### Production domains

| Host | App |
|------|-----|
| `digitalcurd.com` / `www` | Public website only |
| `admin.digitalcurd.com` | Custom admin only |

Middleware rewrites the admin host to `/admin/*` and blocks `/admin` + `/studio` on the public domain in production.

### Features (MVP)

- Single-admin login/logout with remember me + session timeout
- Dashboard counts + recent updates
- Editors for pages, services, blog, jobs, legal, site settings
- Media upload/list/delete (Sanity assets)
- Extended SEO fields
- Multi-device live preview + Draft Mode

## Sanity setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Configure env vars (see `.env.example`).
3. Seed content: `npm run sanity:seed`
4. CORS: add `http://localhost:3000`, public domain, and admin domain (credentials on).
5. Optional webhook: `POST /api/revalidate?secret=YOUR_SECRET`

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js (site + admin + studio) |
| `npm run build` | Production build |
| `npm run sanity:seed` | Migrate `src/content/**` into Sanity |

## Stack

- Next.js 16 (App Router)
- Signed-cookie admin session (env credentials)
- Sanity + `next-sanity`
- Tailwind CSS 4
- React Hook Form + Zod
