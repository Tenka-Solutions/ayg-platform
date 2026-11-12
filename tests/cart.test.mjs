import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CART_SCHEMA_VERSION,
  MAX_CART_LINES,
  MAX_ITEM_QUANTITY,
  cartReducer,
  emptyCart,
  getCartTotals,
  formatClp,
  parseSavedCart,
  sanitizeCart,
} from '../lib/cart/model.ts'

const bearing = { sku: 'BEARING-001', name: 'Rodamiento de prueba', unitPriceClp: 12990 }
const seal = { sku: 'SEAL-001', name: 'Retén de prueba', unitPriceClp: 4990 }

test('agrega productos, acumula cantidades y calcula subtotal CLP', () => {
  let cart = cartReducer(emptyCart(), { type: 'add', product: bearing })
  cart = cartReducer(cart, { type: 'add', product: bearing, quantity: 2 })
  cart = cartReducer(cart, { type: 'add', product: seal, quantity: 2 })
  assert.equal(cart.lines.length, 2)
  assert.equal(cart.lines[0].quantity, 3)
  assert.deepEqual(getCartTotals(cart), { quantity: 5, subtotalClp: 3 * 12990 + 2 * 4990 })
})

test('edita cantidades, elimina líneas y vacía el carrito', () => {
  let cart = cartReducer(emptyCart(), { type: 'add', product: bearing })
  cart = cartReducer(cart, { type: 'set-quantity', sku: bearing.sku, quantity: 3 })
  assert.equal(cart.lines[0].quantity, 3)
  cart = cartReducer(cart, { type: 'set-quantity', sku: bearing.sku, quantity: 0 })
  assert.equal(cart.lines.length, 0)
  cart = cartReducer(cart, { type: 'add', product: seal })
  cart = cartReducer(cart, { type: 'remove', sku: seal.sku })
  assert.equal(cart.lines.length, 0)
  assert.deepEqual(cartReducer(cart, { type: 'clear' }), emptyCart())
})

test('limita cantidades y cantidad de líneas', () => {
  let cart = cartReducer(emptyCart(), { type: 'add', product: bearing, quantity: 1000 })
  assert.equal(cart.lines[0].quantity, MAX_ITEM_QUANTITY)
  for (let i = 0; i < MAX_CART_LINES + 2; i++) {
    cart = cartReducer(cart, { type: 'add', product: { ...seal, sku: `DEMO-${i}` } })
  }
  assert.equal(cart.lines.length, MAX_CART_LINES)
})

test('rechaza productos inválidos y precios incoherentes', () => {
  let cart = emptyCart()
  cart = cartReducer(cart, { type: 'add', product: { ...bearing, sku: '' } })
  cart = cartReducer(cart, { type: 'add', product: { ...bearing, unitPriceClp: -1 } })
  cart = cartReducer(cart, { type: 'add', product: { ...bearing, unitPriceClp: Number.NaN } })
  cart = cartReducer(cart, { type: 'add', product: { ...bearing, unitPriceClp: 12.4 } })
  assert.deepEqual(cart, emptyCart())
})

test('descarta JSON inválido, esquemas anteriores y cantidades manipuladas', () => {
  assert.deepEqual(parseSavedCart('{broken'), emptyCart())
  assert.deepEqual(parseSavedCart(JSON.stringify({ version: 999, lines: [] })), emptyCart())
  const recovered = parseSavedCart(JSON.stringify({
    version: CART_SCHEMA_VERSION,
    lines: [
      { product: bearing, quantity: 2 },
      { product: bearing, quantity: 3 },
      { product: { ...seal, unitPriceClp: -1200 }, quantity: 2 },
      { product: seal, quantity: '3' },
    ],
  }))
  assert.equal(recovered.lines.length, 1)
  assert.equal(recovered.lines[0].quantity, 5)
  assert.deepEqual(sanitizeCart(null), emptyCart())
})

test('cantidades inválidas no eliminan ni alteran una línea existente', () => {
  const cart = cartReducer(emptyCart(), { type: 'add', product: bearing, quantity: 2 })
  for (const quantity of [NaN, Infinity, -Infinity, -1, 0.5, 1.5, '2', null, Number.MAX_SAFE_INTEGER + 1]) {
    assert.deepEqual(cartReducer(cart, { type: 'set-quantity', sku: bearing.sku, quantity }), cart)
    assert.deepEqual(cartReducer(cart, { type: 'add', product: seal, quantity }), cart)
  }
})

test('persistencia: round trip, duplicados, límites y JSON sin estructura válida', () => {
  const cart = cartReducer(emptyCart(), { type: 'add', product: bearing, quantity: 3 })
  assert.deepEqual(parseSavedCart(JSON.stringify(cart)), cart)
  for (const serialized of [null, '', 'null', '[]', 'true', '{}', '{"version":1,"lines":{}}']) {
    assert.deepEqual(parseSavedCart(serialized), emptyCart())
  }
  const recovered = sanitizeCart({ version: 1, lines: [
    { product: bearing, quantity: 80 }, { product: bearing, quantity: 80 },
    { product: seal, quantity: 1.5 }, null,
  ] })
  assert.deepEqual(recovered.lines, [{ product: bearing, quantity: MAX_ITEM_QUANTITY }])
})

test('subtotal máximo es entero seguro y CLP se presenta sin decimales', () => {
  let cart = emptyCart()
  for (let i = 0; i < MAX_CART_LINES; i++) {
    cart = cartReducer(cart, { type: 'add', product: { ...bearing, sku: `MAX-${i}`, unitPriceClp: 1_000_000_000 }, quantity: MAX_ITEM_QUANTITY })
  }
  assert.equal(getCartTotals(cart).subtotalClp, 4_950_000_000_000)
  assert.ok(Number.isSafeInteger(getCartTotals(cart).subtotalClp))
  assert.equal(formatClp(12990).replace(/\s/g, ''), '$12.990')
  assert.equal(formatClp(0).replace(/\s/g, ''), '$0')
})
