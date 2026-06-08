import { cn } from '@/lib/utils'
import { ROOM_STATUS_COLORS } from '@/lib/masterplan'
import type { MasterplanRoom } from '@/types/masterplan'

interface RoomExplorerProps {
  rooms: MasterplanRoom[]
  highlightIds?: Set<string>
  onSelectRoom: (room: MasterplanRoom) => void
}

export function RoomExplorer({ rooms, highlightIds, onSelectRoom }: RoomExplorerProps) {
  const floors = [...new Set(rooms.map((r) => r.floor))].sort((a, b) => a - b)

  return (
    <div className="space-y-6">
      <h3 className="section-label">Room Explorer</h3>
      {floors.map((floor) => {
        const floorRooms = rooms
          .filter((r) => r.floor === floor)
          .sort((a, b) => a.number.localeCompare(b.number))

        return (
          <div key={floor}>
            <p className="text-xs font-medium text-brand mb-3">Lantai {floor}</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {floorRooms.map((room) => {
                const colors = ROOM_STATUS_COLORS[room.status]
                const dimmed = highlightIds && highlightIds.size > 0 && !highlightIds.has(room.id)

                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => onSelectRoom(room)}
                    className={cn(
                      'border px-2 py-3 text-center text-xs font-medium transition-all hover:scale-105 hover:shadow-md',
                      colors.bg,
                      colors.border,
                      dimmed && 'opacity-30',
                    )}
                  >
                    {room.number}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
