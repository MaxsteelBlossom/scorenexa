'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

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

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const supabase = createClient()

  useEffect(() => { loadArticles() }, [])

  const loadArticles = async () => {
    setLoading(true)
    let query = supabase.from('articles').select('id,title,slug,status,category_name,author_name,views,published_at,is_breaking,article_type').order('created_at', { ascending: false }).limit(50)
    const { data } = await query
    setArticles((data as Article[]) || [])
    setLoading(false)
  }

  const deleteArticle = async (id: string) => {
    if (!confirm('Delete this article? This cannot be undone.')) return
    await supabase.from('articles').delete().eq('id', id)
    setArticles(a => a.filter(article => article.id !== id))
  }

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>ARTICLES</h1>
        <div className="flex gap-2">
          {[['News','/admin/articles/new?type=news','bg-blue-600'],['Transfer','/admin/articles/new?type=transfer','bg-purple-600'],['Gossip','/admin/articles/new?type=gossip','bg-orange-500']].map(([l,h,c]) => (
            <Link key={h} href={h} className={`${c} hover:opacity-90 text-white px-3 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1`}>
              <Plus size={13}/>{l}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-white"/>
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E63946]">
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading articles...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">📝</div>
            <p className="font-bold text-slate-600 mb-1">No articles found</p>
            <p className="text-slate-400 text-sm mb-4">Start publishing content to grow your site.</p>
            <Link href="/admin/articles/new" className="bg-[#E63946] text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-[#c0303c] transition-all">Write First Article</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                  <th className="pl-5 py-3 text-left">Title</th>
                  <th className="py-3 text-left hidden md:table-cell">Category</th>
                  <th className="py-3 text-center hidden sm:table-cell">Views</th>
                  <th className="py-3 text-center">Status</th>
                  <th className="py-3 text-left hidden md:table-cell">Published</th>
                  <th className="pr-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="pl-5 py-3.5 pr-2">
                      <div className="flex items-center gap-2">
                        {a.is_breaking && <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0">BREAKING</span>}
                        <p className="font-bold text-slate-800 text-sm line-clamp-1">{a.title}</p>
                      </div>
                    </td>
                    <td className="py-3.5 hidden md:table-cell">
                      <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{a.category_name || '—'}</span>
                    </td>
                    <td className="py-3.5 text-center hidden sm:table-cell text-sm text-slate-500">{a.views > 0 ? a.views.toLocaleString() : '—'}</td>
                    <td className="py-3.5 text-center">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${statusColors[a.status] || 'bg-slate-100 text-slate-500'}`}>{a.status}</span>
                    </td>
                    <td className="py-3.5 hidden md:table-cell text-xs text-slate-400">{a.published_at ? new Date(a.published_at).toLocaleDateString('en-GB') : '—'}</td>
                    <td className="pr-5 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/article/${a.slug}`} target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors p-1"><Eye size={14}/></Link>
                        <Link href={`/admin/articles/${a.id}/edit`} className="text-slate-400 hover:text-emerald-600 transition-colors p-1"><Edit size={14}/></Link>
                        <button onClick={() => deleteArticle(a.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
              Showing {filtered.length} of {articles.length} articles
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
