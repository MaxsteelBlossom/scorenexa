import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-blue-100 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{fontFamily:'Oswald,sans-serif'}}>PAGE NOT FOUND</h1>
        <p className="text-slate-500 mb-8">The page you're looking for doesn't exist or has been moved. Try checking the URL or return to the homepage.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>← BACK TO HOME</Link>
          <Link href="/news" className="bg-white border border-slate-200 hover:border-blue-300 text-slate-700 font-medium px-6 py-3 rounded-xl transition-all text-sm">Latest News</Link>
        </div>
      </div>
    </div>
  )
}
