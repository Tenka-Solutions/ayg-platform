import Link from 'next/link'

export default function Nav() {
  return (
    <>
      <div className="bg-blue-deeper text-white text-center py-2.5 px-6 text-[13px] font-medium tracking-wide">
        Síguenos en Instagram para enterarte de todo —{' '}
        <a href="https://www.instagram.com/rodamientosaguasnegras/" target="_blank" rel="noopener noreferrer" className="text-yellow hover:underline">
          @rodamientosaguasnegras →
        </a>
      </div>

      <nav className="bg-blue px-12 flex items-center justify-between h-18 sticky top-0 z-50">
        <Link href="/" className="flex items-center">
          <img src="/images/logo-white.png" alt="Rodamientos Aguas Negras" className="h-12 w-auto" />
        </Link>

        <ul className="flex gap-8 list-none">
          <li>
            <Link href="/#productos" className="text-white/85 hover:text-white font-medium text-[15px] transition-colors">
              Productos
            </Link>
          </li>
          <li>
            <Link href="/#nosotros" className="text-white/85 hover:text-white font-medium text-[15px] transition-colors">
              Nosotros
            </Link>
          </li>
          <li>
            <Link href="/#contacto" className="text-white/85 hover:text-white font-medium text-[15px] transition-colors">
              Contacto
            </Link>
          </li>
        </ul>

        <Link href="/#contacto" className="bg-yellow text-blue-deeper font-bold text-[15px] tracking-widest uppercase px-5 py-2.5 rounded hover:bg-yellow/90 transition-colors">
          Cotizar
        </Link>
      </nav>
    </>
  )
}