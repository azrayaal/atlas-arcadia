import type { BookingLead } from '@/types'

export const bookingLeads: BookingLead[] = []

export function createBookingLead(data: Omit<BookingLead, 'id' | 'createdAt' | 'status'>): BookingLead {
  const lead: BookingLead = {
    ...data,
    id: `bk-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
  }
  bookingLeads.push(lead)
  return lead
}
