import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-blue text-white">
      <div className="max-w-7xl mx-auto px-12 py-16 grid grid-cols-3 gap-12">

        {/* brand */}
        <div className="flex flex-col gap-4">
          <img
            src="/images/logo-white.png"
            alt="Rodamientos Aguas Negras"
            className="h-12 w-auto object-left object-contain"
          />
          <p className="text-white/60 text-sm leading-relaxed">
            Astorga y González Limitada - más de 40 años distribuyendo
            rodamientos, retenes, y repuestos industriales y agrícolas en Chile.
          </p>
        </div>

        {/* products */}
        <div>
          <h4 className="font-semibold text-sm tracking-widest uppercase text-white/40 mb-4">
            Productos
          </h4>
          <ul className="flex flex-col gap-2">
            {['Rodamientos Koyo', 'Retenes Corteco', 'Repuestos Agrícolas', 'Ferretería'].map((item) => (
              <li key={item}>
                <Link href="/#productos" className="text-white/70 hover:text-white text-sm transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* company */}
        <div>
          <h4 className="font-semibold text-sm tracking-widest uppercase text-white/40 mb-4">
            Empresa
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/#nosotros" className="text-white/70 hover:text-white text-sm transition-colors">
                Quiénes somos
              </Link>
            </li>
            <li>
              <Link href="/#contacto" className="text-white/70 hover:text-white text-sm transition-colors">
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/#contacto" className="text-white/70 hover:text-white text-sm transition-colors">
                Venta por mayor
              </Link>
            </li>
            <li>
                 <a href="https://www.instagram.com/rodamientosaguasnegras/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white text-sm transition-colors">
                  Instagram
                </a>
            </li>
          </ul>
        </div>

      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10 px-12 py-5 flex items-center justify-between text-white/40 text-sm max-w-7xl mx-auto">
        <span>© 2026 Rodamientos Aguas Negras — Astorga y González Ltda.</span>
        <span>Curicó, Región del Maule, Chile 🇨🇱</span>
      </div>
    </footer>
  )
}