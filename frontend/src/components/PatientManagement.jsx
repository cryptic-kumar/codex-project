import { useEffect, useState } from 'react'
import { DoctorApi } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function PatientManagement() {
  const { token } = useAuth()
  const [patients, setPatients] = useState([])
  const [form, setForm] = useState({ name: '', phone: '', medicalHistory: '' })

  const loadPatients = async () => {
    const data = await DoctorApi.getPatients(token)
    setPatients(data)
  }

  useEffect(() => {
    loadPatients()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    await DoctorApi.addPatient(token, form)
    setForm({ name: '', phone: '', medicalHistory: '' })
    loadPatients()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Add Patient</h3>
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="w-full border p-2 rounded" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <textarea className="w-full border p-2 rounded" placeholder="Medical history" value={form.medicalHistory} onChange={(e) => setForm({ ...form, medicalHistory: e.target.value })} />
          <button className="bg-slate-900 text-white px-4 py-2 rounded">Save Patient</button>
        </form>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Patients in Clinic</h3>
        <ul className="space-y-2">
          {patients.map((patient) => (
            <li className="border rounded p-2" key={patient.id}>
              <div className="font-medium">{patient.name}</div>
              <div className="text-sm text-slate-600">{patient.phone}</div>
              <div className="text-sm">{patient.medicalHistory || 'No history'}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
