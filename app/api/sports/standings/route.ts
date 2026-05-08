import { NextResponse } from 'next/server'
import { getStandings } from '@/lib/sports/adapter'
export const revalidate = 600
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const leagueId = parseInt(searchParams.get('league') || '39')
    const standings = await getStandings(leagueId)
    return NextResponse.json({ standings, updatedAt: new Date().toISOString() })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
