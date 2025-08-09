"use client"

import { motion } from "framer-motion"

interface ArtistTagProps {
  tag: string
  isActive?: boolean
}

export function ArtistTag({ tag, isActive = false }: ArtistTagProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-[#6366f1] text-lg font-bold">@</span>
      <span
        className="text-gray-900 font-medium"
        style={{
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "0.875rem",
          fontWeight: "500",
          letterSpacing: "-0.01em",
        }}
      >
        {tag}
      </span>
    </motion.div>
  )
}
