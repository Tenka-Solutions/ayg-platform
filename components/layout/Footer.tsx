import Link from 'next/link'
import Image from 'next/image'
import {
  company,
  footerCompanyLinks,
  productCategories,
} from '@/lib/site-content'

export default function Footer() {
  return (
    <footer className="bg-blue text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:gap-12 lg:px-12 lg:py-16">
        <div className="flex flex-col gap-4">
          <Image
            src="/images/logo_white.png"
            alt=""
            width={1567}
            height={404}
            className="h-12 w-auto max-w-[280px] object-contain object-left"
          />
          <p className="max-w-sm text-sm leading-relaxed text-white/75">
            {company.legalName} - {company.summary}
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">
            Productos
          </h2>
          <ul className="flex flex-col gap-2">
            {productCategories.map((product) => (
              <li key={product.name}>
                <Link
                  href="/#productos"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">
            Empresa
          </h2>
          <ul className="flex flex-col gap-2">
            {footerCompanyLinks.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/15 px-5 py-5 text-sm text-white/70 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <span>© 2026 {company.name} - {company.legalShortName}</span>
        <span>{company.location}</span>
      </div>
    </footer>
  )
}
