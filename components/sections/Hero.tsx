import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-blue text-white px-12 py-20 grid grid-cols-2 gap-16 items-center min-h-[520px] relative overflow-hidden">

      {/* background decorative circles */}
      <div className="absolute -right-16 -top-16 w-[500px] h-[500px] rounded-full border-[60px] border-white/4 pointer-events-none" />
      <div className="absolute right-20 -bottom-24 w-[320px] h-[320px] rounded-full border-[40px] border-white/6 pointer-events-none" />

      {/* left column */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-yellow/15 border border-yellow/40 text-yellow text-[13px] font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-sm mb-6">
          <span>★</span> +40 años en el mercado
        </div>

        <h1 className="font-display text-[clamp(42px,5vw,66px)] font-extrabold leading-none uppercase tracking-tight mb-5">
          Todos los <br />
          repuestos <br />
          que <em className="not-italic text-yellow">necesitas,</em> <br />
          aquí.
        </h1>

        <p className="text-white/75 text-[17px] max-w-[440px] mb-9 leading-relaxed">
          Distribuidores oficiales de <strong className="text-white">Koyo</strong> en Chile.
          Importadores directos de <strong className="text-white">Corteco</strong>.
          Repuestos agrícolas, ferretería industrial y mucho más.
        </p>

        <div className="flex gap-3.5 flex-wrap">
          <Link href="/#productos" className="bg-yellow text-blue-deeper font-bold text-[16px] tracking-widest uppercase px-7 py-3.5 rounded hover:bg-yellow/90 transition-all hover:-translate-y-px">
            Ver catálogo
          </Link>
          <Link href="/#contacto" className="border border-white/40 text-white font-bold text-[16px] tracking-widest uppercase px-7 py-3.5 rounded hover:border-white hover:bg-white/8 transition-all">
            Cotizar por mayor
          </Link>
        </div>
      </div>

      {/* right column — placeholder until we have real photos */}
      <div className="relative z-10 h-[380px] bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
        <span className="text-white/30 text-sm">foto hero — maquinaria agrícola</span>
      </div>

    </section>
  )
}