'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Save, Send, ChevronLeft, Tag, Loader2, AlertTriangle, Image } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const CATEGORIES = ['News', 'Transfer News', 'Gossip', 'Match Report', 'Opinion']

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function NewArticlePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get('type') || 'news'

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState(defaultType === 'gossip' ? 'Gossip' : defaultType === 'transfer' ? 'Transfer News' : 'News')
  const [isBreaking, setIsBreaking] = useState(false)
  const [featuredImage, setFeaturedImage] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDesc, setSeoDesc] = useState('')
  const [tags, setTags] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'content'|'seo'|'settings'>('content')
  const supabase = createClient()

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (!slug) setSlug(slugify(v))
  }

  const save = async (status: 'draft' | 'published') => {
    if (!title.trim()) { setError('Title is required.'); return }
    if (!content.trim()) { setError('Content is required.'); return }
    if (!slug.trim()) { setError('Slug is required.'); return }

    setSaving(true)
    setError('')

    const articleType = category === 'Gossip' ? 'gossip' : category === 'Transfer News' ? 'transfer' : category === 'Match Report' ? 'match-report' : category === 'Opinion' ? 'opinion' : 'news'

    const { data, error: saveError } = await supabase.from('articles').insert({
      title: title.trim(),
      slug: slug.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || null,
      category_name: category,
      article_type: articleType,
      is_breaking: isBreaking,
      featured_image: featuredImage.trim() || null,
      author_name: authorName.trim() || 'ScoreNexa Staff',
      seo_title: seoTitle.trim() || null,
      seo_description: seoDesc.trim() || null,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    }).select().single()

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
      return
    }

    router.push('/admin/articles')
  }

  return (
    <div className="space-y-4 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="text-slate-400 hover:text-slate-600 transition-colors"><ChevronLeft size={20}/></Link>
          <h1 className="text-xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW ARTICLE</h1>
        </div>
        <div className="flex items-center gap-2">
          {error && <span className="text-red-500 text-xs font-medium">{error}</span>}
          <button onClick={() => save('draft')} disabled={saving}
            className="flex items-center gap-1.5 border border-slate-200 bg-white text-slate-600 hover:border-slate-300 px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin"/> : <Save size={14}/>} Save Draft
          </button>
          <button onClick={() => save('published')} disabled={saving}
            className="flex items-center gap-1.5 bg-[#E63946] hover:bg-[#c0303c] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin"/> : <Send size={14}/>} Publish Now
          </button>
        </div>
      </div>

      {/* Breaking toggle */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${isBreaking ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200'}`}>
        <AlertTriangle size={16} className={isBreaking ? 'text-red-600' : 'text-slate-400'}/>
        <span className={`text-sm font-bold ${isBreaking ? 'text-red-700' : 'text-slate-600'}`}>Breaking News</span>
        <div className="ml-auto">
          <button onClick={() => setIsBreaking(!isBreaking)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isBreaking ? 'bg-red-600' : 'bg-slate-200'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isBreaking ? 'translate-x-6' : 'translate-x-1'}`}/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <input value={title} onChange={e => handleTitleChange(e.target.value)}
              placeholder="Article headline..." autoFocus
              className="w-full text-2xl font-black text-slate-900 border-none outline-none placeholder-slate-300 leading-tight"
              style={{fontFamily:'Oswald,sans-serif'}}/>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span className="text-xs text-slate-400">URL:</span>
              <input value={slug} onChange={e => setSlug(e.target.value)}
                placeholder="article-url-slug"
                className="flex-1 text-xs text-slate-400 border-none outline-none font-mono bg-transparent"/>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {(['content','seo','settings'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg capitalize transition-all ${activeTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                {t === 'seo' ? 'SEO' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'content' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="flex flex-wrap items-center gap-1 p-3 border-b border-slate-100 bg-slate-50 text-xs text-slate-500">
                <span className="font-bold">Formatting:</span>
                <span className="bg-white border border-slate-200 px-2 py-1 rounded">&lt;h2&gt; Heading</span>
                <span className="bg-white border border-slate-200 px-2 py-1 rounded">&lt;p&gt; Paragraph</span>
                <span className="bg-white border border-slate-200 px-2 py-1 rounded">&lt;strong&gt; Bold</span>
                <span className="bg-white border border-slate-200 px-2 py-1 rounded">&lt;blockquote&gt; Quote</span>
              </div>
              <textarea value={content} onChange={e => setContent(e.target.value)}
                placeholder={`Write your article here...\n\nYou can use HTML tags:\n<h2>Section Heading</h2>\n<p>Your paragraph text here.</p>\n<blockquote>A quote from someone.</blockquote>\n<strong>Bold text</strong>\n\nAdd your featured image URL in the sidebar.`}
                className="w-full min-h-[450px] p-5 text-slate-700 leading-relaxed resize-none outline-none text-sm"
                style={{fontFamily:'Source Serif 4, Georgia, serif'}}/>
              <div className="px-5 py-2 border-t border-slate-100 text-xs text-slate-400">
                {content.split(/\s+/).filter(Boolean).length} words
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-black text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>SEO SETTINGS</h3>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">SEO Title</label>
                <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder={title || 'SEO optimised title...'}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
                <p className="text-xs text-slate-400 mt-1">Aim for 50–60 characters · <span className={seoTitle.length > 60 ? 'text-red-500' : 'text-emerald-500'}>{seoTitle.length || title.length}/60</span></p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Meta Description</label>
                <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} rows={3}
                  placeholder="Compelling description for Google (150–160 chars)..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
                <p className="text-xs text-slate-400 mt-1">Aim for 150–160 characters · <span className={seoDesc.length > 160 ? 'text-red-500' : 'text-emerald-500'}>{seoDesc.length}/160</span></p>
              </div>
              {/* SERP Preview */}
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-2 font-bold uppercase">Google Preview</p>
                <p className="text-blue-700 text-base font-medium line-clamp-1">{seoTitle || title || 'Article Title'}</p>
                <p className="text-green-700 text-xs">scorenexa.com › article › {slug || 'article-url'}</p>
                <p className="text-slate-600 text-sm mt-0.5 line-clamp-2">{seoDesc || excerpt || 'Article description will appear here.'}</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-black text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>ARTICLE SETTINGS</h3>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Author Name</label>
                <input value={authorName} onChange={e => setAuthorName(e.target.value)} placeholder="e.g. James Fletcher"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            <h3 className="font-black text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>PUBLISH</h3>
            <button onClick={() => save('published')} disabled={saving}
              className="w-full bg-[#E63946] hover:bg-[#c0303c] disabled:opacity-50 text-white font-black py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
              {saving ? <><Loader2 size={14} className="animate-spin"/>SAVING...</> : '🚀 PUBLISH NOW'}
            </button>
            <button onClick={() => save('draft')} disabled={saving}
              className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-2 rounded-xl text-sm transition-all">
              💾 Save as Draft
            </button>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-black text-slate-900 text-sm mb-3" style={{fontFamily:'Oswald,sans-serif'}}>CATEGORY</h3>
            <div className="space-y-1.5">
              {CATEGORIES.map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="category" value={c} checked={category === c} onChange={() => setCategory(c)} className="text-[#E63946]"/>
                  <span className={`text-sm transition-colors ${category === c ? 'text-[#E63946] font-bold' : 'text-slate-600 group-hover:text-slate-800'}`}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured image */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-black text-slate-900 text-sm mb-3 flex items-center gap-1.5" style={{fontFamily:'Oswald,sans-serif'}}>
              <Image size={14}/> FEATURED IMAGE
            </h3>
            <input value={featuredImage} onChange={e => setFeaturedImage(e.target.value)}
              placeholder="Paste image URL from Media Library..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
            {featuredImage && (
              <img src={featuredImage} alt="Preview" className="mt-2 w-full h-24 object-cover rounded-lg"/>
            )}
            <Link href="/admin/media" target="_blank" className="mt-2 block text-xs text-[#E63946] hover:underline text-center font-bold">
              📁 Open Media Library →
            </Link>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-black text-slate-900 text-sm mb-3" style={{fontFamily:'Oswald,sans-serif'}}>EXCERPT</h3>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3}
              placeholder="Short summary shown in article cards..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-black text-slate-900 text-sm mb-3 flex items-center gap-1.5" style={{fontFamily:'Oswald,sans-serif'}}>
              <Tag size={14}/> TAGS
            </h3>
            <input value={tags} onChange={e => setTags(e.target.value)}
              placeholder="Premier League, Arsenal, Transfer..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
            <p className="text-xs text-slate-400 mt-1.5">Separate with commas</p>
            {tags && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                  <span key={t} className="bg-[#E63946]/10 text-[#E63946] text-xs px-2.5 py-1 rounded-full font-bold">#{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
