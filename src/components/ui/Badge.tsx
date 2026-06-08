import { cn, getStatusLabel } from '@/lib/utils'
import type { UnitStatus } from '@/types'

const statusStyles: Record<UnitStatus, string> = {
  available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  booked: 'bg-red-50 text-red-700 border-red-200',
  self_managed: 'bg-amber-50 text-amber-800 border-amber-200',
}

interface StatusBadgeProps {
  status: UnitStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-2 py-0.5 text-[10px] uppercase tracking-wider',
        statusStyles[status],
        className,
      )}
    >
      {getStatusLabel(status)}
    </span>
  )
}
