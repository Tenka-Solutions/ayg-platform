import type { CartProduct } from '@/lib/cart/model'

/**
 * DEMO ONLY. These are illustrative prices, names and SKUs,
 * not business-approved RAN products or retail offers.
 */
export const previewProducts: readonly CartProduct[] = [
  { sku: 'DEMO-ROD-001', name: 'Rodamiento (ejemplo)', unitPriceClp: 12990 },
  { sku: 'DEMO-RET-002', name: 'Retén (ejemplo)', unitPriceClp: 4990 },
  { sku: 'DEMO-REP-003', name: 'Repuesto agrícola (ejemplo)', unitPriceClp: 24990 },
]
