export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; username: string | null; full_name: string | null; avatar_url: string | null; is_premium: boolean; is_admin: boolean; created_at: string }
        Insert: { id: string; username?: string | null; full_name?: string | null; avatar_url?: string | null; is_premium?: boolean; is_admin?: boolean }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      articles: {
        Row: { id: string; title: string; slug: string; excerpt: string | null; content: string; category_id: string | null; category_name: string | null; featured_image: string | null; author_id: string | null; author_name: string | null; published_at: string | null; updated_at: string; seo_title: string | null; seo_description: string | null; is_breaking: boolean; status: string; tags: string[] | null; views: number; article_type: string }
        Insert: { id?: string; title: string; slug: string; excerpt?: string | null; content: string; category_id?: string | null; category_name?: string | null; featured_image?: string | null; author_id?: string | null; author_name?: string | null; published_at?: string | null; updated_at?: string; seo_title?: string | null; seo_description?: string | null; is_breaking?: boolean; status?: string; tags?: string[] | null; views?: number; article_type?: string }
        Update: Partial<Database['public']['Tables']['articles']['Insert']>
      }
      categories: {
        Row: { id: string; name: string; slug: string; description: string | null; color: string | null; created_at: string }
        Insert: { id?: string; name: string; slug: string; description?: string | null; color?: string | null }
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      teams: {
        Row: { id: string; name: string; slug: string; logo_url: string | null; country: string | null; league_id: string | null; founded: number | null; stadium: string | null; description: string | null; api_id: number | null }
        Insert: { id?: string; name: string; slug: string; logo_url?: string | null; country?: string | null; league_id?: string | null; founded?: number | null; stadium?: string | null; description?: string | null; api_id?: number | null }
        Update: Partial<Database['public']['Tables']['teams']['Insert']>
      }
      leagues: {
        Row: { id: string; name: string; slug: string; country: string | null; logo_url: string | null; season: number | null; api_id: number | null; description: string | null }
        Insert: { id?: string; name: string; slug: string; country?: string | null; logo_url?: string | null; season?: number | null; api_id?: number | null; description?: string | null }
        Update: Partial<Database['public']['Tables']['leagues']['Insert']>
      }
      matches: {
        Row: { id: string; provider: string; provider_match_id: string; league_id: string | null; home_team_id: string | null; away_team_id: string | null; kickoff_time: string; status: string; home_score: number | null; away_score: number | null; minute: number | null; home_team_name: string; away_team_name: string; league_name: string; home_team_logo: string | null; away_team_logo: string | null; venue: string | null }
        Insert: { id?: string; provider: string; provider_match_id: string; league_id?: string | null; home_team_id?: string | null; away_team_id?: string | null; kickoff_time: string; status: string; home_score?: number | null; away_score?: number | null; minute?: number | null; home_team_name: string; away_team_name: string; league_name: string; home_team_logo?: string | null; away_team_logo?: string | null; venue?: string | null }
        Update: Partial<Database['public']['Tables']['matches']['Insert']>
      }
      ad_slots: {
        Row: { id: string; name: string; position: string; code: string | null; is_active: boolean; created_at: string }
        Insert: { id?: string; name: string; position: string; code?: string | null; is_active?: boolean }
        Update: Partial<Database['public']['Tables']['ad_slots']['Insert']>
      }
      newsletter_subscribers: {
        Row: { id: string; email: string; created_at: string; is_active: boolean }
        Insert: { id?: string; email: string; is_active?: boolean }
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
