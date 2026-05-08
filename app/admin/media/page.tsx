'use client'
import { useState } from 'react'
import { Upload, Search, Trash2, Copy, Image as ImageIcon } from 'lucide-react'

const MOCK_MEDIA = [
  { id:'1', name:'premier-league-match.jpg', size:'284 KB', type:'image/jpeg', url:'/uploads/premier-league-match.jpg', uploaded:'2025-04-26' },
  { id:'2', name:'transfer-window-graphic.png', size:'142 KB', type:'image/png', url:'/uploads/transfer-graphic.png', uploaded:'2025-04-25' },
  { id:'3', name:'champions-league-night.jpg', size:'412 KB', type:'image/jpeg', url:'/uploads/champions-league.jpg', uploaded:'2025-04-24' },
  { id:'4', name:'stadium-aerial-view.jpg', size:'890 KB', type:'image/jpeg', url:'/uploads/stadium.jpg', uploaded:'2025-04-23' },
  { id:'5', name:'scorenexa-og-image.png', size:'68 KB', type:'image/png', url:'/og-image.png', uploaded:'2025-04-20' },
  { id:'6', name:'match-report-cover.jpg', size:'326 KB', type:'image/jpeg', url:'/uploads/match-report.jpg', uploaded:'2025-04-19' },
]

export default function MediaAdmin() {
  const [selected, setSelected] = useState<string[]>([])
  const [copied, setCopied] = useState<string|null>(null)

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>MEDIA LIBRARY</h1>
          <p className="text-slate-400 text-sm">Manage uploaded images and files</p>
        </div>
        <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer">
          <Upload size={16}/> Upload Files
          <input type="file" className="hidden" multiple accept="image/*"/>
        </label>
      </div>

      {/* Upload zone */}
      <div className="border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-2xl p-10 text-center transition-colors cursor-pointer group bg-white">
        <ImageIcon size={32} className="text-slate-300 group-hover:text-blue-400 mx-auto mb-3 transition-colors"/>
        <p className="text-slate-500 text-sm font-medium">Drag and drop images here, or click to upload</p>
        <p className="text-slate-400 text-xs mt-1">JPG, PNG, WebP — up to 5MB each. Images stored in Supabase Storage.</p>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input placeholder="Search media files..." className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {MOCK_MEDIA.map(f => (
          <div key={f.id} className={`group relative bg-white rounded-xl border overflow-hidden transition-all ${selected.includes(f.id) ? 'border-blue-400 ring-2 ring-blue-400' : 'border-slate-100 hover:border-slate-300'}`}>
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
              <ImageIcon size={24} className="text-slate-300"/>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                <button onClick={() => copyUrl(f.url)} className="p-1.5 bg-white rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Copy size={12}/>
                </button>
                <button className="p-1.5 bg-white rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 size={12}/>
                </button>
              </div>
              {copied === f.url && (
                <div className="absolute inset-0 bg-emerald-500/80 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Copied!</span>
                </div>
              )}
            </div>
            <div className="p-2">
              <p className="text-[10px] text-slate-600 font-medium truncate">{f.name}</p>
              <p className="text-[10px] text-slate-400">{f.size}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p className="text-sm font-semibold text-blue-900 mb-1">📁 Supabase Storage</p>
        <p className="text-xs text-blue-800">Once your Supabase project is connected, uploaded files will be stored in your Supabase Storage bucket automatically. Configure your bucket in the Supabase dashboard under Storage → New Bucket → name it "media".</p>
      </div>
    </div>
  )
}
