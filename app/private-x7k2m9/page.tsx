"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppContent } from "../components/AppContent"

export default function PrivatePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem("auth-token")
    if (authToken === "authenticated") {
      setIsAuthenticated(true)
    } else {
      router.push("/gate")
    }
  }, [router])

  if (!isAuthenticated) {
    return null // Don't render anything until authentication is checked
  }

  return <AppContent />
}
