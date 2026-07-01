const stats = [
  { value: '+40', label: 'Años en el mercado' },
  { value: '1', label: 'Distribuidor oficial Koyo en Chile' },
  { value: '100%', label: 'Importación directa Corteco' },
]

export default function About() {
  return (
    <section id="nosotros" className="bg-white px-12 py-20">
      <div className="grid grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

        {/* left column — text */}
        <div>
          <span className="text-blue-dark text-[11px] font-semibold tracking-widest uppercase">
            Quiénes somos
          </span>
          <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-extrabold uppercase text-text mt-2 mb-5 leading-tight">
            Más de 40 años sirviendo al campo y la industria
          </h2>
          <p className="text-text-mid text-[16px] leading-relaxed mb-4">
            Somos Astorga y González Limitada, una empresa familiar con más de
            cuatro décadas de experiencia en la distribución de rodamientos,
            retenes y repuestos industriales en Chile.
          </p>
          <p className="text-text-mid text-[16px] leading-relaxed mb-8">
            Nuestra trayectoria nos ha convertido en el socio de confianza de
            talleres mecánicos, empresas agrícolas y distribuidores a lo largo
            de todo el país.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="font-display text-3xl font-extrabold text-blue-dark block">
                  {stat.value}
                </span>
                <span className="text-text-light text-sm leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* right column — image placeholder */}
        <div className="bg-bg h-[420px] rounded-lg border border-border flex items-center justify-center">
          <span className="text-text-light text-sm">foto — equipo o local Rodamientos Aguas Negras</span>
        </div>

      </div>
    </section>
  )
}