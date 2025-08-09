"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface ToggleSwitchProps {
  onToggle: (isPaywall: boolean) => void
}

export function ToggleSwitch({ onToggle }: ToggleSwitchProps) {
  const [isPaywall, setIsPaywall] = useState(false)

  const handleToggle = () => {
    setIsPaywall(!isPaywall)
    onToggle(!isPaywall)
  }

  return (
    <div className="flex items-center justify-start space-x-4">
      <span className={`text-sm transition-colors duration-300 ${isPaywall ? "opacity-50" : "font-bold"} font-satoshi`}>
        Prices
      </span>
      <motion.button
        onClick={handleToggle}
        className={`w-16 h-8 flex items-center rounded-full p-1 ${
          isPaywall ? "bg-[#F1FF9B]" : "bg-gray-300"
        } transition-colors duration-300 focus:outline-none`}
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-white"
          animate={{ x: isPaywall ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.button>
      <span className={`text-sm transition-colors duration-300 ${isPaywall ? "font-bold" : "opacity-50"} font-satoshi`}>
        Paywall
      </span>
    </div>
  )
}
