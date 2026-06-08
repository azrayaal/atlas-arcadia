import { UNITS } from '@/data/siteLayout'
import { getRoomImages } from '@/data/roomAssets'
import type { BlockId, KosUnit, UnitStatus } from '@/types'
import type {
  BuildingAmenity,
  BuildingStatus,
  MasterplanBuilding,
  MasterplanRoom,
  RoomFacility,
  RoomStatus,
} from '@/types/masterplan'

const AMENITIES: BuildingAmenity[] = [
  'parking', 'cctv', 'security', 'laundry', 'shared_kitchen', 'wifi',
]

const ALL_FACILITIES: RoomFacility[] = [
  'ac', 'bed', 'mattress', 'wardrobe', 'desk', 'chair',
  'tv', 'refrigerator', 'water_heater', 'balcony', 'wifi', 'bathroom',
]

const BLOCK_HOTSPOTS: Record<BlockId, { x: number; y: number; w: number; h: number }> = {
  F: { x: 4, y: 32, w: 14, h: 34 },
  C: { x: 26, y: 14, w: 30, h: 16 },
  B: { x: 50, y: 26, w: 16, h: 30 },
  A: { x: 76, y: 22, w: 13, h: 38 },
  D: { x: 28, y: 50, w: 36, h: 16 },
  E: { x: 44, y: 70, w: 26, h: 12 },
}

const BLOCK_DESCRIPTIONS: Record<BlockId, string> = {
  A: 'Blok A — baris hunian timur dengan akses langsung ke jalan utama. Unit premium menghadap area hijau.',
  B: 'Blok B — cluster pusat kompleks, dekat Club House dan fasilitas bersama.',
  C: 'Blok C — blok utara dengan unit sudut luas dan pencahayaan alami optimal.',
  D: 'Blok D — blok terbesar dengan 20 unit, dekat area parkir internal.',
  E: 'Blok E — unit sudut premium di sisi selatan kompleks.',
  F: 'Blok F — baris barat dengan privasi maksimal, menghadap sawah.',
}

const BLOCK_IMAGES: Record<BlockId, string> = {
  A: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop',
  B: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop',
  C: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop',
  D: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fit=crop',
  E: 'https://images.unsplash.com/photo-1600210492494-0946919438ea?w=800&q=80&fit=crop',
  F: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&fit=crop',
}

function mapUnitStatus(status: UnitStatus): RoomStatus {
  if (status === 'available') return 'available'
  if (status === 'booked') return 'occupied'
  return 'occupied'
}

function unitToRoom(unit: KosUnit): MasterplanRoom {
  const roomNumber = `${unit.floor}${String(unit.number).padStart(2, '0')}`
  const baseImages = getRoomImages(unit.type, unit.bedrooms)
  const gallery = [
    ...baseImages,
    `https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80&fit=crop&sig=${unit.id}a`,
    `https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80&fit=crop&sig=${unit.id}b`,
  ].slice(0, 5)

  return {
    id: `room-${unit.id}`,
    unitId: unit.id,
    number: roomNumber,
    floor: unit.floor,
    status: mapUnitStatus(unit.status),
    size: unit.area,
    price: unit.price,
    deposit: unit.deposit,
    availabilityDate: unit.status === 'available' ? null : '2026-07-01',
    facilities: ALL_FACILITIES.slice(0, unit.bedrooms >= 2 ? 10 : 8),
    images: gallery,
  }
}

function computeBuildingStatus(rooms: MasterplanRoom[]): BuildingStatus {
  const maintenance = rooms.filter((r) => r.status === 'maintenance').length
  if (maintenance === rooms.length) return 'maintenance'

  const available = rooms.filter((r) => r.status === 'available').length
  const occupied = rooms.filter((r) => r.status === 'occupied').length
  const reserved = rooms.filter((r) => r.status === 'reserved').length

  if (available === rooms.length) return 'available'
  if (occupied === rooms.length) return 'occupied'
  if (available === 0 && reserved === 0) return 'occupied'
  if (reserved > 0 || (available > 0 && occupied > 0)) return 'limited'
  if (available <= rooms.length * 0.3) return 'limited'
  return 'available'
}

function buildBlockBuilding(block: BlockId): MasterplanBuilding {
  const blockUnits = UNITS.filter((u) => u.block === block)
  const rooms = blockUnits.map(unitToRoom)
  const availableRooms = rooms.filter((r) => r.status === 'available').length
  const occupiedRooms = rooms.filter((r) => r.status === 'occupied').length
  const reservedRooms = rooms.filter((r) => r.status === 'reserved').length
  const maintenanceRooms = rooms.filter((r) => r.status === 'maintenance').length

  return {
    id: `block-${block.toLowerCase()}`,
    name: `Blok ${block}`,
    block,
    status: computeBuildingStatus(rooms),
    description: BLOCK_DESCRIPTIONS[block],
    image: BLOCK_IMAGES[block],
    amenities: AMENITIES,
    rooms,
    totalRooms: rooms.length,
    availableRooms,
    occupiedRooms,
    reservedRooms,
    maintenanceRooms,
    hotspot: BLOCK_HOTSPOTS[block],
  }
}

export const BUILDINGS: MasterplanBuilding[] = (
  ['F', 'C', 'B', 'A', 'D', 'E'] as BlockId[]
).map(buildBlockBuilding)

export function getBuildingById(id: string): MasterplanBuilding | undefined {
  return BUILDINGS.find((b) => b.id === id)
}

export function searchBuildingsAndRooms(query: string): {
  buildings: MasterplanBuilding[]
  matchedRoomIds: Set<string>
} {
  const q = query.trim().toLowerCase()
  if (!q) return { buildings: BUILDINGS, matchedRoomIds: new Set() }

  const matchedRoomIds = new Set<string>()
  const buildings = BUILDINGS.filter((b) => {
    const nameMatch = b.name.toLowerCase().includes(q) || b.block.toLowerCase().includes(q)
    const roomMatch = b.rooms.some((r) => {
      const hit = r.number.includes(q) || r.unitId.includes(q)
      if (hit) matchedRoomIds.add(r.id)
      return hit
    })
    return nameMatch || roomMatch
  })

  return { buildings, matchedRoomIds }
}
