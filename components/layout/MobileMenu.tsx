'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SiteLink } from '@/lib/site-content'

type MobileMenuProps = {
  links: readonly SiteLink[]
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-11 min-w-11 items-center justify-center rounded border border-white/40 text-white"
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {isOpen ? (
            <path d="M6 6l12 12M18 6 6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-t border-white/10 bg-blue px-5 py-5 shadow-xl"
        >
          <ul className="flex list-none flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded px-3 py-3 text-base font-semibold text-white hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/#contacto"
                onClick={() => setIsOpen(false)}
                className="block rounded bg-yellow px-5 py-3 text-center text-sm font-bold uppercase tracking-widest text-blue-deeper hover:bg-yellow/90"
              >
                Cotizar
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
