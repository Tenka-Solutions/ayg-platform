import { contactPlaceholders, socialLinks } from '@/lib/site-content'

export default function Contact() {
  const instagram = socialLinks[0]

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-bg px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-dark">Contacto</span>
          <h2 id="contacto-title" className="mt-2 font-display text-[clamp(32px,4vw,52px)] font-extrabold uppercase leading-none text-text">
            Hablemos de lo que necesitas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-mid">
            Consulta por productos y disponibilidad a través de nuestro Instagram.
            Publicaremos otros canales de atención cuando sean confirmados por la empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-lg bg-blue p-6 text-white sm:p-8">
            <h3 className="font-display text-2xl font-bold uppercase">Información de contacto</h3>
            <dl className="mt-6 space-y-5">
              {contactPlaceholders.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-yellow">{item.label}</dt>
                  <dd className="mt-1 text-sm text-white/80">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col justify-center rounded-lg border border-border bg-white p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold uppercase text-text">Consultar productos</h3>
            <p className="mt-3 text-base text-text-mid">
              ¿Buscas un rodamiento, retén o repuesto? Escríbenos por Instagram
              indicando el código, medida o referencia del producto.
            </p>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center self-start rounded bg-blue px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-blue-deeper"
            >
              Contactar por Instagram <span aria-hidden="true" className="ml-2">↗</span>
            </a>
            <p className="mt-3 text-xs text-text-light">
              Se abrirá el perfil de Instagram de Rodamientos Aguas Negras.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
