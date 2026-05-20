'use client'
import { useState, Suspense, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Save, Send, ChevronLeft, Tag, Loader2, AlertTriangle, Bold, Italic, Heading2, Heading3, Quote, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Minus, Eye, EyeOff } from 'lucide-react'

const CATEGORIES = ['News', 'Transfer News', 'Gossip', 'Match Report', 'Opinion']

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Rich text toolbar button
function ToolbarBtn({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} title={label}
      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-all" >
      <Icon size={15}/>
    </button>
  )
}

function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showHtml, setShowHtml] = useState(false)

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

  const insertHeading = (level: 2 | 3) => {
    exec('formatBlock', `h${level}`)
  }

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-2 mr-1">
          <ToolbarBtn icon={Bold} label="Bold" onClick={() => exec('bold')}/>
          <ToolbarBtn icon={Italic} label="Italic" onClick={() => exec('italic')}/>
        </div>
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-2 mr-1">
          <ToolbarBtn icon={Heading2} label="Heading 2" onClick={() => insertHeading(2)}/>
          <ToolbarBtn icon={Heading3} label="Heading 3" onClick={() => insertHeading(3)}/>
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

      {/* Editor area */}
      {showHtml ? (
        <textarea
          value={value}
          onChange={e => {
            onChange(e.target.value)
            if (editorRef.current) editorRef.current.innerHTML = e.target.value
          }}
          className="w-full min-h-[400px] p-5 font-mono text-sm text-slate-700 resize-none outline-none bg-slate-50"
          placeholder="Raw HTML..."/>
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
          className="article-body min-h-[400px] p-5 outline-none focus:outline-none text-slate-700"
          style={{fontFamily:'Georgia, serif', fontSize:'1rem', lineHeight:'1.8'}}
          data-placeholder="Start writing your article... Use the toolbar above to format text, add headings, insert images and links."
        />
      )}

      <div className="px-5 py-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 bg-slate-50">
        <span>{value.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length} words</span>
        <span>Min. 300 words recommended for SEO</span>
      </div>

      {/* Editor styles */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        [contenteditable] h2 { font-size: 1.4rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: #0f172a; border-left: 3px solid #E63946; padding-left: 0.75rem; }
        [contenteditable] h3 { font-size: 1.15rem; font-weight: 600; margin: 1.25rem 0 0.5rem; color: #1e293b; }
        [contenteditable] p { margin-bottom: 1rem; }
        [contenteditable] blockquote { border-left: 4px solid #E63946; padding: 0.75rem 1rem; margin: 1rem 0; background: #fff5f5; border-radius: 0 8px 8px 0; font-style: italic; color: #475569; }
        [contenteditable] a { color: #E63946; text-decoration: underline; }
        [contenteditable] img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
        [contenteditable] ul { padding-left: 1.5rem; margin-bottom: 1rem; list-style: disc; }
        [contenteditable] ol { padding-left: 1.5rem; margin-bottom: 1rem; list-style: decimal; }
        [contenteditable] li { margin-bottom: 0.5rem; }
        [contenteditable] hr { border: none; border-top: 2px solid #e2e8f0; margin: 1.5rem 0; }
        [contenteditable] strong { font-weight: 700; color: #0f172a; }
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
    defaultType === 'gossip' ? 'Gossip' :
    defaultType === 'transfer' ? 'Transfer News' : 'News'
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

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (!slug) setSlug(slugify(v))
  }

  const save = async (status: 'draft' | 'published') => {
    if (!title.trim()) { setError('Title is required.'); return }
    if (!content.trim() || content === '<br>') { setError('Content is required.'); return }
    if (!slug.trim()) { setError('Slug is required.'); return }

    setSaving(true)
    setError('')

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const articleType =
        category === 'Gossip' ? 'gossip' :
        category === 'Transfer News' ? 'transfer' :
        category === 'Match Report' ? 'match-report' :
        category === 'Opinion' ? 'opinion' : 'news'

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token || supabaseKey

      const res = await fetch(`${supabaseUrl}/rest/v1/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey || '',
          'Authorization': `Bearer ${token}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
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
          tags: tags ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
          status,
          published_at: status === 'published' ? new Date().toISOString() : null,
          views: 0,
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        setError(errData.message || 'Failed to save. Check slug is unique.')
        setSaving(false)
        return
      }

      router.push('/admin/articles')
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles" className="text-slate-400 hover:text-slate-600 transition-colors"><ChevronLeft size={20}/></Link>
          <h1 className="text-xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW ARTICLE</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {error && <span className="text-red-500 text-xs font-medium bg-red-50 border border-red-200 px-3 py-1 rounded-lg">{error}</span>}
          <button onClick={() => save('draft')} disabled={saving}
            className="flex items-center gap-1.5 border border-slate-200 bg-white text-slate-600 hover:border-slate-300 px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin"/> : <Save size={14}/>} Draft
          </button>
          <button onClick={() => save('published')} disabled={saving}
            className="flex items-center gap-1.5 bg-[#E63946] hover:bg-[#c0303c] text-white px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin"/> : <Send size={14}/>} Publish
          </button>
        </div>
      </div>

      {/* Breaking toggle */}
      <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all ${isBreaking ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200'}`}>
        <AlertTriangle size={15} className={isBreaking ? 'text-red-600' : 'text-slate-400'}/>
        <span className={`text-sm font-bold ${isBreaking ? 'text-red-700' : 'text-slate-600'}`}>Mark as Breaking News</span>
        <button onClick={() => setIsBreaking(!isBreaking)} className="ml-auto">
          <div className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${isBreaking ? 'bg-red-600' : 'bg-slate-200'}`}>
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isBreaking ? 'translate-x-5' : 'translate-x-0.5'}`}/>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <input value={title} onChange={e => handleTitleChange(e.target.value)}
              placeholder="Article headline..." autoFocus
              className="w-full text-2xl font-black text-slate-900 border-none outline-none placeholder-slate-300 leading-tight"
              style={{fontFamily:'Oswald,sans-serif'}}/>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span className="text-xs text-slate-400 flex-shrink-0">URL:</span>
              <input value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,''))}
                className="flex-1 text-xs text-slate-400 border-none outline-none font-mono bg-transparent min-w-0"/>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {(['content','seo'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                {t === 'seo' ? '🔍 SEO Settings' : '✏️ Content Editor'}
              </button>
            ))}
          </div>

          {activeTab === 'content' && (
            <RichEditor value={content} onChange={setContent}/>
          )}

          {activeTab === 'seo' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">SEO Title <span className="text-slate-300">(50-60 chars)</span></label>
                <input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder={title}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
                <p className="text-xs mt-1 text-right"><span className={`font-bold ${(seoTitle||title).length > 60 ? 'text-red-500' : 'text-emerald-500'}`}>{(seoTitle||title).length}/60</span></p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Meta Description <span className="text-slate-300">(150-160 chars)</span></label>
                <textarea value={seoDesc} onChange={e => setSeoDesc(e.target.value)} rows={3}
                  placeholder="Description shown in Google search results..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
                <p className="text-xs mt-1 text-right"><span className={`font-bold ${seoDesc.length > 160 ? 'text-red-500' : 'text-emerald-500'}`}>{seoDesc.length}/160</span></p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Google Preview</p>
                <p className="text-blue-700 text-sm font-medium">{seoTitle || title || 'Article Title'}</p>
                <p className="text-green-700 text-xs">scorenexa.com/article/{slug || 'url'}</p>
                <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{seoDesc || excerpt || 'Description here...'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
            <button onClick={() => save('published')} disabled={saving}
              className="w-full bg-[#E63946] hover:bg-[#c0303c] disabled:opacity-50 text-white font-black py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
              {saving ? <><Loader2 size={14} className="animate-spin"/>SAVING...</> : '🚀 PUBLISH NOW'}
            </button>
            <button onClick={() => save('draft')} disabled={saving}
              className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-2 rounded-xl text-sm transition-all">
              💾 Save Draft
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-slate-900 text-xs mb-2 uppercase tracking-wider">Category</p>
            <div className="space-y-1">
              {CATEGORIES.map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer py-1">
                  <input type="radio" name="cat" checked={category === c} onChange={() => setCategory(c)} className="text-[#E63946]"/>
                  <span className={`text-sm ${category === c ? 'text-[#E63946] font-bold' : 'text-slate-600'}`}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-slate-900 text-xs mb-2 uppercase tracking-wider">Featured Image URL</p>
            <input value={featuredImage} onChange={e => setFeaturedImage(e.target.value)}
              placeholder="https://... or paste from media library"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
            {featuredImage && <img src={featuredImage} alt="" className="mt-2 w-full h-20 object-cover rounded-lg"/>}
            <Link href="/admin/media" target="_blank" className="mt-1.5 block text-xs text-[#E63946] font-bold text-center hover:underline">📁 Open Media Library</Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-slate-900 text-xs mb-2 uppercase tracking-wider">Author</p>
            <input value={authorName} onChange={e => setAuthorName(e.target.value)} placeholder="e.g. James Fletcher"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-slate-900 text-xs mb-2 uppercase tracking-wider">Excerpt</p>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3}
              placeholder="Short summary for article cards and SEO..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="font-black text-slate-900 text-xs mb-2 uppercase tracking-wider flex items-center gap-1"><Tag size={12}/>Tags</p>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Arsenal, Transfer, Premier League..."
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
            {tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
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
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading editor...</div>}>
      <NewArticleContent/>
    </Suspense>
  )
}
