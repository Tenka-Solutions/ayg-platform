import { aboutStats, company } from '@/lib/site-content'
import Image from 'next/image'

export default function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="bg-white px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-dark">
            Quiénes somos
          </span>
          <h2 id="nosotros-title" className="mb-5 mt-2 font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase leading-tight text-text">
            Más de 40 años sirviendo al campo y la industria
          </h2>
          <p className="mb-4 text-[16px] leading-relaxed text-text-mid">
            Somos Astorga y González Limitada, una empresa familiar con más de
            cuatro décadas de experiencia en la distribución de rodamientos,
            retenes y repuestos industriales en Chile.
          </p>
          <p className="mb-8 text-[16px] leading-relaxed text-text-mid">
            Nuestra trayectoria nos ha convertido en el socio de confianza de
            talleres mecánicos, empresas agrícolas y distribuidores a lo largo
            de todo el país.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {aboutStats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-display text-3xl font-extrabold text-blue-dark">
                  {stat.value}
                </span>
                <span className="text-sm leading-snug text-text-mid">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-lg bg-blue px-8 py-14 text-white lg:min-h-[420px]">
          <div aria-hidden="true" className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[44px] border-white/5" />
          <div className="relative z-10 flex max-w-md flex-col items-center gap-6 text-center">
            <Image
              src="/images/logo_white.png"
              alt=""
              width={1567}
              height={404}
              className="h-auto w-full max-w-[360px]"
            />
            <p className="text-base leading-relaxed text-white/80">
              {company.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
