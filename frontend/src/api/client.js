const BASE_URL = 'http://localhost:8080/api'

const jsonHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
})

export async function apiRequest(path, { method = 'GET', token, body } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: jsonHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    const message = data?.error || 'Request failed'
    throw new Error(message)
  }

  return data
}

export const AuthApi = {
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: credentials }),
}

export const AdminApi = {
  getStats: (token) => apiRequest('/admin/stats', { token }),
  createClinic: (token, payload) => apiRequest('/admin/clinics', { method: 'POST', token, body: payload }),
  createDoctor: (token, payload) => apiRequest('/admin/doctors', { method: 'POST', token, body: payload }),
}

export const DoctorApi = {
  getPatients: (token) => apiRequest('/doctor/patients', { token }),
  addPatient: (token, payload) => apiRequest('/doctor/patients', { method: 'POST', token, body: payload }),
  getAppointments: (token) => apiRequest('/doctor/appointments', { token }),
  addAppointment: (token, payload) => apiRequest('/doctor/appointments', { method: 'POST', token, body: payload }),
  updateAppointment: (token, appointmentId, payload) =>
    apiRequest(`/doctor/appointments/${appointmentId}/status`, { method: 'PATCH', token, body: payload }),
}
