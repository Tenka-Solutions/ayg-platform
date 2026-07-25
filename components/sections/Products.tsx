import Link from 'next/link'
import { productCategories } from '@/lib/site-content'

export default function Products() {
  return (
    <section id="productos" aria-labelledby="productos-title" className="bg-bg px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 lg:mb-12">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-dark">
          Nuestros Productos
        </span>
        <h2 id="productos-title" className="mt-2 font-display text-[clamp(32px,4vw,52px)] font-extrabold uppercase leading-none text-text">
          Lo que <em className="not-italic text-blue-dark">necesitas,</em> <br />
          cuando lo necesitas
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {productCategories.map((product) => (
          <Link
            key={product.name}
            href="/#contacto"
            className={`group overflow-hidden rounded-lg border border-border bg-white transition-all hover:-translate-y-1 hover:shadow-lg ${product.wide ? 'md:col-span-2' : ''}`}
          >
            <div aria-hidden="true" className="relative flex h-48 items-center justify-center overflow-hidden bg-blue/5">
              <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[28px] border-blue/5" />
              <svg width="92" height="92" viewBox="0 0 100 100" fill="none" className="text-blue-dark/80">
                <circle cx="50" cy="50" r="39" stroke="currentColor" strokeWidth="8" />
                <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="6" />
                <circle cx="50" cy="17" r="5" fill="currentColor" />
                <circle cx="50" cy="83" r="5" fill="currentColor" />
                <circle cx="17" cy="50" r="5" fill="currentColor" />
                <circle cx="83" cy="50" r="5" fill="currentColor" />
              </svg>
            </div>

            <div className="p-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-dark">
                {product.tag}
              </span>
              <h3 className="mb-2 mt-1 font-display text-2xl font-bold uppercase text-text">
                {product.name}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-text-mid">
                {product.description}
              </p>
              {product.badge && (
                <span className="mb-4 inline-block rounded-sm bg-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-blue">
                  {product.badge}
                </span>
              )}
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-dark transition-all group-hover:gap-3">
                {product.cta}
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  )
}
