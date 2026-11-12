import { companyClaims } from '@/lib/site-content'

export default function TrustBar() {
  return (
    <aside aria-label="Resumen de la empresa" className="grid grid-cols-1 bg-blue-dark text-white sm:grid-cols-2 lg:grid-cols-4">
      {companyClaims.map((claim, index) => (
        <div
          key={claim.label}
          className={`flex flex-col gap-1 border-white/15 px-5 py-6 sm:px-8 ${
            index > 0 ? 'border-t' : ''
          } ${index >= 2 ? 'sm:border-t lg:border-t-0' : 'sm:border-t-0'} ${
            index % 2 === 1 ? 'sm:border-l' : ''
          } ${index > 0 ? 'lg:border-l' : ''}`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-widest text-yellow">
            {claim.label}
          </span>
          <span className="font-display text-xl font-bold">{claim.value}</span>
          <span className="text-sm text-white/75">
            {claim.detail}
          </span>
        </div>
      ))}
    </aside>
  )
}
