import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForTokens } from '@/lib/google-calendar'

/*
  This route receives the OAuth2 code from Google after the admin
  clicks "Allow" in the Google consent screen.
  It exchanges the code for tokens and shows the refresh token
  so the admin can copy it into Vercel env vars.
*/
export async function GET(req: NextRequest) {
  const code  = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin?gcal=error&msg=${encodeURIComponent(error)}`
    )
  }

  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin?gcal=error&msg=no_code`
    )
  }

  const tokens = await exchangeCodeForTokens(code)

  if (!tokens?.refresh_token) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin?gcal=error&msg=no_refresh_token`
    )
  }

  // Show the refresh token in the admin so user can copy it to Vercel
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin?gcal=success&rt=${encodeURIComponent(tokens.refresh_token)}`
  )
}
