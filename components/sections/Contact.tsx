import { contactPlaceholders, socialLinks } from '@/lib/site-content'

export default function Contact() {
  const instagram = socialLinks[0]

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-bg px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-dark">
            Contacto
          </span>
          <h2 id="contacto-title" className="mt-2 font-display text-[clamp(32px,4vw,52px)] font-extrabold uppercase leading-none text-text">
            Hablemos de lo que necesitas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-mid">
            Los canales directos de atención están pendientes de confirmación. Mientras
            tanto, puedes conocer nuestras novedades a través de Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg bg-blue p-6 text-white sm:p-8">
            <h3 className="font-display text-2xl font-bold uppercase">
              Información de contacto
            </h3>
            <dl className="mt-6 space-y-5">
              {contactPlaceholders.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-yellow">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm text-white/80">{item.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded border border-white/50 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Visitar Instagram
              <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>

          <form aria-describedby="contact-form-status" className="rounded-lg border border-border bg-white p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold uppercase text-text">
              Solicitud de cotización
            </h3>
            <p id="contact-form-status" className="mt-2 rounded border border-yellow bg-yellow/20 p-3 text-sm font-medium text-blue-deeper">
              El envío aún no está habilitado. Este formulario se activará cuando el
              cliente confirme el canal de recepción.
            </p>

            <fieldset disabled className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <legend className="sr-only">Datos para una futura solicitud de cotización</legend>
              <div>
                <label htmlFor="nombre" className="mb-1.5 block text-sm font-semibold text-text">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  className="min-h-11 w-full rounded border border-border bg-bg px-3 py-2 text-text disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
              <div>
                <label htmlFor="empresa" className="mb-1.5 block text-sm font-semibold text-text">
                  Empresa
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  className="min-h-11 w-full rounded border border-border bg-bg px-3 py-2 text-text disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
              <div>
                <label htmlFor="contacto-email" className="mb-1.5 block text-sm font-semibold text-text">
                  Correo
                </label>
                <input
                  id="contacto-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="min-h-11 w-full rounded border border-border bg-bg px-3 py-2 text-text disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
              <div>
                <label htmlFor="contacto-telefono" className="mb-1.5 block text-sm font-semibold text-text">
                  Teléfono
                </label>
                <input
                  id="contacto-telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  className="min-h-11 w-full rounded border border-border bg-bg px-3 py-2 text-text disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className="mb-1.5 block text-sm font-semibold text-text">
                  ¿Qué producto necesitas?
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  className="w-full rounded border border-border bg-bg px-3 py-2 text-text disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            </fieldset>

            <button
              type="button"
              disabled
              aria-disabled="true"
              className="mt-5 cursor-not-allowed rounded bg-blue/55 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white"
            >
              Envío no habilitado
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
