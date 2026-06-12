import type { BlockId, UnitType, RoomCount } from '@/types'

export const ROOM_ASSETS = [
  '/assets/rooms/room1.png',
  '/assets/rooms/room2.png',
  '/assets/rooms/room3.png',
  '/assets/rooms/room4.png',
] as const

export const HOUSE_ASSETS = [
  '/assets/house/house1.png',
  '/assets/house/house2.png',
  '/assets/house/house3.png',
  '/assets/house/house4.png',
] as const

export const BLOCK_HERO_ASSETS: Record<BlockId, string> = {
  A: HOUSE_ASSETS[0],
  B: HOUSE_ASSETS[1],
  C: HOUSE_ASSETS[2],
  D: HOUSE_ASSETS[3],
  E: HOUSE_ASSETS[0],
  F: HOUSE_ASSETS[1],
}

export function getBlockHeroImage(block: BlockId | 'all'): string {
  return block === 'all' ? HOUSE_ASSETS[0] : BLOCK_HERO_ASSETS[block]
}

const FLOOR_PLANS: Record<UnitType, string> = {
  Standard: '/assets/floor-plans/standard.svg',
  Corner: '/assets/floor-plans/corner.svg',
  Premium: '/assets/floor-plans/premium.svg',
}

export function getFloorPlanAsset(type: UnitType): string {
  return FLOOR_PLANS[type]
}

export function getRoomImages(type: UnitType, bedrooms: RoomCount): string[] {
  switch (type) {
    case 'Premium':
      return [ROOM_ASSETS[2], ROOM_ASSETS[3], ROOM_ASSETS[0], ROOM_ASSETS[1]]
    case 'Corner':
      return bedrooms >= 2
        ? [ROOM_ASSETS[1], ROOM_ASSETS[2], ROOM_ASSETS[3], ROOM_ASSETS[0]]
        : [ROOM_ASSETS[0], ROOM_ASSETS[1], ROOM_ASSETS[2], ROOM_ASSETS[3]]
    case 'Standard':
    default:
      return [ROOM_ASSETS[0], ROOM_ASSETS[1], ROOM_ASSETS[2], ROOM_ASSETS[3]]
  }
}

export function getRoomHeroImage(type: UnitType): string {
  switch (type) {
    case 'Premium':
      return ROOM_ASSETS[2]
    case 'Corner':
      return ROOM_ASSETS[1]
    default:
      return ROOM_ASSETS[0]
  }
}

export const PAGE_ASSETS = {
  heroMain: '/assets/arcadia.png',
  masterplan: '/assets/arcadia.png',
  heroInterior: ROOM_ASSETS[0],
  unitsBanner: HOUSE_ASSETS[0],
  aboutExterior: HOUSE_ASSETS[0],
  aboutCourtyard: HOUSE_ASSETS[1],
  aboutInterior: ROOM_ASSETS[2],
  locationBuilding: HOUSE_ASSETS[2],
} as const
