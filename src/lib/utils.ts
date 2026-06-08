import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `Rp ${(amount / 1_000_000).toFixed(1)}M`
  }
  return `Rp ${amount.toLocaleString('id-ID')}`
}

export function formatArea(sqm: number): string {
  return `${sqm.toFixed(sqm % 1 === 0 ? 0 : 2)} m²`
}

export function getUnitLabel(block: string, number: number): string {
  return `Unit ${block}-${String(number).padStart(2, '0')}`
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    available: 'Tersedia',
    booked: 'Terbooking',
    self_managed: 'Self Managed',
  }
  return labels[status] ?? status
}
