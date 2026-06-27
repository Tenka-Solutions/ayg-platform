import Link from 'next/link'

const products = [
  {
    tag: 'Distribuidor Oficial',
    name: 'Rodamientos Koyo',
    description: 'La mejor calidad en rodamientos al mejor precio del mercado. Somos los únicos distribuidores oficiales de Koyo (JTEKT) en Chile. Stock permanente de todas las medidas y tipos.',
    badge: 'Koyo JTEKT',
    cta: 'Consultar stock',
    placeholder: 'foto — rodamientos koyo',
  },
  {
    tag: 'Importación Directa',
    name: 'Retenes Corteco',
    description: 'Retenes de importación directa. Calidad alemana, medidas y tipos variados para todo tipo de maquinaria.',
    badge: null,
    cta: 'Ver más',
    placeholder: 'foto — retenes corteco',
  },
  {
    tag: 'Repuestos',
    name: 'Repuestos Agrícolas',
    description: 'Amplia variedad de repuestos y accesorios para maquinaria agrícola. Tractores, cosechadoras, implementos y más.',
    badge: null,
    cta: 'Ver más',
    placeholder: 'foto — repuestos agrícolas',
  },
  {
    tag: 'Ferretería Industrial',
    name: 'Herramientas y Ferretería',
    description: 'Todo tipo de herramientas: eléctricas, neumáticas, manuales, llaves, brocas y mucho más. También contamos con tornillería, fijaciones y elementos de ferretería para taller e industria.',
    badge: null,
    cta: 'Ver catálogo completo',
    placeholder: 'foto — herramientas y ferretería',
    wide: true,
  },
]

export default function Products() {
  return (
    <section id="productos" className="bg-bg px-12 py-20">

      {/* section header */}
      <div className="mb-12">
        <span className="text-blue-dark text-[11px] font-semibold tracking-widest uppercase">
          Nuestros Productos
        </span>
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold uppercase text-text mt-2 leading-none">
          Lo que <em className="not-italic text-blue-dark">necesitas,</em> <br />
          cuando lo necesitas
        </h2>
      </div>

      {/* product grid */}
      <div className="grid grid-cols-2 gap-6">
        {products.map((product) => (
          <Link
            key={product.name}
            href="/#contacto"
            className={`bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group ${product.wide ? 'col-span-2' : ''}`}
          >
            {/* image placeholder */}
            <div className="bg-border/50 h-48 flex items-center justify-center">
              <span className="text-text-light text-sm">{product.placeholder}</span>
            </div>

            {/* card body */}
            <div className="p-6">
              <span className="text-blue-dark text-[11px] font-semibold tracking-widest uppercase">
                {product.tag}
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-text mt-1 mb-2">
                {product.name}
              </h3>
              <p className="text-text-mid text-sm leading-relaxed mb-4">
                {product.description}
              </p>
              {product.badge && (
                <span className="inline-block bg-blue/10 text-blue text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                  {product.badge}
                </span>
              )}
              <div className="flex items-center gap-2 text-blue-dark font-semibold text-sm group-hover:gap-3 transition-all">
                {product.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}