import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Products from '@/components/sections/Products'
import About from '@/components/sections/About'
import Wholesale from '@/components/sections/Wholesale'
import Contact from '@/components/sections/Contact'

export default async function Home() {
  // Keep this guard inline: the bundler must discard the import itself in production.
  // An imported boolean can hide the UI while still emitting the mock catalog chunk.
  const CartPreview = process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_CART_PREVIEW === 'true'
    ? (await import('@/components/commerce/CartPreview')).default
    : null
  return (
    <main id="contenido" tabIndex={-1}>
      <Hero />
      <TrustBar />
      <Products />
      <Wholesale />
      <About />
      <Contact />
      {CartPreview && <CartPreview />}
    </main>
  )
}
