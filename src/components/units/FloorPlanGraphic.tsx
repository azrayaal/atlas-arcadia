import type { UnitType } from '@/types'

interface FloorPlanGraphicProps {
  type: UnitType
  className?: string
}

export function FloorPlanGraphic({ type, className }: FloorPlanGraphicProps) {
  if (type === 'Premium') return <PremiumPlan className={className} />
  if (type === 'Corner') return <CornerPlan className={className} />
  return <StandardPlan className={className} />
}

function StandardPlan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="240" fill="#fafaf8" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="8" y="8" width="200" height="140" fill="#f0ede8" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="108" y="82" textAnchor="middle" fontSize="11" fill="#6b6b6b">Kamar Tidur</text>
      <rect x="216" y="8" width="80" height="80" fill="#e8e4de" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="256" y="52" textAnchor="middle" fontSize="10" fill="#6b6b6b">KM</text>
      <rect x="8" y="156" width="288" height="76" fill="#f5f2ed" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="152" y="200" textAnchor="middle" fontSize="11" fill="#6b6b6b">Ruang Tamu</text>
      <rect x="304" y="8" width="168" height="224" fill="#ebe7e0" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="388" y="124" textAnchor="middle" fontSize="11" fill="#6b6b6b">Teras</text>
      <text x="400" y="228" textAnchor="end" fontSize="8" fill="#bbb">12×6 m · 72 m²</text>
    </svg>
  )
}

function CornerPlan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="320" fill="#fafaf8" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="8" y="8" width="180" height="140" fill="#f0ede8" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="98" y="82" textAnchor="middle" fontSize="11" fill="#6b6b6b">Kamar 1</text>
      <rect x="8" y="156" width="180" height="140" fill="#f0ede8" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="98" y="232" textAnchor="middle" fontSize="11" fill="#6b6b6b">Kamar 2</text>
      <rect x="196" y="8" width="100" height="100" fill="#e8e4de" stroke="#1a1a1a" strokeWidth="1.5" />
      <rect x="196" y="116" width="196" height="120" fill="#f5f2ed" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="294" y="182" textAnchor="middle" fontSize="11" fill="#6b6b6b">Ruang Tamu</text>
      <rect x="304" y="8" width="168" height="100" fill="#f5f2ed" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="388" y="62" textAnchor="middle" fontSize="10" fill="#6b6b6b">Ruang Kerja</text>
      <text x="470" y="312" textAnchor="end" fontSize="8" fill="#bbb">~96 m²</text>
    </svg>
  )
}

function PremiumPlan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 400" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="560" height="400" fill="#fafaf8" stroke="#1a1a1a" strokeWidth="2" />
      <rect x="8" y="8" width="200" height="160" fill="#f0ede8" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="108" y="92" textAnchor="middle" fontSize="11" fill="#6b6b6b">Kamar Utama</text>
      <rect x="8" y="176" width="160" height="140" fill="#f0ede8" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="88" y="252" textAnchor="middle" fontSize="11" fill="#6b6b6b">Kamar 2</text>
      <rect x="8" y="324" width="160" height="68" fill="#f0ede8" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="88" y="364" textAnchor="middle" fontSize="10" fill="#6b6b6b">Kamar 3</text>
      <rect x="216" y="116" width="200" height="140" fill="#f5f2ed" stroke="#1a1a1a" strokeWidth="1.5" />
      <text x="316" y="192" textAnchor="middle" fontSize="11" fill="#6b6b6b">Ruang Keluarga</text>
      <rect x="424" y="8" width="128" height="384" fill="#e5e0d8" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="488" y="204" textAnchor="middle" fontSize="11" fill="#6b6b6b">Teras</text>
      <text x="550" y="392" textAnchor="end" fontSize="8" fill="#bbb">100–134 m²</text>
    </svg>
  )
}
