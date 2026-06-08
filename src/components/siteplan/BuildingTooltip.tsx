import type { MasterplanBuilding } from '@/types/masterplan'

interface BuildingTooltipProps {
  building: MasterplanBuilding
  style: { left: string; top: string }
}

export function BuildingTooltip({ building, style }: BuildingTooltipProps) {
  return (
    <div
      className="pointer-events-none absolute z-20 min-w-[160px] -translate-x-1/2 -translate-y-full border border-brand/10 bg-white px-4 py-3 text-xs shadow-card"
      style={style}
    >
      <p className="font-serif text-sm text-brand">{building.name}</p>
      <p className="mt-1 text-brand-muted">{building.totalRooms} Kamar</p>
      <p className="mt-0.5 text-emerald-600">{building.availableRooms} Tersedia</p>
      <p className="text-red-500">{building.occupiedRooms} Terisi</p>
    </div>
  )
}
