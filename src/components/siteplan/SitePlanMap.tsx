import { useMemo, useRef, useState, useEffect } from 'react'
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
import type { BlockId, KosUnit, UnitStatus, SitePlanUnitPosition } from '@/types'

const STATUS_STYLE: Record<
  UnitStatus,
  { fill: string; stroke: string; text: string }
> = {
  available: { fill: '#f9faf6', stroke: '#a7bfa3', text: '#475b3c' },
  booked: { fill: '#faebeb', stroke: '#ef5350', text: '#b71c1c' },
  self_managed: { fill: '#f4efe6', stroke: '#8d6e63', text: '#5d4037' },
}

export function SitePlanMap() {
  const [hoveredUnit, setHoveredUnit] = useState<KosUnit | null>(null)
  const [selectedUnit, setSelectedUnit] = useState<KosUnit | null>(null)
  const [activeBlock, setActiveBlock] = useState<BlockId | 'all'>('all')
  const [editMode, setEditMode] = useState(false)

  // Local editable copy of positions so user can drag units
  const [positions, setPositions] = useState<SitePlanUnitPosition[]>(() =>
    SITE_PLAN_POSITIONS.map((p) => ({ ...p })),
  )

  const svgRef = useRef<SVGSVGElement | null>(null)
  const dragRef = useRef<{
    id: string
    offsetX: number
    offsetY: number
    pointerId: number
  } | null>(null)

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

  useEffect(() => {
    // keep positions in sync if SITE_PLAN_POSITIONS changes externally
    setPositions(SITE_PLAN_POSITIONS.map((p) => ({ ...p })))
  }, [SITE_PLAN_POSITIONS])

  return (
    <div className="space-y-5">
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

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setEditMode((s) => !s)}
          className={cn(
            'px-3 py-1.5 text-sm uppercase tracking-widest border transition-colors rounded',
            editMode ? 'bg-brand text-white border-brand' : 'border-brand/15 text-brand-muted hover:border-brand/40 hover:text-brand',
          )}
        >
          {editMode ? 'Exit Edit' : 'Edit Positions'}
        </button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              const json = JSON.stringify(positions, null, 2)
              if (navigator.clipboard) navigator.clipboard.writeText(json)
              // fallback
              else alert(json)
              alert('Positions copied to clipboard')
            }}
            className="px-3 py-1.5 text-sm uppercase tracking-widest border border-brand/15 text-brand-muted hover:border-brand"
          >
            Export JSON
          </button>
        )}
        {editMode && <p className="text-xs text-brand-muted ml-2">Drag units to adjust positions, then export.</p>}
      </div>

      <div className="flex border border-brand/10 overflow-hidden bg-[#f8f6f1]">
        <div
          className={cn(
            'transition-all duration-300 overflow-x-auto',
            selectedUnit ? 'w-full lg:w-[calc(100%-400px)]' : 'w-full',
          )}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full min-w-[900px]"
            style={{ maxHeight: selectedUnit ? 700 : 620 }}
            onPointerMove={(e) => {
              if (!dragRef.current) return
              const svg = svgRef.current
              if (!svg) return
              const pt = svg.createSVGPoint()
              pt.x = e.clientX
              pt.y = e.clientY
              const ctm = svg.getScreenCTM()
              if (!ctm) return
              const loc = pt.matrixTransform(ctm.inverse())
              setPositions((prev) =>
                prev.map((p) =>
                  p.unitId === dragRef.current!.id
                    ? { ...p, x: loc.x - dragRef.current!.offsetX, y: loc.y - dragRef.current!.offsetY }
                    : p,
                ),
              )
            }}
            onPointerUp={(e) => {
              if (!dragRef.current) return
              try {
                (e.target as Element).releasePointerCapture?.(dragRef.current.pointerId)
              } catch {}
              dragRef.current = null
            }}
            onPointerCancel={() => (dragRef.current = null)}
          >
            <defs>
              <pattern id="roadTex" width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="#ede8df" />
                <circle cx="6" cy="6" r="0.8" fill="#d3c9bb" />
              </pattern>
              <filter id="unitShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.18" />
              </filter>
            </defs>

            <rect width={width} height={height} fill="#f5f1e8" />

            <rect {...SITE_LANDMARKS.mainRoad} fill="url(#roadTex)" />
            <text x={width / 2} y={30} textAnchor="middle" fontSize="11" fill="#7a6a57" fontFamily="Inter, sans-serif" letterSpacing="2">
              JL. RAYA BOJONGSARI
            </text>

            {ROAD_SEGMENTS.map((r, i) => (
              <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="url(#roadTex)" rx={3} />
            ))}

            {TREE_POSITIONS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={9} fill="#c5dbb8" opacity={0.92} />
            ))}

            <rect
              x={SITE_LANDMARKS.clubhouse.x}
              y={SITE_LANDMARKS.clubhouse.y}
              width={SITE_LANDMARKS.clubhouse.w}
              height={SITE_LANDMARKS.clubhouse.h}
              fill="#e0d7c9"
              stroke="#b9a78b"
              strokeWidth={1}
              rx={4}
            />
            <text x={SITE_LANDMARKS.clubhouse.x + SITE_LANDMARKS.clubhouse.w / 2} y={SITE_LANDMARKS.clubhouse.y + 30} textAnchor="middle" fontSize="10" fill="#6f5f51" fontFamily="Inter, sans-serif" fontWeight="700">
              Club House Area
            </text>
            <text x={SITE_LANDMARKS.clubhouse.x + SITE_LANDMARKS.clubhouse.w / 2} y={SITE_LANDMARKS.clubhouse.y + 46} textAnchor="middle" fontSize="7.5" fill="#8a7a6c" fontFamily="Inter, sans-serif">
              Gym · Laundry · Mini Market
            </text>

            <rect
              x={SITE_LANDMARKS.pos.x}
              y={SITE_LANDMARKS.pos.y}
              width={SITE_LANDMARKS.pos.w}
              height={SITE_LANDMARKS.pos.h}
              fill="#ddd8cf"
              stroke="#bfb8aa"
              strokeWidth={1}
              rx={3}
            />
            <text x={SITE_LANDMARKS.pos.x + SITE_LANDMARKS.pos.w / 2} y={SITE_LANDMARKS.pos.y + 23} textAnchor="middle" fontSize="9" fill="#5f4f3f" fontFamily="Inter, sans-serif" fontWeight="700">
              POS
            </text>

            {positions.map((pos) => {
              const u = unitMap.get(pos.unitId)
              if (!u) return null

              const dimmed = activeBlock !== 'all' && u.block !== activeBlock
              const style = STATUS_STYLE[u.status]
              const isHover = hoveredUnit?.id === u.id
              const isSelected = selectedUnit?.id === u.id

              return (
                <g
                  key={pos.unitId}
                  opacity={dimmed ? 0.22 : 1}
                  style={{ cursor: 'pointer' }}
                  filter={isHover ? 'url(#unitShadow)' : undefined}
                  transform={isHover ? `translate(${pos.x + pos.width / 2}, ${pos.y + pos.height / 2}) scale(1.04) translate(${-(pos.x + pos.width / 2)}, ${-(pos.y + pos.height / 2)})` : undefined}
                  onMouseEnter={() => setHoveredUnit(u)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => !editMode && setSelectedUnit(u)}
                  onPointerDown={(e) => {
                    if (!editMode) return
                    const svg = svgRef.current
                    if (!svg) return
                    const pt = svg.createSVGPoint()
                    pt.x = e.clientX
                    pt.y = e.clientY
                    const ctm = svg.getScreenCTM()
                    if (!ctm) return
                    const loc = pt.matrixTransform(ctm.inverse())
                    dragRef.current = {
                      id: pos.unitId,
                      offsetX: loc.x - pos.x,
                      offsetY: loc.y - pos.y,
                      pointerId: e.pointerId,
                    }
                    try {
                      (e.target as Element).setPointerCapture?.(e.pointerId)
                    } catch {}
                  }}
                >
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={pos.width}
                    height={pos.height}
                    fill={style.fill}
                    stroke={isHover || isSelected ? '#3b2e28' : style.stroke}
                    strokeWidth={isHover || isSelected ? 1.8 : 0.9}
                    rx={2}
                  />
                  <text x={pos.x + pos.width / 2} y={pos.y + pos.height / 2 - 4} textAnchor="middle" fontSize="8.5" fill={style.text} fontFamily="Inter, sans-serif" fontWeight="700" pointerEvents="none">
                    {u.number}
                  </text>
                  <text x={pos.x + pos.width / 2} y={pos.y + pos.height / 2 + 8} textAnchor="middle" fontSize="5.5" fill="#7b6c5f" fontFamily="Inter, sans-serif" pointerEvents="none">
                    {u.area % 1 === 0 ? `${u.area}m²` : `${u.area.toFixed(1)}m²`}
                  </text>
                  {u.status === 'booked' && (
                    <circle cx={pos.x + pos.width - 5} cy={pos.y + 5} r={3.5} fill="#ef5350" pointerEvents="none" />
                  )}
                </g>
              )
            })}

            {BLOCK_LABELS.map(({ block, x, y }) => (
              <g key={block} pointerEvents="none">
                <circle cx={x} cy={y} r={13} fill="#3b2f26" stroke="#fff" strokeWidth={2} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill="#fff" fontFamily="Inter, sans-serif" fontWeight="700">
                  {block}
                </text>
              </g>
            ))}

            <g transform="translate(960, 600)" pointerEvents="none">
              <circle r={18} fill="#fff" stroke="#d8d0c8" strokeWidth={0.75} />
              <text y={-6} textAnchor="middle" fontSize="7" fill="#7b6d5f" fontFamily="Inter, sans-serif">U</text>
              <text y={10} textAnchor="middle" fontSize="7" fill="#7b6d5f" fontFamily="Inter, sans-serif">S</text>
            </g>

            <text x={30} y={36} fontSize="16" fill="#8a6f45" fontFamily="Georgia, serif" fontWeight="600" pointerEvents="none">
              ATLAS ARCADIA
            </text>
          </svg>
        </div>

        {selectedUnit && (
          <div className="fixed inset-0 z-40 lg:static lg:z-auto lg:w-[400px] lg:shrink-0">
            <div className="absolute inset-0 bg-black/30 lg:hidden" onClick={() => setSelectedUnit(null)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-[400px] lg:relative lg:max-w-none">
              <UnitSitePlanPanel unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
            </div>
          </div>
        )}
      </div>

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
