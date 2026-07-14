export interface Booking {
  id: string
  name: string
  phone: string
  email: string
  company: string
  message: string
  slotId: string
  slotLabel: string
  createdAt: string
  method: string
  meetLink?: string
  calendarLink?: string
  gcalEventId?: string
}
