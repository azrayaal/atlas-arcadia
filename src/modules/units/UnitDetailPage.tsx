import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Bed, Maximize, Building2, Layers } from 'lucide-react'
import { UNITS } from '@/data/siteLayout'
import { getRoomHeroImage } from '@/data/roomAssets'
import { getSimilarUnits } from '@/hooks/useUnitFilters'
import { SimilarUnits } from '@/components/units/SimilarUnits'
import { StatusBadge } from '@/components/ui/Badge'
import { formatArea, formatCurrency } from '@/lib/utils'

export function UnitDetailPage() {
  const { id } = useParams<{ id: string }>()
  const unit = UNITS.find((u) => u.id === id)

  if (!unit) return <Navigate to="/kosan" replace />

  const similar = getSimilarUnits(unit)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={getRoomHeroImage(unit.type)}
            alt={`Interior ${unit.label}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        <div className="relative container pb-12 pt-28">
          <Link
            to="/kosan"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
          <h1 className="font-serif text-4xl text-white lg:text-6xl">{unit.label}</h1>
          <div className="mt-4 flex items-center gap-4">
            <StatusBadge status={unit.status} />
            {unit.status === 'available' && (
              <span className="text-white/80 text-sm">{formatCurrency(unit.price)}/bulan</span>
            )}
          </div>
        </div>
      </section>

      {/* Floor plan */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="section-label vertical-text">Denah Unit</p>
              <p className="mt-8 text-sm text-brand-muted leading-relaxed">
                {unit.description}
              </p>
              <ul className="mt-6 space-y-2">
                {unit.facilities.map((f) => (
                  <li key={f} className="text-sm text-brand-muted flex items-center gap-2">
                    <span className="h-1 w-1 bg-brand-accent rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-brand/10 bg-[#fafaf8] p-6 lg:p-10">
              <img
                src={unit.floorPlanImage}
                alt={`Denah ${unit.label}`}
                className="w-full h-auto object-contain"
              />
              <p className="mt-4 text-center text-xs text-brand-muted">
                {unit.dimensions} · {unit.area} m² · {unit.bedrooms} kamar tidur
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parameters */}
      <section className="border-t border-brand/10 py-16 lg:py-24">
        <div className="container">
          <p className="section-label mb-8">Parameter</p>
          <div className="grid gap-px bg-brand/10 sm:grid-cols-2 lg:grid-cols-4">
            <ParamCard icon={Building2} label="Blok" value={unit.block} />
            <ParamCard icon={Maximize} label="Luas Total" value={formatArea(unit.area)} />
            <ParamCard icon={Layers} label="Lantai" value={String(unit.floor)} />
            <ParamCard icon={Bed} label="Kamar Tidur" value={String(unit.bedrooms)} />
          </div>

          {unit.status === 'available' ? (
            <Link
              to={`/booking/${unit.id}`}
              className="mt-10 flex w-full items-center justify-between border border-brand px-8 py-5 text-xs uppercase tracking-widest hover:bg-brand hover:text-white transition-colors group"
            >
              <span>Booking Sekarang — {formatCurrency(unit.price)}/bulan</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current group-hover:bg-white group-hover:text-brand transition-colors">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ) : (
            <Link
              to="/booking"
              className="mt-10 flex w-full items-center justify-between border border-brand px-8 py-5 text-xs uppercase tracking-widest hover:bg-brand hover:text-white transition-colors group"
            >
              <span>Request Info — Hubungi Kami</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current group-hover:bg-white group-hover:text-brand transition-colors">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 border-t border-brand/10">
        <div className="container">
          <p className="section-label mb-8">Galeri Ruangan</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {unit.images.map((img, i) => {
              const labels = ['Kamar Tidur', 'Area Tidur', 'Ruang Tamu', 'Kamar Mandi']
              return (
                <figure key={img}>
                  <img
                    src={img}
                    alt={`${unit.label} — ${labels[i] ?? `Foto ${i + 1}`}`}
                    className="aspect-[4/3] object-cover"
                  />
                  <figcaption className="mt-2 text-xs text-brand-muted">{labels[i] ?? `Foto ${i + 1}`}</figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      <SimilarUnits units={similar} />
    </>
  )
}

function ParamCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="bg-white p-8">
      <Icon className="h-5 w-5 text-brand-muted mb-4" />
      <p className="section-label">{label}</p>
      <p className="mt-2 font-serif text-2xl">{value}</p>
    </div>
  )
}
