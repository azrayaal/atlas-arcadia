import type { UnitType, RoomCount } from '@/types'

/** Curated Unsplash photos — interior kamar kos & hunian */
const PHOTOS = {
  bedroom: {
    single: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80&fit=crop',
    cozy: 'https://images.unsplash.com/photo-1522771739844-6a9f6d4450ba?w=1200&q=80&fit=crop',
    modern: 'https://images.unsplash.com/photo-1616594039964-67bf7099a071?w=1200&q=80&fit=crop',
    twin: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80&fit=crop',
    master: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1200&q=80&fit=crop',
    spacious: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&fit=crop',
  },
  living: {
    compact: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80&fit=crop',
    modern: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&fit=crop',
    open: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80&fit=crop',
  },
  bathroom: {
    clean: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80&fit=crop',
    modern: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80&fit=crop',
  },
  exterior: {
    building: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&fit=crop',
    courtyard: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&fit=crop',
    entrance: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&fit=crop',
  },
  hero: {
    interior: 'https://images.unsplash.com/photo-1600210492494-0946919438ea?w=1600&q=80&fit=crop',
    listing: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80&fit=crop',
  },
} as const

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
      return [
        PHOTOS.bedroom.spacious,
        PHOTOS.bedroom.master,
        PHOTOS.living.open,
        PHOTOS.bathroom.modern,
      ]
    case 'Corner':
      return bedrooms >= 2
        ? [PHOTOS.bedroom.modern, PHOTOS.bedroom.twin, PHOTOS.living.compact, PHOTOS.bathroom.clean]
        : [PHOTOS.bedroom.cozy, PHOTOS.living.modern, PHOTOS.bathroom.clean]
    case 'Standard':
    default:
      return [PHOTOS.bedroom.single, PHOTOS.bedroom.cozy, PHOTOS.living.compact, PHOTOS.bathroom.clean]
  }
}

export function getRoomHeroImage(type: UnitType): string {
  switch (type) {
    case 'Premium':
      return PHOTOS.bedroom.spacious
    case 'Corner':
      return PHOTOS.bedroom.modern
    default:
      return PHOTOS.bedroom.single
  }
}

export const PAGE_ASSETS = {
  heroMain: '/assets/arcadia.png',
  masterplan: '/assets/arcadia.png',
  heroInterior: PHOTOS.hero.interior,
  unitsBanner: PHOTOS.hero.listing,
  aboutExterior: PHOTOS.exterior.building,
  aboutCourtyard: PHOTOS.exterior.courtyard,
  aboutInterior: PHOTOS.living.modern,
  locationBuilding: PHOTOS.exterior.entrance,
} as const
