export type SiteLink = {
  label: string
  href: string
  external?: boolean
}

export type ProductCategory = {
  tag: string
  name: string
  description: string
  badge: string | null
  cta: string
  wide?: boolean
}

export type CompanyClaim = {
  label: string
  value: string
  detail: string
  requiresConfirmation: boolean
}

export type ContactPlaceholder = {
  label: string
  value: string
  href: string | null
  requiresConfirmation: true
}

export const company = {
  name: 'Rodamientos Aguas Negras',
  legalName: 'Astorga y González Limitada',
  legalShortName: 'Astorga y González Ltda.',
  location: 'Curicó, Región del Maule, Chile',
  summary:
    'Rodamientos, retenes y repuestos industriales y agrícolas para el campo y la industria.',
} as const

export const navigationLinks: readonly SiteLink[] = [
  { label: 'Productos', href: '/#productos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
]

export const socialLinks: readonly SiteLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rodamientosaguasnegras/',
    external: true,
  },
]

export const productCategories: readonly ProductCategory[] = [
  {
    tag: 'Rodamientos',
    name: 'Rodamientos Koyo',
    description:
      'Consulta por rodamientos Koyo y referencias compatibles. Indícanos las medidas o el código que necesitas.',
    badge: 'Koyo / JTEKT',
    cta: 'Consultar disponibilidad',
  },
  {
    tag: 'Retenes',
    name: 'Retenes Corteco',
    description:
      'Retenes para aplicaciones industriales y maquinaria. Consulta medidas, referencias y disponibilidad.',
    badge: null,
    cta: 'Consultar disponibilidad',
  },
  {
    tag: 'Repuestos',
    name: 'Repuestos Agrícolas',
    description:
      'Repuestos y accesorios para maquinaria agrícola. Consúltanos por tu modelo y referencia.',
    badge: null,
    cta: 'Consultar disponibilidad',
  },
  {
    tag: 'Ferretería Industrial',
    name: 'Herramientas y Ferretería',
    description:
      'Herramientas y suministros de ferretería para taller e industria. Consulta por productos específicos.',
    badge: null,
    cta: 'Consultar disponibilidad',
    wide: true,
  },
]

export const companyClaims: readonly CompanyClaim[] = [
  {
    label: 'Rodamientos',
    value: 'Koyo / JTEKT',
    detail: 'Consulta por medidas y referencias',
    requiresConfirmation: false,
  },
  {
    label: 'Retenes',
    value: 'Corteco',
    detail: 'Consulta por aplicaciones y medidas',
    requiresConfirmation: false,
  },
  {
    label: 'Repuestos',
    value: 'Uso agrícola',
    detail: 'Consulta por maquinaria y modelo',
    requiresConfirmation: false,
  },
  {
    label: 'Ferretería',
    value: 'Industrial',
    detail: 'Herramientas y suministros',
    requiresConfirmation: false,
  },
]

export const aboutStats = [
  { value: '4', label: 'Líneas principales de productos', requiresConfirmation: false },
  { value: 'B2B', label: 'Atención para empresas y talleres', requiresConfirmation: false },
  { value: 'CL', label: 'Ubicados en Chile', requiresConfirmation: false },
] as const

export const contactPlaceholders: readonly ContactPlaceholder[] = [
  {
    label: 'Teléfono',
    value: 'Por confirmar',
    href: null,
    requiresConfirmation: true,
  },
  {
    label: 'Correo',
    value: 'Por confirmar',
    href: null,
    requiresConfirmation: true,
  },
  {
    label: 'Dirección',
    value: 'Por confirmar',
    href: null,
    requiresConfirmation: true,
  },
]

export const footerCompanyLinks: readonly SiteLink[] = [
  { label: 'Quiénes somos', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
  { label: 'Venta por mayor', href: '/#mayoristas' },
  socialLinks[0],
]

export const contentConfirmationNote =
  'Las relaciones de marca, fechas, cifras y afirmaciones comerciales existentes deben ser confirmadas por el cliente antes de la publicación definitiva.'
