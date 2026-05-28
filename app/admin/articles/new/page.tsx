'use client'
import { useState, Suspense, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Save, Send, ChevronLeft, Tag, Loader2, AlertTriangle } from 'lucide-react'

const CATEGORIES = ['News', 'Transfer News', 'Gossip', 'Match Report', 'Opinion']

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  const [showHtml, setShowHtml] = useState(false)

  const initEditor = useCallback((node: HTMLDivElement | null) => {
    if (node && !initialized.current && value) {
      node.innerHTML = value
      initialized.current = true
    }
  }, [])

  const exec = (cmd: string, val?: string) => {
    ref.current?.focus()
    document.execCommand(cmd, false, val)
    if (ref.current) onChange(ref.current.innerHTML)
  }

  const ins = (html: string) => {
    ref.current?.focus()
    document.execCommand('insertHTML', false, html)
    if (ref.current) onChange(ref.current.innerHTML)
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (!url) return
    const sel = window.getSelection()?.toString()
    if (sel) exec('createLink', url)
    else ins(`<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)
  }

  const insertImage = () => {
    const url = prompt('Paste image URL from Media Library:')
    if (url) ins(`<figure style="margin:1.5rem 0;"><img src="${url}" alt="Article image" style="width:100%;border-radius:12px;"/><figcaption style="text-align:center;font-size:0.85rem;color:#64748b;margin-top:8px;">Image caption (edit this)</figcaption></figure><p></p>`)
  }

  const insertTable = () => ins(`<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;font-family:sans-serif;font-size:0.9rem;"><thead><tr><th style="background:#0D1117;color:white;padding:10px 14px;text-align:left;">Heading 1</th><th style="background:#0D1117;color:white;padding:10px 14px;text-align:left;">Heading 2</th><th style="background:#0D1117;color:white;padding:10px 14px;text-align:left;">Heading 3</th></tr></thead><tbody><tr><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">Data</td><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">Data</td><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">Data</td></tr><tr style="background:#f8fafc;"><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">Data</td><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">Data</td><td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">Data</td></tr></tbody></table><p></p>`)

  const insertCallout = () => ins(`<div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:1rem 1.25rem;border-radius:0 8px 8px 0;margin:1.5rem 0;"><strong style="color:#1e40af;">💡 Key Point:</strong> <span style="color:#1e3a8a;">Add your important note here.</span></div><p></p>`)

  const wordCount = value.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length

  const Btn = ({ label, onClick, title }: { label: string; onClick: () => void; title?: string }) => (
    <button type="button" onClick={onClick} title={title || label}
      className="px-2 py-1.5 text-xs font-bold rounded transition-all whitespace-nowrap text-slate-600 hover:bg-slate-200 hover:text-slate-900">
      {label}
    </button>
  )

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Toolbar row 1 - Text formatting */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-100 bg-slate-50">
        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider px-1 mr-1">TEXT</span>
        <Btn label="B" onClick={() => exec('bold')} title="Bold"/>
        <Btn label="𝐼" onClick={() => exec('italic')} title="Italic"/>
        <Btn label="U̲" onClick={() => exec('underline')} title="Underline"/>
        <Btn label="S̶" onClick={() => exec('strikeThrough')} title="Strikethrough"/>
        <div className="w-px h-5 bg-slate-200 mx-1"/>
        <Btn label="H2" onClick={() => exec('formatBlock','h2')} title="Heading 2"/>
        <Btn label="H3" onClick={() => exec('formatBlock','h3')} title="Heading 3"/>
        <Btn label="H4" onClick={() => exec('formatBlock','h4')} title="Heading 4"/>
        <Btn label="¶" onClick={() => exec('formatBlock','p')} title="Paragraph"/>
        <div className="w-px h-5 bg-slate-200 mx-1"/>
        <select onChange={e => exec('fontSize', e.target.value)} defaultValue="3"
          className="text-xs border border-slate-200 rounded px-1.5 py-1 bg-white text-slate-600 focus:outline-none" title="Font Size">
          <option value="1">Tiny</option>
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">X-Large</option>
          <option value="6">Huge</option>
        </select>
        <div className="w-px h-5 bg-slate-200 mx-1"/>
        <span className="text-[9px] text-slate-400 mr-1">Color:</span>
        <input type="color" onChange={e => exec('foreColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border border-slate-200" title="Text Color" defaultValue="#000000"/>
        <input type="color" onChange={e => exec('hiliteColor', e.target.value)} className="w-6 h-6 rounded cursor-pointer border border-slate-200" title="Highlight" defaultValue="#fef08a"/>
      </div>

      {/* Toolbar row 2 - Insert */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-100 bg-slate-50">
        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider px-1 mr-1">INSERT</span>
        <Btn label="• List" onClick={() => exec('insertUnorderedList')}/>
        <Btn label="1. List" onClick={() => exec('insertOrderedList')}/>
        <Btn label="❝ Quote" onClick={() => ins('<blockquote>Enter your quote here</blockquote><p></p>')}/>
        <Btn label="─ Divider" onClick={() => ins('<hr style="border:none;border-top:2px solid #e2e8f0;margin:2rem 0;"/><p></p>')}/>
        <Btn label="🔗 Link" onClick={insertLink}/>
        <Btn label="🖼️ Image" onClick={insertImage}/>
        <Btn label="📊 Table" onClick={insertTable}/>
        <Btn label="💡 Callout" onClick={insertCallout}/>
        <div className="w-px h-5 bg-slate-200 mx-1"/>
        <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider px-1 mr-1">ALIGN</span>
        <Btn label="◀" onClick={() => exec('justifyLeft')} title="Align Left"/>
        <Btn label="▬" onClick={() => exec('justifyCenter')} title="Center"/>
        <Btn label="▶" onClick={() => exec('justifyRight')} title="Align Right"/>
        <div className="ml-auto flex gap-1">
          <Btn label="↩ Undo" onClick={() => exec('undo')}/>
          <Btn label="↪ Redo" onClick={() => exec('redo')}/>
          <button type="button" onClick={() => { if (!showHtml && ref.current) onChange(ref.current.innerHTML); setShowHtml(!showHtml) }}
            className={`px-2.5 py-1.5 text-xs font-bold rounded transition-all ${showHtml ? 'bg-slate-700 text-white' : 'text-slate-500 hover:bg-slate-200'}`}>
            {showHtml ? '👁 Visual' : '</> HTML'}
          </button>
        </div>
      </div>

      {/* Editor */}
      {showHtml ? (
        <textarea value={value}
          onChange={e => { onChange(e.target.value); if (ref.current) ref.current.innerHTML = e.target.value }}
          className="w-full min-h-[450px] p-5 font-mono text-xs text-slate-700 resize-none outline-none bg-slate-50 leading-relaxed"
          spellCheck={false}/>
      ) : (
        <div
          ref={(node) => { (ref as any).current = node; initEditor(node) }}
          contentEditable suppressContentEditableWarning
          onInput={() => { if (ref.current) onChange(ref.current.innerHTML) }}
          className="article-body min-h-[450px] p-5 outline-none focus:outline-none"
          style={{fontFamily:'Georgia,serif', fontSize:'1rem', lineHeight:'1.85', color:'#1e293b'}}
          data-placeholder="Start writing your article here...&#10;&#10;Tips:&#10;• Use H2/H3 for section headings&#10;• Use Bold for key names and facts&#10;• Insert images using the 🖼️ button&#10;• Add links with 🔗&#10;• Use ❝ Quote for statements from players/managers&#10;• 💡 Callout for key stats or facts"
        />
      )}

      {/* Footer */}
      <div className="px-5 py-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-slate-400">
          <span className={`font-bold ${wordCount < 300 ? 'text-orange-500' : 'text-emerald-600'}`}>{wordCount} words</span>
          {wordCount < 300 && <span className="text-orange-400">⚠️ Aim for 300+ words</span>}
          {wordCount >= 300 && wordCount < 600 && <span className="text-emerald-500">✅ Good length</span>}
          {wordCount >= 600 && <span className="text-emerald-600">🎯 Excellent length</span>}
        </div>
        <span className="text-slate-400">~{Math.max(1, Math.ceil(wordCount/200))} min read</span>
      </div>

      <style>{`
        [contenteditable][data-placeholder]:empty:before { content:attr(data-placeholder); color:#94a3b8; pointer-events:none; white-space:pre-line; }
        .article-body h2 { font-family:'Oswald',sans-serif; font-size:1.5rem; font-weight:700; margin:2rem 0 1rem; color:#0D1117; border-left:4px solid #E63946; padding-left:0.875rem; }
        .article-body h3 { font-family:'Oswald',sans-serif; font-size:1.2rem; font-weight:600; margin:1.5rem 0 0.75rem; color:#1e293b; }
        .article-body h4 { font-family:'Oswald',sans-serif; font-size:1rem; font-weight:600; margin:1.25rem 0 0.5rem; text-transform:uppercase; letter-spacing:0.05em; color:#334155; }
        .article-body p { margin-bottom:1.25rem; }
        .article-body blockquote { border-left:4px solid #E63946; padding:0.875rem 1.25rem; margin:1.5rem 0; background:linear-gradient(to right,#fff5f5,#fff); border-radius:0 12px 12px 0; font-style:italic; color:#475569; }
        .article-body a { color:#E63946; text-decoration:underline; text-underline-offset:3px; }
        .article-body img { max-width:100%; border-radius:12px; margin:1rem 0; }
        .article-body figure { margin:1.5rem 0; }
        .article-body ul { padding-left:1.75rem; margin-bottom:1.25rem; list-style:disc; }
        .article-body ol { padding-left:1.75rem; margin-bottom:1.25rem; list-style:decimal; }
        .article-body li { margin-bottom:0.5rem; }
        .article-body hr { border:none; border-top:2px solid #e2e8f0; margin:2rem 0; }
        .article-body strong, .article-body b { font-weight:700; color:#0f172a; }
        .article-body table { width:100%; border-collapse:collapse; margin:1.5rem 0; font-size:0.9rem; }
        .article-body th { background:#0D1117; color:white; padding:10px 14px; text-align:left; }
        .article-body td { padding:10px 14px; border-bottom:1px solid #f1f5f9; }
      `}</style>
    </div>
  )
}

function NewArticleContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get('type') || 'news'

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState(
    defaultType === 'gossip' ? 'Gossip' : defaultType === 'transfer' ? 'Transfer News' : 'News'
  )
  const [isBreaking, setIsBreaking] = useState(false)
  const [featuredImage, setFeaturedImage] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDesc, setSeoDesc] = useState('')
  const [tags, setTags] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'content'|'seo'>('content')

  const handleTitleChange = (v: string) => { setTitle(v); if (!slug) setSlug(slugify(v)) }

  const save = async (status: 'draft' | 'published') => {
    if (!title.trim()) { setError('Title is required.'); return }
    if (!slug.trim()) { setError('Slug is required.'); return }
    setSaving(true); setError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const articleType = category==='Gossip'?'gossip':category==='Transfer News'?'transfer':category==='Match Report'?'match-report':category==='Opinion'?'opinion':'news'
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'apikey':process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||'', 'Authorization':`Bearer ${token}`, 'Prefer':'return=representation' },
        body: JSON.stringify({
          title:title.trim(), slug:slug.trim(), content:content.trim()||'<p>Content here</p>',
          excerpt:excerpt.trim()||null, category_name:category, article_type:articleType,
          is_breaking:isBreaking, featured_image:featuredImage.trim()||null,
          author_name:authorName.trim()||'ScoreNexa Staff',
          seo_title:seoTitle.trim()||null, seo_description:seoDesc.trim()||null,
          tags:tags?tags.split(',').map(t=>t.trim()).filter(Boolean):[],
          status, published_at:status==='published'?new Date().toISOString():null, views:0,
        }),
      })
      if (!res.ok) { const e = await res.json().catch(()=>({})); setError(e.message||e.details||'Save failed. Slug may already exist.'); setSaving(false); return }
      router.push('/admin/articles')
    } catch (e:any) { setError(e.message||'Error.'); setSaving(false) }
  }

  return (
    <div className="space-y-4 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="text-slate-400 hover:text-slate-600"><ChevronLeft size={20}/></Link>
          <h1 className="text-xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW ARTICLE</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {error && <span className="text-red-500 text-xs bg-red-50 border border-red-200 px-3 py-1 rounded-lg">{error}</span>}
          <button onClick={() => save('draft')} disabled={saving} className="flex items-center gap-1.5 border border-slate-200 bg-white text-slate-600 px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50">
            {saving?<Loader2 size={14} className="animate-spin"/>:<Save size={14}/>} Draft
          </button>
          <button onClick={() => save('published')} disabled={saving} className="flex items-center gap-1.5 bg-[#E63946] hover:bg-[#c0303c] text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50">
            {saving?<Loader2 size={14} className="animate-spin"/>:<Send size={14}/>} Publish
          </button>
        </div>
      </div>

      <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 ${isBreaking?'bg-red-50 border-red-300':'bg-white border-slate-200'}`}>
        <AlertTriangle size={15} className={isBreaking?'text-red-600':'text-slate-400'}/>
        <span className={`text-sm font-bold ${isBreaking?'text-red-700':'text-slate-600'}`}>Breaking News</span>
        <button onClick={() => setIsBreaking(!isBreaking)} className="ml-auto">
          <div className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${isBreaking?'bg-red-600':'bg-slate-200'}`}>
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isBreaking?'translate-x-5':'translate-x-0.5'}`}/>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <input value={title} onChange={e => handleTitleChange(e.target.value)} placeholder="Article headline..." autoFocus
              className="w-full text-2xl font-black text-slate-900 border-none outline-none placeholder-slate-300 leading-tight" style={{fontFamily:'Oswald,sans-serif'}}/>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span className="text-xs text-slate-400 flex-shrink-0">URL slug:</span>
              <input value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,''))}
                className="flex-1 text-xs text-slate-400 border-none outline-none font-mono bg-transparent min-w-0"/>
            </div>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {(['content','seo'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab===t?'bg-white text-slate-900 shadow-sm':'text-slate-500 hover:text-slate-700'}`}>
                {t==='seo'?'🔍 SEO Settings':'✏️ Content Editor'}
              </button>
            ))}
          </div>

          {activeTab==='content' && <RichEditor value={content} onChange={setContent}/>}

          {activeTab==='seo' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-black text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>SEO SETTINGS</h3>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">SEO Title <span className="font-normal">(50-60 chars)</span></label>
                <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder={title}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
                <p className="text-xs text-right mt-1"><span className={`font-bold ${(seoTitle||title).length>60?'text-red-500':'text-emerald-500'}`}>{(seoTitle||title).length}/60</span></p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Meta Description <span className="font-normal">(150-160 chars)</span></label>
                <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} rows={3}
                  placeholder="Compelling description for Google search results..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
                <p className="text-xs text-right mt-1"><span className={`font-bold ${seoDesc.length>160?'text-red-500':'text-emerald-500'}`}>{seoDesc.length}/160</span></p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Google Preview</p>
                <p className="text-blue-700 text-sm font-medium line-clamp-1">{seoTitle||title||'Article Title'}</p>
                <p className="text-green-700 text-xs">scorenexa.com/article/{slug||'url'}</p>
                <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{seoDesc||excerpt||'Description here...'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
            <button onClick={() => save('published')} disabled={saving}
              className="w-full bg-[#E63946] hover:bg-[#c0303c] disabled:opacity-50 text-white font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2">
              {saving?<><Loader2 size={14} className="animate-spin"/>SAVING...</>:'🚀 PUBLISH NOW'}
            </button>
            <button onClick={() => save('draft')} disabled={saving}
              className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-2 rounded-xl text-sm">
              💾 Save as Draft
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase tracking-wider">Category</p>
            {CATEGORIES.map(c => (
              <label key={c} className="flex items-center gap-2 py-1.5 cursor-pointer group">
                <input type="radio" name="cat" checked={category===c} onChange={() => setCategory(c)} className="text-[#E63946]"/>
                <span className={`text-sm ${category===c?'text-[#E63946] font-bold':'text-slate-600'}`}>{c}</span>
              </label>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase tracking-wider">Featured Image URL</p>
            <input value={featuredImage} onChange={e => setFeaturedImage(e.target.value)} placeholder="Paste URL from media library..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
            {featuredImage && <img src={featuredImage} alt="" className="mt-2 w-full h-24 object-cover rounded-lg"/>}
            <Link href="/admin/media" target="_blank" className="mt-1.5 block text-xs text-[#E63946] font-bold text-center hover:underline">📁 Open Media Library</Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase tracking-wider">Author Name</p>
            <input value={authorName} onChange={e => setAuthorName(e.target.value)} placeholder="e.g. James Fletcher"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase tracking-wider">Excerpt</p>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3}
              placeholder="Short summary for article cards and SEO..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1"><Tag size={11}/>Tags</p>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Arsenal, Premier League, Transfer..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
            <p className="text-xs text-slate-400 mt-1">Comma separated</p>
            {tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.split(',').map(t=>t.trim()).filter(Boolean).map(t=>(
                  <span key={t} className="bg-[#E63946]/10 text-[#E63946] text-xs px-2 py-0.5 rounded-full font-bold">#{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NewArticlePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400"><Loader2 className="animate-spin mx-auto" size={24}/></div>}>
      <NewArticleContent/>
    </Suspense>
  )
}
