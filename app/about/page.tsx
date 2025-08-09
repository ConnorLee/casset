"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import TextCarousel from "../components/TextCarousel"

export default function AboutPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-[#E8E5D9] text-[#000033] relative overflow-hidden">
      {/* Background Animation */}
      <TextCarousel />

      {/* Navigation */}
      <nav className="fixed top-8 w-full px-8 flex justify-between items-center z-50">
        <Link href="/">
          <div
            className="text-xl opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ fontFamily: "'Cobra VIP', sans-serif", fontWeight: "bold" }}
          >
            casset
          </div>
        </Link>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hover:opacity-70 transition-opacity"
      >
        <ChevronLeft size={32} className="text-[#000033]" />
      </button>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-8 py-32 relative z-10">
        <div className="max-w-2xl text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-normal leading-tight" style={{ fontFamily: "monospace" }}>
              Throw away your linktree
            </h1>
            <h2 className="text-2xl md:text-3xl font-normal leading-tight" style={{ fontFamily: "monospace" }}>
              Create a casset and earn from your art.
            </h2>
          </div>

          {/* Body Text */}
          <div className="space-y-4 max-w-xl mx-auto">
            <p
              className="text-base leading-snug text-gray-600"
              style={{ fontFamily: "'Autoscape Round LL Trial', sans-serif" }}
            >
              Casset was started by a musician and designer who understands the barrier between independent artists and
              revenue. Casset is simple, enjoyable music player dedicated to small artists.
            </p>
            <p
              className="text-base leading-snug text-gray-600"
              style={{ fontFamily: "'Autoscape Round LL Trial', sans-serif" }}
            >
              Save your favorite artists to your casset and access music made just for subscribers.
            </p>
          </div>

          {/* Signature */}
          <motion.div
            className="pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="text-2xl font-normal"
              style={{ fontFamily: "'AeonikPro', sans-serif", letterSpacing: "-1px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Love,
            </motion.div>
            <motion.div
              className="text-2xl font-bold mt-1"
              style={{ fontFamily: "'AeonikPro', sans-serif", letterSpacing: "-1px" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            >
              Connor
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-8 w-full px-8 flex justify-between items-center text-xs font-bold z-10">
        <span className="opacity-50">© CASSET 2025</span>
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
