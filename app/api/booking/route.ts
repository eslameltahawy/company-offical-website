import { NextRequest, NextResponse } from 'next/server'
import { availableSlots, formatSlotLabel } from '@/data/availableSlots'
import { addBooking, getBookings, isSlotBooked } from '@/lib/storage'
import { sendSlackNotification, sendClientConfirmation, sendAdminEmail, sendSMS } from '@/lib/notifications'
import { createCalendarEvent, isGoogleCalendarConfigured } from '@/lib/google-calendar'
import type { Booking } from '@/lib/types'

/*
  BOOKING API  v3
  ───────────────
  Flow:
    1. Validate input
    2. Check slot availability
    3. [Google Calendar] Create event with Meet link → send invite to attendees
    4. Save booking to KV / file
    5. Notify Slack (webhook)
    6. Send email to client (if email provided)
    7. SMS (optional)
*/

function buildCalendarUrl(slot: { date: string; time: string; durationMins: number } | undefined, name: string, company: string, meetLink = '') {
  if (!slot) return ''
  const startMs = new Date(`${slot.date}T${slot.time}:00+03:00`).getTime()
  const endMs = startMs + slot.durationMins * 60_000
  const fmt = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, '').replace('.000', '')
  const text = encodeURIComponent(`اجتماع SMAW × ${company}`)
  const details = encodeURIComponent(
    meetLink
      ? `رابط Google Meet: ${meetLink}`
      : `اجتماع مع فريق SMAW Software — ${company}`
  )
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${fmt(startMs)}/${fmt(endMs)}&details=${details}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, company, message, slotId } = body as Record<string, string>

    if (!name?.trim() || !company?.trim() || (!phone?.trim() && !email?.trim())) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }

    /* ── Find slot ──────────────────────────────────────────────── */
    const slot = availableSlots.find((s) => s.id === slotId)
    const slotLabel = slot ? formatSlotLabel(slot) : ''

    /* ── Check if slot already booked ─────────────────────────── */
    if (slot) {
      const existing = await getBookings()
      if (isSlotBooked(existing, slotId)) {
        return NextResponse.json({ error: 'slot_taken' }, { status: 409 })
      }
    }

    /* ── Create Google Calendar event with Meet ──────────────── */
    let meetLink = ''
    let gcalEventId = ''
    let htmlEventLink = ''

    if (slot && isGoogleCalendarConfigured()) {
      const startMs = new Date(`${slot.date}T${slot.time}:00+03:00`).getTime()
      const endMs   = startMs + slot.durationMins * 60_000

      const created = await createCalendarEvent({
        summary:        `اجتماع SMAW × ${company.trim()}`,
        description:    `طلب اجتماع من: ${name.trim()} — ${company.trim()}\nالجوال: ${phone || '—'}\nالإيميل: ${email || '—'}\nالرسالة: ${message || '—'}`,
        startISO:       new Date(startMs).toISOString(),
        endISO:         new Date(endMs).toISOString(),
        attendeeEmail:  email?.trim() || undefined,
        organizerEmail: process.env.GOOGLE_CALENDAR_ID,
      })

      if (created) {
        meetLink    = created.meetLink
        gcalEventId = created.eventId
        htmlEventLink = created.htmlLink
        console.log('[Google Calendar] event created:', gcalEventId, meetLink)
      }
    }

    const calendarLink = meetLink
      ? buildCalendarUrl(slot, name, company, meetLink)
      : buildCalendarUrl(slot, name, company)

    /* ── Save booking ────────────────────────────────────────── */
    const booking: Booking = {
      id:           Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name:         name.trim(),
      phone:        phone?.trim() || '',
      email:        email?.trim() || '',
      company:      company.trim(),
      message:      message?.trim() || '',
      slotId:       slotId || '',
      slotLabel,
      createdAt:    new Date().toISOString(),
      method:       'logged',
      meetLink,
      calendarLink,
      gcalEventId,
    }

    await addBooking(booking)

    /* ── Notifications (parallel) ────────────────────────────── */
    const [slackOk, clientEmailOk, , smsOk] = await Promise.all([
      sendSlackNotification(booking, meetLink),
      sendClientConfirmation(booking, meetLink, calendarLink),
      sendAdminEmail(booking, meetLink),
      sendSMS(booking.phone, booking.name, slotLabel),
    ])

    const method = slackOk ? 'email' : smsOk ? 'sms' : 'logged'
    console.log('[SMAW Booking]', booking.id, { slackOk, clientEmailOk, smsOk, meetLink: !!meetLink })

    return NextResponse.json({
      success:         true,
      method,
      meetLink,
      calendarLink,
      slotLabel,
      clientEmailSent: clientEmailOk,
      gcalCreated:     !!gcalEventId,
    })
  } catch (err) {
    console.error('[SMAW Booking API Error]', err)
    return NextResponse.json({ success: true, method: 'logged' })
  }
}
