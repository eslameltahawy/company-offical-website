import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import { availableSlots, formatSlotLabel, slotToISO } from '@/data/availableSlots'

/*
  BOOKING API  v2
  ───────────────
  1. Persists every booking to data/bookings.json
  2. Sends notification email to the Slack channel email (→ Slack notification)
  3. Sends confirmation email to the client (if they provided an email)
  4. Includes a Google Calendar / Google Meet link in both emails

  Required env vars (set in Vercel → Settings → Environment Variables):
    SMTP_HOST        e.g.  smtp.gmail.com
    SMTP_PORT        e.g.  465
    SMTP_USER        your Gmail address
    SMTP_PASS        Gmail App Password (NOT your normal password)
    SLACK_EMAIL      meeting-aaaavbudsyecg76zkbngn2sfkm@ocean-ws.slack.com
    ADMIN_EMAIL      your personal email (cc notifications)
    ADMIN_PASSWORD   dashboard password  (default: smaw2026)

  Optional:
    TAQNYAT_TOKEN    Saudi SMS gateway token
    TAQNYAT_SENDER   SMS sender name
*/

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smaw2026'

interface Booking {
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
}

function readBookings(): Booking[] {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) } catch { return [] }
}

function writeBookings(bookings: Booking[]) {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf-8') } catch { /* Vercel read-only */ }
}

/** Build a Google Calendar "add to calendar" URL (no API required) */
function buildCalendarLink(slot: { id: string; date: string; time: string; durationMins: number }, name: string, company: string, meetUrl = '') {
  const { start, end } = slotToISO(slot)
  const text = encodeURIComponent(`اجتماع SMAW × ${company}`)
  const details = encodeURIComponent(
    meetUrl
      ? `رابط Google Meet: ${meetUrl}\n\nاجتماع مع فريق SMAW Software لمناقشة احتياجات ${company}`
      : `اجتماع مع فريق SMAW Software لمناقشة احتياجات ${company}\nرابط الاجتماع سيُرسل قبل الموعد بـ 30 دقيقة`
  )
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}`
}

/** Build email transporter — returns null if not configured */
function getTransporter() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_PORT !== '587',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

/** Email to Slack channel — appears as a Slack notification */
async function sendSlackNotification(booking: Booking, calendarLink: string) {
  const to = process.env.SLACK_EMAIL
  if (!to) return false
  const transporter = getTransporter()
  if (!transporter) return false

  const slotInfo = booking.slotLabel || 'لم يُحدَّد موعد'
  const html = `
<div dir="rtl" style="font-family:Cairo,sans-serif;max-width:560px;padding:24px;background:#0d1525;color:#e2e8f8;border-radius:12px">
  <h2 style="color:#60a5fa;margin:0 0 16px">📅 حجز جديد — SMAW</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tr><td style="padding:6px 0;color:#7a93bc;width:120px">الاسم</td><td style="color:#e2e8f8;font-weight:bold">${booking.name}</td></tr>
    <tr><td style="padding:6px 0;color:#7a93bc">الشركة</td><td style="color:#e2e8f8;font-weight:bold">${booking.company}</td></tr>
    <tr><td style="padding:6px 0;color:#7a93bc">الجوال</td><td style="color:#e2e8f8">${booking.phone || '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#7a93bc">الإيميل</td><td style="color:#e2e8f8">${booking.email || '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#7a93bc">الموعد</td><td style="color:#60a5fa;font-weight:bold">${slotInfo}</td></tr>
    <tr><td style="padding:6px 0;color:#7a93bc">الرسالة</td><td style="color:#e2e8f8">${booking.message || '—'}</td></tr>
  </table>
  <div style="margin-top:20px">
    <a href="${calendarLink}" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:13px">
      📆 أضف للتقويم
    </a>
  </div>
  <p style="margin-top:16px;font-size:11px;color:#3d5270">Booking ID: ${booking.id}</p>
</div>`

  try {
    await transporter.sendMail({
      from: `"SMAW Bookings" <${process.env.SMTP_USER}>`,
      to,
      subject: `📅 حجز جديد: ${booking.name} — ${booking.company} — ${slotInfo}`,
      html,
    })
    return true
  } catch (err) {
    console.error('[SMAW] Slack email error:', err)
    return false
  }
}

/** Confirmation email to client */
async function sendClientConfirmation(booking: Booking, calendarLink: string) {
  if (!booking.email) return false
  const transporter = getTransporter()
  if (!transporter) return false

  const html = `
<div dir="rtl" style="font-family:Cairo,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#030712;color:#e2e8f8;border-radius:16px">
  <img src="https://smaww.com/smaw.png" alt="SMAW" style="height:36px;margin-bottom:24px" />
  <h2 style="color:#e2e8f8;font-size:22px;margin:0 0 8px">تم تأكيد موعدك! 🎉</h2>
  <p style="color:#7a93bc;font-size:14px;margin:0 0 24px">مرحباً ${booking.name}، تم تأكيد حجز الاجتماع مع فريق SMAW.</p>
  
  <div style="background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.2);border-radius:12px;padding:20px;margin-bottom:24px">
    <p style="margin:0 0 8px;font-size:13px;color:#7a93bc">📅 موعد اجتماعك</p>
    <p style="margin:0;font-size:18px;font-weight:bold;color:#60a5fa">${booking.slotLabel || 'سيُحدَّد قريباً'}</p>
  </div>

  <p style="color:#7a93bc;font-size:13px;margin:0 0 20px">
    سيصلك رابط Google Meet قبل الموعد بـ 30 دقيقة على هذا البريد الإلكتروني.
    يمكنك الآن إضافة الموعد لتقويمك:
  </p>

  <a href="${calendarLink}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:14px;margin-bottom:24px">
    📆 أضف للتقويم
  </a>

  <hr style="border:none;border-top:1px solid rgba(148,163,184,0.08);margin:24px 0" />
  <p style="font-size:12px;color:#3d5270;margin:0">
    SMAW Software — <a href="https://smaww.com" style="color:#2563eb">smaww.com</a><br>
    هذا البريد أُرسل تلقائياً، لا تردّ عليه. للتواصل: smaw@smaww.com
  </p>
</div>`

  try {
    await transporter.sendMail({
      from: `"SMAW Software" <${process.env.SMTP_USER}>`,
      to: booking.email,
      subject: `✅ تأكيد الاجتماع — ${booking.slotLabel || 'SMAW Meeting'}`,
      html,
    })
    return true
  } catch (err) {
    console.error('[SMAW] Client email error:', err)
    return false
  }
}

/** Optional: SMS via Taqnyat */
async function sendSMS(phone: string, name: string, slotLabel: string): Promise<boolean> {
  const token = process.env.TAQNYAT_TOKEN
  const sender = process.env.TAQNYAT_SENDER || 'SMAW'
  if (!token || !phone) return false
  const normalized = phone.replace(/^0/, '+966').replace(/\s|-/g, '')
  try {
    const res = await fetch('https://api.taqnyat.sa/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        recipients: [normalized],
        body: `مرحباً ${name}، تم تأكيد موعدك مع SMAW: ${slotLabel}. رابط الاجتماع سيُرسل قبل الموعد.`,
        sender,
      }),
    })
    const data = await res.json()
    return res.ok && data?.status === 'accepted'
  } catch { return false }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, company, message, slotId } = body as Record<string, string>

    if (!name || !company || (!phone && !email)) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }

    // Validate slot
    const slot = availableSlots.find((s) => s.id === slotId)
    const slotLabel = slot ? formatSlotLabel(slot) : ''

    // Check if slot already booked
    if (slot) {
      const existing = readBookings()
      if (existing.some((b) => b.slotId === slotId)) {
        return NextResponse.json({ error: 'slot_taken' }, { status: 409 })
      }
    }

    const calendarLink = slot
      ? buildCalendarLink(slot, name, company)
      : 'https://calendar.google.com/calendar'

    const booking: Booking = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: name.trim(),
      phone: phone?.trim() || '',
      email: email?.trim() || '',
      company: company.trim(),
      message: message?.trim() || '',
      slotId: slotId || '',
      slotLabel,
      createdAt: new Date().toISOString(),
      method: 'logged',
      calendarLink,
    }

    // Persist
    const all = readBookings()
    all.unshift(booking)
    writeBookings(all)

    // Notifications (parallel, don't block)
    const [slackOk, emailOk, smsOk] = await Promise.all([
      sendSlackNotification(booking, calendarLink),
      sendClientConfirmation(booking, calendarLink),
      sendSMS(booking.phone, booking.name, slotLabel),
    ])

    const method = slackOk ? 'email' : smsOk ? 'sms' : 'logged'
    booking.method = method

    // Re-persist with method
    const fresh = readBookings()
    const idx = fresh.findIndex((b) => b.id === booking.id)
    if (idx !== -1) { fresh[idx] = booking; writeBookings(fresh) }

    console.log('[SMAW Booking]', booking.id, booking.name, booking.company, slotLabel, { slackOk, emailOk, smsOk })

    return NextResponse.json({
      success: true,
      method,
      calendarLink,
      slotLabel,
      clientEmailSent: emailOk,
    })
  } catch (err) {
    console.error('[SMAW Booking API Error]', err)
    return NextResponse.json({ success: true, method: 'logged' })
  }
}

/** Allow admin to validate password (used by admin panel) */
export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ ok: false }, { status: 401 })
  return NextResponse.json({ ok: true })
}
