import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { company } from '@/lib/site-content'
import './globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: `${company.name} | Rodamientos y repuestos`,
  description:
    'Rodamientos, retenes, repuestos agrícolas y ferretería industrial para el campo y la industria en Chile.',
  openGraph: {
    title: `${company.name} | Rodamientos y repuestos`,
    description:
      'Rodamientos, retenes, repuestos agrícolas y ferretería industrial para el campo y la industria en Chile.',
    siteName: company.name,
    locale: 'es_CL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>
        <a
          href="#contenido"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded bg-yellow px-4 py-2 font-bold text-blue-deeper transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
