import { Link, useSearchParams } from 'react-router-dom'
import { LayoutGrid, Map } from 'lucide-react'
import { UnitCard } from '@/components/units/UnitCard'
import { UnitFiltersPanel } from '@/components/units/UnitFilters'
import { useUnitFilters } from '@/hooks/useUnitFilters'
import { PAGE_ASSETS } from '@/data/roomAssets'
import { cn } from '@/lib/utils'

export function UnitsPage() {
  const [searchParams] = useSearchParams()
  const initialStatus = searchParams.get('status') === 'all' ? 'all' : 'available'
  const { filters, filteredUnits, updateFilter, resetFilters } = useUnitFilters({
    status: initialStatus as 'all' | 'available',
  })

  return (
    <>
      {/* Page header */}
      <section className="pt-24 lg:pt-32">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label mb-2">Atlas Arcadia</p>
              <h1 className="font-serif text-4xl lg:text-6xl">Kamar</h1>
            </div>

            <div className="flex border border-brand/10">
              <Link
                to="/kosan"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest transition-colors',
                  'bg-brand text-white',
                )}
              >
                <LayoutGrid className="h-4 w-4" />
                Daftar
              </Link>
              <Link
                to="/kosan/siteplan"
                className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest text-brand-muted hover:text-brand transition-colors"
              >
                <Map className="h-4 w-4" />
                Site Plan
              </Link>
            </div>
          </div>

          <div className="mt-10 aspect-[21/9] overflow-hidden">
            <img
              src={PAGE_ASSETS.unitsBanner}
              alt="Interior kamar Atlas Arcadia"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 lg:py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
            <UnitFiltersPanel
              filters={filters}
              resultCount={filteredUnits.length}
              onUpdate={updateFilter}
              onReset={resetFilters}
            />

            <div>
              <p className="text-sm text-brand-muted mb-8">
                Total <span className="text-brand font-medium">{filteredUnits.length}</span> kamar
              </p>

              {filteredUnits.length === 0 ? (
                <div className="border border-brand/10 p-12 text-center">
                  <p className="font-serif text-xl">Tidak ada kamar yang cocok</p>
                  <p className="mt-2 text-sm text-brand-muted">Coba ubah filter Anda</p>
                  <button type="button" onClick={resetFilters} className="mt-6 btn-outline">
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {filteredUnits.map((unit) => (
                    <UnitCard key={unit.id} unit={unit} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className="border-t border-brand/10 py-20">
        <div className="container grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl">Apa itu Atlas Arcadia?</h2>
            <p className="mt-6 text-sm text-brand-muted leading-relaxed">
              Atlas Arcadia adalah kompleks hunian terintegrasi di Bojongsari yang menggabungkan
              privasi unit individual dengan fasilitas komunal premium. Setiap unit dirancang
              dengan efisiensi ruang optimal — mulai dari 72 m² hingga 134 m² — dilengkapi
              AC, kamar mandi dalam, dan akses WiFi.
            </p>
            <p className="mt-4 text-sm text-brand-muted leading-relaxed">
              Club House di pusat kompleks menyediakan gym, laundry, dan mini market.
              Sistem keamanan 24 jam dengan POS di pintu masuk utama menjamin kenyamanan penghuni.
            </p>
          </div>
          <img
            src={PAGE_ASSETS.aboutCourtyard}
            alt="Area hunian Atlas Arcadia"
            className="aspect-[4/3] object-cover"
          />
        </div>
      </section>
    </>
  )
}
