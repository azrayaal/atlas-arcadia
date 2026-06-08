import { useMemo, useState } from 'react'
import { UNITS, AREA_RANGE, PRICE_RANGE } from '@/data/siteLayout'
import type { BlockId, KosUnit, UnitFilters, UnitStatus, RoomCount } from '@/types'

const DEFAULT_FILTERS: UnitFilters = {
  block: 'all',
  status: 'available',
  bedrooms: 'all',
  floor: 'all',
  areaMin: AREA_RANGE.min,
  areaMax: AREA_RANGE.max,
  priceMin: PRICE_RANGE.min,
  priceMax: PRICE_RANGE.max,
}

export function useUnitFilters(initial?: Partial<UnitFilters>) {
  const [filters, setFilters] = useState<UnitFilters>({ ...DEFAULT_FILTERS, ...initial })

  const filteredUnits = useMemo(() => {
    return UNITS.filter((unit) => {
      if (filters.block !== 'all' && unit.block !== filters.block) return false
      if (filters.status !== 'all' && unit.status !== filters.status) return false
      if (filters.bedrooms !== 'all' && unit.bedrooms !== filters.bedrooms) return false
      if (filters.floor !== 'all' && unit.floor !== filters.floor) return false
      if (unit.area < filters.areaMin || unit.area > filters.areaMax) return false
      if (unit.status === 'available') {
        if (unit.price < filters.priceMin || unit.price > filters.priceMax) return false
      }
      return true
    })
  }, [filters])

  const updateFilter = <K extends keyof UnitFilters>(key: K, value: UnitFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => setFilters(DEFAULT_FILTERS)

  return { filters, filteredUnits, updateFilter, resetFilters, setFilters }
}

export function getSimilarUnits(unit: KosUnit, limit = 3): KosUnit[] {
  return UNITS.filter(
    (u) =>
      u.id !== unit.id &&
      u.status === 'available' &&
      (u.block === unit.block || u.bedrooms === unit.bedrooms),
  ).slice(0, limit)
}

export type { BlockId, UnitStatus, RoomCount }
