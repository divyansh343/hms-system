'use client'

import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return <button onClick={handleLogout}>Log Out</button>
}