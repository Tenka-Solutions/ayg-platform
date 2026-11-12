# Rodamientos Aguas Negras

Static corporate website and product-category showcase for Rodamientos Aguas Negras / Astorga y González Limitada, Chile.

The public website is **not an online store**. It has no live inventory, authenticated accounts, customer cart, checkout, payment gateway, shipping rates, or order-creation API.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4
- Static HTML export to `out/` for Cloudflare Pages or static assets hosting
- Barlow and Barlow Condensed fonts via `next/font`

## Develop and verify

Requires a compatible Node.js version (Node 24 recommended).

```sh
npm ci
npm run lint
npm run test
npm run build
npm run dev
```

Open `http://localhost:3000`. For Cloudflare Pages, set the build command to `npm run build` and output directory to `out`. For a Worker assets deployment, review `wrangler.jsonc` and the desired hosting configuration. **Do not migrate DNS or publish until the active production domain/site ownership is verified.**

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

The preview includes sample products with **fake prices and fake SKUs**, quantity controls, CLP subtotals, delete/clear, and best-effort localStorage persistence. It does **not** create orders, charge customers, calculate tax or shipping, or validate real inventory.

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
tests/                  Cart unit tests
public/images/          Static imagery
```

## Before declaring the public site ready

Confirm contact details, domain, correct brand and business claims, and photographic rights. Review the live Cloudflare deploy/DNS, run lint/tests/build, then perform desktop/mobile browser acceptance. Those checks are not replaced by the presence of the code in this repository.
