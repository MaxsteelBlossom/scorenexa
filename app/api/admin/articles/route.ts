import { NextResponse } from 'next/server'
export async function GET() { return NextResponse.json({ articles: [], total: 0 }) }
export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.title || !body.slug || !body.content)
      return NextResponse.json({ error: 'title, slug and content required' }, { status: 400 })
    // TODO: supabase.from('articles').insert({...body})
    return NextResponse.json({ success: true, id: 'placeholder' }, { status: 201 })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
