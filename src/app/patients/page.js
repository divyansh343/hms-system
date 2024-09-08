'use client'

import Breadcrumb from '@/components/home/breadcrum'
import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'

export default function PatientsPage() {
  const [patients, setPatients] = useState([])
  const [newPatient, setNewPatient] = useState({ first_name: '', last_name: '', date_of_birth: '' })
  const [editingPatient, setEditingPatient] = useState(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    const { data, error } = await supabase.from('patients').select('*')
    if (error) console.error('Error fetching patients:', error)
    else setPatients(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingPatient) {
      const { data, error } = await supabase
        .from('patients')
        .update(newPatient)
        .eq('id', editingPatient.id)
      if (error) console.error('Error updating patient:', error)
      else {
        setEditingPatient(null)
        fetchPatients()
      }
    } else {
      const { data, error } = await supabase.from('patients').insert([newPatient])
      if (error) console.error('Error adding patient:', error)
      else fetchPatients()
    }
    setNewPatient({ first_name: '', last_name: '', date_of_birth: '' })
  }

  const handleEdit = (patient) => {
    setEditingPatient(patient)
    setNewPatient(patient)
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('patients').delete().eq('id', id)
    if (error) console.error('Error deleting patient:', error)
    else fetchPatients()
  }

  return (
    <div>
      <Breadcrumb title="Patients" />
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-600 mb-8">Add Patients</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className="block text-gray-700 font-medium mb-1">First Name</label>
                  <input
                    id="first_name"
                    type="text"
                    placeholder="First Name"
                    value={newPatient.first_name}
                    onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-gray-700 font-medium mb-1">Last Name</label>
                  <input
                    id="last_name"
                    type="text"
                    placeholder="Last Name"
                    value={newPatient.last_name}
                    onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="date_of_birth" className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                <input
                  id="date_of_birth"
                  type="date"
                  value={newPatient.date_of_birth}
                  onChange={(e) => setNewPatient({ ...newPatient, date_of_birth: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition"
              >
                {editingPatient ? 'Update' : 'Add'} Patient
              </button>
            </form>
          </div>

          {/* List Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient List</h2>
            <ul className="space-y-4">
              {patients.map(patient => (
                <li key={patient.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-blue-600">{patient.first_name} {patient.last_name}</p>
                    <p className="text-gray-600">Date of Birth: {patient.date_of_birth}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(patient)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(patient.id)}
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