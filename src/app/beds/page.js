'use client'

import Breadcrumb from '@/components/home/breadcrum'
import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'

export default function BedsPage() {
  const [beds, setBeds] = useState([])

  useEffect(() => {
    fetchBeds()
  }, [])

  const fetchBeds = async () => {
    const { data, error } = await supabase
      .from('beds')
      .select(`
        *,
        patients (id, first_name, last_name)
      `)
    if (error) console.error('Error fetching beds:', error)
    else setBeds(data)
  }

  return (
    <div>
      <Breadcrumb title="Beds" />
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">Available Beds</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beds.map(bed => (
              <li key={bed.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-blue-600 mb-2">Bed {bed.bed_number}</h2>
                <p className="text-gray-700">Department: {bed.department}</p>
                <p className={`mt-2 text-sm ${bed.is_occupied ? 'text-red-600' : 'text-green-600'}`}>
                  {bed.is_occupied
                    ? `Occupied by ${bed.patients.first_name} ${bed.patients.last_name}`
                    : 'Available'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}