import { LogOut, Stethoscope } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Layout({ title, children }) {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Stethoscope size={20} />
          <div>
            <h1 className="font-semibold">Clinical Assistant SaaS</h1>
            <p className="text-xs text-slate-300">{title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm">{user?.email}</span>
          <button className="bg-red-500 px-3 py-1 rounded flex items-center gap-1" onClick={logout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
