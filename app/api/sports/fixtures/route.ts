import { NextResponse } from 'next/server'
import { getTodayFixtures } from '@/lib/sports/adapter'
export const revalidate = 3600
export async function GET() {
  try {
    const fixtures = await getTodayFixtures()
    return NextResponse.json({ fixtures, updatedAt: new Date().toISOString() })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
