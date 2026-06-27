const stats = [
  { label: 'Distribuidor Oficial', value: 'Koyo (JTEKT)', sub: 'rodamientos en Chile' },
  { label: '+40 años', value: 'Desde 1983', sub: 'al servicio del campo y la industria' },
  { label: 'Importación Directa', value: 'Corteco', sub: 'retenes — calidad premium' },
  { label: 'Mayor y Menor', value: 'Precios especiales', sub: 'para distribuidores' },
]

export default function TrustBar() {
  return (
    <div className="bg-blue-dark text-white grid grid-cols-4 divide-x divide-white/10">
      {stats.map((stat) => (
        <div key={stat.label} className="px-8 py-6 flex flex-col gap-1">
          <span className="text-yellow text-[11px] font-semibold tracking-widest uppercase">
            {stat.label}
          </span>
          <span className="font-display text-xl font-bold">
            {stat.value}
          </span>
          <span className="text-white/50 text-sm">
            {stat.sub}
          </span>
        </div>
      ))}
    </div>
  )
}