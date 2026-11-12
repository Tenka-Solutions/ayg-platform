import { test, expect } from '@playwright/test'

const key = 'ran:cart:v1'
const bearing = 'Rodamiento (ejemplo)'
const seal = 'Retén (ejemplo)'

for (const width of [320, 1280]) {
  test(`carrito local a ${width}px: agregar, editar, persistir, quitar y vaciar`, async ({ page }, testInfo) => {
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.locator('#carrito-dev')).toBeVisible()
    await expect(page.getByText('Solo desarrollo · datos ficticios')).toBeVisible()
    const addBearing = page.getByRole('button', { name: `Agregar ${bearing}`, exact: true })
    await addBearing.click()
    await addBearing.click()
    await page.getByRole('button', { name: `Aumentar cantidad de ${bearing}`, exact: true }).click()
    await page.getByRole('button', { name: `Reducir cantidad de ${bearing}`, exact: true }).click()
    await page.getByRole('button', { name: `Agregar ${seal}`, exact: true }).click()
    await expect(page.getByRole('status')).toContainText('3 unidades. Subtotal de prueba: $30.970')
    await expect.poll(() => page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)).lines.length, key)).toBe(2)
    await page.reload()
    await expect(page.getByRole('status')).toContainText('3 unidades. Subtotal de prueba: $30.970')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.locator('#carrito-dev').screenshot({ path: testInfo.outputPath(`cart-${width}.png`) })
    await page.getByRole('button', { name: `Quitar ${bearing}`, exact: true }).click()
    await expect(page.getByRole('status')).toContainText('1 unidades. Subtotal de prueba: $4.990')
    await expect(page.getByRole('heading', { name: 'Carrito (1)', exact: true })).toBeFocused()
    await expect(page.getByRole('button', { name: `Reducir cantidad de ${seal}`, exact: true })).toBeDisabled()
    await page.getByRole('button', { name: 'Vaciar carrito', exact: true }).click()
    await expect(page.getByText('El carrito está vacío.')).toBeVisible()
    await expect.poll(() => page.evaluate((storageKey) => JSON.parse(localStorage.getItem(storageKey)).lines, key)).toEqual([])
    await page.reload()
    await expect(page.getByText('El carrito está vacío.')).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('JSON corrupto se recupera y los límites son accesibles', async ({ page }) => {
  await page.goto('/')
  await page.evaluate((storageKey) => localStorage.setItem(storageKey, '{broken'), key)
  await page.reload()
  await expect(page.getByText('El carrito está vacío.')).toBeVisible()
  await page.getByRole('button', { name: `Agregar ${bearing}`, exact: true }).click()
  await page.evaluate((storageKey) => {
    const cart = JSON.parse(localStorage.getItem(storageKey))
    cart.lines[0].quantity = 1000
    localStorage.setItem(storageKey, JSON.stringify(cart))
  }, key)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Carrito (99)', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: `Agregar ${bearing}`, exact: true })).toBeDisabled()
  await expect(page.getByRole('button', { name: `Aumentar cantidad de ${bearing}`, exact: true })).toBeDisabled()
})

for (const failure of ['denied', 'quota']) {
  test(`localStorage ${failure}: el carrito continúa en memoria`, async ({ page }) => {
    await page.addInitScript((mode) => {
      if (mode === 'denied') {
        Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Denied', 'SecurityError') } })
      } else {
        Storage.prototype.setItem = () => { throw new DOMException('Quota exceeded', 'QuotaExceededError') }
      }
    }, failure)
    await page.goto('/')
    await page.getByRole('button', { name: `Agregar ${bearing}`, exact: true }).click()
    await expect(page.getByRole('status')).toContainText('$12.990')
    await page.getByRole('button', { name: 'Vaciar carrito', exact: true }).click()
    await expect(page.getByText('El carrito está vacío.')).toBeVisible()
  })
}
