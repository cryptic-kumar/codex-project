import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to={user.role === 'SUPER_ADMIN' ? '/admin' : '/doctor'} replace />
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <button className="w-full bg-slate-900 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
