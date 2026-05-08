import Link from 'next/link'
import Image from 'next/image'
import { timeAgo } from '@/lib/utils'
import { Clock, TrendingUp } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  published_at: string | null
  category_name: string | null
  author_name: string | null
  is_breaking: boolean
  article_type: string
  views: number
}

interface ArticleCardProps {
  article: Article
  size?: 'large' | 'medium' | 'small' | 'compact'
}

const categoryColors: Record<string, string> = {
  'News': 'bg-blue-600',
  'Transfer News': 'bg-purple-600',
  'Gossip': 'bg-orange-500',
  'Match Report': 'bg-green-600',
  'Opinion': 'bg-slate-600',
}

export default function ArticleCard({ article, size = 'medium' }: ArticleCardProps) {
  const catColor = categoryColors[article.category_name || ''] || 'bg-blue-600'

  if (size === 'large') {
    return (
      <Link href={`/article/${article.slug}`} className="group block relative overflow-hidden rounded-2xl bg-slate-900 aspect-[16/9]">
        {article.featured_image ? (
          <Image src={article.featured_image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            {article.is_breaking && <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse" style={{fontFamily:'Oswald,sans-serif'}}>BREAKING</span>}
            <span className={`${catColor} text-white text-xs font-bold px-2 py-0.5 rounded`} style={{fontFamily:'Oswald,sans-serif'}}>{article.category_name}</span>
          </div>
          <h2 className="text-white text-xl md:text-2xl font-bold leading-tight mb-2 group-hover:text-emerald-300 transition-colors" style={{fontFamily:'Oswald,sans-serif'}}>{article.title}</h2>
          {article.excerpt && <p className="text-slate-300 text-sm line-clamp-2 hidden md:block">{article.excerpt}</p>}
          <div className="flex items-center gap-3 mt-3 text-slate-400 text-xs">
            <span className="flex items-center gap-1"><Clock size={11} />{timeAgo(article.published_at)}</span>
            {article.author_name && <span>By {article.author_name}</span>}
          </div>
        </div>
      </Link>
    )
  }

  if (size === 'compact') {
    return (
      <Link href={`/article/${article.slug}`} className="group flex items-start gap-3 hover:bg-slate-50 p-2 rounded-lg transition-colors">
        {article.featured_image && (
          <div className="relative w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden">
            <Image src={article.featured_image} alt={article.title} fill className="object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 line-clamp-2 transition-colors leading-tight">{article.title}</h4>
          <p className="text-xs text-slate-400 mt-1">{timeAgo(article.published_at)}</p>
        </div>
      </Link>
    )
  }

  if (size === 'small') {
    return (
      <Link href={`/article/${article.slug}`} className="group block">
        {article.featured_image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
            <Image src={article.featured_image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}
        <div>
          <span className={`${catColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded`}>{article.category_name}</span>
          <h3 className="text-slate-800 text-sm font-bold mt-1 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">{article.title}</h3>
          <p className="text-slate-400 text-xs mt-1 flex items-center gap-1"><Clock size={10}/>{timeAgo(article.published_at)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/article/${article.slug}`} className="group flex gap-4 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all p-3">
      {article.featured_image && (
        <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image src={article.featured_image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          {article.is_breaking && <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">BREAKING</span>}
          <span className={`${catColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded`}>{article.category_name}</span>
        </div>
        <h3 className="text-slate-800 font-bold text-sm line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">{article.title}</h3>
        {article.excerpt && <p className="text-slate-500 text-xs mt-1 line-clamp-1">{article.excerpt}</p>}
        <div className="flex items-center gap-3 mt-2 text-slate-400 text-xs">
          <span className="flex items-center gap-0.5"><Clock size={10}/>{timeAgo(article.published_at)}</span>
          {article.views > 0 && <span className="flex items-center gap-0.5"><TrendingUp size={10}/>{article.views.toLocaleString()}</span>}
        </div>
      </div>
    </Link>
  )
}
