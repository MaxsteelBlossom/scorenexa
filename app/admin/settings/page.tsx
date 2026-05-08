'use client'
import { useState } from 'react'
import { Save } from 'lucide-react'

export default function SettingsAdmin() {
  const [saved, setSaved] = useState(false)
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>SITE SETTINGS</h1>
        <button onClick={save} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all">
          <Save size={14}/>{saved ? '✓ Saved!' : 'Save All'}
        </button>
      </div>

      {[
        { title: 'General', fields: [
          { label:'Site Name', type:'text', defaultValue:'ScoreNexa', key:'site_name' },
          { label:'Tagline', type:'text', defaultValue:'Real-Time Sports Intelligence', key:'tagline' },
          { label:'Site URL', type:'url', defaultValue:'https://scorenexa.com', key:'site_url' },
          { label:'Contact Email', type:'email', defaultValue:'hello@scorenexa.com', key:'contact_email' },
        ]},
        { title: 'SEO & Analytics', fields: [
          { label:'Google Analytics ID (G-XXXX)', type:'text', defaultValue:'', key:'ga_id' },
          { label:'Google AdSense ID (ca-pub-XXXX)', type:'text', defaultValue:'', key:'adsense_id' },
          { label:'Google Search Console Verification', type:'text', defaultValue:'', key:'gsc_verify' },
          { label:'Default Meta Description', type:'textarea', defaultValue:'Live football scores, transfer news, fixtures, standings, and expert analysis.', key:'meta_desc' },
        ]},
        { title: 'Sports API', fields: [
          { label:'API Provider', type:'select', defaultValue:'api-football', key:'sports_provider', options:['api-football','football-data.org','thesportsdb','mock'] },
          { label:'API Key', type:'password', defaultValue:'', key:'api_key' },
        ]},
        { title: 'Social Media', fields: [
          { label:'Twitter / X Handle', type:'text', defaultValue:'@scorenexa', key:'twitter' },
          { label:'Instagram Handle', type:'text', defaultValue:'@scorenexa', key:'instagram' },
          { label:'YouTube Channel', type:'url', defaultValue:'', key:'youtube' },
          { label:'Facebook Page', type:'url', defaultValue:'', key:'facebook' },
        ]},
      ].map(section => (
        <div key={section.title} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>{section.title.toUpperCase()}</h2>
          </div>
          <div className="p-5 space-y-4">
            {section.fields.map(f => (
              <div key={f.key}>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea defaultValue={f.defaultValue} rows={3} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
                ) : f.type === 'select' ? (
                  <select defaultValue={f.defaultValue} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {(f.options||[]).map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} defaultValue={f.defaultValue} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
