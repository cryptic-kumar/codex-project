import { createContext, useContext, useMemo, useState } from 'react'
import { AuthApi } from '../api/client'

const AuthContext = createContext(null)

const storageKey = 'clinical_auth'

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const raw = localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) : { token: null, user: null }
  })

  const login = async (email, password) => {
    const data = await AuthApi.login({ email, password })
    const nextState = {
      token: data.token,
      user: {
        id: data.userId,
        name: data.name,
        email: data.email,
        role: data.role,
        clinicId: data.clinicId,
      },
    }
    setAuthState(nextState)
    localStorage.setItem(storageKey, JSON.stringify(nextState))
  }

  const logout = () => {
    setAuthState({ token: null, user: null })
    localStorage.removeItem(storageKey)
  }

  const value = useMemo(() => ({ ...authState, login, logout, isAuthenticated: !!authState.token }), [authState])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
