'use client'
import { useState, useRef, useEffect } from 'react'
import { Upload, Search, Trash2, Copy, Check, Image as ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface MediaFile {
  id: string
  name: string
  url: string
  size: string
  created_at: string
}

export default function MediaAdmin() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [dragOver, setDragOver] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    const { data, error } = await supabase.storage.from('media').list('', {
      limit: 100, sortBy: { column: 'created_at', order: 'desc' }
    })
    if (data) {
      const filesWithUrls = data
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => {
          const { data: urlData } = supabase.storage.from('media').getPublicUrl(f.name)
          return {
            id: f.id || f.name,
            name: f.name,
            url: urlData.publicUrl,
            size: f.metadata?.size ? `${Math.round(f.metadata.size / 1024)} KB` : 'Unknown',
            created_at: f.created_at || new Date().toISOString(),
          }
        })
      setFiles(filesWithUrls)
    }
  }

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB.')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabase.storage.from('media').upload(fileName, file, {
      cacheControl: '3600', upsert: false
    })

    if (error) {
      alert(`Upload failed: ${error.message}`)
    } else {
      await loadFiles()
    }
    setUploading(false)
    setUploadProgress(100)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    for (const file of selectedFiles) {
      await uploadFile(file)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    for (const file of droppedFiles) {
      await uploadFile(file)
    }
  }

  const deleteFile = async (name: string, id: string) => {
    if (!confirm('Delete this image?')) return
    await supabase.storage.from('media').remove([name])
    setFiles(f => f.filter(file => file.id !== id))
  }

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>🖼️ MEDIA LIBRARY</h1>
          <p className="text-slate-400 text-sm">{files.length} images uploaded · Click to copy URL for articles</p>
        </div>
        <label className="flex items-center gap-2 bg-[#E63946] hover:bg-[#c0303c] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer">
          <Upload size={16}/> Upload Images
          <input ref={fileInput} type="file" accept="image/*" multiple className="sr-only" onChange={handleFileChange}/>
        </label>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInput.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-[#E63946] bg-red-50' : 'border-slate-200 hover:border-[#E63946]/50 bg-white hover:bg-slate-50'}`}>
        {uploading ? (
          <div className="space-y-2">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-[#E63946] h-2 rounded-full transition-all" style={{width:`${uploadProgress}%`}}/>
            </div>
            <p className="text-slate-500 text-sm">Uploading...</p>
          </div>
        ) : (
          <>
            <Upload size={32} className="text-slate-300 mx-auto mb-3"/>
            <p className="font-semibold text-slate-500">Drop images here or click to upload</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP · Max 5MB each · Recommended: 1200×675px</p>
          </>
        )}
      </div>

      {/* Supabase storage notice */}
      {files.length === 0 && !uploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
          💡 <strong>Setup needed:</strong> Go to <strong>Supabase → Storage → New Bucket</strong> → name it <code className="bg-blue-100 px-1 rounded">media</code> → tick <strong>Public bucket</strong> → Create. Then come back and upload images.
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search images..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] bg-white"/>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {(['grid','list'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${view === v ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
              {v === 'grid' ? '⊞' : '☰'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid view */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(file => (
            <div key={file.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-all group">
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img src={file.url} alt={file.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(file.url, file.id)}
                    className="bg-white text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-all">
                    {copiedId === file.id ? <Check size={14} className="text-emerald-600"/> : <Copy size={14}/>}
                  </button>
                  <button onClick={() => deleteFile(file.name, file.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all">
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-semibold text-slate-700 truncate">{file.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{file.size}</p>
                <button onClick={() => copyUrl(file.url, file.id)}
                  className="mt-1.5 w-full text-[10px] font-bold text-[#E63946] hover:bg-red-50 py-1 rounded-lg transition-colors flex items-center justify-center gap-1">
                  {copiedId === file.id ? <><Check size={10}/>Copied!</> : <><Copy size={10}/>Copy URL</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {view === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="pl-5 py-3 text-left">File</th>
                <th className="py-3 text-left hidden sm:table-cell">Size</th>
                <th className="pr-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(file => (
                <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                  <td className="pl-5 py-3 flex items-center gap-3">
                    <img src={file.url} alt={file.name} className="w-10 h-10 object-cover rounded-lg bg-slate-100"/>
                    <span className="font-medium text-slate-800 text-sm truncate max-w-[200px]">{file.name}</span>
                  </td>
                  <td className="py-3 text-slate-500 hidden sm:table-cell">{file.size}</td>
                  <td className="pr-5 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => copyUrl(file.url, file.id)}
                        className="flex items-center gap-1 text-xs text-[#E63946] font-bold hover:bg-red-50 px-2 py-1 rounded-lg transition-colors">
                        {copiedId === file.id ? <><Check size={11}/>Copied!</> : <><Copy size={11}/>Copy URL</>}
                      </button>
                      <button onClick={() => deleteFile(file.name, file.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">No images yet. Upload some above.</div>
          )}
        </div>
      )}
    </div>
  )
}
