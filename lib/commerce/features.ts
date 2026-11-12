/**
 * Safety lock: the cart preview can ONLY render in local development.
 * A production build must never expose a cart, checkout or ordering route,
 * regardless of the NEXT_PUBLIC_CART_PREVIEW environment variable.
 * Enabling sales in the future requires an explicit code change and review.
 */
export const cartPreviewEnabled =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_CART_PREVIEW === 'true'
