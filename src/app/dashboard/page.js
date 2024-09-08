'use client'

import { useAuth } from '@/components/AuthProvider'
import { useEffect, useState } from 'react'
import Logout from '@/components/Logout'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'

export default function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('hospital_workers')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
    } else {
      setProfile(data)
    }
  }

  if (!user) return <div className="flex items-center justify-center min-h-screen ">Loading...</div>

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">Welcome, {profile?.full_name || user.email}</h1>
        <div className="mb-6">
          <p className="text-base sm:text-lg font-medium text-gray-700">Role: <span className="font-normal text-gray-500">{profile?.role || 'Not assigned'}</span></p>
          <p className="text-base sm:text-lg font-medium text-gray-700">Department: <span className="font-normal text-gray-500">{profile?.department || 'Not assigned'}</span></p>
        </div>
        <nav className="space-y-4">
          <Link href="/patients" className="block p-4 bg-blue-50 rounded-lg shadow hover:bg-blue-100 transition">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-600">Manage Patients</h2>
            <p className="text-gray-600 text-sm sm:text-base">View and manage patient records.</p>
          </Link>
          <Link href="/inventory" className="block p-4 bg-blue-50 rounded-lg shadow hover:bg-blue-100 transition">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-600">Manage Inventory</h2>
            <p className="text-gray-600 text-sm sm:text-base">Track and manage medical supplies.</p>
          </Link>
          <Link href="/appointments" className="block p-4 bg-blue-50 rounded-lg shadow hover:bg-blue-100 transition">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-600">Manage Appointments</h2>
            <p className="text-gray-600 text-sm sm:text-base">Schedule and manage patient appointments.</p>
          </Link>
          <Link href="/beds" className="block p-4 bg-blue-50 rounded-lg shadow hover:bg-blue-100 transition">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-600">Available Beds</h2>
            <p className="text-gray-600 text-sm sm:text-base">View the availability of beds in the hospital.</p>
          </Link>
        </nav>
        <div className="mt-6 text-red-600">
          <Logout />
        </div>
      </div>
    </div>
  )
}