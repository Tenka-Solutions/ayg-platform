# RAN — launch readiness & deferred commerce

## Current public scope

- Corporate landing page and product category showcase
- Contact via existing Instagram account (until the company approves official phone/email/address)
- No cart, no purchase buttons, no checkout, no order creation, no payment or shipping request

## Internal cart prototype

The cart is coded as a self-contained client-side module and is deliberately gated:

```ts
process.env.NODE_ENV === 'development' &&
process.env.NEXT_PUBLIC_CART_PREVIEW === 'true'
```

Test it only on a local development server:

```sh
npm install
NEXT_PUBLIC_CART_PREVIEW=true npm run dev
```

PowerShell:

```powershell
$env:NEXT_PUBLIC_CART_PREVIEW="true"; npm run dev
```

The internal demo renders below the contact section, supports add/remove/update,
totals in CLP, and best-effort browser localStorage persistence. All products,
SKUs and prices in the demo are fake. Nothing is transmitted to a server.
The import is guarded inline in `app/page.tsx` so the production bundler discards
the preview module and fake catalog, rather than only hiding their UI. The
preview component also requires a localhost/loopback browser hostname; the dev
server binds to `127.0.0.1` by default.

Every build runs `scripts/verify-export.mjs`, which checks the emitted HTML,
RSC/text payloads and JavaScript for private demo markers and purchase routes.
The production-lock acceptance build must use `NODE_ENV=production` and
`NEXT_PUBLIC_CART_PREVIEW=true`; the public browser tests run against that
export. Tests also cover the development/test/production flag matrix.

Persisted data is untrusted: invalid JSON and schema versions reset to an empty
cart; invalid products and quantities are discarded; duplicate SKUs merge; at
most 50 lines and 99 units per line survive. Negative, fractional, non-finite or
unsafe-integer quantity actions are ignored. Explicit quantity zero removes a
line. Denied/full storage leaves the current tab functional in memory.

## Before production publication

1. Confirm corporate legal name, contact details, store address, and actual domain.
2. Validate distribution / exclusivity, business age and stock claims with RAN.
3. Approve brand assets and photography rights.
4. Configure Cloudflare deployment and test domain/DNS/TLS separately.
5. Run `npm run lint`, `npm run test`, `npm run build`; inspect the generated `out/`.
   Also run `npm run typecheck`, `npm run test:e2e`, `npm audit` and
   `npm audit --omit=dev`. See `sprint-audit.md` for the residual tooling advisory.
6. Confirm the final live site via browser smoke tests (desktop and mobile).

## Before online sales activation

1. Obtain a real product catalog with SKU, photos, variants, prices, tax handling and stock.
2. Decide retail vs wholesale pricing, accounts, and order policies.
3. Confirm payment gateway and settlement (never collect card details in this UI).
4. Confirm carrier coverage, shipping quotes, service areas, dispatch SLAs and returns.
5. Build authoritative server-side order/pricing/stock validation and checkout.
6. Address Chilean invoicing, customer terms, privacy/data retention and consumer rights.
7. Add integration/E2E security tests and an explicit reviewed release flag.
8. Remove the local-only lock in a separate, deliberate launch PR after those dependencies are met.

**Never switch on the sales flow by changing an environment variable alone.**
