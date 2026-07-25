import Link from 'next/link'

export default function Wholesale() {
  return (
    <section id="mayoristas" aria-labelledby="mayoristas-title" className="bg-yellow px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-deeper">
            Venta por mayor y menor
          </span>
          <h2 id="mayoristas-title" className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-extrabold uppercase leading-tight text-blue">
            Atención para talleres y distribuidores
          </h2>
          <p className="mt-2 text-base leading-relaxed text-blue-deeper">
            Consulta disponibilidad y condiciones directamente con nuestro equipo.
          </p>
        </div>
        <Link
          href="/#contacto"
          className="self-start rounded bg-blue px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-blue-deeper lg:self-center"
        >
          Solicitar cotización
        </Link>
      </div>
    </section>
  )
}
