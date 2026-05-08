import { Search, Shield, Star } from 'lucide-react'

const USERS = [
  { id:'1', name:'James Fletcher', email:'james@scorenexa.com', role:'admin', premium:true, joined:'Jan 2024', articles:48 },
  { id:'2', name:'Sarah Williams', email:'sarah@scorenexa.com', role:'editor', premium:true, joined:'Feb 2024', articles:34 },
  { id:'3', name:'Mike Thompson', email:'mike@scorenexa.com', role:'writer', premium:false, joined:'Mar 2024', articles:22 },
  { id:'4', name:'Carlos Mendez', email:'carlos@scorenexa.com', role:'writer', premium:false, joined:'Apr 2024', articles:18 },
  { id:'5', name:'David Park', email:'david@scorenexa.com', role:'writer', premium:false, joined:'Apr 2024', articles:9 },
  { id:'6', name:'Alex Johnson', email:'alex@example.com', role:'subscriber', premium:true, joined:'Apr 2025', articles:0 },
  { id:'7', name:'Emma Wilson', email:'emma@example.com', role:'subscriber', premium:false, joined:'Apr 2025', articles:0 },
]

const roleColors: Record<string, string> = {
  admin: 'bg-red-100 text-red-700',
  editor: 'bg-purple-100 text-purple-700',
  writer: 'bg-blue-100 text-blue-700',
  subscriber: 'bg-slate-100 text-slate-600',
}

export default function UsersAdmin() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>USERS</h1>
          <p className="text-slate-400 text-sm">Manage registered users, roles and premium subscriptions</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-600">
            <span className="font-bold text-slate-900">3,641</span> total · <span className="font-bold text-emerald-600">184</span> premium
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input placeholder="Search users..." className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"/>
        </div>
        <select className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>Writer</option>
          <option>Subscriber</option>
        </select>
        <select className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Users</option>
          <option>Premium Only</option>
          <option>Free Only</option>
        </select>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
              <th className="pl-5 py-3 text-left">User</th>
              <th className="py-3 text-left hidden md:table-cell">Role</th>
              <th className="py-3 text-center hidden sm:table-cell">Premium</th>
              <th className="py-3 text-center hidden lg:table-cell">Articles</th>
              <th className="py-3 text-left hidden md:table-cell">Joined</th>
              <th className="pr-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {USERS.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="pl-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{u.name[0]}</div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 hidden md:table-cell">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${roleColors[u.role]}`}>{u.role}</span>
                </td>
                <td className="py-3.5 text-center hidden sm:table-cell">
                  {u.premium ? <Star size={16} className="text-yellow-500 mx-auto fill-current"/> : <span className="text-slate-300 text-xs">—</span>}
                </td>
                <td className="py-3.5 text-center hidden lg:table-cell text-sm text-slate-600">{u.articles || '—'}</td>
                <td className="py-3.5 hidden md:table-cell text-sm text-slate-400">{u.joined}</td>
                <td className="pr-5 py-3.5">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 hover:bg-blue-50 rounded-lg transition-colors">Edit</button>
                    <button className="text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1 hover:bg-red-50 rounded-lg transition-colors">Ban</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">Showing 7 of 3,641 users</div>
      </div>
    </div>
  )
}
