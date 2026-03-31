import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

/*
  BOOKING API
  ───────────
  1. Persists every booking to data/bookings.json (always works, no config needed)
  2. Tries to send SMS via Taqnyat (Saudi SMS gateway) — optional
     Requires env: TAQNYAT_TOKEN, TAQNYAT_SENDER
  3. If SMS fails, still returns 200 so the UX is never blocked.

  Admin dashboard: /admin  (password from env ADMIN_PASSWORD, default: smaw2026)
*/

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json')

function readBookings(): Booking[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeBookings(bookings: Booking[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf-8')
}

interface Booking {
  id: string
  name: string
  phone: string
  email: string
  company: string
  message: string
  createdAt: string
  method: string
}

async function sendSMS(phone: string, name: string): Promise<boolean> {
  const token  = process.env.TAQNYAT_TOKEN
  const sender = process.env.TAQNYAT_SENDER || 'SMAW'
  if (!token) return false

  const normalized = phone.replace(/^0/, '+966').replace(/\s|-/g, '')

  try {
    const res = await fetch('https://api.taqnyat.sa/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        recipients: [normalized],
        body: `مرحباً ${name}، تم استلام طلب حجز العرض من سماو. سيتواصل معك فريقنا قريباً. شكراً لاهتمامك!`,
        sender,
      }),
    })
    const data = await res.json()
    return res.ok && data?.status === 'accepted'
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, company, message } = body as Record<string, string>

    if (!name || !company || (!phone && !email)) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }

    let smsSent = false

    if (phone) {
      smsSent = await sendSMS(phone, name)
    }

    // Always persist booking to file
    const booking: Booking = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: name.trim(),
      phone: phone?.trim() || '',
      email: email?.trim() || '',
      company: company.trim(),
      message: message?.trim() || '',
      createdAt: new Date().toISOString(),
      method: smsSent ? 'sms' : 'logged',
    }

    const all = readBookings()
    all.unshift(booking) // newest first
    writeBookings(all)

    console.log('[SMAW Booking]', booking.id, booking.name, booking.company)

    return NextResponse.json({
      success: true,
      method: smsSent ? 'sms' : 'logged',
    })
  } catch (err) {
    console.error('[SMAW Booking API Error]', err)
    return NextResponse.json({ success: true, method: 'logged' })
  }
}
