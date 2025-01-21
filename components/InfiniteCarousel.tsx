"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useScroll } from "framer-motion"
import CassetteCard from "./CassetteCard"

const gradients = [
  "linear-gradient(90deg, #FF6B6B, #4ECDC4)",
  "linear-gradient(90deg, #A8E6CF, #FFD3B6)",
  "linear-gradient(90deg, #D4A5A5, #392F5A)",
  "linear-gradient(90deg, #957DAD, #D291BC)",
  "linear-gradient(90deg, #9B5DE5, #00BBF9)",
]

export default function InfiniteCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const scrollAnimation = async () => {
      await controls.start({
        x: [0, -1920], // Adjust based on your content width
        transition: {
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      })
    }

    scrollAnimation()
  }, [controls])

  // Create duplicate cards for seamless loop
  const cards = [...Array(10)].map((_, i) => ({
    gradient: gradients[i % gradients.length],
    id: i,
  }))

  return (
    <div className="relative overflow-hidden w-full h-24 bg-black/5">
      <motion.div
        ref={containerRef}
        className="flex gap-4 absolute left-0 py-4"
        animate={controls}
        style={{
          width: "fit-content",
        }}
      >
        {/* Original set */}
        {cards.map((card) => (
          <CassetteCard key={card.id} gradient={card.gradient} index={card.id} />
        ))}
        {/* Duplicate set for seamless loop */}
        {cards.map((card) => (
          <CassetteCard key={`dup-${card.id}`} gradient={card.gradient} index={card.id} />
        ))}
      </motion.div>
    </div>
  )
}

