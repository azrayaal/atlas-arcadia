import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { StatusBadge } from '@/components/ui/Badge'
import { FloorPlanGraphic } from '@/components/units/FloorPlanGraphic'
import { getRoomHeroImage } from '@/data/roomAssets'
import { formatArea, formatCurrency } from '@/lib/utils'
import type { KosUnit } from '@/types'

interface UnitCardProps {
  unit: KosUnit
}

export function UnitCard({ unit }: UnitCardProps) {
  const isBookable = unit.status === 'available'

  return (
    <Link
      to={isBookable ? `/kosan/${unit.id}` : '#'}
      className={`group block border border-brand/10 bg-white transition-all duration-300 hover:shadow-card ${!isBookable ? 'opacity-60 cursor-default' : ''}`}
      onClick={(e) => !isBookable && e.preventDefault()}
    >
      <div className="aspect-[4/3] grid grid-rows-[2fr_1fr] overflow-hidden bg-[#fafaf8]">
        <img
          src={unit.images[0] ?? getRoomHeroImage(unit.type)}
          alt={`Interior ${unit.label}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="border-t border-brand/10 bg-[#fafaf8] px-2 py-1 overflow-hidden">
          <FloorPlanGraphic type={unit.type} className="h-full w-full" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg">{unit.label}</h3>
            <p className="mt-1 text-xs text-brand-muted">
              Blok {unit.block} · Lt. {unit.floor} · {unit.bedrooms} Kamar
            </p>
          </div>
          <StatusBadge status={unit.status} />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-brand-muted">{formatArea(unit.area)}</p>
            {isBookable ? (
              <p className="mt-1 font-medium">{formatCurrency(unit.price)}<span className="text-xs text-brand-muted font-normal">/bulan</span></p>
            ) : (
              <p className="mt-1 text-sm text-brand-muted italic">
                {unit.status === 'booked' ? 'Terbooking' : 'Hubungi kami'}
              </p>
            )}
          </div>
          {isBookable && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand/20 transition-colors group-hover:bg-brand group-hover:text-white group-hover:border-brand">
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
