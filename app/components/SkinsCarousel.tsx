"use client"

import { motion } from "framer-motion"
import type { SkinConfig } from "../data/skins"
import { Lekton } from "next/font/google"

const lekton = Lekton({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
})

interface SkinsCarouselProps {
  skins: SkinConfig[]
  selectedSkin: string
  onSelectSkin: (skinId: string) => void
}

export function SkinsCarousel({ skins, selectedSkin, onSelectSkin }: SkinsCarouselProps) {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="space-y-4 p-4">
        {skins.map((skin) => (
          <motion.div
            key={skin.id}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedSkin === skin.id ? "scale-105" : "hover:scale-105"
            }`}
            onClick={() => onSelectSkin(skin.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`relative w-48 h-32 rounded-lg overflow-hidden ${
                selectedSkin === skin.id ? "ring-2 ring-black" : ""
              }`}
              style={{
                background: skin.colors.gradient,
                boxShadow: `0 4px 20px ${skin.colors.primary}40`,
              }}
            >
              <div
                className="absolute inset-0 backdrop-blur-[50px]"
                style={{
                  background: `${skin.colors.gradient}40`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`${lekton.className} text-sm font-bold`} style={{ color: skin.colors.text }}>
                  {skin.name}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

