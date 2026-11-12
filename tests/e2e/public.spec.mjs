import { test, expect } from '@playwright/test'
import { writeFile } from 'node:fs/promises'

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`catálogo público a ${width}px sin carrito ni desbordamiento`, async ({ page }, testInfo) => {
    const errors = []
    const brokenAssets = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('response', (response) => {
      if (response.status() >= 400) brokenAssets.push(`${response.status()} ${response.url()}`)
    })
    await page.setViewportSize({ width, height: 900 })
    await page.addInitScript(() => {
      window.__ranVitals = { cls: 0, lcpMs: null }
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__ranVitals.cls += entry.value
        }
      }).observe({ type: 'layout-shift', buffered: true })
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__ranVitals.lcpMs = entry.startTime
      }).observe({ type: 'largest-contentful-paint', buffered: true })
    })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    for (const id of ['productos', 'mayoristas', 'nosotros', 'contacto']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1)
    }
    await expect(page.locator('#carrito-dev')).toHaveCount(0)
    await expect(page.getByRole('button', { name: /agregar|comprar|pagar|checkout/i })).toHaveCount(0)
    expect(await page.evaluate(() => localStorage.getItem('ran:cart:v1'))).toBeNull()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(await page.locator('h1').evaluate((element) => getComputedStyle(element).fontFamily)).toMatch(/barlow/i)
    expect(await page.locator('body').evaluate((element) => getComputedStyle(element).fontFamily)).toMatch(/barlow/i)
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect.poll(() => page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true)
    await page.evaluate(() => window.scrollTo(0, 0))
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
    expect(await page.getByText('Saltar al contenido').evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThan(0)
    await page.screenshot({ path: testInfo.outputPath(`public-${width}.png`), fullPage: true })
    const metricsPath = testInfo.outputPath('local-lab-vitals.json')
    await writeFile(metricsPath, JSON.stringify(await page.evaluate(() => window.__ranVitals)))
    await testInfo.attach('local-lab-vitals', { path: metricsPath, contentType: 'application/json' })
    expect(errors).toEqual([])
    expect(brokenAssets).toEqual([])
  })
}

test('menú móvil: teclado, Escape, foco, enlaces y cambio a escritorio', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByText('Saltar al contenido')).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  const toggle = page.getByRole('button', { name: 'Abrir menú' })
  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('#mobile-navigation')).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(page.locator('#mobile-navigation').getByRole('link', { name: 'Productos', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(page.locator('#mobile-navigation')).toBeHidden()
  await toggle.click()
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Contacto', exact: true }).click()
  await expect(page).toHaveURL(/#contacto$/)
  await expect(page.locator('#mobile-navigation')).toBeHidden()
  expect(await page.locator('#contacto').evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(63)
  await toggle.click()
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.setViewportSize({ width: 375, height: 812 })
  await expect(page.locator('#mobile-navigation')).toBeHidden()
})

test('las rutas de compra inexistentes responden 404', async ({ request }) => {
  for (const path of ['/cart', '/carrito', '/checkout', '/orders', '/api/orders', '/pago', '/shipping']) {
    const response = await request.get(path)
    expect(response.status(), path).toBe(404)
  }
  expect((await request.post('/api/orders', { data: {} })).status()).toBe(405)
})
