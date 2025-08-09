"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function StreamingLines() {
  const [lines, setLines] = useState<Array<{ id: number; delay: number; y: number }>>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Create 8 lines with different positions and delays
    const newLines = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.5,
      y: i * 200 + Math.random() * 100, // Distribute lines across the page
    }))
    setLines(newLines)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute w-full h-[1px] opacity-[0.06]"
          style={{ top: line.y }}
          initial={{ x: "100%" }}
          animate={{
            x: "-100%",
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: line.delay,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `repeating-linear-gradient(
            90deg,
            currentColor 0%,
            currentColor 6px,
            transparent 6px,
            transparent 12px
          )`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
