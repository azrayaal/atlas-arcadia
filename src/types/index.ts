export type BlockId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type UnitStatus = 'available' | 'booked' | 'self_managed'

export type UnitType = 'Standard' | 'Corner' | 'Premium'

export type RoomCount = 1 | 2 | 3 | 4

export interface UnitFacility {
  id: string
  label: string
  icon: string
}

export interface KosUnit {
  id: string
  code: string
  block: BlockId
  number: number
  label: string
  type: UnitType
  area: number
  dimensions: string
  floor: number
  bedrooms: RoomCount
  status: UnitStatus
  price: number
  deposit: number
  description: string
  facilities: string[]
  images: string[]
  floorPlanImage: string
}

export interface UnitFilters {
  block: BlockId | 'all'
  status: UnitStatus | 'all'
  bedrooms: RoomCount | 'all'
  floor: number | 'all'
  areaMin: number
  areaMax: number
  priceMin: number
  priceMax: number
}

export interface BookingFormData {
  unitId: string
  name: string
  email: string
  phone: string
  moveInDate: string
  duration: '3' | '6' | '12'
  message: string
}

export interface BookingLead extends BookingFormData {
  id: string
  createdAt: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export interface SitePlanUnitPosition {
  unitId: string
  x: number
  y: number
  width: number
  height: number
}

export interface CommunityInfo {
  address: string
  phone: string
  email: string
  hours: string
  coordinates: { lat: number; lng: number }
}
