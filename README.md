# Rodamientos Aguas Negras

Static corporate website and product-category showcase for Rodamientos Aguas Negras / Astorga y González Limitada, Chile.

The public website is **not an online store**. It has no live inventory, authenticated accounts, customer cart, checkout, payment gateway, shipping rates, or order-creation API.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Static HTML export to `out/` for Cloudflare Pages or static assets hosting
- Barlow and Barlow Condensed fonts via `next/font`

## Develop and verify

Requires Node.js 24 or newer. The verified toolchain is Node 24, Next.js 16.4.6,
React 19.2.4, TypeScript 5 and Tailwind CSS 4.

```sh
npm ci
npm run lint
npm run test
npm run typecheck
npm run build
npm run dev
```

Open `http://127.0.0.1:3000`. Development binds to loopback. For Cloudflare Pages,
set the build command to `npm run build` and output directory to `out`. For a
Worker assets deployment, review `wrangler.jsonc` and the desired hosting
configuration. Only static assets are needed; no Next.js server or OpenNext
adapter is used. **Do not migrate DNS or publish until the active production
domain/site ownership is verified.**

Every build runs `verify:export` automatically to check public metadata,
fragments, resources and absence of private commerce content in HTML, RSC and JS.
Use `npm start` after building for a loopback-only preview of `out/` (including
real 404 responses); `next start` is incompatible with static export.

## Contact

Contact uses the company's existing Instagram profile until RAN approves a public contact email, phone, address, and actual form destination. No nonfunctional contact form is exposed.

## Internal cart prototype — NEVER publicly exposed

The code is present but gated by **both** development mode and an explicit flag. It does not render in production, even if the flag is set:

```sh
NEXT_PUBLIC_CART_PREVIEW=true npm run dev
```

On Windows PowerShell:

```powershell
$env:NEXT_PUBLIC_CART_PREVIEW="true"; npm run dev
```

The preview additionally checks the browser hostname (localhost / loopback).
It includes sample products with **fake prices and fake SKUs**, integer quantity
controls (1–99), CLP subtotals, delete/clear, and best-effort localStorage
persistence. It does **not** create orders, charge customers, calculate tax or
shipping, or validate real inventory.

To reproduce the production lock and browser checks in PowerShell:

```powershell
$env:NEXT_PUBLIC_CART_PREVIEW="true"
$env:NODE_ENV="production"
npm run build
Remove-Item Env:NODE_ENV
npm run test:e2e
```

Playwright starts isolated local development and static servers and stops them
after testing. Install its Chromium once with `npx playwright install chromium`,
or use an existing Chrome with `$env:PLAYWRIGHT_CHANNEL="chrome"` before running
`npm run test:e2e`. Screenshots and failure traces go to ignored `test-results/`.

See [docs/commerce-readiness.md](docs/commerce-readiness.md) for the deferred commerce launch checklist.

## Project layout

```text
app/                    Route and global layout
components/layout/      Nav and footer
components/sections/    Public landing sections
components/commerce/    Local-only internal cart preview
lib/site-content.ts     Public copy and product categories
lib/cart/               Typed cart state, reducer, validation, totals
lib/commerce/           Preview flag and mock products
tests/                  Cart/flag unit tests and browser acceptance
scripts/                Static preview and export verification
public/images/          Optimized imagery currently used by the site
assets/source-images/   Preserved originals and unused drafts (not exported)
```

## Before declaring the public site ready

Confirm contact details, domain, correct brand and business claims, and photographic rights. Review the live Cloudflare deploy/DNS, run lint/tests/build, then perform desktop/mobile browser acceptance. Those checks are not replaced by the presence of the code in this repository.

See [the sprint audit](docs/sprint-audit.md) for security applicability, validation
results, changed files and remaining client decisions.
