import { X, Car, Camera, Shield, Shirt, ChefHat, Wifi } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { AMENITY_LABELS } from '@/lib/masterplan'
import { RoomExplorer } from './RoomExplorer'
import type { MasterplanBuilding, MasterplanRoom } from '@/types/masterplan'
import type { BuildingAmenity } from '@/types/masterplan'

const AMENITY_ICONS: Record<BuildingAmenity, React.ComponentType<{ className?: string }>> = {
  parking: Car,
  cctv: Camera,
  security: Shield,
  laundry: Shirt,
  shared_kitchen: ChefHat,
  wifi: Wifi,
}

interface BuildingPanelProps {
  building: MasterplanBuilding
  highlightRoomIds?: Set<string>
  onClose: () => void
  onSelectRoom: (room: MasterplanRoom) => void
}

export function BuildingPanel({
  building,
  highlightRoomIds,
  onClose,
  onSelectRoom,
}: BuildingPanelProps) {
  return (
    <div className="flex h-full flex-col border-l border-brand/10 bg-white shadow-2xl">
      <div className="flex items-start justify-between border-b border-brand/10 p-5">
        <div>
          <p className="section-label">Building</p>
          <h2 className="font-serif text-2xl mt-1">{building.name}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-brand-muted hover:text-brand transition-colors"
          aria-label="Tutup panel"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <img
          src={building.image}
          alt={building.name}
          className="aspect-video w-full object-cover"
        />

        <p className="text-sm text-brand-muted leading-relaxed">{building.description}</p>

        <div className="grid grid-cols-3 gap-3 text-center">
          <Stat label="Total" value={building.totalRooms} />
          <Stat label="Tersedia" value={building.availableRooms} accent="text-emerald-600" />
          <Stat label="Terisi" value={building.occupiedRooms} accent="text-red-500" />
        </div>

        <div>
          <p className="section-label mb-3">Fasilitas</p>
          <div className="grid grid-cols-2 gap-2">
            {building.amenities.map((a) => {
              const Icon = AMENITY_ICONS[a]
              return (
                <div key={a} className="flex items-center gap-2 border border-brand/10 px-3 py-2 text-xs">
                  <Icon className="h-3.5 w-3.5 text-brand-muted" />
                  {AMENITY_LABELS[a]}
                </div>
              )
            })}
          </div>
        </div>

        <RoomExplorer
          rooms={building.rooms}
          highlightIds={highlightRoomIds}
          onSelectRoom={onSelectRoom}
        />
      </div>

      {building.availableRooms > 0 && (() => {
        const prices = building.rooms.filter((r) => r.status === 'available').map((r) => r.price)
        if (prices.length === 0) return null
        return (
          <div className="border-t border-brand/10 p-5">
            <p className="text-xs text-brand-muted">
              Mulai dari{' '}
              <span className="font-medium text-brand">
                {formatCurrency(Math.min(...prices))}/bulan
              </span>
            </p>
          </div>
        )
      })()}
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="border border-brand/10 p-3">
      <p className={`font-serif text-xl ${accent ?? 'text-brand'}`}>{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-brand-muted mt-1">{label}</p>
    </div>
  )
}
