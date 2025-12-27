"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to portals page
    router.push("/portals")
  }, [router])

  // Show loading screen while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-red-600 p-3 rounded-2xl shadow-lg shadow-red-500/30 animate-pulse">
            <Heart size={32} className="text-white" fill="currentColor" />
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Health<span className="text-red-600">Save</span>
          </h1>
        </div>
        <p className="text-slate-600 font-medium">Loading portal selection...</p>
      </div>
    </div>
  )
}
