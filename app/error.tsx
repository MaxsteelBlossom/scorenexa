'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{fontFamily:'Oswald,sans-serif'}}>SOMETHING WENT WRONG</h1>
        <p className="text-slate-500 mb-8">An unexpected error occurred. Our team has been notified. Please try again.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>TRY AGAIN</button>
        </div>
      </div>
    </div>
  )
}
