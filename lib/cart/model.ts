/**
 * Cart domain model for an eventual RAN online store.
 * Client-side data is for UI state only; it must never be trusted for pricing,
 * availability, totals or order processing by a future checkout backend.
 */
export const CART_STORAGE_KEY = 'ran:cart:v1'
export const CART_SCHEMA_VERSION = 1 as const
export const MAX_ITEM_QUANTITY = 99
export const MAX_CART_LINES = 50

export type CartProduct = {
  sku: string
  name: string
  unitPriceClp: number
}

export type CartLine = {
  product: CartProduct
  quantity: number
}

export type CartState = {
  version: typeof CART_SCHEMA_VERSION
  lines: CartLine[]
}

export type CartAction =
  | { type: 'add'; product: CartProduct; quantity?: number }
  | { type: 'set-quantity'; sku: string; quantity: number }
  | { type: 'remove'; sku: string }
  | { type: 'clear' }
  | { type: 'hydrate'; state: unknown }

export function emptyCart(): CartState {
  return { version: CART_SCHEMA_VERSION, lines: [] }
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function normalizeProduct(value: unknown): CartProduct | null {
  if (!record(value)) return null
  const { sku, name, unitPriceClp } = value
  if (
    typeof sku !== 'string' || !sku.trim() || sku.length > 64 ||
    typeof name !== 'string' || !name.trim() || name.length > 160 ||
    typeof unitPriceClp !== 'number' || !Number.isSafeInteger(unitPriceClp) ||
    unitPriceClp < 0 || unitPriceClp > 1_000_000_000
  ) return null

  return { sku: sku.trim(), name: name.trim(), unitPriceClp }
}

function normalizeQuantity(quantity: number): number | null {
  if (!Number.isSafeInteger(quantity) || quantity < 0) return null
  return Math.min(MAX_ITEM_QUANTITY, quantity)
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const product = normalizeProduct(action.product)
      const amount = normalizeQuantity(action.quantity === undefined ? 1 : action.quantity)
      if (!product || amount === null || amount === 0) return state

      const index = state.lines.findIndex((line) => line.product.sku === product.sku)
      if (index < 0) {
        if (state.lines.length >= MAX_CART_LINES) return state
        return { ...state, lines: [...state.lines, { product, quantity: amount }] }
      }
      const lines = state.lines.map((line, lineIndex) =>
        lineIndex === index
          ? { product, quantity: Math.min(MAX_ITEM_QUANTITY, line.quantity + amount) }
          : line,
      )
      return { ...state, lines }
    }
    case 'set-quantity': {
      const quantity = normalizeQuantity(action.quantity)
      if (quantity === null) return state
      if (quantity === 0) {
        return { ...state, lines: state.lines.filter((line) => line.product.sku !== action.sku) }
      }
      return {
        ...state,
        lines: state.lines.map((line) =>
          line.product.sku === action.sku ? { ...line, quantity } : line,
        ),
      }
    }
    case 'remove':
      return { ...state, lines: state.lines.filter((line) => line.product.sku !== action.sku) }
    case 'clear':
      return emptyCart()
    case 'hydrate':
      return sanitizeCart(action.state)
  }
}

/** Treat localStorage as untrusted input, and discard stale schema versions. */
export function sanitizeCart(value: unknown): CartState {
  if (!record(value) || value.version !== CART_SCHEMA_VERSION || !Array.isArray(value.lines)) {
    return emptyCart()
  }

  let state = emptyCart()
  for (const line of value.lines.slice(0, MAX_CART_LINES * 2)) {
    if (!record(line)) continue
    const product = normalizeProduct(line.product)
    if (!product || typeof line.quantity !== 'number') continue
    state = cartReducer(state, { type: 'add', product, quantity: line.quantity })
  }
  return state
}

export function parseSavedCart(serialized: string | null): CartState {
  if (!serialized) return emptyCart()
  try {
    return sanitizeCart(JSON.parse(serialized) as unknown)
  } catch {
    return emptyCart()
  }
}

export function getCartTotals(state: CartState) {
  return state.lines.reduce(
    (totals, line) => ({
      quantity: totals.quantity + line.quantity,
      subtotalClp: totals.subtotalClp + line.quantity * line.product.unitPriceClp,
    }),
    { quantity: 0, subtotalClp: 0 },
  )
}

export function formatClp(amount: number): string {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount)
}
