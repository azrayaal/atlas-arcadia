import { AREA_RANGE, PRICE_RANGE } from '@/data/siteLayout'
import { formatArea, formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { BlockId, UnitFilters, RoomCount } from '@/types'

interface UnitFiltersPanelProps {
  filters: UnitFilters
  resultCount: number
  onUpdate: <K extends keyof UnitFilters>(key: K, value: UnitFilters[K]) => void
  onReset: () => void
}

const BLOCKS: BlockId[] = ['A', 'B', 'C', 'D', 'E', 'F']
const BEDROOMS: RoomCount[] = [1, 2, 3, 4]

export function UnitFiltersPanel({
  filters,
  resultCount,
  onUpdate,
  onReset,
}: UnitFiltersPanelProps) {
  return (
    <aside className="space-y-8">
      <div>
        <h2 className="font-serif text-xl">Apa yang Anda cari?</h2>
        <p className="mt-2 text-sm text-brand-muted">Filter kamar sesuai kebutuhan Anda</p>
      </div>

      <div>
        <p className="section-label mb-3">Blok</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={filters.block === 'all'}
            onClick={() => onUpdate('block', 'all')}
            label="Semua"
          />
          {BLOCKS.map((block) => (
            <FilterChip
              key={block}
              active={filters.block === block}
              onClick={() => onUpdate('block', block)}
              label={block}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="section-label mb-3">Status</p>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all' as const, label: 'Semua' },
            { value: 'available' as const, label: 'Tersedia' },
            { value: 'booked' as const, label: 'Terbooking' },
          ].map((opt) => (
            <FilterChip
              key={opt.value}
              active={filters.status === opt.value}
              onClick={() => onUpdate('status', opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="section-label mb-3">Jumlah Kamar</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={filters.bedrooms === 'all'}
            onClick={() => onUpdate('bedrooms', 'all')}
            label="Semua"
          />
          {BEDROOMS.map((n) => (
            <FilterChip
              key={n}
              active={filters.bedrooms === n}
              onClick={() => onUpdate('bedrooms', n)}
              label={String(n)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="section-label mb-3">
          Luas: {formatArea(filters.areaMin)} – {formatArea(filters.areaMax)}
        </p>
        <input
          type="range"
          min={AREA_RANGE.min}
          max={AREA_RANGE.max}
          step={1}
          value={filters.areaMax}
          onChange={(e) => onUpdate('areaMax', Number(e.target.value))}
          className="w-full accent-brand"
        />
      </div>

      <div>
        <p className="section-label mb-3">
          Harga: {formatCurrency(filters.priceMin)} – {formatCurrency(filters.priceMax)}
        </p>
        <input
          type="range"
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={50000}
          value={filters.priceMax}
          onChange={(e) => onUpdate('priceMax', Number(e.target.value))}
          className="w-full accent-brand"
        />
      </div>

      <div className="space-y-3 pt-4">
        <button type="button" className="btn-primary w-full">
          Tampilkan {resultCount} hasil
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full text-center text-xs text-brand-muted underline underline-offset-4 hover:text-brand transition-colors"
        >
          Reset filter
        </button>
      </div>
    </aside>
  )
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('filter-btn', active && 'filter-btn-active')}
    >
      {label}
    </button>
  )
}
