import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { AdminApi } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function AdminDashboard() {
  const { token } = useAuth()
  const [stats, setStats] = useState({ totalClinics: 0, totalDoctors: 0, totalPatients: 0 })
  const [clinic, setClinic] = useState({ name: '', address: '', contactNumber: '' })
  const [doctor, setDoctor] = useState({ email: '', password: '', name: '', clinicId: '' })

  const loadStats = async () => setStats(await AdminApi.getStats(token))

  useEffect(() => {
    loadStats()
  }, [])

  const createClinic = async (e) => {
    e.preventDefault()
    await AdminApi.createClinic(token, clinic)
    setClinic({ name: '', address: '', contactNumber: '' })
    loadStats()
  }

  const createDoctor = async (e) => {
    e.preventDefault()
    await AdminApi.createDoctor(token, { ...doctor, clinicId: Number(doctor.clinicId) })
    setDoctor({ email: '', password: '', name: '', clinicId: '' })
    loadStats()
  }

  return (
    <Layout title="Super Admin Dashboard">
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="bg-white rounded shadow p-4">
            <p className="text-slate-500 text-sm">{k}</p>
            <p className="text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={createClinic}>
          <h3 className="font-semibold">Register Clinic</h3>
          <input className="w-full border p-2 rounded" placeholder="Clinic Name" value={clinic.name} onChange={(e) => setClinic({ ...clinic, name: e.target.value })} />
          <input className="w-full border p-2 rounded" placeholder="Address" value={clinic.address} onChange={(e) => setClinic({ ...clinic, address: e.target.value })} />
          <input className="w-full border p-2 rounded" placeholder="Contact Number" value={clinic.contactNumber} onChange={(e) => setClinic({ ...clinic, contactNumber: e.target.value })} />
          <button className="bg-slate-900 text-white px-4 py-2 rounded">Create Clinic</button>
        </form>

        <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={createDoctor}>
          <h3 className="font-semibold">Register Doctor</h3>
          <input className="w-full border p-2 rounded" placeholder="Doctor Name" value={doctor.name} onChange={(e) => setDoctor({ ...doctor, name: e.target.value })} />
          <input className="w-full border p-2 rounded" placeholder="Email" value={doctor.email} onChange={(e) => setDoctor({ ...doctor, email: e.target.value })} />
          <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={doctor.password} onChange={(e) => setDoctor({ ...doctor, password: e.target.value })} />
          <input className="w-full border p-2 rounded" placeholder="Clinic ID" value={doctor.clinicId} onChange={(e) => setDoctor({ ...doctor, clinicId: e.target.value })} />
          <button className="bg-slate-900 text-white px-4 py-2 rounded">Create Doctor</button>
        </form>
      </div>
    </Layout>
  )
}
