import { useMemo, useState } from 'react'
import { UNITS } from '@/data/siteLayout'
import {
  SITE_PLAN_POSITIONS,
  SITE_PLAN_VIEWBOX,
  SITE_LANDMARKS,
  BLOCK_LABELS,
  TREE_POSITIONS,
  ROAD_SEGMENTS,
} from '@/data/sitePlanGeometry'
import { UnitSitePlanPanel } from './UnitSitePlanPanel'
import { cn, formatArea, formatCurrency, getStatusLabel } from '@/lib/utils'
import type { BlockId, KosUnit, UnitStatus } from '@/types'

const STATUS_STYLE: Record<
  UnitStatus,
  { fill: string; stroke: string; text: string }
> = {
  available: { fill: '#e8f5e9', stroke: '#4caf50', text: '#2e7d32' },
  booked: { fill: '#ffebee', stroke: '#ef5350', text: '#c62828' },
  self_managed: { fill: '#efebe9', stroke: '#8d6e63', text: '#5d4037' },
}

export function SitePlanMap() {
  const [hoveredUnit, setHoveredUnit] = useState<KosUnit | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<KosUnit | null>(null)
  const [activeBlock, setActiveBlock] = useState<BlockId | 'all'>('all')

  const unitMap = useMemo(() => new Map(UNITS.map((u) => [u.id, u])), [])
  const { width, height } = SITE_PLAN_VIEWBOX

  const stats = useMemo(
    () => ({
      available: UNITS.filter((u) => u.status === 'available').length,
      booked: UNITS.filter((u) => u.status === 'booked').length,
      selfManaged: UNITS.filter((u) => u.status === 'self_managed').length,
    }),
    [],
  )

  return (
    <div className="space-y-5">
      {/* Filter blok */}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'A', 'B', 'C', 'D', 'E', 'F'] as const).map((block) => (
          <button
            key={block}
            type="button"
            onClick={() => setActiveBlock(block)}
            className={cn(
              'px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-colors',
              activeBlock === block
                ? 'border-brand bg-brand text-white'
                : 'border-brand/15 text-brand-muted hover:border-brand/40 hover:text-brand',
            )}
          >
            {block === 'all' ? 'Semua' : `Blok ${block}`}
          </button>
        ))}
      </div>

      {/* Map + sidebar */}
      <div className="flex border border-brand/10 overflow-hidden bg-[#f8f6f1]">
        <div
          className={cn(
            'transition-all duration-300 overflow-x-auto',
            selectedUnit ? 'w-full lg:w-[calc(100%-400px)]' : 'w-full',
          )}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full min-w-[720px]"
            style={{ maxHeight: selectedUnit ? 640 : 580 }}
          >
            <defs>
              <pattern id="roadTex" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#ebe8e2" />
                <circle cx="5" cy="5" r="0.6" fill="#d5d0c8" />
              </pattern>
              <filter id="unitShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.25" />
              </filter>
            </defs>

            <rect width={width} height={height} fill="#f3f0ea" />

            <rect {...SITE_LANDMARKS.mainRoad} fill="url(#roadTex)" />
            <text x={width / 2} y={30} textAnchor="middle" fontSize="10" fill="#999" fontFamily="Inter, sans-serif" letterSpacing="2.5">
              JL. RAYA BOJONGSARI
            </text>

            {ROAD_SEGMENTS.map((r, i) => (
              <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="url(#roadTex)" rx={2} />
            ))}

            {TREE_POSITIONS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={7} fill="#c5dbb8" opacity={0.85} />
            ))}

            <rect
              x={SITE_LANDMARKS.clubhouse.x}
              y={SITE_LANDMARKS.clubhouse.y}
              width={SITE_LANDMARKS.clubhouse.w}
              height={SITE_LANDMARKS.clubhouse.h}
              fill="#e0dbd2"
              stroke="#bfb8aa"
              strokeWidth={1}
              rx={3}
            />
            <text x={SITE_LANDMARKS.clubhouse.x + SITE_LANDMARKS.clubhouse.w / 2} y={SITE_LANDMARKS.clubhouse.y + 26} textAnchor="middle" fontSize="10" fill="#666" fontFamily="Inter, sans-serif" fontWeight="500">
              Club House
            </text>
            <text x={SITE_LANDMARKS.clubhouse.x + SITE_LANDMARKS.clubhouse.w / 2} y={SITE_LANDMARKS.clubhouse.y + 42} textAnchor="middle" fontSize="8" fill="#999" fontFamily="Inter, sans-serif">
              Gym · Laundry · Mini Market
            </text>

            <rect x={SITE_LANDMARKS.pos.x} y={SITE_LANDMARKS.pos.y} width={SITE_LANDMARKS.pos.w} height={SITE_LANDMARKS.pos.h} fill="#ddd8cf" stroke="#bfb8aa" strokeWidth={1} rx={2} />
            <text x={SITE_LANDMARKS.pos.x + SITE_LANDMARKS.pos.w / 2} y={SITE_LANDMARKS.pos.y + 23} textAnchor="middle" fontSize="9" fill="#666" fontFamily="Inter, sans-serif" fontWeight="600">
              POS
            </text>

            {/* Units — rendered before labels */}
            {SITE_PLAN_POSITIONS.map((pos) => {
              const u = unitMap.get(pos.unitId)
              if (!u) return null

              const dimmed = activeBlock !== 'all' && u.block !== activeBlock
              const style = STATUS_STYLE[u.status]
              const isHover = hoveredUnit?.id === u.id
              const isSelected = selectedUnit?.id === u.id

              return (
                <g
                  key={pos.unitId}
                  opacity={dimmed ? 0.2 : 1}
                  style={{ cursor: 'pointer' }}
                  filter={isHover ? 'url(#unitShadow)' : undefined}
                  transform={isHover ? `translate(${pos.x + pos.width / 2}, ${pos.y + pos.height / 2}) scale(1.06) translate(${-(pos.x + pos.width / 2)}, ${-(pos.y + pos.height / 2)})` : undefined}
                  onMouseEnter={() => setHoveredUnit(u)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setSelectedUnit(u)}
                >
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={pos.width}
                    height={pos.height}
                    fill={style.fill}
                    stroke={isHover || isSelected ? '#1a1a1a' : style.stroke}
                    strokeWidth={isHover || isSelected ? 2 : 0.75}
                    rx={1.5}
                  />
                  <text x={pos.x + pos.width / 2} y={pos.y + pos.height / 2 - 1} textAnchor="middle" fontSize="10" fill={style.text} fontFamily="Inter, sans-serif" fontWeight="600" pointerEvents="none">
                    {u.number}
                  </text>
                  <text x={pos.x + pos.width / 2} y={pos.y + pos.height / 2 + 9} textAnchor="middle" fontSize="6.5" fill="#888" fontFamily="Inter, sans-serif" pointerEvents="none">
                    {u.area % 1 === 0 ? u.area : u.area.toFixed(1)}m²
                  </text>
                  {u.status === 'booked' && (
                    <circle cx={pos.x + pos.width - 4} cy={pos.y + 4} r={3.5} fill="#ef5350" pointerEvents="none" />
                  )}
                </g>
              )
            })}

            {/* Block labels — on top of units */}
            {BLOCK_LABELS.map(({ block, x, y }) => (
              <g key={block} pointerEvents="none">
                <circle cx={x} cy={y} r={13} fill="#1a1a1a" stroke="white" strokeWidth={2} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill="white" fontFamily="Inter, sans-serif" fontWeight="700">
                  {block}
                </text>
              </g>
            ))}

            <g transform="translate(1000, 600)" pointerEvents="none">
              <circle r={18} fill="white" stroke="#ddd" strokeWidth={0.75} />
              <text y={-6} textAnchor="middle" fontSize="7" fill="#888" fontFamily="Inter, sans-serif">U</text>
              <text y={10} textAnchor="middle" fontSize="7" fill="#888" fontFamily="Inter, sans-serif">S</text>
            </g>

            <text x={28} y={32} fontSize="15" fill="#8b7355" fontFamily="Georgia, serif" fontWeight="600" pointerEvents="none">
              ATLAS ARCADIA
            </text>
          </svg>
        </div>

        {/* Right sidebar */}
        {selectedUnit && (
          <div className="fixed inset-0 z-40 lg:static lg:z-auto lg:w-[400px] lg:shrink-0">
            <div className="absolute inset-0 bg-black/30 lg:hidden" onClick={() => setSelectedUnit(null)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-[400px] lg:relative lg:max-w-none">
              <UnitSitePlanPanel unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
            </div>
          </div>
        )}
      </div>

      {/* Hover info */}
      {hoveredUnit && !selectedUnit && (
        <div className="flex flex-wrap items-center gap-3 border border-brand/10 bg-white px-5 py-3 text-sm shadow-subtle">
          <span className="font-serif text-base">{hoveredUnit.label}</span>
          <span className="text-brand-muted">Blok {hoveredUnit.block}</span>
          <span className="text-brand-muted">{formatArea(hoveredUnit.area)}</span>
          <span
            className="text-[10px] uppercase tracking-wider px-2 py-0.5 border"
            style={{
              color: STATUS_STYLE[hoveredUnit.status].text,
              borderColor: STATUS_STYLE[hoveredUnit.status].stroke,
              backgroundColor: STATUS_STYLE[hoveredUnit.status].fill,
            }}
          >
            {getStatusLabel(hoveredUnit.status)}
          </span>
          {hoveredUnit.status === 'available' && (
            <span className="font-medium">{formatCurrency(hoveredUnit.price)}/bulan</span>
          )}
          <span className="text-xs text-brand-muted ml-auto">Klik untuk detail →</span>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-5 text-xs text-brand-muted">
        <Legend color={STATUS_STYLE.available} label="Tersedia" count={stats.available} />
        <Legend color={STATUS_STYLE.booked} label="Terbooking" count={stats.booked} />
        <Legend color={STATUS_STYLE.self_managed} label="Self Managed" count={stats.selfManaged} />
      </div>
    </div>
  )
}

function Legend({
  color,
  label,
  count,
}: {
  color: { fill: string; stroke: string }
  label: string
  count: number
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3.5 w-3.5 rounded-sm border" style={{ backgroundColor: color.fill, borderColor: color.stroke }} />
      <span>{label}</span>
      <span className="font-medium text-brand">({count})</span>
    </div>
  )
}
