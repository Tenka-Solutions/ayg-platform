# RAN: auditoría y estabilización técnica

Fecha: 12 de noviembre de 2026. Rama: `feat/ran-site-ready-hidden-cart`.
Alcance: sitio corporativo y categorías orientadas a consultas por Instagram;
carrito ficticio exclusivamente local. No se agregaron servicios, pedidos,
pagos, inventario, despacho, APIs ni bases de datos. No se autoriza publicar
desde este informe.

Se mantiene la arquitectura: secciones públicas como Server Components
precompilados, menú móvil como isla de cliente y carrito como isla exclusiva de
desarrollo. No se encontró necesidad de añadir una capa de datos ni cambiar el
router. Los directorios `lib/payments`, `lib/shipping`, `lib/supabase`,
`components/ui` y `types` solo contienen placeholders `.gitkeep`, sin lógica ni
servicios activos; son deuda de organización menor, no capacidades comerciales.

## Hallazgos por severidad

| Prioridad | Hallazgo | Corrección / efecto real |
| --- | --- | --- |
| Alta | Dependencias de Next.js 16.2.9 con avisos que npm clasifica hasta críticos. La auditoría inicial de dependencias de producción reportó 6 paquetes afectados: 1 crítico, 4 altos y 1 moderado. | Actualización explícita a Next.js / eslint-config-next 16.4.6 y actualización selectiva de transitivas dentro de sus rangos. Cero hallazgos en `npm audit --omit=dev`. Aplicabilidad detallada abajo. |
| Alta | La condición de render ocultaba el carrito, pero dejaba código y datos ficticios en un chunk JS público. | Import condicional con guard inline, eliminable por el compilador. Verificación de todos los archivos de texto del export, además de la UI. |
| Media | `npm run lint` fallaba por `setHydrated(true)` dentro del efecto de carga. | Montaje exclusivamente en el navegador local con `useSyncExternalStore`; inicialización del reducer desde storage antes de persistir. Sin desactivar reglas de ESLint. |
| Media | Una actualización con cantidad NaN, infinita o negativa borraba una línea; las fracciones se truncaban. | Acciones con cantidades inválidas se ignoran. Solo cero explícito elimina; los enteros positivos se limitan a 99. |
| Media | El preview dependía de desarrollo + bandera, sin restringir la interfaz al hostname local; `next dev` escuchaba por defecto en otras interfaces. | Bind a 127.0.0.1 y comprobación del hostname en el componente, además del bloqueo de producción. |
| Media | Menú móvil sin cierre con Escape ni recuperación de foco; panel susceptible a exceder pantallas bajas. | Escape, foco al disparador, cierre al salir con foco/puntero y al pasar a escritorio; panel con altura limitada y scroll. |
| Media | Variables de next/font y Tailwind compartían nombres; las clases podían resolver familias distintas de las fuentes autohospedadas. | Variables dedicadas de Barlow y Barlow Condensed y `@theme inline`. Peso 700 del cuerpo disponible sin negrita sintética. |
| Media | Controles del carrito sin anuncio de totales y con saltos de foco al quitar; diseño ajustado para escritorio podía desbordar en móvil. | Estado anunciado, etiquetas específicas, límites deshabilitados, foco al encabezado y filas flexibles. |
| Baja | Cuarta categoría ocupaba dos columnas dejando un hueco en la fila anterior; separadores de resumen inconsistentes en tablet. | Cuadrícula regular 2 × 2 y bordes por breakpoint; sin cambiar colores, identidad ni secciones. |
| Baja | Logotipo PNG de 248.303 bytes y más de 5 MB de variantes/borradores sin uso dentro de `public/`. | WebP de 42.388 bytes (reducción del 82,9% del archivo servido). Originales conservados en `assets/source-images/`, fuera del export. |
| Baja | `npm start` invocaba `next start`, incompatible con `output: 'export'`. | Preview estático local de `out/`, 404 reales y métodos GET/HEAD; sin endpoints de comercio. |
| Baja | Referencia Wrangler a un schema de un paquete no instalado y fallback 404 implícito. | Se retira la referencia inexistente y se declara `404-page`. Cabeceras estáticas compatibles con Cloudflare en `_headers`. |

La limitación inicial de escritura era una ACL de Windows: la cuenta no podía
crear archivos ni instalar dependencias. Se concedió permiso de modificación
en la carpeta del proyecto tras autorización expresa del usuario.

## Seguridad: aplicabilidad a esta arquitectura

Next.js 16.4.6 declara compatibilidad con `react` y `react-dom` `^19.0.0`.
Ambos permanecen en 19.2.4, sin conflictos de peers. Se conserva
`output: 'export'` e imágenes sin optimizador de servidor. Cloudflare solo
necesita servir `out/`; no hay proceso Node/Next atendiendo solicitudes,
adaptador OpenNext, Proxy, Server Actions, SSR ni ISR en el sitio publicado.
Esto coincide con la [guía oficial de exportación estática](https://nextjs.org/docs/app/guides/static-exports).
La versión se contrastó con el [release oficial 16.4.6](https://github.com/vercel/next.js/releases/tag/v16.4.6)
y se leyeron las guías correspondientes incluidas en `node_modules/next/dist/docs/`.

| Grupo inicial | Aplicabilidad antes de corregir | Estado |
| --- | --- | --- |
| Next.js: bypass de middleware/proxy, Server Actions, SSRF, cachés de servidor, Image Optimization API, next/og y serialización de `use cache` | Requieren funciones o ejecución de servidor que este export no ofrece. No son una vía demostrada contra los archivos publicados. Sí importan si se cambia la arquitectura o se ejecuta un servidor Next vulnerable. | Paquete actualizado; auditoría de producción sin avisos. |
| Next.js: exposición en servidor de desarrollo/MCP | Relevante al entorno de desarrollo si queda accesible. No existe ese endpoint en `out/`. | Actualización y desarrollo por loopback. |
| PostCSS, source-map-js, Browserslist, baseline-browser-mapping y procesado de imágenes/sharp | Herramientas que pueden procesar CSS, mapas, consultas o imágenes durante desarrollo/build. Requieren entradas manipuladas; los visitantes del sitio estático no envían esos datos a un proceso de build. Deben mantenerse corregidas igualmente. | Transitivas corregidas dentro de los rangos admitidos. |
| Nanoid y herramientas de lint/YAML/globs/Zod | Sin flujo público que les entregue tamaños, esquemas, YAML o patrones arbitrarios. La superficie relevante es el equipo de desarrollo y CI. | Avisos iniciales altos corregidos. Residual de minimatch descrito abajo. |

### Residual: una alerta, siete paquetes afectados de herramientas

`npm audit` reporta **7 moderados, 0 altos y 0 críticos**. Todos corresponden a
la misma alerta [GHSA-g3hv-75wg-m249 / CVE-2026-118764](https://github.com/isaacs/minimatch/security/advisories/GHSA-g3hv-75wg-m249):
amplificación de patrones glob en `minimatch@10.2.6`. No son siete CVE distintos.

Cadena: `eslint-config-next@16.4.6` → `typescript-eslint@8.72.2` →
`@typescript-eslint/typescript-estree@8.72.2` → `minimatch@10.2.6`.
También se marcan parser, utils, type-utils y eslint-plugin por herencia.
La versión estable consultada de typescript-estree sigue siendo 8.72.2 y declara
`minimatch: ^10.2.2`; el parche publicado de minimatch es 11.0.1.

No se aplicó un override a otra versión mayor ni `npm audit fix --force`:
eso rompería el contrato de versiones del consumidor sin resolverlo aguas
arriba. Queda seguimiento al release de typescript-eslint que adopte el parche.

**Efecto sobre RAN publicado:** no hay ruta de ejecución desde un visitante del
export estático hasta ESLint o su parser. `npm audit --omit=dev` devuelve **0
vulnerabilidades**. El riesgo residual afecta a ejecución local/CI que acepte
patrones o configuración maliciosa; no se considera una vulnerabilidad
explotable del catálogo estático bajo la arquitectura actual. Esta conclusión
debe revisarse si se incorpora código de servidor, entradas no confiables en
build o dependencias de herramientas al bundle público.

Se añadieron cabeceras `nosniff`, política de referrer, bloqueo de framing y una
CSP compatible con el runtime de Next. No se bloquean scripts inline necesarios
ni se afirma una CSP estricta. `_headers` sigue el [formato oficial de Cloudflare](https://developers.cloudflare.com/workers/static-assets/headers/).
Su aplicación efectiva en el hosting no se ha comprobado porque no se desplegó.

## Archivos y motivos

| Archivos | Motivo |
| --- | --- |
| `package.json`, `package-lock.json` | Next/ESLint sincronizados, transitivas corregidas, Playwright solo de desarrollo, ESM explícito, Node 24+, typecheck y comprobación automática del export. |
| `app/page.tsx` | Guard inline antes del import del carrito; destino enfocable del enlace de salto. |
| `app/layout.tsx`, `app/globals.css` | Fuentes autohospedadas conectadas a Tailwind, contraste de texto auxiliar, foco y scroll de anclas. |
| `components/commerce/CartPreview.tsx`, `lib/cart/model.ts` | Hidratación segura, persistencia, validación de cantidades, límites, accesibilidad y comportamiento móvil. |
| `components/layout/MobileMenu.tsx` | Cierre por teclado/foco/puntero, recuperación de foco y responsive. |
| `components/layout/Nav.tsx`, `components/layout/Footer.tsx`, `components/sections/About.tsx` | Uso de logo optimizado y dimensiones correctas; logo de navegación sin carga diferida. |
| `components/sections/Hero.tsx` | Se sustituye la promesa absoluta “Todos los repuestos” por una descripción de productos sin prometer disponibilidad universal. |
| `components/sections/Contact.tsx` | CTA legible y ajustable a móvil. Se mantiene Instagram y los datos pendientes. |
| `components/sections/Products.tsx`, `components/sections/TrustBar.tsx`, `lib/site-content.ts` | Cuadrícula sin huecos, eliminación del flag de ancho innecesario y separadores coherentes. |
| `public/images/logo-white.webp`, `assets/source-images/*` | Copia optimizada; variantes/originales preservados fuera del área publicada. |
| `wrangler.jsonc`, `public/_headers` | Manejo explícito de 404 y cabeceras estáticas. Ningún cambio remoto. |
| `scripts/serve-static.mjs`, `scripts/verify-export.mjs` | Preview local y protección verificable de los artefactos generados. |
| `tests/cart.test.mjs`, `tests/features.test.mjs` | Casos de cantidades, corrupción, persistencia, CLP y matriz de entornos/banderas. |
| `playwright.config.mjs`, `tests/e2e/*.mjs`, `.gitignore` | Pruebas de navegador repetibles, capturas y trazas locales ignoradas por Git. |
| `README.md`, `docs/commerce-readiness.md`, este informe | Operación, pruebas, estado de seguridad y requisitos de publicación/venta. |
| `AGENTS.md` | Bloque de reglas actualizado automáticamente por `next dev` 16.4.6; origen confirmado en `node_modules/next/dist/server/lib/generate-agent-files.js`. No se hizo commit. |

## Comprobaciones y límites

La línea base tenía 5 pruebas de carrito aprobadas y build aprobado con 16.2.9,
pero lint fallaba. Resultados de las verificaciones posteriores:

| Comprobación | Resultado |
| --- | --- |
| `npm run lint` | Aprobado, sin errores ni advertencias de ESLint. |
| `npm run test` | 17/17 aprobadas: 8 de dominio y 9 combinaciones de entorno/bandera. |
| `npm run typecheck` | `next typegen` + `tsc --noEmit` aprobados. |
| `NODE_ENV=production`, `NEXT_PUBLIC_CART_PREVIEW=true`, `npm run build` | Aprobado con Next.js 16.4.6. Rutas estáticas `/` y `/_not-found`. |
| `postbuild` / `npm run verify:export` | 54 archivos verificados: metadata, anclas y recursos presentes; sin interfaz, catálogo ficticio, clave de storage ni rutas de comercio. Incluye `_headers`. |
| `PLAYWRIGHT_CHANNEL=chrome`, `npm run test:e2e` | 12/12 aprobadas en Chrome: 7 públicas y 5 de carrito local. Servidores de prueba cerrados al terminar. |
| `npm audit --omit=dev` | 0 vulnerabilidades. |
| `npm audit` | Sale con código 1 por los 7 moderados de herramientas descritos arriba; 0 altos/críticos. |
| `npm ls` y comparación de raíz del lockfile | Sin conflictos de peers; dependencias, devDependencies y engines sincronizados. |

Versiones verificadas: Node 24.19.0, Next.js / eslint-config-next 16.4.6,
React / React DOM 19.2.4, TypeScript 5.9.3, Tailwind / plugin PostCSS 4.3.5,
ESLint 9.39.5 y Playwright 1.65.0. No se usó `npm audit fix --force`.

Las pruebas de navegador cubren 320, 375, 768, 1024 y 1440 px, recursos y fuentes,
ausencia de desbordamiento horizontal y carrito público, teclado/Escape/foco,
anclas y 404 de rutas de compra. En desarrollo prueban agregar, aumentar,
reducir, eliminar, vaciar, subtotales CLP, recarga, JSON corrupto, límite de 99 y
almacenamiento denegado/lleno. Capturas y trazas se guardan en `test-results/`.
Los observadores de LCP/CLS son muestras de laboratorio local, no mediciones de
Core Web Vitals reales en visitantes. No se certifica WCAG completa ni se ha
ejecutado un lector de pantalla, Safari o Firefox.

Muestras adicionales guardadas en `test-results/*/local-lab-vitals.json`:

| Viewport | LCP local | CLS observado |
| --- | --- | --- |
| 320 px | 1004 ms | 0 |
| 375 px | 432 ms | 0 |
| 768 px | 496 ms | 0 |
| 1024 px | 388 ms | 0 |
| 1440 px | 436 ms | 0 |

Estas cinco comprobaciones públicas adicionales aprobaron y conservaron sus
capturas. La última ejecución focalizada reemplaza los artefactos temporales de
la ejecución completa; las capturas del carrito se regeneran con `test:e2e`.
Las cifras provienen de loopback, sin throttling ni tráfico real: no deben
presentarse como cumplimiento de CWV de producción ni como percentiles de campo.

## Pendientes y siguiente sprint

1. Cliente: aprobar teléfono, correo, dirección, razón social, ubicación,
   referencias de marcas y derechos de fotografías/logotipos. Se conservaron
   los textos y el Instagram existentes; no se inventaron datos ni acuerdos.
2. Confirmar dominio antes de añadir canonical, sitemap con URLs absolutas e
   imagen OG con URL definitiva. Metadata descriptiva, idioma, Open Graph y
   estructura de títulos actuales se verifican sin inventar dominio ni precios.
3. Revisar configuración real de Cloudflare, TLS, cabeceras y DNS en un sprint
   autorizado para ello. Esta tarea no ha cambiado servicios externos.
4. Seguir el parche de typescript-eslint/minimatch. Revisar ESLint 10 como
   actualización deliberada: npm avisa que la línea 9 ya no tiene soporte;
   no se forzó esa migración dentro de esta corrección.
5. Ejecutar revisión con lector de pantalla y navegadores adicionales; medir
   rendimiento con red/CPU controladas y, tras publicar, datos reales de CWV.
6. Si se exige build sin red, versionar las fuentes existentes tras revisar su
   licencia: `next/font/google` todavía necesita descargarlas al compilar,
   aunque el visitante recibe fuentes locales.
7. Preparar un catálogo confirmado para consultas. Activar venta requiere otro
   cambio revisado y todos los requisitos de `commerce-readiness.md`; una
   bandera de entorno no habilita compras.
