"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function PlayPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "dev123") {
      window.location.href = "/private-x7k2m9"
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casset-1VeeIJGLAluNE9b4Cn7PdyHM3CXt4f.png"
              alt="Casset"
              width={48}
              height={48}
              className="opacity-90"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">CASSET PLAYER</h1>
          <p className="text-xl text-white/70 font-light">SELECT YOUR EXPERIENCE</p>
        </div>

        {/* Player Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full max-w-4xl">
          {/* Connor James Card */}
          <Link href="/connor" className="group">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:bg-gradient-to-br hover:from-purple-500/30 hover:to-pink-500/30 animate-float">
              <div className="text-center">
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  C
                </div>

                {/* Artist Info */}
                <h3 className="text-2xl font-bold text-white mb-2">Connor James</h3>
                <p className="text-white/70 mb-4">Alternative • Indie Rock</p>

                {/* Stats */}
                <div className="flex justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-white font-bold">21</div>
                    <div className="text-white/60">TRACKS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">2</div>
                    <div className="text-white/60">VIDEOS</div>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Link>

          {/* Lil Durden Card */}
          <Link href="/lildurden" className="group">
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-cyan-500/30 animate-float-delay">
              <div className="text-center">
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  L
                </div>

                {/* Artist Info */}
                <h3 className="text-2xl font-bold text-white mb-2">Lil Durden</h3>
                <p className="text-white/70 mb-4">Hip-Hop • Experimental</p>

                {/* Stats */}
                <div className="flex justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-white font-bold">15</div>
                    <div className="text-white/60">TRACKS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">1</div>
                    <div className="text-white/60">VIDEOS</div>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </Link>
        </div>

        {/* Developer Access */}
        <div className="w-full max-w-sm">
          <form onSubmit={handlePasswordSubmit} className="relative">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Developer access..."
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 6s ease-in-out infinite 1s;
        }
      `}</style>
    </main>
  )
}
