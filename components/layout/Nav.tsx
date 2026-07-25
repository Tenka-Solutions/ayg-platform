import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import { navigationLinks, socialLinks } from '@/lib/site-content'

export default function Nav() {
  const instagram = socialLinks[0]

  return (
    <>
      <div className="bg-blue-deeper px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white sm:px-6 sm:text-[13px]">
        Síguenos en Instagram para enterarte de todo —{' '}
        <a
          href={instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-yellow hover:underline"
        >
          @rodamientosaguasnegras →
        </a>
      </div>

      <nav
        aria-label="Navegación principal"
        className="sticky top-0 z-50 flex h-16 items-center justify-between bg-blue px-5 sm:h-18 sm:px-8 lg:px-12"
      >
        <Link href="/" aria-label="Rodamientos Aguas Negras, inicio" className="flex min-w-0 items-center">
          <Image
            src="/images/logo_white.png"
            alt=""
            width={1567}
            height={404}
            className="h-9 w-auto max-w-[190px] object-contain sm:h-12 sm:max-w-[260px]"
          />
        </Link>

        <ul className="hidden list-none items-center gap-8 lg:flex">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[15px] font-medium text-white/90 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#contacto"
          className="hidden rounded bg-yellow px-5 py-2.5 text-[15px] font-bold uppercase tracking-widest text-blue-deeper transition-colors hover:bg-yellow/90 lg:block"
        >
          Cotizar
        </Link>

        <MobileMenu links={navigationLinks} />
      </nav>
    </>
  )
}
