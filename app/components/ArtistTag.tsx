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
      <svg width="20" height="20" viewBox="0 0 312 688" className="text-[#6366f1]" xmlns="http://www.w3.org/2000/svg">
        <text
          transform="translate(149, 344) rotate(1) translate(-149, -344)"
          fill="currentColor"
          fontFamily="CobraLLVIPTrial-500, Cobra LL VIP Trial"
          fontSize="620.165992"
          fontWeight="normal"
          letterSpacing="-19.88424"
        >
          <tspan x="6" y="543">
            a
          </tspan>
        </text>
      </svg>
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
