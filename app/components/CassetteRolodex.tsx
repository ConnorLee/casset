"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CassetteDisplaySimple } from "./CassetteDisplaySimple"
import { ChevronUp, ChevronDown } from "lucide-react"

interface Cassette {
  artistName: string
  backgroundImage: string
  rotation?: number
  gradient?: string
}

interface CassetteRolodexProps {
  cassettes: Cassette[]
  isPaywallMode: boolean
}

export function CassetteRolodex({ cassettes, isPaywallMode }: CassetteRolodexProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(0)

  // Set window width after component mounts
  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setActiveIndex((prev) => (prev + 1) % cassettes.length)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setActiveIndex((prev) => (prev - 1 + cassettes.length) % cassettes.length)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        if (isAnimating) return

        setIsAnimating(true)
        if (e.deltaY > 0) {
          handleNext()
        } else {
          handlePrev()
        }
        setTimeout(() => setIsAnimating(false), 300)
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (isAnimating) return

        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          handlePrev()
        } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          handleNext()
        }
      }

      container.addEventListener("wheel", handleWheel, { passive: false })
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        container.removeEventListener("wheel", handleWheel)
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [isAnimating, cassettes.length])

  const getTransform = (index: number) => {
    const diff = index - activeIndex
    const baseYOffset = windowWidth >= 768 ? 120 : 150

    if (diff === 0) {
      return {
        y: 0,
        z: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
      }
    }

    if (Math.abs(diff) === 1) {
      const y = diff * baseYOffset
      // Add diagonal offset for stacked effect
      const x = diff > 0 ? -30 : 30
      return {
        y: y - 40, // Move up slightly
        x,
        z: -100,
        scale: 0.92,
        opacity: 0.9,
        rotate: diff > 0 ? -5 : 5,
      }
    }

    if (Math.abs(diff) === 2) {
      const y = diff * (baseYOffset * 0.7)
      const x = diff > 0 ? -60 : 60
      return {
        y: y - 80, // Move up more
        x,
        z: -200,
        scale: 0.85,
        opacity: 0.7,
        rotate: diff > 0 ? -10 : 10,
      }
    }

    return {
      y: 0,
      x: 0,
      z: -300,
      scale: 0,
      opacity: 0,
      rotate: 0,
    }
  }

  return (
    <div className="relative flex items-center gap-8">
      {/* Cassettes container */}
      <div
        ref={containerRef}
        className="relative w-full h-[500px] md:h-[400px]"
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
        }}
        tabIndex={0}
        aria-label="Cassette Carousel"
      >
        <AnimatePresence>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const index = (activeIndex + offset + cassettes.length) % cassettes.length
            const cassette = cassettes[index]
            const { y, x, z, scale, opacity, rotate } = getTransform(index)

            return (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={false}
                animate={{
                  y,
                  x,
                  z,
                  scale,
                  opacity,
                  rotateZ: rotate,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: 10 - Math.abs(offset),
                }}
              >
                <div className="transform-gpu">
                  <CassetteDisplaySimple {...cassette} isPaywallMode={isPaywallMode} index={index} rotation={0} />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <div className="absolute left-8 bottom-16 flex flex-col gap-4 z-20">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          disabled={isAnimating}
          aria-label="Previous cassette"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          disabled={isAnimating}
          aria-label="Next cassette"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Current cassette info */}
      <div className="absolute left-8 bottom-8 text-left z-20">
        <p className="text-lg font-medium opacity-60 font-satoshi">
          {activeIndex + 1} / {cassettes.length}
        </p>
      </div>
    </div>
  )
}
