"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { MovingBackground } from "@/components/moving-background"
import { useRouter } from "next/navigation"

const FloatingCard = ({ src, className }: { src: string; className: string }) => (
  <motion.div
    initial={{ y: 0, rotate: 0 }}
    animate={{
      y: [-20, 20, -20],
      rotate: [-5, 5, -5],
    }}
    transition={{
      duration: 12,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
    className={`absolute ${className}`}
  >
    <div className="rounded-2xl bg-white p-3 shadow-[0_8px_16px_rgba(0,0,0,0.08)]">
      <Image src={src || "/placeholder.svg"} alt="Floating card" width={300} height={150} className="rounded-xl" />
    </div>
  </motion.div>
)

export default function PlayPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password.toLowerCase() === "reelitin") {
      // Set authentication token in localStorage
      localStorage.setItem("auth-token", "authenticated")
      // Redirect to private page
      router.push("/private-x7k2m9")
    } else {
      setError("Incorrect password")
      setTimeout(() => setError(""), 3000)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <MovingBackground />

      {/* Navigation */}
      <nav className="absolute right-6 top-6 flex items-center gap-6 z-50">
        <Link href="/about" className="text-sm font-medium tracking-wide text-white/80 hover:text-white">
          ABOUT
        </Link>
        <Link
          href="/app"
          className="rounded-full bg-[#ffff8a] px-4 py-1 text-sm font-medium hover:bg-[#ffff7a] text-black"
        >
          app
        </Link>
      </nav>

      {/* Floating Cards */}
      <FloatingCard
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-blurry-photo-of-a-clock-on-a-wall-87PP9Zd7MNo%20Copy%2013-XojIQKb1zSdWbEfkicvqe1lBPCwsgB.png"
        className="left-[15%] top-[20%]"
      />
      <FloatingCard
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-blurry-photo-of-a-clock-on-a-wall-87PP9Zd7MNo%20Copy%2014-IXi3rWMlpouMPvOzdkcZRVTKjj3gzN.png"
        className="right-[15%] top-[15%]"
      />
      <FloatingCard
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-blurry-photo-of-a-clock-on-a-wall-87PP9Zd7MNo%20Copy%2012-GqneCxsaLnV1DvcPkEVjeTb7k2nxi0.png"
        className="left-[20%] bottom-[25%]"
      />
      <FloatingCard
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a-blurry-photo-of-a-clock-on-a-wall-87PP9Zd7MNo%20Copy%2012-fNwehpcxXRLQkiF149ZPLddsLiWQiJ.png"
        className="right-[20%] bottom-[20%]"
      />

      {/* Main Content */}
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2010-QAjWhUiCnRa0mwzhKi9bI0Oaba5ZMK.png"
                alt="Casset Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-wider text-white">CASSET PLAYER</h1>
            <p className="text-sm text-white/70 tracking-wide">SELECT YOUR EXPERIENCE</p>
          </div>

          {/* Player Options */}
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Link
              href="/connor"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm border border-white/20 p-6 hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Connor James</h3>
                  <p className="text-white/70 text-sm">Electronic • Ambient</p>
                </div>
              </div>
            </Link>

            <Link
              href="/lildurden"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/80 to-cyan-600/80 backdrop-blur-sm border border-white/20 p-6 hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Lil Durden</h3>
                  <p className="text-white/70 text-sm">Hip-Hop • Trap</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Password Section (Hidden by default, can be toggled) */}
          <div className="mt-8 opacity-30 hover:opacity-100 transition-opacity duration-300">
            <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center gap-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Developer access"
                className="border-0 bg-white/10 backdrop-blur-sm px-4 py-2 text-center tracking-[0.3em] text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-white/30"
                maxLength={20}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-red-400"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="rounded-full bg-white/20 backdrop-blur-sm px-6 py-1.5 text-sm font-medium text-white hover:bg-white/30 transition-colors border border-white/30"
              >
                access
              </button>
            </form>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-6 text-sm text-white/30">casset!</div>
      </main>
    </div>
  )
}
