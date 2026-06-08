import { useMemo, useState } from 'react'
import { BUILDINGS, searchBuildingsAndRooms } from '@/data/buildings'
import { BUILDING_STATUS_COLORS } from '@/lib/masterplan'
import { PAGE_ASSETS } from '@/data/roomAssets'
import { cn } from '@/lib/utils'
import { MasterplanSearch } from './MasterplanSearch'
import { BuildingTooltip } from './BuildingTooltip'
import { BuildingPanel } from './BuildingPanel'
import { RoomDetailModal } from './RoomDetailModal'
import type { MasterplanBuilding, MasterplanRoom } from '@/types/masterplan'

export function MasterplanView() {
  const [search, setSearch] = useState('')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedBuilding, setSelectedBuilding] = useState<MasterplanBuilding | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<MasterplanRoom | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const { buildings: filteredBuildings, matchedRoomIds } = useMemo(
    () => searchBuildingsAndRooms(search),
    [search],
  )

  const hoveredBuilding = BUILDINGS.find((b) => b.id === hoveredId) ?? null

  const handleBuildingClick = (building: MasterplanBuilding) => {
    setSelectedBuilding(building)
    setSelectedRoom(null)
    setModalOpen(false)
  }

  const handleRoomSelect = (room: MasterplanRoom) => {
    setSelectedRoom(room)
    setModalOpen(true)
  }

  return (
    <div className="relative">
      <MasterplanSearch value={search} onChange={setSearch} />

      <div className="flex gap-0 border border-brand/10 bg-[#0a0a0a] overflow-hidden">
        {/* Masterplan */}
        <div
          className={cn(
            'relative transition-all duration-300',
            selectedBuilding ? 'w-full lg:w-[calc(100%-380px)]' : 'w-full',
          )}
        >
          <div className="relative aspect-[16/10] w-full min-h-[420px]">
            <img
              src={PAGE_ASSETS.masterplan}
              alt="Masterplan Atlas Arcadia"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />

            {/* Building hotspots */}
            {filteredBuildings.map((building) => {
              const colors = BUILDING_STATUS_COLORS[building.status]
              const isHovered = hoveredId === building.id
              const isSelected = selectedBuilding?.id === building.id
              const { x, y, w, h } = building.hotspot

              return (
                <button
                  key={building.id}
                  type="button"
                  className={cn(
                    'absolute border-2 transition-all duration-200',
                    isHovered && 'z-10 scale-[1.03] shadow-[0_0_24px_rgba(255,255,255,0.35)]',
                    isSelected && 'z-10 ring-2 ring-white ring-offset-2 ring-offset-transparent',
                  )}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${w}%`,
                    height: `${h}%`,
                    backgroundColor: colors.fill,
                    borderColor: colors.stroke,
                  }}
                  onMouseEnter={() => setHoveredId(building.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleBuildingClick(building)}
                >
                  <span
                    className={cn(
                      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                      'whitespace-nowrap rounded-sm bg-black/70 px-3 py-1.5',
                      'text-[11px] font-semibold uppercase tracking-widest text-white',
                      'pointer-events-none shadow-lg',
                    )}
                  >
                    {building.name}
                  </span>
                </button>
              )
            })}

            {/* Clubhouse label */}
            <div
              className="absolute pointer-events-none"
              style={{ left: '38%', top: '58%', width: '14%', height: '10%' }}
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-black/60 px-2 py-1 text-[9px] uppercase tracking-wider text-white">
                Club House
              </span>
            </div>
          </div>

          {/* Hover tooltip */}
          {hoveredBuilding && !selectedBuilding && (
            <BuildingTooltip
              building={hoveredBuilding}
              style={{
                left: `${hoveredBuilding.hotspot.x + hoveredBuilding.hotspot.w / 2}%`,
                top: `${hoveredBuilding.hotspot.y - 2}%`,
              }}
            />
          )}
        </div>

        {/* Side panel */}
        {selectedBuilding && (
          <div className="fixed inset-0 z-40 lg:static lg:z-auto lg:w-[380px] lg:shrink-0">
            <div
              className="absolute inset-0 bg-black/40 lg:hidden"
              onClick={() => setSelectedBuilding(null)}
            />
            <div className="absolute right-0 top-0 h-full w-full max-w-[380px] lg:relative lg:max-w-none">
              <BuildingPanel
                building={selectedBuilding}
                highlightRoomIds={matchedRoomIds}
                onClose={() => {
                  setSelectedBuilding(null)
                  setModalOpen(false)
                }}
                onSelectRoom={handleRoomSelect}
              />
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-6 text-xs text-brand-muted">
        {Object.entries(BUILDING_STATUS_COLORS).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="h-4 w-4 border"
              style={{ backgroundColor: val.fill, borderColor: val.stroke }}
            />
            <span>{val.label}</span>
          </div>
        ))}
        <span className="text-brand-muted">· Klik blok untuk melihat kamar</span>
      </div>

      <RoomDetailModal
        room={selectedRoom}
        buildingName={selectedBuilding?.name ?? ''}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}
