# Rodamientos Aguas Negras

Corporate website and product showcase for Rodamientos Aguas Negras / Astorga y
González Limitada, an industrial and agricultural parts distributor in Chile.

The current site is a static brochure and quotation-oriented showcase. It does
not include live inventory, e-commerce, authentication, APIs, or an enabled
contact form.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Barlow and Barlow Condensed through `next/font`
- Static HTML export for Cloudflare Pages

## Local development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run lint
npm run build
```

`next.config.ts` uses `output: 'export'`. A successful production build creates
the deployable site in `out/`, including `out/index.html`. The exported site
does not require a Next.js or Node.js server at runtime.

## Cloudflare Pages

Use these build settings:

- Root directory: repository root
- Build command: `npm run build`
- Build output directory: `out`

No Wrangler configuration, OpenNext adapter, or Pages Function is required for
the current static site.

## Project structure

```text
app/                  App Router entry points, metadata, and global styles
components/layout/    Navigation and footer
components/sections/  Homepage sections
lib/site-content.ts   Shared navigation, products, claims, links, and placeholders
public/images/        Brand and page image assets
```

## Editing content

Shared business content is centralized in `lib/site-content.ts`. Update that
file before changing repeated text inside components. Layout and presentation
remain in the matching component under `components/`.

The in-use white logo is `public/images/logo_white.png`. Other logo files are
retained until the client confirms which variants are approved.

## Details requiring confirmation

Before final publication, the client must confirm:

- Public phone number
- Sales email
- Street address
- Contact-form destination
- Production domain
- Legal display name
- Start year and years-in-business wording
- Koyo/JTEKT distributor relationship and exclusivity wording
- Corteco importer relationship
- Stock, brand, and nationwide-service claims
- Rights and approval for all photography and logo variants

The contact form remains visibly disabled until a real destination and handling
requirements are approved.

## Known limitations

- Product cards lead to the contact section; product detail routes do not exist.
- Product and company imagery uses branded fallbacks where approved photography
  is unavailable.
- No sitemap or canonical URL is emitted because the production domain has not
  been confirmed.
- There is no live catalog, product search, inventory, checkout, or admin area.

## Future catalog direction

The existing static architecture can later add category and product routes
generated at build time. Server-backed deployment should only be introduced
when requirements such as live inventory, authenticated administration,
customer-specific pricing, or e-commerce make it necessary.
