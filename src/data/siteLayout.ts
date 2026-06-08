import type { BlockId, KosUnit, UnitStatus } from '@/types'
import { getFloorPlanAsset, getRoomImages } from '@/data/roomAssets'

const BOOKED_UNITS = new Set(['A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'])
const SELF_MANAGED_UNITS = new Set([
  'A1', 'A2', 'A3', 'A4',
  'E1', 'E2', 'E3', 'E4', 'E5',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6',
])

const AREA_MAP: Record<string, number> = {
  // Block A
  A1: 92.25, A2: 92.25, A3: 92.25,
  A4: 82.2, A5: 72, A6: 72, A7: 72, A8: 72, A9: 72, A10: 72,
  A11: 72, A12: 72, A13: 72, A14: 72, A15: 72,
  A16: 102.48,
  // Block B - all standard
  ...Object.fromEntries(Array.from({ length: 16 }, (_, i) => [`B${i + 1}`, 72])),
  // Block C - corners larger
  C1: 96, C8: 96, C9: 96, C16: 96,
  ...Object.fromEntries([2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15].map((n) => [`C${n}`, 72])),
  // Block D - all standard
  ...Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`D${i + 1}`, 72])),
  // Block E
  E1: 134.4, E5: 134.4, E2: 72, E3: 72, E4: 72,
  // Block F
  F1: 102.48, F6: 102.48, F2: 72, F3: 72, F4: 72, F5: 72,
}

function getStatus(block: BlockId, number: number): UnitStatus {
  const key = `${block}${number}`
  if (SELF_MANAGED_UNITS.has(key)) return 'self_managed'
  if (BOOKED_UNITS.has(key)) return 'booked'
  return 'available'
}

function getType(area: number): 'Standard' | 'Corner' | 'Premium' {
  if (area >= 100) return 'Premium'
  if (area >= 90) return 'Corner'
  return 'Standard'
}

function getBedrooms(area: number): 1 | 2 | 3 | 4 {
  if (area >= 120) return 3
  if (area >= 90) return 2
  return 1
}

function getPrice(area: number, status: UnitStatus): number {
  if (status !== 'available') return 0
  const baseRate = 38000
  return Math.round((area * baseRate) / 50000) * 50000
}

const BLOCK_UNITS: Record<BlockId, number[]> = {
  A: Array.from({ length: 16 }, (_, i) => i + 1),
  B: Array.from({ length: 16 }, (_, i) => i + 1),
  C: Array.from({ length: 16 }, (_, i) => i + 1),
  D: Array.from({ length: 20 }, (_, i) => i + 1),
  E: Array.from({ length: 5 }, (_, i) => i + 1),
  F: Array.from({ length: 6 }, (_, i) => i + 1),
}

const DESCRIPTIONS: Record<BlockId, string> = {
  A: 'Blok A menghadap area hijau dengan akses langsung ke jalan utama. Unit premium dengan pencahayaan alami optimal.',
  B: 'Blok B berada di pusat kompleks dengan jarak dekat ke Club House. Lingkungan tenang dan asri.',
  C: 'Blok C memiliki unit sudut dengan luas lebih besar. Ideal untuk penghuni yang mengutamakan ruang.',
  D: 'Blok D adalah blok terbesar dengan 20 unit. Dekat dengan fasilitas parkir dan area bersama.',
  E: 'Blok E menawarkan unit sudut premium dengan luas terbesar di kompleks. Self managed property.',
  F: 'Blok F berada di sisi barat kompleks dengan privasi maksimal. Self managed property.',
}

function buildUnits(): KosUnit[] {
  const units: KosUnit[] = []
  const blocks = Object.keys(BLOCK_UNITS) as BlockId[]

  for (const block of blocks) {
    for (const number of BLOCK_UNITS[block]) {
      const key = `${block}${number}`
      const area = AREA_MAP[key] ?? 72
      const status = getStatus(block, number)
      const type = getType(area)
      const bedrooms = getBedrooms(area)
      const price = getPrice(area, status)

      units.push({
        id: key.toLowerCase(),
        code: `${block}-${String(number).padStart(2, '0')}`,
        block,
        number,
        label: `Unit ${block}-${String(number).padStart(2, '0')}`,
        type,
        area,
        dimensions: area === 72 ? '12.00 × 6.00' : area === 96 ? '12.00 × 8.00' : 'varies',
        floor: 1,
        bedrooms,
        status,
        price,
        deposit: price * 2,
        description: DESCRIPTIONS[block],
        facilities: ['AC', 'Kamar Mandi Dalam', 'WiFi', 'Kasur', 'Lemari', 'Meja Belajar'],
        images: getRoomImages(type, bedrooms),
        floorPlanImage: getFloorPlanAsset(type),
      })
    }
  }

  return units
}

export const UNITS: KosUnit[] = buildUnits()

export const AVAILABLE_UNITS = UNITS.filter((u) => u.status === 'available')

export const PRICE_RANGE = {
  min: Math.min(...AVAILABLE_UNITS.map((u) => u.price)),
  max: Math.max(...AVAILABLE_UNITS.map((u) => u.price)),
}

export const AREA_RANGE = {
  min: Math.min(...UNITS.map((u) => u.area)),
  max: Math.max(...UNITS.map((u) => u.area)),
}

export const COMMUNITY_INFO = {
  address: 'JL. Raya Bojongsari, Bojongsari, Depok',
  phone: '+62 21 1234 5678',
  email: 'info@atlasarcadia.id',
  hours: 'Senin – Minggu, 09:00 – 18:00',
  coordinates: { lat: -6.3705, lng: 106.7312 },
}

export const AMENITIES = [
  { title: 'Club House', description: 'Area bersama dengan gym, laundry, dan mini market.' },
  { title: 'Keamanan 24 Jam', description: 'POS security di pintu masuk utama kompleks.' },
  { title: 'Area Hijau', description: 'Taman dan landscaping di seluruh kompleks.' },
  { title: 'Parkir Luas', description: 'Area parkir dedicated untuk setiap penghuni.' },
  { title: 'WiFi Area', description: 'Koneksi internet di area bersama kompleks.' },
  { title: 'Smart Access', description: 'Sistem akses NFC, Face ID, dan QR Code.' },
]
