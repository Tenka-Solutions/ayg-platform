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
    tag: 'Distribuidor Oficial',
    name: 'Rodamientos Koyo',
    description:
      'La mejor calidad en rodamientos al mejor precio del mercado. Somos los únicos distribuidores oficiales de Koyo (JTEKT) en Chile. Stock permanente de todas las medidas y tipos.',
    badge: 'Koyo JTEKT',
    cta: 'Consultar stock',
  },
  {
    tag: 'Importación Directa',
    name: 'Retenes Corteco',
    description:
      'Retenes de importación directa. Calidad alemana, medidas y tipos variados para todo tipo de maquinaria.',
    badge: null,
    cta: 'Ver más',
  },
  {
    tag: 'Repuestos',
    name: 'Repuestos Agrícolas',
    description:
      'Amplia variedad de repuestos y accesorios para maquinaria agrícola. Tractores, cosechadoras, implementos y más.',
    badge: null,
    cta: 'Ver más',
  },
  {
    tag: 'Ferretería Industrial',
    name: 'Herramientas y Ferretería',
    description:
      'Todo tipo de herramientas: eléctricas, neumáticas, manuales, llaves, brocas y mucho más. También contamos con tornillería, fijaciones y elementos de ferretería para taller e industria.',
    badge: null,
    cta: 'Ver catálogo completo',
    wide: true,
  },
]

export const companyClaims: readonly CompanyClaim[] = [
  {
    label: 'Distribuidor Oficial',
    value: 'Koyo (JTEKT)',
    detail: 'rodamientos en Chile',
    requiresConfirmation: true,
  },
  {
    label: '+40 años',
    value: 'Desde 1983',
    detail: 'al servicio del campo y la industria',
    requiresConfirmation: true,
  },
  {
    label: 'Importación Directa',
    value: 'Corteco',
    detail: 'retenes — calidad premium',
    requiresConfirmation: true,
  },
  {
    label: 'Mayor y Menor',
    value: 'Precios especiales',
    detail: 'para distribuidores',
    requiresConfirmation: true,
  },
]

export const aboutStats = [
  { value: '+40', label: 'Años en el mercado', requiresConfirmation: true },
  {
    value: '1',
    label: 'Distribuidor oficial Koyo en Chile',
    requiresConfirmation: true,
  },
  {
    value: '100%',
    label: 'Importación directa Corteco',
    requiresConfirmation: true,
  },
] as const

export const contactPlaceholders: readonly ContactPlaceholder[] = [
  {
    label: 'Teléfono',
    value: 'Pendiente de confirmación',
    href: null,
    requiresConfirmation: true,
  },
  {
    label: 'Correo',
    value: 'Pendiente de confirmación',
    href: null,
    requiresConfirmation: true,
  },
  {
    label: 'Dirección',
    value: 'Pendiente de confirmación',
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
