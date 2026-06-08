import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import {
  X, ChevronLeft, ChevronRight, Wind, Bed, Layers, Archive,
  Monitor, Tv, Refrigerator, Droplets, Sun, Wifi, Bath,
} from 'lucide-react'
import { formatArea, formatCurrency } from '@/lib/utils'
import { FACILITY_LABELS, ROOM_STATUS_COLORS } from '@/lib/masterplan'
import type { MasterplanRoom } from '@/types/masterplan'
import type { RoomFacility } from '@/types/masterplan'

const FACILITY_ICONS: Record<RoomFacility, React.ComponentType<{ className?: string }>> = {
  ac: Wind,
  bed: Bed,
  mattress: Layers,
  wardrobe: Archive,
  desk: Monitor,
  chair: Monitor,
  tv: Tv,
  refrigerator: Refrigerator,
  water_heater: Droplets,
  balcony: Sun,
  wifi: Wifi,
  bathroom: Bath,
}

interface RoomDetailModalProps {
  room: MasterplanRoom | null
  buildingName: string
  open: boolean
  onClose: () => void
}

export function RoomDetailModal({ room, buildingName, open, onClose }: RoomDetailModalProps) {
  const [slide, setSlide] = useState(0)

  if (!room) return null

  const status = ROOM_STATUS_COLORS[room.status]
  const images = room.images

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white shadow-2xl focus:outline-none">
          <div className="relative aspect-video bg-brand-light">
            <img
              src={images[slide]}
              alt={`Kamar ${room.number}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => setSlide((s) => (s === 0 ? images.length - 1 : s - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setSlide((s) => (s === images.length - 1 ? 0 : s + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Dialog.Close className="absolute right-3 top-3 bg-white/90 p-2 hover:bg-white">
              <X className="h-4 w-4" />
            </Dialog.Close>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={`h-1.5 w-1.5 rounded-full ${i === slide ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-label">{buildingName}</p>
                <Dialog.Title className="font-serif text-3xl mt-1">
                  Kamar {room.number}
                </Dialog.Title>
              </div>
              <span className={`border px-2 py-1 text-[10px] uppercase tracking-wider ${status.bg} ${status.border}`}>
                {status.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
              <Info label="Lantai" value={String(room.floor)} />
              <Info label="Luas" value={formatArea(room.size)} />
              <Info label="Harga" value={room.price ? `${formatCurrency(room.price)}/bln` : '—'} />
              <Info label="Deposit" value={room.deposit ? formatCurrency(room.deposit) : '—'} />
            </div>

            {room.availabilityDate && (
              <p className="text-xs text-brand-muted">
                Tersedia mulai: {new Date(room.availabilityDate).toLocaleDateString('id-ID')}
              </p>
            )}

            <div>
              <p className="section-label mb-3">Fasilitas Kamar</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {room.facilities.map((f) => {
                  const Icon = FACILITY_ICONS[f]
                  return (
                    <div key={f} className="flex flex-col items-center gap-1.5 border border-brand/10 p-3 text-center">
                      <Icon className="h-4 w-4 text-brand-muted" />
                      <span className="text-[10px] text-brand-muted">{FACILITY_LABELS[f]}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {room.status === 'available' && (
              <Link
                to={`/booking/${room.unitId}`}
                className="btn-primary w-full text-center"
                onClick={onClose}
              >
                Booking Kamar Ini
              </Link>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-brand-muted">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  )
}
