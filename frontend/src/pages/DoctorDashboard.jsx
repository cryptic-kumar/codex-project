import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import PatientManagement from '../components/PatientManagement'
import { DoctorApi } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function DoctorDashboard() {
  const { token } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [newAppointment, setNewAppointment] = useState({ patientId: '', appointmentDate: '', status: 'SCHEDULED' })

  const loadAppointments = async () => {
    setAppointments(await DoctorApi.getAppointments(token))
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  const createAppointment = async (e) => {
    e.preventDefault()
    await DoctorApi.addAppointment(token, {
      ...newAppointment,
      patientId: Number(newAppointment.patientId),
      appointmentDate: new Date(newAppointment.appointmentDate).toISOString().slice(0, 19),
    })
    setNewAppointment({ patientId: '', appointmentDate: '', status: 'SCHEDULED' })
    loadAppointments()
  }

  const updateStatus = async (id, status) => {
    await DoctorApi.updateAppointment(token, id, { status })
    loadAppointments()
  }

  return (
    <Layout title="Doctor Dashboard">
      <div className="mb-8">
        <PatientManagement />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={createAppointment}>
          <h3 className="font-semibold">Schedule Appointment</h3>
          <input className="w-full border p-2 rounded" placeholder="Patient ID" value={newAppointment.patientId} onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })} />
          <input type="datetime-local" className="w-full border p-2 rounded" value={newAppointment.appointmentDate} onChange={(e) => setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })} />
          <button className="bg-slate-900 text-white px-4 py-2 rounded">Create Appointment</button>
        </form>

        <section className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Appointments</h3>
          <ul className="space-y-2">
            {appointments.map((appointment) => (
              <li className="border p-2 rounded" key={appointment.id}>
                <div className="text-sm">Patient #{appointment.patientId} | {appointment.appointmentDate}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-medium">{appointment.status}</span>
                  <select
                    className="border rounded p-1"
                    value={appointment.status}
                    onChange={(e) => updateStatus(appointment.id, e.target.value)}>
                    <option>SCHEDULED</option>
                    <option>COMPLETED</option>
                    <option>CANCELLED</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}
