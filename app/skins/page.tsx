"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SkinsCarousel } from "../components/SkinsCarousel"
import { CassettePlayer } from "../components/CassettePlayer"
import { skins } from "../data/skins"
import { Lekton } from "next/font/google"
import "@/app/styles/globals.css"

const lekton = Lekton({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
})

export default function SkinsPage() {
  const [selectedSkin, setSelectedSkin] = useState(skins[0].id)
  const [isSideA, setIsSideA] = useState(true)

  const currentSkin = skins.find((skin) => skin.id === selectedSkin)!

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Left side - Skins carousel */}
          <div className="w-full md:w-1/3">
            <h2 className={`${lekton.className} text-2xl font-bold mb-6 text-black`}>Choose Your Skin</h2>
            <SkinsCarousel skins={skins} selectedSkin={selectedSkin} onSelectSkin={setSelectedSkin} />
          </div>

          {/* Right side - Cassette preview */}
          <div className="w-full md:w-2/3 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: currentSkin.colors.gradient,
                padding: "2rem",
                borderRadius: "1rem",
                backdropFilter: "blur(50px)",
                WebkitBackdropFilter: "blur(50px)",
              }}
            >
              <CassettePlayer
                isSideA={isSideA}
                onSideChange={setIsSideA}
                theme={currentSkin.colors}
                useSkinGradient={true}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

