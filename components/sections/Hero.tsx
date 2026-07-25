import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative grid min-w-0 grid-cols-1 items-center gap-12 overflow-hidden bg-blue px-5 py-14 text-white sm:px-8 lg:min-h-[520px] lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-[500px] w-[500px] rounded-full border-[60px] border-white/4" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-20 h-[320px] w-[320px] rounded-full border-[40px] border-white/6" />

      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-yellow/40 bg-yellow/15 px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-widest text-yellow">
          <span aria-hidden="true">★</span> +40 años en el mercado
        </div>

        <h1 className="mb-5 font-display text-[clamp(40px,5vw,66px)] font-extrabold uppercase leading-none tracking-tight">
          Todos los <br />
          repuestos <br />
          que <em className="not-italic text-yellow">necesitas,</em> <br />
          aquí.
        </h1>

        <p className="mb-9 max-w-[440px] text-[17px] leading-relaxed text-white/80">
          Distribuidores oficiales de <strong className="text-white">Koyo</strong> en Chile.
          Importadores directos de <strong className="text-white">Corteco</strong>.
          Repuestos agrícolas, ferretería industrial y mucho más.
        </p>

        <div className="flex flex-wrap gap-3.5">
          <Link href="/#productos" className="rounded bg-yellow px-6 py-3.5 text-[15px] font-bold uppercase tracking-widest text-blue-deeper transition-all hover:-translate-y-px hover:bg-yellow/90 sm:px-7 sm:text-[16px]">
            Ver catálogo
          </Link>
          <Link href="/#contacto" className="rounded border border-white/50 px-6 py-3.5 text-[15px] font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/8 sm:px-7 sm:text-[16px]">
            Cotizar por mayor
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex min-w-0 items-center justify-center">
        <Image
          src="/images/hero1.jpg"
          alt="Tractor trabajando en un campo agrícola"
          width={748}
          height={510}
          preload
          className="h-auto max-h-[420px] w-full max-w-[616px] rounded-lg object-contain"
        />
      </div>
    </section>
  )
}
