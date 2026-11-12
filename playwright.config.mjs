import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  workers: 1,
  fullyParallel: false,
  use: {
    browserName: 'chromium',
    ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'public-export', testMatch: 'public.spec.mjs', use: { baseURL: 'http://127.0.0.1:4174' } },
    { name: 'local-cart', testMatch: 'cart.spec.mjs', use: { baseURL: 'http://127.0.0.1:4173' } },
  ],
  webServer: [
    {
      command: 'npm run dev -- --port 4173',
      url: 'http://127.0.0.1:4173',
      env: { NEXT_PUBLIC_CART_PREVIEW: 'true' },
      timeout: 120_000,
    },
    {
      command: 'node scripts/serve-static.mjs',
      url: 'http://127.0.0.1:4174',
      env: { PORT: '4174', NODE_ENV: 'production', NEXT_PUBLIC_CART_PREVIEW: 'true' },
    },
  ],
})
