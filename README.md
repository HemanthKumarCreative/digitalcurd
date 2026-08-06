# Digital Curd

Next.js marketing site with **Sanity CMS** for all page content and media.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

Until Sanity credentials are configured, pages load from local JSON fallbacks in `src/content/` so the site still builds and runs.

## Sanity setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (or run `npx sanity@latest login` then create a project).
2. Put values in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_WRITE_TOKEN=yourEditorToken
SANITY_REVALIDATE_SECRET=aLongRandomString
```

3. Open `/studio` and confirm the schema loads.
4. Seed existing content (JSON + Unsplash/local media uploads):

```bash
npm run sanity:seed
```

The seed script uploads hero/cover/team images from Unsplash and logo SVGs from `public/assets/logos/` into the Sanity asset CDN, then creates all page/service/blog/job/legal documents.

5. In Sanity Manage → API → CORS origins, add `http://localhost:3000` (and your production domain).
6. Optional webhook: point Sanity to `POST /api/revalidate?secret=YOUR_SECRET` on publish so Next.js cache tags refresh (`revalidateTag(..., 'max')`).

## Content model

| Studio area | Types |
|-------------|--------|
| Pages | `homePage`, `aboutPage`, `careersPage`, `contactPage`, `blogIndex`, `servicesIndex` |
| Services | `service` (25+ documents) |
| Blog | `post` |
| Careers | `job` |
| Legal | `legalPage` |
| Settings | `siteSettings` (email, phone, socials, footer) |

Hero/cover images support Sanity `image` assets plus URL fallbacks used by the seed script.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js + embedded Studio |
| `npm run build` | Production build |
| `npm run sanity:seed` | Migrate `src/content/**` into Sanity |

## Stack

- Next.js 16 (App Router)
- Sanity v3 + `next-sanity`
- Tailwind CSS 4
