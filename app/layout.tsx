import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
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
  title: 'Rodamientos Aguas Negras — Astorga y González Ltda.',
  description: 'Distribuidores oficiales de Koyo en Chile. Rodamientos, retenes y repuestos industriales y agrícolas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${barlow.variable} ${barlowCondensed.variable}`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}