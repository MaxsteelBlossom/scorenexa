// Sports API Adapter - provider-agnostic system
const PROVIDER = process.env.SPORTS_PROVIDER || 'mock'
const API_KEY = process.env.API_FOOTBALL_KEY || ''
const API_HOST = process.env.API_FOOTBALL_HOST || 'v3.football.api-sports.io'

export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  status: string
  minute: number | null
  kickoffTime: string
  league: string
  homeTeamLogo: string
  awayTeamLogo: string
  venue: string
}

export interface Standing {
  position: number
  team: string
  teamLogo: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
  gd: number
  points: number
  form: string
}

export interface Fixture {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamLogo: string
  awayTeamLogo: string
  kickoffTime: string
  league: string
  venue: string
}

// Mock data for development / no API key
const mockLiveMatches: Match[] = [
  { id: '1', homeTeam: 'Manchester United', awayTeam: 'Arsenal', homeScore: 1, awayScore: 2, status: 'LIVE', minute: 67, kickoffTime: new Date().toISOString(), league: 'Premier League', homeTeamLogo: '', awayTeamLogo: '', venue: 'Old Trafford' },
  { id: '2', homeTeam: 'Barcelona', awayTeam: 'Real Madrid', homeScore: 0, awayScore: 0, status: 'LIVE', minute: 34, kickoffTime: new Date().toISOString(), league: 'La Liga', homeTeamLogo: '', awayTeamLogo: '', venue: 'Camp Nou' },
  { id: '3', homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', homeScore: 3, awayScore: 1, status: 'FT', minute: 90, kickoffTime: new Date(Date.now() - 7200000).toISOString(), league: 'Bundesliga', homeTeamLogo: '', awayTeamLogo: '', venue: 'Allianz Arena' },
  { id: '4', homeTeam: 'PSG', awayTeam: 'Lyon', homeScore: null, awayScore: null, status: 'NS', minute: null, kickoffTime: new Date(Date.now() + 3600000).toISOString(), league: 'Ligue 1', homeTeamLogo: '', awayTeamLogo: '', venue: 'Parc des Princes' },
  { id: '5', homeTeam: 'Liverpool', awayTeam: 'Chelsea', homeScore: 2, awayScore: 2, status: 'FT', minute: 90, kickoffTime: new Date(Date.now() - 86400000).toISOString(), league: 'Premier League', homeTeamLogo: '', awayTeamLogo: '', venue: 'Anfield' },
]

const mockStandings: Standing[] = [
  { position: 1, team: 'Manchester City', teamLogo: '', played: 28, won: 20, drawn: 5, lost: 3, gf: 62, ga: 28, gd: 34, points: 65, form: 'WWWDW' },
  { position: 2, team: 'Arsenal', teamLogo: '', played: 28, won: 18, drawn: 6, lost: 4, gf: 68, ga: 26, gd: 42, points: 60, form: 'WWWWW' },
  { position: 3, team: 'Liverpool', teamLogo: '', played: 28, won: 18, drawn: 4, lost: 6, gf: 70, ga: 38, gd: 32, points: 58, form: 'WDWWL' },
  { position: 4, team: 'Aston Villa', teamLogo: '', played: 28, won: 17, drawn: 4, lost: 7, gf: 64, ga: 44, gd: 20, points: 55, form: 'WLWWW' },
  { position: 5, team: 'Tottenham', teamLogo: '', played: 28, won: 14, drawn: 6, lost: 8, gf: 52, ga: 44, gd: 8, points: 48, form: 'WDLWW' },
  { position: 6, team: 'Chelsea', teamLogo: '', played: 28, won: 12, drawn: 7, lost: 9, gf: 54, ga: 47, gd: 7, points: 43, form: 'DLWDW' },
  { position: 7, team: 'Newcastle', teamLogo: '', played: 28, won: 12, drawn: 6, lost: 10, gf: 58, ga: 52, gd: 6, points: 42, form: 'WWLLD' },
  { position: 8, team: 'Manchester United', teamLogo: '', played: 28, won: 11, drawn: 5, lost: 12, gf: 28, ga: 40, gd: -12, points: 38, form: 'LWDLW' },
]

async function fetchApiFootball(endpoint: string) {
  const res = await fetch(`https://${API_HOST}/${endpoint}`, {
    headers: { 'x-apisports-key': API_KEY },
    next: { revalidate: 60 }
  })
  return res.json()
}

export async function getLiveMatches(): Promise<Match[]> {
  if (PROVIDER === 'mock' || !API_KEY) return mockLiveMatches.filter(m => m.status === 'LIVE')

  try {
    const data = await fetchApiFootball('fixtures?live=all')
    return data.response?.map((f: any) => ({
      id: String(f.fixture.id),
      homeTeam: f.teams.home.name,
      awayTeam: f.teams.away.name,
      homeScore: f.goals.home,
      awayScore: f.goals.away,
      status: f.fixture.status.short,
      minute: f.fixture.status.elapsed,
      kickoffTime: f.fixture.date,
      league: f.league.name,
      homeTeamLogo: f.teams.home.logo,
      awayTeamLogo: f.teams.away.logo,
      venue: f.fixture.venue?.name || '',
    })) || []
  } catch { return [] }
}

export async function getTodayFixtures(): Promise<Match[]> {
  if (PROVIDER === 'mock' || !API_KEY) return mockLiveMatches

  try {
    const today = new Date().toISOString().split('T')[0]
    const data = await fetchApiFootball(`fixtures?date=${today}`)
    return data.response?.map((f: any) => ({
      id: String(f.fixture.id),
      homeTeam: f.teams.home.name,
      awayTeam: f.teams.away.name,
      homeScore: f.goals.home,
      awayScore: f.goals.away,
      status: f.fixture.status.short,
      minute: f.fixture.status.elapsed,
      kickoffTime: f.fixture.date,
      league: f.league.name,
      homeTeamLogo: f.teams.home.logo,
      awayTeamLogo: f.teams.away.logo,
      venue: f.fixture.venue?.name || '',
    })) || []
  } catch { return mockLiveMatches }
}

export async function getStandings(leagueApiId = 39): Promise<Standing[]> {
  if (PROVIDER === 'mock' || !API_KEY) return mockStandings

  try {
    const season = new Date().getFullYear()
    const data = await fetchApiFootball(`standings?league=${leagueApiId}&season=${season}`)
    const standings = data.response?.[0]?.league?.standings?.[0] || []
    return standings.map((s: any) => ({
      position: s.rank,
      team: s.team.name,
      teamLogo: s.team.logo,
      played: s.all.played,
      won: s.all.win,
      drawn: s.all.draw,
      lost: s.all.lose,
      gf: s.all.goals.for,
      ga: s.all.goals.against,
      gd: s.goalsDiff,
      points: s.points,
      form: s.form || '',
    }))
  } catch { return mockStandings }
}
