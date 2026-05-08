'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Save, Eye, Send, ChevronLeft, Image, Tag, Settings2, AlertTriangle } from 'lucide-react'

const CATEGORIES = ['News', 'Transfer News', 'Gossip', 'Match Report', 'Opinion', 'Premier League', 'Champions League', 'La Liga', 'Bundesliga']

export default function NewArticlePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [isBreaking, setIsBreaking] = useState(false)
  const [status, setStatus] = useState<'draft'|'published'|'scheduled'>('draft')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDesc, setSeoDesc] = useState('')
  const [tags, setTags] = useState('')
  const [activeTab, setActiveTab] = useState<'content'|'seo'|'settings'>('content')
  const [saved, setSaved] = useState(false)

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (!slug) setSlug(autoSlug(v))
  }

  const handleSave = (s: typeof status) => {
    setStatus(s)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // TODO: POST to /api/admin/articles
  }

  return (
    <div className="space-y-4 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="text-slate-400 hover:text-slate-600 transition-colors">
            <ChevronLeft size={20}/>
          </Link>
          <h1 className="text-xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW ARTICLE</h1>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-emerald-600 text-sm font-medium animate-fade-in">✓ Saved</span>}
          <button onClick={() => handleSave('draft')} className="flex items-center gap-1.5 border border-slate-200 bg-white text-slate-600 hover:border-slate-300 px-4 py-2 rounded-xl text-sm font-medium transition-all">
            <Save size={14}/> Save Draft
          </button>
          <button onClick={() => handleSave('published')} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
            <Send size={14}/> Publish Now
          </button>
        </div>
      </div>

      {/* Breaking toggle */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${isBreaking ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200'}`}>
        <AlertTriangle size={16} className={isBreaking ? 'text-red-600' : 'text-slate-400'}/>
        <span className={`text-sm font-semibold ${isBreaking ? 'text-red-700' : 'text-slate-600'}`}>Breaking News</span>
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
            <input
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Article headline..."
              className="w-full text-2xl font-bold text-slate-900 border-none outline-none placeholder-slate-300 resize-none leading-tight"
              style={{fontFamily:'Oswald,sans-serif'}}
            />
            <div className="mt-2 pt-2 border-t border-slate-100">
              <input
                value={slug}
                onChange={e => setSlug(e.target.value)}
                placeholder="url-slug"
                className="w-full text-xs text-slate-400 border-none outline-none font-mono"
              />
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {(['content','seo','settings'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${activeTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                {t === 'seo' ? 'SEO' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'content' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-1 p-3 border-b border-slate-100 bg-slate-50">
                {['B','I','U','H2','H3','"','—','Link','Img'].map(t => (
                  <button key={t} className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-slate-200">{t}</button>
                ))}
              </div>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder={`Start writing your article...\n\nTip: Use ## for headings, **text** for bold, > for quotes.\n\nThe editor will be replaced with TipTap rich editor after installing dependencies.`}
                className="w-full min-h-[400px] p-5 text-slate-700 leading-relaxed resize-none outline-none text-sm font-serif"
                style={{fontFamily:'Source Serif 4, serif'}}
              />
              <div className="px-5 py-2 border-t border-slate-100 text-xs text-slate-400">
                {content.split(/\s+/).filter(Boolean).length} words · Rich editor activates after npm install
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>SEO SETTINGS</h3>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">SEO Title</label>
                <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder={title || 'SEO optimised title...'} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Aim for 50–60 characters</span>
                  <span className={seoTitle.length > 60 ? 'text-red-500' : 'text-emerald-600'}>{seoTitle.length || title.length}/60</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">Meta Description</label>
                <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} placeholder="Compelling 150-160 character description for Google..." rows={3} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Aim for 150–160 characters</span>
                  <span className={seoDesc.length > 160 ? 'text-red-500' : 'text-emerald-600'}>{seoDesc.length}/160</span>
                </div>
              </div>
              {/* SERP Preview */}
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 mb-2 font-medium">GOOGLE PREVIEW</p>
                <p className="text-blue-700 text-base font-medium line-clamp-1">{seoTitle || title || 'Article Title'}</p>
                <p className="text-green-700 text-xs">scorenexa.com › article › {slug || 'article-url'}</p>
                <p className="text-slate-600 text-sm mt-0.5 line-clamp-2">{seoDesc || excerpt || 'Article meta description will appear here.'}</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>ARTICLE SETTINGS</h3>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">Author Name</label>
                <input defaultValue="Admin" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">Canonical URL (optional)</label>
                <input placeholder="https://..." className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">Schedule Publish Time</label>
                <input type="datetime-local" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>PUBLISH</h3>
            <select value={status} onChange={e => setStatus(e.target.value as any)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <button onClick={() => handleSave(status)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
              {status === 'published' ? '🚀 PUBLISH NOW' : status === 'scheduled' ? '⏰ SCHEDULE' : '💾 SAVE DRAFT'}
            </button>
            <button onClick={() => handleSave('draft')} className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium py-2 rounded-xl text-sm transition-all">
              Save Draft
            </button>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-bold text-slate-900 text-sm mb-3" style={{fontFamily:'Oswald,sans-serif'}}>CATEGORY</h3>
            <div className="space-y-1.5">
              {CATEGORIES.map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="category" value={c} checked={category === c} onChange={() => setCategory(c)} className="text-blue-600"/>
                  <span className={`text-sm transition-colors ${category === c ? 'text-blue-700 font-semibold' : 'text-slate-600 group-hover:text-slate-800'}`}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured image */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-bold text-slate-900 text-sm mb-3" style={{fontFamily:'Oswald,sans-serif'}}>FEATURED IMAGE</h3>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors cursor-pointer group">
              <Image size={24} className="text-slate-300 group-hover:text-blue-400 mx-auto mb-2 transition-colors"/>
              <p className="text-sm text-slate-400 group-hover:text-blue-500 transition-colors">Click to upload or drag & drop</p>
              <p className="text-xs text-slate-300 mt-1">JPG, PNG, WebP up to 5MB</p>
            </div>
            <p className="text-xs text-slate-400 mt-2">Or paste image URL:</p>
            <input placeholder="https://..." className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5" style={{fontFamily:'Oswald,sans-serif'}}>
              <Tag size={14}/> TAGS
            </h3>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Mbappé, PSG, Transfers..." className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <p className="text-xs text-slate-400 mt-1.5">Separate tags with commas</p>
            {tags && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                  <span key={t} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">#{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-bold text-slate-900 text-sm mb-3" style={{fontFamily:'Oswald,sans-serif'}}>EXCERPT</h3>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short summary shown in article cards and feeds..." rows={3} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
      </div>
    </div>
  )
}
