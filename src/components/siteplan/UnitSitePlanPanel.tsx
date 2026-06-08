import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Wind, Wifi, Bath, Bed, Archive, Monitor } from 'lucide-react'
import { StatusBadge } from '@/components/ui/Badge'
import { FloorPlanGraphic } from '@/components/units/FloorPlanGraphic'
import { getRoomHeroImage } from '@/data/roomAssets'
import { formatArea, formatCurrency } from '@/lib/utils'
import type { KosUnit } from '@/types'

const FACILITY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  AC: Wind,
  WiFi: Wifi,
  'Kamar Mandi Dalam': Bath,
  Kasur: Bed,
  Lemari: Archive,
  'Meja Belajar': Monitor,
}

interface UnitSitePlanPanelProps {
  unit: KosUnit
  onClose: () => void
}

export function UnitSitePlanPanel({ unit, onClose }: UnitSitePlanPanelProps) {
  const [activeImage, setActiveImage] = useState(0)
  const heroImage = unit.images[0] ?? getRoomHeroImage(unit.type)

  return (
    <div className="flex h-full flex-col bg-white border-l border-brand/10 shadow-2xl">
      <div className="relative aspect-video shrink-0 bg-brand-light">
        <img
          src={unit.images[activeImage] ?? heroImage}
          alt={unit.label}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 bg-white/90 p-2 hover:bg-white transition-colors"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        <div>
          <p className="section-label">Detail Unit</p>
          <h2 className="font-serif text-2xl mt-1">{unit.label}</h2>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={unit.status} />
            {unit.status === 'available' && (
              <span className="text-sm font-medium">{formatCurrency(unit.price)}/bulan</span>
            )}
          </div>
        </div>

        {/* Thumbnail gallery */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {unit.images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveImage(i)}
              className={`shrink-0 h-14 w-20 overflow-hidden border-2 transition-colors ${
                activeImage === i ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Spec label="Blok" value={unit.block} />
          <Spec label="Lantai" value={String(unit.floor)} />
          <Spec label="Luas" value={formatArea(unit.area)} />
          <Spec label="Kamar" value={`${unit.bedrooms} KT`} />
          <Spec label="Dimensi" value={unit.dimensions} />
          <Spec label="Tipe" value={unit.type} />
          {unit.status === 'available' && (
            <>
              <Spec label="Deposit" value={formatCurrency(unit.deposit)} />
              <Spec label="Harga" value={`${formatCurrency(unit.price)}/bln`} />
            </>
          )}
        </div>

        <p className="text-sm text-brand-muted leading-relaxed">{unit.description}</p>

        {/* Floor plan */}
        <div>
          <p className="section-label mb-3">Denah Unit</p>
          <div className="border border-brand/10 bg-[#fafaf8] p-4">
            <FloorPlanGraphic type={unit.type} className="w-full h-auto" />
          </div>
        </div>

        {/* Facilities */}
        <div>
          <p className="section-label mb-3">Fasilitas</p>
          <div className="grid grid-cols-2 gap-2">
            {unit.facilities.map((f) => {
              const Icon = FACILITY_ICONS[f]
              return (
                <div key={f} className="flex items-center gap-2 border border-brand/10 px-3 py-2 text-xs text-brand-muted">
                  {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                  {f}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-brand/10 p-5 space-y-2">
        {unit.status === 'available' ? (
          <Link to={`/booking/${unit.id}`} className="btn-primary w-full text-center block">
            Booking Sekarang
          </Link>
        ) : (
          <p className="text-center text-xs text-brand-muted">
            {unit.status === 'booked' ? 'Unit ini sedang terbooking' : 'Hubungi admin untuk info unit ini'}
          </p>
        )}
        <Link
          to={`/kosan/${unit.id}`}
          className="block text-center text-xs text-brand-muted underline underline-offset-4 hover:text-brand"
        >
          Lihat halaman lengkap
        </Link>
      </div>
    </div>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-brand/10 px-3 py-2">
      <p className="text-[10px] uppercase tracking-widest text-brand-muted">{label}</p>
      <p className="mt-0.5 font-medium text-brand">{value}</p>
    </div>
  )
}
