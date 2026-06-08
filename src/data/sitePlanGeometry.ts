import type { SitePlanUnitPosition } from '@/types'

/** SVG canvas — cukup lebar agar blok tidak saling tumpang tindih */
export const SITE_PLAN_VIEWBOX = { width: 1060, height: 640 }

const UW = 48
const UH = 26
const GAP = 6
const STEP_X = UW + GAP
const STEP_Y = UH + GAP

function unit(
  block: string,
  number: number,
  x: number,
  y: number,
): SitePlanUnitPosition {
  return {
    unitId: `${block.toLowerCase()}${number}`,
    x,
    y,
    width: UW,
    height: UH,
  }
}

function hRow(block: string, y: number, xStart: number, numbers: number[]): SitePlanUnitPosition[] {
  return numbers.map((n, i) => unit(block, n, xStart + i * STEP_X, y))
}

function vCol(block: string, x: number, yStart: number, numbers: number[]): SitePlanUnitPosition[] {
  return numbers.map((n, i) => unit(block, n, x, yStart + i * STEP_Y))
}

export function buildSitePlanGeometry(): SitePlanUnitPosition[] {
  const p: SitePlanUnitPosition[] = []

  // Blok F — kolom kiri (6 unit)
  p.push(...vCol('F', 36, 210, [1, 2, 3, 4, 5, 6]))

  // Blok C — atas tengah, 2 baris
  p.push(...hRow('C', 78, 248, [9, 10, 11, 12, 13, 14, 15, 16]))
  p.push(...hRow('C', 116, 248, [8, 7, 6, 5, 4, 3, 2, 1]))

  // Blok D — tengah, 2 baris × 10
  p.push(...hRow('D', 268, 188, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]))
  p.push(...hRow('D', 304, 188, [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]))

  // Blok B — kanan tengah, 2 kolom
  p.push(...vCol('B', 724, 158, [1, 2, 3, 4, 5, 6, 7, 8]))
  p.push(...vCol('B', 668, 158, [16, 15, 14, 13, 12, 11, 10, 9]))

  // Blok A — kolom kanan (16 unit)
  p.push(...vCol('A', 848, 72, Array.from({ length: 16 }, (_, i) => i + 1)))

  // Blok E — bawah tengah (5 unit)
  p.push(...hRow('E', 548, 368, [5, 4, 3, 2, 1]))

  return p
}

export const SITE_PLAN_POSITIONS = buildSitePlanGeometry()

export const SITE_LANDMARKS = {
  mainRoad: { x: 0, y: 0, w: 1060, h: 48 },
  clubhouse: { x: 300, y: 430, w: 196, h: 64 },
  pos: { x: 900, y: 12, w: 52, h: 36 },
} as const

export const BLOCK_LABELS = [
  { block: 'F', x: 60, y: 198 },
  { block: 'C', x: 248, y: 62 },
  { block: 'D', x: 188, y: 252 },
  { block: 'B', x: 668, y: 142 },
  { block: 'A', x: 848, y: 56 },
  { block: 'E', x: 368, y: 536 },
] as const

export const TREE_POSITIONS: [number, number][] = [
  [150, 320], [520, 200], [600, 400], [180, 480], [780, 480],
  [960, 300], [120, 160], [420, 380], [820, 560], [640, 260],
]

export const ROAD_SEGMENTS = [
  { x: 120, y: 200, w: 520, h: 14 },
  { x: 120, y: 360, w: 480, h: 14 },
  { x: 640, y: 140, w: 14, h: 280 },
  { x: 180, y: 140, w: 14, h: 200 },
  { x: 900, y: 48, w: 80, h: 14 },
] as const
