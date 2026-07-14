/*
  GOOGLE CALENDAR + MEET INTEGRATION
  ─────────────────────────────────────
  Required env vars (add in Vercel → Settings → Environment Variables):
    GOOGLE_CLIENT_ID        from Google Cloud Console → APIs → Credentials
    GOOGLE_CLIENT_SECRET    from Google Cloud Console → APIs → Credentials
    GOOGLE_REFRESH_TOKEN    obtained via /admin → "إعداد Google Calendar"
    GOOGLE_CALENDAR_ID      usually your Gmail address (e.g. me@gmail.com)
    NEXT_PUBLIC_BASE_URL    your site URL (e.g. https://smaww.com)

  Setup steps:
    1. Go to https://console.cloud.google.com
    2. Create project → Enable "Google Calendar API"
    3. Credentials → Create OAuth2 client (Web Application)
    4. Add authorized redirect URI: https://your-site.com/api/admin/google-callback
    5. Copy Client ID + Client Secret → add to Vercel env vars
    6. Go to /admin → "إعداد Google Calendar" → follow the wizard
*/

import { google, calendar_v3 } from 'googleapis'

function getOAuth2Client() {
  const clientId     = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri  = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/google-callback`

  if (!clientId || !clientSecret) return null

  const oauth2 = new google.auth.OAuth2(clientId, clientSecret, redirectUri)

  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
  if (refreshToken) {
    oauth2.setCredentials({ refresh_token: refreshToken })
  }

  return oauth2
}

/** Generate the Google OAuth consent URL (shown to admin once during setup) */
export function getGoogleAuthUrl(): string | null {
  const oauth2 = getOAuth2Client()
  if (!oauth2) return null

  return oauth2.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  })
}

/** Exchange code for tokens (called after OAuth redirect) */
export async function exchangeCodeForTokens(code: string): Promise<{
  refresh_token: string
  access_token: string
} | null> {
  const oauth2 = getOAuth2Client()
  if (!oauth2) return null
  try {
    const { tokens } = await oauth2.getToken(code)
    return {
      refresh_token: tokens.refresh_token ?? '',
      access_token: tokens.access_token ?? '',
    }
  } catch (err) {
    console.error('[Google OAuth] token exchange error:', err)
    return null
  }
}

export interface CreateEventParams {
  summary: string       // Event title (Arabic)
  description: string   // Event description
  startISO: string      // UTC ISO string for start time
  endISO: string        // UTC ISO string for end time
  attendeeEmail?: string // Client email to invite
  organizerEmail?: string // Admin email (calendar owner)
}

export interface CreatedEvent {
  eventId: string
  meetLink: string
  htmlLink: string // Google Calendar event link
}

/** Create a Google Calendar event with Meet conferencing */
export async function createCalendarEvent(
  params: CreateEventParams
): Promise<CreatedEvent | null> {
  const oauth2 = getOAuth2Client()
  if (!oauth2 || !process.env.GOOGLE_REFRESH_TOKEN) return null

  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary'

  const calendar = google.calendar({ version: 'v3', auth: oauth2 })

  const attendees: calendar_v3.Schema$EventAttendee[] = []
  if (params.attendeeEmail) attendees.push({ email: params.attendeeEmail })

  const event: calendar_v3.Schema$Event = {
    summary: params.summary,
    description: params.description,
    start: { dateTime: params.startISO, timeZone: 'Asia/Riyadh' },
    end:   { dateTime: params.endISO,   timeZone: 'Asia/Riyadh' },
    attendees,
    conferenceData: {
      createRequest: {
        requestId: `smaw-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
    guestsCanModifyEvent: false,
    sendUpdates: 'all', // sends invite to attendees automatically
  }

  try {
    const res = await calendar.events.insert({
      calendarId,
      conferenceDataVersion: 1,
      sendNotifications: true,
      requestBody: event,
    })

    const data = res.data
    const meetLink = data.conferenceData?.entryPoints?.find(
      (e) => e.entryPointType === 'video'
    )?.uri ?? ''

    return {
      eventId:  data.id ?? '',
      meetLink,
      htmlLink: data.htmlLink ?? '',
    }
  } catch (err) {
    console.error('[Google Calendar] event creation error:', err)
    return null
  }
}

/** Check if Google Calendar is fully configured */
export function isGoogleCalendarConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  )
}
