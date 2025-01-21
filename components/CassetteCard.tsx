"use client"

import { motion } from "framer-motion"

interface CassetteCardProps {
  gradient: string
  index: number
}

export default function CassetteCard({ gradient, index }: CassetteCardProps) {
  return (
    <motion.div
      className="relative w-64 h-16 rounded-lg overflow-hidden"
      style={{
        background: gradient,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border-2 border-white/30" />
        </div>
        <span className="text-white/90 text-sm" style={{ fontFamily: "'Permanent Marker', cursive" }}>
          CONNOR JAMES
        </span>
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border-2 border-white/30" />
        </div>
      </div>
    </motion.div>
  )
}

