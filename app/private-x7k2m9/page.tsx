'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppContent } from '../components/AppContent'

export default function PrivatePage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('auth-token') === 'authenticated'
    if (!isAuth) {
      router.push('/gate')
    }
  }, [router])

  return <AppContent />
}

