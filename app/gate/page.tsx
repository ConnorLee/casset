"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { MovingBackground } from "@/components/moving-background"

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

export default function GatePage() {
  const [password, setPassword] = useState("")

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f5f5f3]">
      <MovingBackground />

      {/* Navigation */}
      <nav className="absolute right-6 top-6 flex items-center gap-6 z-50">
        <Link href="/about" className="text-sm font-medium tracking-wide">
          ABOUT
        </Link>
        <Link href="/app" className="rounded-full bg-[#ffff8a] px-4 py-1 text-sm font-medium hover:bg-[#ffff7a]">
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
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#818cf8] p-4">
              <div className="h-full w-full bg-white" />
            </div>
            <h1 className="text-xl font-bold tracking-wider">STUDIO LOCKED</h1>
            <p className="text-sm text-muted-foreground tracking-wide">ENTER PASSWORD</p>
          </div>

          <div className="w-full max-w-xs">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-0 bg-white px-4 py-2 text-center tracking-[0.5em] shadow-[0_2px_4px_rgba(0,0,0,0.04)] focus-visible:ring-0"
              maxLength={20}
            />
          </div>

          <button className="rounded-full bg-[#ffff8a] px-8 py-1.5 text-sm font-medium hover:bg-[#ffff7a] transition-colors">
            login
          </button>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-6 text-sm text-muted-foreground/30">casset!</div>
      </main>
    </div>
  )
}

