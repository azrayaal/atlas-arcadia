import type { BlockId } from './index'

export type BuildingStatus = 'available' | 'limited' | 'occupied' | 'maintenance'

export type RoomStatus = 'available' | 'reserved' | 'occupied' | 'maintenance'

export type RoomFacility =
  | 'ac'
  | 'bed'
  | 'mattress'
  | 'wardrobe'
  | 'desk'
  | 'chair'
  | 'tv'
  | 'refrigerator'
  | 'water_heater'
  | 'balcony'
  | 'wifi'
  | 'bathroom'

export type BuildingAmenity =
  | 'parking'
  | 'cctv'
  | 'security'
  | 'laundry'
  | 'shared_kitchen'
  | 'wifi'

export interface MasterplanRoom {
  id: string
  unitId: string
  number: string
  floor: number
  status: RoomStatus
  size: number
  price: number
  deposit: number
  availabilityDate: string | null
  facilities: RoomFacility[]
  images: string[]
}

export interface MasterplanBuilding {
  id: string
  name: string
  block: BlockId
  status: BuildingStatus
  description: string
  image: string
  amenities: BuildingAmenity[]
  rooms: MasterplanRoom[]
  totalRooms: number
  availableRooms: number
  occupiedRooms: number
  reservedRooms: number
  maintenanceRooms: number
  /** Hotspot on masterplan image (% 0–100) */
  hotspot: { x: number; y: number; w: number; h: number }
}
