import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Products from '@/components/sections/Products'
import About from '@/components/sections/About'
import Wholesale from '@/components/sections/Wholesale'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main id="contenido">
      <Hero />
      <TrustBar />
      <Products />
      <Wholesale />
      <About />
      <Contact />
    </main>
  )
}
