import { Link } from 'react-router-dom'
import { LayoutGrid, Map } from 'lucide-react'
import { SitePlanMap } from '@/components/siteplan/SitePlanMap'
import { AVAILABLE_UNITS } from '@/data/siteLayout'
import { cn } from '@/lib/utils'

export function SitePlanPage() {
  return (
    <>
      <section className="pt-24 lg:pt-32 pb-12">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label mb-2">Atlas Arcadia</p>
              <h1 className="font-serif text-4xl lg:text-6xl">Site Plan</h1>
              <p className="mt-4 text-sm text-brand-muted max-w-lg">
                Peta denah kompleks Atlas Arcadia. Hover unit untuk info, klik unit tersedia untuk detail dan booking.
              </p>
            </div>

            <div className="flex border border-brand/10">
              <Link
                to="/kosan"
                className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest text-brand-muted hover:text-brand transition-colors"
              >
                <LayoutGrid className="h-4 w-4" />
                Daftar
              </Link>
              <Link
                to="/kosan/siteplan"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest',
                  'bg-brand text-white',
                )}
              >
                <Map className="h-4 w-4" />
                Site Plan
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <SitePlanMap />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 text-center">
            <StatBox value="79" label="Total Unit" />
            <StatBox value={String(AVAILABLE_UNITS.length)} label="Tersedia" />
            <StatBox value="6" label="Blok Hunian" />
          </div>
        </div>
      </section>

      <section className="border-t border-brand/10 py-16">
        <div className="container max-w-3xl">
          <h2 className="font-serif text-2xl">Fasilitas Kompleks</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-brand-muted">
            <div className="border border-brand/10 p-4">
              <p className="font-medium text-brand">Club House Area</p>
              <p className="mt-1">Lt. 1: Club House · Lt. 2: Gym, Laundry, Mini Market</p>
            </div>
            <div className="border border-brand/10 p-4">
              <p className="font-medium text-brand">POS Security</p>
              <p className="mt-1">Pintu masuk utama dari Jl. Senopati No 22, Dukuhwaluh · 24 jam</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-brand/10 p-6">
      <p className="font-serif text-3xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-brand-muted">{label}</p>
    </div>
  )
}
