"use client"

import Link from "next/link"
import { CassetteRolodex } from "../components/CassetteRolodex"
import StreamingLines from "../components/StreamingLines"
import TextCarousel from "../components/TextCarousel"
import { ToggleSwitch } from "../components/ToggleSwitch"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Space_Grotesk } from "next/font/google"

const satoshi = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-satoshi",
})

// Move cassettes data outside of component to avoid window reference issues
const cassettes = [
  {
    artistName: "CASSET",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-21%20at%208.56.53%E2%80%AFPM%20Copy%202-bmCTDWKr0zDTAuKm7eYsODpQ3NHbDe.png",
    gradient: "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.1))",
  },
  {
    artistName: "CONNOR JAMES",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-21%20at%208.20.05%E2%80%AFPM%20Copy%202-LJez2YLzM6DCL1gOifuml28yUJFvss.png",
    gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))",
  },
  {
    artistName: "LIL DURDEN",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-21%20at%208.57.30%E2%80%AFPM%20Copy%202-l0eVGBYKqaKHnKar4eCN9Xw9dJjtS8.png",
    gradient: "linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(202, 138, 4, 0.1))",
  },
  {
    artistName: "CONNOR JAMES",
    subtitle: "STUDIO SESSIONS",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-21%20at%2010.58.39%E2%80%AFPM-XuAXB1JIzoQ8IwpPlXt358ag19SWdG.png",
    gradient: "linear-gradient(135deg, rgba(255, 191, 0, 0.2), rgba(100, 100, 100, 0.1))",
  },
  {
    artistName: "CONNOR JAMES",
    subtitle: "LIVE TAKES",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-21%20at%2010.58.51%E2%80%AFPM-Y44R851MzY8BTz2SSTObjszqYL5x41.png",
    gradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(200, 200, 200, 0.1))",
  },
  {
    artistName: "CONNOR JAMES",
    subtitle: "MIDNIGHT MIXING",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-21%20at%2010.59.02%E2%80%AFPM-Wa3AWgoco5R588Kuk1PskdTZ75LBsO.png",
    gradient: "linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(0, 0, 139, 0.1))",
  },
  {
    artistName: "BABY KOI",
    subtitle: "Puppy Love Sessions",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/938A6844-5789-4319-863D-6A90F4A26B05-UtE2vXrfYCKvP6E8tcRsBkbGw5a7Lm.jpeg",
    gradient: "linear-gradient(135deg, rgba(255, 218, 185, 0.2), rgba(255, 192, 203, 0.1))",
  },
  {
    artistName: "BABY KOI",
    subtitle: "Purple Nights",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1367-MSxHCcI0h1OsF6RBSTfqZbiPgi2OZ3.png",
    gradient: "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(75, 0, 130, 0.1))",
  },
  {
    artistName: "BABY KOI",
    subtitle: "Midnight Drive",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HEIF%20Image-UZQ1L3xYmdJxNOGxw7AWObUmxi5gWc.jpeg",
    gradient: "linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(169, 169, 169, 0.1))",
  },
]

export default function GalleryPage() {
  const [isPaywallMode, setIsPaywallMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to detect client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleToggle = (isPaywall: boolean) => {
    setIsPaywallMode(isPaywall)
  }

  return (
    <main
      className={`min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2F1ED] to-[#E8E5D9] text-[#000033] relative overflow-hidden ${satoshi.variable} font-satoshi`}
    >
      {isClient && <StreamingLines />}
      {isClient && <TextCarousel />}

      <nav className="fixed top-8 w-full px-4 md:px-8 flex justify-between items-center z-50">
        <Link href="/" aria-label="Go to homepage">
          <svg
            width="104"
            height="50"
            viewBox="0 0 104 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 md:w-24 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <text x="2" y="35" fill="currentColor" fontSize="40" fontFamily="Cobra VIP">
              casset
            </text>
          </svg>
        </Link>
        <Link
          href="/app"
          className="px-4 py-1.5 bg-[#F1FF9B] text-[#000033] text-sm hover:bg-[#F1FF9B]/90 transition-colors"
          style={{ borderRadius: 0 }}
        >
          coming soon
        </Link>
      </nav>

      <div className="min-h-screen flex flex-col md:flex-row items-start justify-center gap-8 pt-32 pb-16 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 md:pr-8"
        >
          {isClient && <CassetteRolodex cassettes={cassettes} isPaywallMode={isPaywallMode} />}
        </motion.div>
        <div className="w-full md:w-1/2 md:pl-8 mt-8 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            {isClient && <ToggleSwitch onToggle={handleToggle} />}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={isPaywallMode ? "paywall" : "prices"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="font-satoshi"
            >
              <h2 className="text-3xl font-[900] mb-4" style={{ fontFamily: "'Satoshi-Variable', sans-serif" }}>
                {isPaywallMode ? "Paywall Mode" : "Featured Cassettes"}
              </h2>
              <p className="text-lg mb-4" style={{ fontFamily: "'Satoshi-Variable', sans-serif", fontWeight: 400 }}>
                {isPaywallMode
                  ? "Set a price for exclusive access to your content."
                  : "Create a casset with videos or music."}
              </p>
              <p className="text-lg" style={{ fontFamily: "'Satoshi-Variable', sans-serif", fontWeight: 400 }}>
                {isPaywallMode
                  ? "Fans pay once to unlock all your content."
                  : "Use arrow keys or scroll to navigate through the carousel."}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <footer className="fixed bottom-4 md:bottom-8 w-full px-4 md:px-8 flex justify-between items-center text-xs font-bold">
        <span className="opacity-50">© 2025 CASSET</span>
        <div className="flex items-center gap-2 md:gap-8">
          <Link href="/about" className="hover:opacity-100 opacity-50 transition-opacity">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:opacity-100 opacity-50 transition-opacity">
            CONTACT
          </Link>
        </div>
      </footer>
    </main>
  )
}
