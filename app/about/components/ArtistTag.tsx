"use client"

import { motion } from "framer-motion"

interface ArtistTagProps {
  tag: string
  isActive?: boolean
}

export function ArtistTag({ tag, isActive = false }: ArtistTagProps) {
  return (
    <motion.div className="inline-flex items-center bg-white rounded-full shadow-lg" whileHover={{ scale: 1.05 }}>
      <div className="flex items-center whitespace-nowrap flex-row-reverse px-4 py-2">
        <span className="text-[#0000FF] text-3xl ml-2" style={{ fontFamily: "'Cobra LL VIP Trial', sans-serif" }}>
          a
        </span>
        <span
          className="text-[#000033] text-xl tracking-[-1px]"
          style={{
            fontFamily: "'Superstudio Trial', sans-serif",
            fontWeight: isActive ? "bold" : "normal",
            letterSpacing: "0px",
          }}
        >
          {tag}
        </span>
      </div>
    </motion.div>
  )
}
