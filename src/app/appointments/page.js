'use client'

import Breadcrumb from '@/components/home/breadcrum'
import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [newAppointment, setNewAppointment] = useState({ patient_id: '', department: '', appointment_date: '', status: 'scheduled' })
  const [patients, setPatients] = useState([])
  const [editingAppointment, setEditingAppointment] = useState(null)

  useEffect(() => {
    fetchAppointments()
    fetchPatients()
  }, [])

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients (id, first_name, last_name)
      `)
    if (error) console.error('Error fetching appointments:', error)
    else setAppointments(data)
  }

  const fetchPatients = async () => {
    const { data, error } = await supabase.from('patients').select('id, first_name, last_name')
    if (error) console.error('Error fetching patients:', error)
    else setPatients(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingAppointment) {
      const { data, error } = await supabase
        .from('appointments')
        .update(newAppointment)
        .eq('id', editingAppointment.id)
      if (error) console.error('Error updating appointment:', error)
      else {
        setEditingAppointment(null)
        fetchAppointments()
      }
    } else {
      const { data, error } = await supabase.from('appointments').insert([newAppointment])
      if (error) console.error('Error adding appointment:', error)
      else fetchAppointments()
    }
    setNewAppointment({ patient_id: '', department: '', appointment_date: '', status: 'scheduled' })
  }

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment)
    setNewAppointment({
      patient_id: appointment.patient_id,
      department: appointment.department,
      appointment_date: appointment.appointment_date,
      status: appointment.status
    })
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id)
    if (error) console.error('Error deleting appointment:', error)
    else fetchAppointments()
  }

  return (
    <div>
      <Breadcrumb title="Appointments" />
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-600 mb-8">Manage Appointments</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="patient_id" className="block text-gray-700 font-medium mb-1">Patient</label>
                  <select
                    id="patient_id"
                    value={newAppointment.patient_id}
                    onChange={(e) => setNewAppointment({ ...newAppointment, patient_id: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.first_name} {patient.last_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="department" className="block text-gray-700 font-medium mb-1">Department</label>
                  <input
                    id="department"
                    type="text"
                    placeholder="Department"
                    value={newAppointment.department}
                    onChange={(e) => setNewAppointment({ ...newAppointment, department: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="appointment_date" className="block text-gray-700 font-medium mb-1">Appointment Date</label>
                <input
                  id="appointment_date"
                  type="datetime-local"
                  value={newAppointment.appointment_date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-gray-700 font-medium mb-1">Status</label>
                <select
                  id="status"
                  value={newAppointment.status}
                  onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition"
              >
                {editingAppointment ? 'Update' : 'Add'} Appointment
              </button>
            </form>
          </div>

          {/* List Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Appointment List</h2>
            <ul className="space-y-4">
              {appointments.map(appointment => (
                <li key={appointment.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-blue-600">
                      {appointment.patients.first_name} {appointment.patients.last_name}
                    </p>
                    <p className="text-gray-600">Department: {appointment.department}</p>
                    <p className="text-gray-600">Date: {new Date(appointment.appointment_date).toLocaleString()}</p>
                    <p className={`text-gray-600 ${appointment.status === 'completed' ? 'text-green-600' : appointment.status === 'cancelled' ? 'text-red-600' : ''}`}>Status: {appointment.status}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(appointment)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}