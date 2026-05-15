import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdSlot from '@/components/ui/AdSlot'
import { Clock, Eye, Share2, ChevronRight } from 'lucide-react'

async function getArticle(slug: string) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null
    const res = await fetch(
      `${url}/rest/v1/articles?slug=eq.${slug}&status=eq.published&limit=1`,
      { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }, next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data[0] || null
  } catch { return null }
}

async function getRelated(category: string, excludeSlug: string) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return []
    const res = await fetch(
      `${url}/rest/v1/articles?status=eq.published&category_name=eq.${encodeURIComponent(category)}&slug=neq.${excludeSlug}&order=published_at.desc&limit=3`,
      { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }, next: { revalidate: 300 } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Article Not Found' }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scorenexa.com'
  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.seo_description || article.excerpt || '',
      type: 'article',
      publishedTime: article.published_at || '',
      modifiedTime: article.updated_at,
      authors: article.author_name ? [article.author_name] : [],
      images: article.featured_image ? [{ url: article.featured_image, width: 1200, height: 630 }] : [],
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.seo_description || article.excerpt || '' },
    alternates: { canonical: `${siteUrl}/article/${article.slug}` },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const related = await getRelated(article.category_name || 'News', params.slug)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scorenexa.com'
  const articleUrl = `${siteUrl}/article/${article.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { '@type': 'Person', name: article.author_name || 'ScoreNexa' },
    publisher: { '@type': 'Organization', name: 'ScoreNexa', logo: { '@type': 'ImageObject', url: `${siteUrl}/favicon.svg` } },
    image: article.featured_image ? [article.featured_image] : [],
    keywords: article.tags?.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      <div className="bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <Link href="/" className="hover:text-[#E63946]">Home</Link>
            <ChevronRight size={12}/>
            <Link href="/news" className="hover:text-[#E63946]">News</Link>
            {article.category_name && <><ChevronRight size={12}/><span>{article.category_name}</span></>}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <div className="p-6 pb-0">
                  <div className="flex items-center gap-2 mb-3">
                    {article.is_breaking && <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse">BREAKING</span>}
                    {article.category_name && <span className="bg-[#E63946] text-white text-xs font-bold px-2 py-0.5 rounded">{article.category_name}</span>}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4" style={{fontFamily:'Oswald,sans-serif'}}>{article.title}</h1>
                  {article.excerpt && <p className="text-lg text-slate-600 leading-relaxed mb-4 border-l-4 border-[#E63946] pl-4 italic">{article.excerpt}</p>}
                  <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-t border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E63946] flex items-center justify-center text-white font-bold text-sm">{(article.author_name || 'S')[0]}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{article.author_name || 'ScoreNexa Staff'}</p>
                        <p className="text-xs text-slate-400">ScoreNexa Editorial</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock size={12}/>{article.published_at ? new Date(article.published_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : ''}</span>
                      {article.views > 0 && <span className="flex items-center gap-1"><Eye size={12}/>{Number(article.views).toLocaleString()} views</span>}
                    </div>
                  </div>
                </div>

                {article.featured_image && (
                  <div className="mx-6 mt-5">
                    <img src={article.featured_image} alt={article.title} className="w-full rounded-xl object-cover max-h-96"/>
                  </div>
                )}

                <div className="mx-6 mt-5">
                  <AdSlot position="in-article"/>
                </div>

                <div className="p-6">
                  <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }}/>

                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">Tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag: string) => (
                          <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="bg-slate-100 hover:bg-[#E63946]/10 hover:text-[#E63946] text-slate-600 text-xs px-3 py-1 rounded-full transition-colors">#{tag}</Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2"><Share2 size={14}/>Share this story</p>
                    <div className="flex gap-2">
                      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">𝕏 Share</a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">Share</a>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6"><AdSlot position="in-article"/></div>
              </div>

              {related.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-black text-slate-900 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>RELATED STORIES</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((r: any) => (
                      <Link key={r.id} href={`/article/${r.slug}`} className="bg-white rounded-xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md transition-all p-4 group">
                        {r.featured_image && <img src={r.featured_image} alt={r.title} className="w-full h-24 object-cover rounded-lg mb-3"/>}
                        <span className="text-[10px] text-[#E63946] font-bold uppercase">{r.category_name}</span>
                        <h3 className="text-sm font-black text-slate-800 group-hover:text-[#E63946] mt-1 leading-snug transition-colors" style={{fontFamily:'Oswald,sans-serif'}}>{r.title}</h3>
                        <p className="text-xs text-slate-400 mt-2">{r.published_at ? new Date(r.published_at).toLocaleDateString('en-GB') : ''}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            <aside className="space-y-6">
              <AdSlot position="sidebar"/>
              <div className="bg-white rounded-2xl border border-slate-100 p-4">
                <h3 className="font-black text-slate-800 mb-3 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>MORE STORIES</h3>
                <nav className="space-y-1">
                  {[['⚽ Latest News','/news'],['💼 Transfer News','/transfer-news'],['🔥 Gossip','/gossip'],['🔮 Predictions','/betting/predictions'],['📊 Live Scores','/live-scores']].map(([l,h]) => (
                    <Link key={h} href={h} className="flex items-center gap-2 py-2 px-3 text-sm text-slate-600 hover:text-[#E63946] rounded-lg transition-colors font-medium">{l}</Link>
                  ))}
                </nav>
              </div>
              <AdSlot position="sidebar"/>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
