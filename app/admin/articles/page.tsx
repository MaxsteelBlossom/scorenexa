'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Search, Loader2 } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  status: string
  category_name: string | null
  author_name: string | null
  views: number
  published_at: string | null
  is_breaking: boolean
  article_type: string
}

const statusColors: Record<string, string> = {
  published: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-slate-100 text-slate-500',
  scheduled: 'bg-blue-100 text-blue-700',
}

const categoryColors: Record<string, string> = {
  'News': 'bg-blue-100 text-blue-700',
  'Transfer News': 'bg-purple-100 text-purple-700',
  'Gossip': 'bg-orange-100 text-orange-700',
  'Match Report': 'bg-green-100 text-green-700',
  'Opinion': 'bg-slate-100 text-slate-600',
}

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const getHeaders = async () => {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const session = await supabase.auth.getSession()
    const token = session.data.session?.access_token || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    return {
      'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  const loadArticles = async () => {
    setLoading(true)
    try {
      const headers = await getHeaders()
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?select=id,title,slug,status,category_name,author_name,views,published_at,is_breaking,article_type&order=created_at.desc&limit=100`,
        { headers }
      )
      const data = await res.json()
      setArticles(Array.isArray(data) ? data : [])
    } catch { setArticles([]) }
    setLoading(false)
  }

  useEffect(() => { loadArticles() }, [])

  const deleteArticle = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const headers = await getHeaders()
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?id=eq.${id}`, {
      method: 'DELETE', headers
    })
    setArticles(a => a.filter(art => art.id !== id))
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    const headers = await getHeaders()
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?id=eq.${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        status: newStatus,
        published_at: newStatus === 'published' ? new Date().toISOString() : null
      })
    })
    setArticles(a => a.map(art => art.id === id ? { ...art, status: newStatus } : art))
  }

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>ARTICLES</h1>
          <p className="text-slate-400 text-sm">{articles.length} total articles</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href="/admin/articles/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all">
            <Plus size={15}/> News
          </Link>
          <Link href="/admin/articles/new?type=transfer" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all">
            <Plus size={15}/> Transfer
          </Link>
          <Link href="/admin/articles/new?type=gossip" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all">
            <Plus size={15}/> Gossip
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-white"/>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {[['all','All'],['published','Published'],['draft','Drafts']].map(([v,l]) => (
            <button key={v} onClick={() => setStatusFilter(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter===v?'bg-white text-slate-900 shadow-sm':'text-slate-500'}`}>
              {l}
            </button>
          ))}
        </div>
        <button onClick={loadArticles} className="p-2.5 border border-slate-200 bg-white rounded-xl text-slate-500 hover:text-slate-700 transition-all" title="Refresh">
          <Loader2 size={14} className={loading ? 'animate-spin' : ''}/>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 size={24} className="animate-spin text-slate-300 mx-auto mb-2"/>
            <p className="text-slate-400 text-sm">Loading articles...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">📝</div>
            <p className="font-bold text-slate-600 mb-1">{search ? 'No articles match your search' : 'No articles yet'}</p>
            <p className="text-slate-400 text-sm mb-4">Start publishing content to grow your site.</p>
            <Link href="/admin/articles/new" className="bg-[#E63946] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#c0303c] transition-all inline-block">
              ✏️ Write First Article
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                    <th className="pl-5 py-3 text-left">Title</th>
                    <th className="py-3 text-left hidden md:table-cell">Category</th>
                    <th className="py-3 text-center hidden sm:table-cell">Views</th>
                    <th className="py-3 text-center">Status</th>
                    <th className="py-3 text-left hidden lg:table-cell">Published</th>
                    <th className="pr-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(a => (
                    <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                      <td className="pl-5 py-3.5 pr-2 max-w-[280px]">
                        <div className="flex items-start gap-2">
                          {a.is_breaking && (
                            <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">BREAKING</span>
                          )}
                          <p className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug">{a.title}</p>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">{a.slug}</p>
                      </td>
                      <td className="py-3.5 hidden md:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[a.category_name||''] || 'bg-slate-100 text-slate-500'}`}>
                          {a.category_name || '—'}
                        </span>
                      </td>
                      <td className="py-3.5 text-center hidden sm:table-cell">
                        <span className="text-sm text-slate-500">{a.views > 0 ? a.views.toLocaleString() : '—'}</span>
                      </td>
                      <td className="py-3.5 text-center">
                        <button onClick={() => toggleStatus(a.id, a.status)}
                          title="Click to toggle status"
                          className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all hover:opacity-75 ${statusColors[a.status] || 'bg-slate-100 text-slate-500'}`}>
                          {a.status}
                        </button>
                      </td>
                      <td className="py-3.5 hidden lg:table-cell">
                        <span className="text-xs text-slate-400">
                          {a.published_at ? new Date(a.published_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—'}
                        </span>
                      </td>
                      <td className="pr-5 py-3.5">
                        <div className="flex items-center gap-1 justify-end">
                          <Link href={`/article/${a.slug}`} target="_blank"
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View live">
                            <Eye size={14}/>
                          </Link>
                          <Link href={`/admin/articles/${a.id}/edit`}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Edit">
                            <Edit size={14}/>
                          </Link>
                          <button onClick={() => deleteArticle(a.id, a.title)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                            <Trash2 size={14}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Showing {filtered.length} of {articles.length} articles</span>
              <span>{articles.filter(a=>a.status==='published').length} published · {articles.filter(a=>a.status==='draft').length} drafts</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
