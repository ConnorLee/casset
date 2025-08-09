"use client"

import { motion } from "framer-motion"
import "../styles/hover-effects.css"

interface ArtistTagProps {
  tag: string
  isActive?: boolean
}

export function ArtistTag({ tag, isActive = false }: ArtistTagProps) {
  const rotation = 1
  return (
    <motion.div
      className="inline-flex items-center rounded-full shadow-lg transform artist-tag"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      style={{
        background: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="flex items-center whitespace-nowrap px-4 py-1.5">
        <div className="mr-2 flex items-center justify-center">
          <svg
            width="20"
            height="46"
            viewBox="0 0 20 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-auto"
          >
            <text x="0" y="35" fill="#0000FF" fontSize="40" fontFamily="Cobra VIP">
              a
            </text>
          </svg>
        </div>
        <span
          className="text-[#000033]"
          style={{
            fontFamily: "'AeonikPro', sans-serif",
            fontWeight: "900",
            fontSize: "1.5em",
            letterSpacing: "-0.02em",
          }}
        >
          {tag}
        </span>
      </div>
    </motion.div>
  )
}
