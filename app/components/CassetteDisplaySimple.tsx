"use client"

import { Swanky_and_Moo_Moo } from "next/font/google"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { PriceTag } from "./PriceTag"
import { useState, useEffect, useRef } from "react"

const swankyAndMooMoo = Swanky_and_Moo_Moo({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
})

interface CassetteDisplaySimpleProps {
  artistName: string
  backgroundImage: string
  gradient?: string
  index?: number
  initialPrice?: number
  isPaywallMode: boolean
}

export function CassetteDisplaySimple({
  artistName,
  backgroundImage,
  gradient,
  index = 0,
  initialPrice = Number((Math.random() * 3 + 1).toFixed(2)),
  isPaywallMode,
}: CassetteDisplaySimpleProps) {
  const initialPriceRef = useRef(initialPrice)
  const [price, setPrice] = useState(initialPriceRef.current)
  const controls = useAnimationControls()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    if (isPaywallMode) {
      setPrice(Math.floor(Math.random() * 50) + 1)
    } else {
      setPrice(initialPriceRef.current)
    }
  }, [isPaywallMode, isMounted])

  useEffect(() => {
    if (!isMounted || isPaywallMode) return

    const baseInterval = 5000 // 5 seconds
    const randomFactor = Math.random() * 2000 - 1000 // -1 to 1 second
    const interval = baseInterval + randomFactor

    const timer = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.3 // Reduced change for smoother animation
      const newPrice = Math.max(1, Math.min(4, price + change)) // Keep price between 1 and 4
      setPrice(newPrice)
      controls.start({
        opacity: [0.5, 1],
        y: [-5, 0],
        transition: { duration: 0.2 },
      })
    }, interval)

    return () => clearInterval(timer)
  }, [price, controls, isPaywallMode, isMounted])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className={`relative w-72 h-48 md:w-96 md:h-64 rounded-lg overflow-hidden ${swankyAndMooMoo.className}`}
    >
      {/* Background Image with Reduced Blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: gradient || "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* White Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-white" style={{ opacity: 0.8 }} />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col p-4">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="text-xs opacity-50" style={{ fontFamily: "'Cobra LL VIP Trial', sans-serif" }}>
            casset
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={price} animate={controls}>
              <PriceTag price={price} isPaywallMode={isPaywallMode} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center Text with Tape Pattern */}
        <div className="flex-1 flex items-center justify-center" style={{ transform: "translateY(-15%)" }}>
          <div className="relative">
            {/* Tape Pattern Background */}
            <svg
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-12"
              viewBox="0 0 192 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0L4 4L0 8L4 12L0 16L4 20L0 24L4 28L0 32L4 36L0 40L4 44L0 48H192L188 44L192 40L188 36L192 32L188 28L192 24L188 20L192 16L188 12L192 8L188 4L192 0H184L180 4L176 0H168L164 4L160 0H152L148 4L144 0H136L132 4L128 0H120L116 4L112 0H104L100 4L96 0H88L84 4L80 0H72L68 4L64 0H56L52 4L48 0H40L36 4L32 0H24L20 4L16 0H8L4 4L0 0Z"
                fill="white"
                fillOpacity="0.2"
              />
              <path
                d="M0 48L4 44L0 40L4 36L0 32L4 28L0 24L4 20L0 16L4 12L0 8L4 4L0 0H192L188 4L192 8L188 12L192 16L188 20L192 24L188 28L192 32L188 36L192 40L188 44L192 48H184L180 44L176 48H168L164 44L160 48H152L148 44L144 48H136L132 44L128 48H120L116 44L112 48H104L100 44L96 48H88L84 44L80 48H72L68 44L64 48H56L52 44L48 48H40L36 44L32 48H24L20 44L16 48H8L4 44L0 48Z"
                fill="black"
                fillOpacity="0.1"
              />
              <rect x="0" y="0" width="192" height="48" fill="white" fillOpacity="0.15" />
            </svg>

            {/* Artist Name */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className={`${swankyAndMooMoo.className} relative z-10`}>
                <div
                  className="text-2xl tracking-[0.05em] relative"
                  style={{
                    background: "linear-gradient(to bottom, #4a4a4a, #000000)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                  }}
                >
                  {artistName}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Subtitle */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex justify-between items-end">
            <div className="text-xs opacity-50" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              01.21.25
            </div>
            <div className="text-4xl font-thin opacity-30" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              21
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
