import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const { isAuthenticated, user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="SUPER_ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="DOCTOR">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={user?.role === 'SUPER_ADMIN' ? '/admin' : '/doctor'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}
