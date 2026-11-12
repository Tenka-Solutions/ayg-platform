'use client'

import { useEffect, useReducer, useState } from 'react'
import {
  CART_STORAGE_KEY,
  cartReducer,
  emptyCart,
  formatClp,
  getCartTotals,
  parseSavedCart,
} from '@/lib/cart/model'
import { previewProducts } from '@/lib/commerce/preview-products'

/**
 * Internal local-dev preview only. Never mount in production.
 * Fake prices and SKUs are not a real catalog or sales offer.
 */
export default function CartPreview() {
  const [cart, dispatch] = useReducer(cartReducer, undefined, emptyCart)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      dispatch({ type: 'hydrate', state: parseSavedCart(window.localStorage.getItem(CART_STORAGE_KEY)) })
    } catch {
      // Browsers can deny localStorage; keep the in-memory cart functional.
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // Storage might be disabled or full. The cart still functions in memory.
    }
  }, [cart, hydrated])

  const totals = getCartTotals(cart)

  return (
    <section id="carrito-dev" aria-labelledby="carrito-dev-title" className="border-y-4 border-dashed border-amber-500 bg-amber-50 px-5 py-12 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <span className="inline-flex rounded bg-amber-200 px-3 py-1 text-xs font-bold uppercase tracking-wide">Solo desarrollo · datos ficticios</span>
        <h2 id="carrito-dev-title" className="mt-3 font-display text-3xl font-extrabold uppercase">
          Prueba interna del carrito
        </h2>
        <p className="mt-2 max-w-3xl text-sm">
          Esta sección solo se muestra en desarrollo con NEXT_PUBLIC_CART_PREVIEW=true.
          No hay pagos, cotizaciones automáticas, órdenes ni despachos. Los precios son únicamente datos de prueba.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h3 className="mb-3 text-lg font-bold">Productos de demostración</h3>
            <div className="space-y-3">
              {previewProducts.map((product) => (
                <article key={product.sku} className="flex flex-wrap items-center justify-between gap-3 rounded border border-amber-200 bg-white p-4">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-slate-500">SKU ficticio: {product.sku}</p>
                    <p className="text-sm">{formatClp(product.unitPriceClp)}</p>
                  </div>
                  <button type="button" onClick={() => dispatch({ type: 'add', product })}
                    className="min-h-11 rounded bg-blue-deeper px-4 py-2 font-semibold text-white hover:bg-blue">
                    Agregar
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded border border-amber-200 bg-white p-5">
            <h3 className="mb-4 text-lg font-bold">Carrito ({totals.quantity})</h3>
            {cart.lines.length === 0 ? (
              <p className="text-sm text-slate-600">El carrito está vacío.</p>
            ) : (
              <ul className="space-y-4">
                {cart.lines.map(({ product, quantity }) => (
                  <li key={product.sku} className="border-b border-slate-200 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-semibold">{product.name}</span>
                      <button type="button" onClick={() => dispatch({ type: 'remove', sku: product.sku })}
                        aria-label={`Quitar ${product.name}`} className="text-sm font-semibold text-red-700 underline">Quitar</button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => dispatch({ type: 'set-quantity', sku: product.sku, quantity: quantity - 1 })}
                          aria-label={`Reducir cantidad de ${product.name}`} className="min-h-11 min-w-11 rounded border border-slate-400">−</button>
                        <span aria-label={`Cantidad: ${quantity}`} className="min-w-8 text-center">{quantity}</span>
                        <button type="button" onClick={() => dispatch({ type: 'set-quantity', sku: product.sku, quantity: quantity + 1 })}
                          disabled={quantity >= 99} aria-label={`Aumentar cantidad de ${product.name}`}
                          className="min-h-11 min-w-11 rounded border border-slate-400 disabled:opacity-40">+</button>
                      </div>
                      <span className="text-sm font-bold">{formatClp(product.unitPriceClp * quantity)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5 flex justify-between border-t border-slate-200 pt-4 font-bold">
              <span>Subtotal de prueba</span><span>{formatClp(totals.subtotalClp)}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">Sin impuestos, despacho ni descuentos. No válido para venta.</p>
            <button type="button" onClick={() => dispatch({ type: 'clear' })}
              disabled={cart.lines.length === 0}
              className="mt-5 min-h-11 w-full rounded border border-slate-400 px-4 py-2 font-semibold disabled:opacity-40">
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
