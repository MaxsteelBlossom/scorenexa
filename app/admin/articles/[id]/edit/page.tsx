'use client'
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Save, Send, ChevronLeft, Tag, Loader2, AlertTriangle, Bold, Italic, Heading2, Heading3, Quote, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Minus, Eye, EyeOff, Trash2 } from 'lucide-react'

const CATEGORIES = ['News', 'Transfer News', 'Gossip', 'Match Report', 'Opinion']

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function ToolbarBtn({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} title={label}
      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-all">
      <Icon size={15}/>
    </button>
  )
}

function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showHtml, setShowHtml] = useState(false)
  const initialized = useRef(false)

  useEffect(() => {
    if (editorRef.current && !initialized.current && value) {
      editorRef.current.innerHTML = value
      initialized.current = true
    }
  }, [value])

  const exec = useCallback((command: string, val?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, val)
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }, [onChange])

  const insertHtml = useCallback((html: string) => {
    editorRef.current?.focus()
    document.execCommand('insertHTML', false, html)
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }, [onChange])

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) exec('createLink', url)
  }

  const insertImage = () => {
    const url = prompt('Enter image URL (from Media Library):')
    if (url) insertHtml(`<img src="${url}" alt="Article image" style="width:100%;border-radius:8px;margin:16px 0;" />`)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-2 mr-1">
          <ToolbarBtn icon={Bold} label="Bold" onClick={() => exec('bold')}/>
          <ToolbarBtn icon={Italic} label="Italic" onClick={() => exec('italic')}/>
        </div>
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-2 mr-1">
          <ToolbarBtn icon={Heading2} label="Heading 2" onClick={() => exec('formatBlock','h2')}/>
          <ToolbarBtn icon={Heading3} label="Heading 3" onClick={() => exec('formatBlock','h3')}/>
        </div>
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-2 mr-1">
          <ToolbarBtn icon={List} label="Bullet List" onClick={() => exec('insertUnorderedList')}/>
          <ToolbarBtn icon={ListOrdered} label="Numbered List" onClick={() => exec('insertOrderedList')}/>
          <ToolbarBtn icon={Quote} label="Blockquote" onClick={() => insertHtml('<blockquote>Quote text here</blockquote><p></p>')}/>
        </div>
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-2 mr-1">
          <ToolbarBtn icon={LinkIcon} label="Insert Link" onClick={insertLink}/>
          <ToolbarBtn icon={ImageIcon} label="Insert Image" onClick={insertImage}/>
          <ToolbarBtn icon={Minus} label="Divider" onClick={() => insertHtml('<hr/><p></p>')}/>
        </div>
        <button type="button" onClick={() => setShowHtml(!showHtml)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ml-auto ${showHtml ? 'bg-slate-700 text-white' : 'text-slate-500 hover:bg-slate-200'}`}>
          {showHtml ? <EyeOff size={12}/> : <Eye size={12}/>}
          {showHtml ? 'Visual' : 'HTML'}
        </button>
      </div>
      {showHtml ? (
        <textarea value={value} onChange={e => { onChange(e.target.value); if(editorRef.current) editorRef.current.innerHTML = e.target.value }}
          className="w-full min-h-[400px] p-5 font-mono text-sm text-slate-700 resize-none outline-none bg-slate-50"/>
      ) : (
        <div ref={editorRef} contentEditable suppressContentEditableWarning
          onInput={() => { if(editorRef.current) onChange(editorRef.current.innerHTML) }}
          className="article-body min-h-[400px] p-5 outline-none text-slate-700"
          style={{fontFamily:'Georgia, serif', fontSize:'1rem', lineHeight:'1.8'}}/>
      )}
      <div className="px-5 py-2 border-t border-slate-100 text-xs text-slate-400 bg-slate-50 flex justify-between">
        <span>{value.replace(/<[^>]*>/g,'').split(/\s+/).filter(Boolean).length} words</span>
        <span>Min 300 words for SEO</span>
      </div>
      <style>{`
        [contenteditable] h2 { font-size:1.4rem; font-weight:700; margin:1.5rem 0 0.75rem; border-left:3px solid #E63946; padding-left:0.75rem; }
        [contenteditable] h3 { font-size:1.15rem; font-weight:600; margin:1.25rem 0 0.5rem; }
        [contenteditable] p { margin-bottom:1rem; }
        [contenteditable] blockquote { border-left:4px solid #E63946; padding:0.75rem 1rem; margin:1rem 0; background:#fff5f5; border-radius:0 8px 8px 0; font-style:italic; }
        [contenteditable] a { color:#E63946; text-decoration:underline; }
        [contenteditable] img { max-width:100%; border-radius:8px; margin:1rem 0; }
        [contenteditable] ul { padding-left:1.5rem; margin-bottom:1rem; list-style:disc; }
        [contenteditable] ol { padding-left:1.5rem; margin-bottom:1rem; list-style:decimal; }
        [contenteditable] li { margin-bottom:0.5rem; }
        [contenteditable] hr { border:none; border-top:2px solid #e2e8f0; margin:1.5rem 0; }
        [contenteditable] strong { font-weight:700; }
      `}</style>
    </div>
  )
}

function EditArticleContent({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('News')
  const [isBreaking, setIsBreaking] = useState(false)
  const [featuredImage, setFeaturedImage] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDesc, setSeoDesc] = useState('')
  const [tags, setTags] = useState('')
  const [status, setStatus] = useState('draft')
  const [activeTab, setActiveTab] = useState<'content'|'seo'>('content')

  useEffect(() => {
    const load = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const session = await supabase.auth.getSession()
        const token = session.data.session?.access_token || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?id=eq.${id}&limit=1`,
          { headers: { 'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '', 'Authorization': `Bearer ${token}` } }
        )
        const data = await res.json()
        if (!data[0]) { setNotFound(true); setLoading(false); return }
        const a = data[0]
        setTitle(a.title || '')
        setContent(a.content || '')
        setExcerpt(a.excerpt || '')
        setSlug(a.slug || '')
        setCategory(a.category_name || 'News')
        setIsBreaking(a.is_breaking || false)
        setFeaturedImage(a.featured_image || '')
        setAuthorName(a.author_name || '')
        setSeoTitle(a.seo_title || '')
        setSeoDesc(a.seo_description || '')
        setTags(Array.isArray(a.tags) ? a.tags.join(', ') : '')
        setStatus(a.status || 'draft')
        setLoading(false)
      } catch { setError('Failed to load article.'); setLoading(false) }
    }
    load()
  }, [id])

  const save = async (newStatus?: string) => {
    if (!title.trim()) { setError('Title is required.'); return }
    setSaving(true); setError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const saveStatus = newStatus || status

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?id=eq.${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type':'application/json', 'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||'', 'Authorization':`Bearer ${token}`, 'Prefer':'return=representation' },
          body: JSON.stringify({
            title: title.trim(), content: content.trim(), excerpt: excerpt.trim()||null,
            slug: slug.trim(), category_name: category, is_breaking: isBreaking,
            featured_image: featuredImage.trim()||null, author_name: authorName.trim()||'ScoreNexa Staff',
            seo_title: seoTitle.trim()||null, seo_description: seoDesc.trim()||null,
            tags: tags ? tags.split(',').map((t:string)=>t.trim()).filter(Boolean) : [],
            status: saveStatus,
            published_at: saveStatus === 'published' ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          })
        }
      )
      if (!res.ok) { const e = await res.json().catch(()=>({})); setError(e.message||'Save failed.'); setSaving(false); return }
      router.push('/admin/articles')
    } catch (e:any) { setError(e.message||'Error.'); setSaving(false) }
  }

  const deleteArticle = async () => {
    if (!confirm('Delete this article permanently?')) return
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const session = await supabase.auth.getSession()
    const token = session.data.session?.access_token || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?id=eq.${id}`, {
      method: 'DELETE',
      headers: { 'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||'', 'Authorization':`Bearer ${token}` }
    })
    router.push('/admin/articles')
  }

  if (loading) return <div className="p-12 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" size={24}/>Loading article...</div>
  if (notFound) return <div className="p-12 text-center"><p className="text-slate-500">Article not found.</p><Link href="/admin/articles" className="text-[#E63946] font-bold mt-2 inline-block">← Back to Articles</Link></div>

  return (
    <div className="space-y-4 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="text-slate-400 hover:text-slate-600"><ChevronLeft size={20}/></Link>
          <h1 className="text-xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>EDIT ARTICLE</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {error && <span className="text-red-500 text-xs bg-red-50 border border-red-200 px-3 py-1 rounded-lg">{error}</span>}
          <button onClick={deleteArticle} className="flex items-center gap-1.5 border border-red-200 text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl text-sm font-bold transition-all">
            <Trash2 size={13}/> Delete
          </button>
          <Link href={`/article/${slug}`} target="_blank" className="border border-slate-200 text-slate-600 hover:bg-slate-50 px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5">
            <Eye size={13}/> Preview
          </Link>
          <button onClick={() => save('draft')} disabled={saving}
            className="flex items-center gap-1.5 border border-slate-200 bg-white text-slate-600 px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50">
            {saving ? <Loader2 size={13} className="animate-spin"/> : <Save size={13}/>} Save Draft
          </button>
          <button onClick={() => save('published')} disabled={saving}
            className="flex items-center gap-1.5 bg-[#E63946] hover:bg-[#c0303c] text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50">
            {saving ? <Loader2 size={13} className="animate-spin"/> : <Send size={13}/>} Publish
          </button>
        </div>
      </div>

      <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 ${isBreaking ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200'}`}>
        <AlertTriangle size={15} className={isBreaking ? 'text-red-600' : 'text-slate-400'}/>
        <span className={`text-sm font-bold ${isBreaking ? 'text-red-700' : 'text-slate-600'}`}>Breaking News</span>
        <button onClick={() => setIsBreaking(!isBreaking)} className="ml-auto">
          <div className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${isBreaking ? 'bg-red-600' : 'bg-slate-200'}`}>
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isBreaking ? 'translate-x-5' : 'translate-x-0.5'}`}/>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Article headline..."
              className="w-full text-2xl font-black text-slate-900 border-none outline-none placeholder-slate-300" style={{fontFamily:'Oswald,sans-serif'}}/>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span className="text-xs text-slate-400">URL:</span>
              <input value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,''))}
                className="flex-1 text-xs text-slate-400 border-none outline-none font-mono bg-transparent"/>
            </div>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {(['content','seo'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab===t?'bg-white text-slate-900 shadow-sm':'text-slate-500'}`}>
                {t==='seo'?'🔍 SEO':'✏️ Editor'}
              </button>
            ))}
          </div>

          {activeTab === 'content' && <RichEditor value={content} onChange={setContent}/>}

          {activeTab === 'seo' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">SEO Title</label>
                <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder={title}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Meta Description</label>
                <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} rows={3}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status==='published'?'bg-emerald-100 text-emerald-700':'bg-slate-100 text-slate-500'}`}>{status}</span>
            </div>
            <button onClick={() => save('published')} disabled={saving}
              className="w-full bg-[#E63946] hover:bg-[#c0303c] disabled:opacity-50 text-white font-black py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
              {saving?<><Loader2 size={13} className="animate-spin"/>SAVING...</>:'🚀 SAVE & PUBLISH'}
            </button>
            <button onClick={() => save('draft')} disabled={saving}
              className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-2 rounded-xl text-sm">
              💾 Save as Draft
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase">Category</p>
            {CATEGORIES.map(c => (
              <label key={c} className="flex items-center gap-2 py-1 cursor-pointer">
                <input type="radio" checked={category===c} onChange={() => setCategory(c)} className="text-[#E63946]"/>
                <span className={`text-sm ${category===c?'text-[#E63946] font-bold':'text-slate-600'}`}>{c}</span>
              </label>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase">Featured Image URL</p>
            <input value={featuredImage} onChange={e => setFeaturedImage(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
            {featuredImage && <img src={featuredImage} alt="" className="mt-2 w-full h-20 object-cover rounded-lg"/>}
            <Link href="/admin/media" target="_blank" className="mt-1.5 block text-xs text-[#E63946] font-bold text-center hover:underline">📁 Media Library</Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase">Author</p>
            <input value={authorName} onChange={e => setAuthorName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase">Excerpt</p>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-xs text-slate-500 mb-2 uppercase flex items-center gap-1"><Tag size={11}/>Tags</p>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Arsenal, Premier League..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
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

export default function EditArticlePage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400"><Loader2 className="animate-spin mx-auto" size={24}/></div>}>
      <EditArticleContent id={params.id}/>
    </Suspense>
  )
}
