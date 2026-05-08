import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let email = ''
    if (contentType.includes('application/json')) {
      const body = await req.json()
      email = body.email
    } else {
      const form = await req.formData()
      email = form.get('email') as string
    }
    if (!email || !email.includes('@')) return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    // TODO: supabase.from('newsletter_subscribers').upsert({ email })
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
