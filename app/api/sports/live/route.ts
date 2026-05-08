import { NextResponse } from 'next/server'
import { getLiveMatches } from '@/lib/sports/adapter'
export const revalidate = 60
export async function GET() {
  try {
    const matches = await getLiveMatches()
    return NextResponse.json({ matches, updatedAt: new Date().toISOString() })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
