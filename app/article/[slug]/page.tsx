import type { Metadata } from 'next'
import Link from 'next/link'
import AdSlot from '@/components/ui/AdSlot'
import { formatDate, timeAgo } from '@/lib/utils'
import { Clock, Eye, Share2, Twitter, Facebook, ChevronRight } from 'lucide-react'

// Mock article data - replace with Supabase fetch by slug
const MOCK_ARTICLE = {
  id: '1',
  title: 'Mbappé Set for Shock Return to PSG as Real Madrid Talks Collapse',
  slug: 'mbappe-shock-return-psg-real-madrid',
  excerpt: 'Sources close to the French superstar reveal that negotiations with Real Madrid have broken down completely over image rights.',
  content: `
    <p>In a stunning development that has sent shockwaves through the football world, Kylian Mbappé is reportedly considering a sensational return to Paris Saint-Germain after negotiations with Real Madrid over image rights broke down in spectacular fashion late last week.</p>
    <p>Sources close to the 25-year-old French international have confirmed to ScoreNexa that the breakdown in talks is more serious than initially reported, with both parties struggling to reach agreement on commercial usage of Mbappé's likeness — a clause the player had long considered non-negotiable before his free transfer to the Bernabéu.</p>
    <h2>What Went Wrong?</h2>
    <p>According to multiple insiders within the Real Madrid hierarchy, tensions had been building since September when the club attempted to renegotiate certain clauses in Mbappé's initial agreement. The player's camp viewed this as a breach of the original terms and have been exploring alternatives ever since.</p>
    <p>PSG president Nasser Al-Khelaifi is understood to have reached out directly to Mbappé's mother — who serves as his primary agent — three times in the past fortnight, with the latest conversation described as "constructive and positive" by those with knowledge of the discussions.</p>
    <blockquote>"Kylian never truly settled in Madrid. The language barrier was one thing, but it was the commercial restrictions that really got under his skin. He felt his identity was being controlled," a source told ScoreNexa.</blockquote>
    <h2>PSG's Financial Muscle</h2>
    <p>The Parisian club, backed by Qatari investment, are said to be willing to offer a package worth in excess of €200 million over three years — a figure that would dwarf his current Real Madrid contract. More crucially, PSG are prepared to give Mbappé near-total control over his image rights, the sticking point that ultimately derailed the initial Madrid deal.</p>
    <p>French media have also reported that President Macron's government has quietly encouraged Mbappé to consider remaining in Ligue 1, viewing his presence as vital to the profile of French football on the world stage.</p>
    <h2>Real Madrid's Response</h2>
    <p>A Real Madrid spokesperson declined to comment when contacted by ScoreNexa on Sunday, but club insiders played down the reports, with one source calling the speculation "noise from an agent trying to manufacture leverage."</p>
    <p>Carlo Ancelotti is understood to have spoken personally with Mbappé on Saturday, reassuring him of his central role in the club's plans for the upcoming Champions League knockout stages.</p>
    <p>Whether those assurances will be enough remains to be seen. What is certain is that one of football's most dramatic transfer sagas is far from over — and the next chapter promises to be as extraordinary as everything that has come before.</p>
  `,
  featured_image: null,
  published_at: new Date(Date.now() - 3600000).toISOString(),
  updated_at: new Date().toISOString(),
  category_name: 'Transfer News',
  author_name: 'James Fletcher',
  is_breaking: true,
  article_type: 'news',
  views: 14820,
  tags: ['Mbappé', 'PSG', 'Real Madrid', 'Transfers', 'Ligue 1'],
  seo_title: 'Mbappé Shock PSG Return — Real Madrid Talks Collapse | ScoreNexa',
  seo_description: 'Kylian Mbappé is considering a sensational return to PSG as Real Madrid negotiations break down over image rights. Full exclusive report.',
}

const RELATED = [
  { id: '2', title: 'Barcelona Plotting £180m Summer Double Swoop', slug: 'barcelona-double-swoop', category_name: 'Transfer News', published_at: new Date(Date.now()-7200000).toISOString() },
  { id: '3', title: 'Liverpool Eye Lamine Yamal in Audacious Bid', slug: 'liverpool-lamine-yamal', category_name: 'Transfer News', published_at: new Date(Date.now()-10800000).toISOString() },
  { id: '4', title: "Bellingham's Agent in Secret Talks With Premier League Giants", slug: 'bellingham-agent-talks', category_name: 'Gossip', published_at: new Date(Date.now()-14400000).toISOString() },
]

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = MOCK_ARTICLE
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
      tags: article.tags || [],
      images: article.featured_image ? [{ url: article.featured_image, width: 1200, height: 630 }] : [],
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.seo_description || article.excerpt || '' },
    alternates: { canonical: `${siteUrl}/article/${article.slug}` },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = MOCK_ARTICLE
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { '@type': 'Person', name: article.author_name },
    publisher: { '@type': 'Organization', name: 'ScoreNexa', logo: { '@type': 'ImageObject', url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png` } },
    keywords: article.tags?.join(', '),
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scorenexa.com'
  const articleUrl = `${siteUrl}/article/${article.slug}`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <ChevronRight size={12}/>
            <Link href="/news" className="hover:text-blue-700">News</Link>
            <ChevronRight size={12}/>
            <Link href={`/news/${article.category_name?.toLowerCase().replace(/ /g,'-')}`} className="hover:text-blue-700">{article.category_name}</Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                {/* Header */}
                <div className="p-6 pb-0">
                  <div className="flex items-center gap-2 mb-3">
                    {article.is_breaking && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse" style={{fontFamily:'Oswald,sans-serif'}}>BREAKING</span>
                    )}
                    <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded" style={{fontFamily:'Oswald,sans-serif'}}>{article.category_name}</span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-4" style={{fontFamily:'Oswald,sans-serif'}}>
                    {article.title}
                  </h1>

                  {article.excerpt && (
                    <p className="text-lg text-slate-600 leading-relaxed mb-4 border-l-4 border-blue-600 pl-4 italic">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-t border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                          {article.author_name?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{article.author_name}</p>
                          <p className="text-xs text-slate-400">ScoreNexa Staff Writer</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock size={12}/>{formatDate(article.published_at)}</span>
                      <span className="flex items-center gap-1"><Eye size={12}/>{article.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>

                {/* Featured image placeholder */}
                {!article.featured_image && (
                  <div className="mx-6 mt-5 h-56 bg-gradient-to-br from-blue-900 to-slate-800 rounded-xl flex items-center justify-center">
                    <span className="text-white/30 text-4xl">⚽</span>
                  </div>
                )}

                {/* In-article top ad */}
                <div className="mx-6 mt-5">
                  <AdSlot position="in-article" />
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-medium">Tagged:</p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map(tag => (
                          <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}
                            className="bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 text-xs px-3 py-1 rounded-full transition-colors">
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2"><Share2 size={14}/>Share this story</p>
                    <div className="flex gap-2">
                      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        <Twitter size={14}/> X / Twitter
                      </a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        <Facebook size={14}/> Facebook
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom ad */}
                <div className="px-6 pb-6">
                  <AdSlot position="in-article" />
                </div>
              </div>

              {/* Related articles */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>RELATED STORIES</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {RELATED.map(r => (
                    <Link key={r.id} href={`/article/${r.slug}`}
                      className="bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all p-4 group">
                      <span className="text-[10px] text-purple-600 font-bold uppercase">{r.category_name}</span>
                      <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 mt-1 leading-snug transition-colors">{r.title}</h3>
                      <p className="text-xs text-slate-400 mt-2">{timeAgo(r.published_at)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AdSlot position="sidebar" />
              <div className="bg-white rounded-2xl border border-slate-100 p-4">
                <h3 className="font-bold text-slate-800 mb-3" style={{fontFamily:'Oswald,sans-serif'}}>MORE TRANSFER NEWS</h3>
                <div className="space-y-3">
                  {RELATED.map(r => (
                    <Link key={r.id} href={`/article/${r.slug}`} className="flex gap-3 group hover:bg-slate-50 p-2 rounded-lg transition-colors">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center text-slate-400">⚽</div>
                      <div>
                        <p className="text-xs font-semibold text-slate-700 group-hover:text-blue-700 transition-colors leading-tight">{r.title}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{timeAgo(r.published_at)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <AdSlot position="sidebar" />
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
