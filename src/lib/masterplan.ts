import type { BuildingStatus, RoomStatus } from '@/types/masterplan'

export const BUILDING_STATUS_COLORS: Record<
  BuildingStatus,
  { fill: string; stroke: string; label: string }
> = {
  available: { fill: 'rgba(34, 197, 94, 0.45)', stroke: '#16a34a', label: 'Tersedia' },
  limited: { fill: 'rgba(234, 179, 8, 0.5)', stroke: '#ca8a04', label: 'Terbatas' },
  occupied: { fill: 'rgba(239, 68, 68, 0.5)', stroke: '#dc2626', label: 'Penuh' },
  maintenance: { fill: 'rgba(156, 163, 175, 0.55)', stroke: '#6b7280', label: 'Maintenance' },
}

export const ROOM_STATUS_COLORS: Record<RoomStatus, { bg: string; border: string; label: string }> = {
  available: { bg: 'bg-emerald-100', border: 'border-emerald-400', label: 'Tersedia' },
  reserved: { bg: 'bg-amber-100', border: 'border-amber-400', label: 'Reserved' },
  occupied: { bg: 'bg-red-100', border: 'border-red-400', label: 'Terisi' },
  maintenance: { bg: 'bg-gray-200', border: 'border-gray-400', label: 'Maintenance' },
}

export const AMENITY_LABELS: Record<string, string> = {
  parking: 'Parkir',
  cctv: 'CCTV',
  security: 'Keamanan 24 Jam',
  laundry: 'Laundry',
  shared_kitchen: 'Dapur Bersama',
  wifi: 'WiFi',
}

export const FACILITY_LABELS: Record<string, string> = {
  ac: 'AC',
  bed: 'Kasur',
  mattress: 'Kasur Busa',
  wardrobe: 'Lemari',
  desk: 'Meja',
  chair: 'Kursi',
  tv: 'TV',
  refrigerator: 'Kulkas',
  water_heater: 'Water Heater',
  balcony: 'Balkon',
  wifi: 'WiFi',
  bathroom: 'KM Dalam',
}
