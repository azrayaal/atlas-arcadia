import { UnitCard } from './UnitCard'
import type { KosUnit } from '@/types'

interface SimilarUnitsProps {
  units: KosUnit[]
}

export function SimilarUnits({ units }: SimilarUnitsProps) {
  if (units.length === 0) return null

  return (
    <section className="border-t border-brand/10 py-16 lg:py-24">
      <div className="container">
        <h2 className="font-serif text-3xl lg:text-4xl">Kamar Serupa</h2>
        <p className="mt-2 text-sm text-brand-muted">Unit lain yang mungkin menarik untuk Anda</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      </div>
    </section>
  )
}
