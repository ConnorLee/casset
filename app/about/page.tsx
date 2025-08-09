"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import InfiniteCarousel from "./components/InfiniteCarousel"
import Navigation from "./components/Navigation"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2F1ED] to-[#E8E5D9] text-[#000033] relative">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          {/* Left Column */}
          <div className="space-y-6">
            <p className="text-lg leading-relaxed" style={{ fontFamily: "'Autiscape Round LL Trial', sans-serif" }}>
              Casset was started by a musician and designer who understands the barrier between independent artists and
              any revenue. Casset is simple, enjoyable music player dedicated to small artists.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-6 text-right">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Autiscape Round LL Trial', sans-serif" }}>
              Throw away your linktree
            </h2>
            <p className="text-lg" style={{ fontFamily: "'Autiscape Round LL Trial', sans-serif" }}>
              Create a casset and earn from your art.
            </p>
          </div>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-48 h-48">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%20Copy%2080-pfXyexwy4NFBmS2mg43Dc41FGHYQDY.png"
              alt="Casset Logo"
              width={192}
              height={192}
              className="rounded-full"
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(102, 102, 255, 1)",
                  "0 0 0 20px rgba(102, 102, 255, 1)",
                  "0 0 0 0 rgba(102, 102, 255, 1)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>

      {/* Infinite Carousel */}
      <div className="fixed bottom-16 left-0 right-0">
        <InfiniteCarousel />
      </div>

      {/* Footer */}
      <footer className="fixed bottom-8 w-full px-8 flex justify-between items-center text-xs font-bold">
        <span className="opacity-50">© 2025 CASSET</span>
        <div className="flex items-center gap-8">
          <Link href="/jobs" className="hover:opacity-100 opacity-50 transition-opacity">
            JOBS
          </Link>
          <Link href="/marketing" className="hover:opacity-100 opacity-50 transition-opacity">
            MARKETING
          </Link>
          <Link href="/contact" className="hover:opacity-100 opacity-50 transition-opacity">
            CONTACT
          </Link>
        </div>
      </footer>
    </main>
  )
}
