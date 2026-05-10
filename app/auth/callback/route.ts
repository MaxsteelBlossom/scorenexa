import { createServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')

  if (code) {
    const supabase = createServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Recovery = password reset
  if (type === 'recovery') {
    return NextResponse.redirect(new URL('/auth/reset-password', request.url))
  }

  // Magic link = go to admin
  if (type === 'magiclink') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.redirect(new URL('/', request.url))
}
