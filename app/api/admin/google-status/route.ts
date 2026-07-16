import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl, isGoogleCalendarConfigured } from '@/lib/google-calendar'
import { storageMode } from '@/lib/storage'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smaw2026'

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const authUrl = getGoogleAuthUrl()

  return NextResponse.json({
    configured:      isGoogleCalendarConfigured(),
    hasClientId:     !!process.env.GOOGLE_CLIENT_ID,
    hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
    hasCalendarId:   !!process.env.GOOGLE_CALENDAR_ID,
    hasSlackWebhook: !!process.env.SLACK_WEBHOOK_URL,
    hasSmtp:         !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS,
    storageMode:     storageMode(),
    hasKV:           !!process.env.KV_REST_API_URL,
    authUrl,
  })
}

/** POST — test Slack webhook */
export async function POST(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return NextResponse.json({ ok: false, error: 'SLACK_WEBHOOK_URL not set' })

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: '✅ اختبار من لوحة أدمن SMAW — الإشعارات تعمل بشكل صحيح!' }),
    })
    const text = await res.text()
    return NextResponse.json({ ok: res.ok, status: res.status, response: text })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) })
  }
}
