"use client"

import { motion } from "framer-motion"

interface PriceTagProps {
  price: number
  isPaywallMode: boolean
}

export function PriceTag({ price, isPaywallMode }: PriceTagProps) {
  const displayPrice = isPaywallMode ? Math.floor(price) : price.toFixed(2)

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 ${isPaywallMode ? "bg-[#FF6B6B]" : "bg-[#4ADE80]"} rounded-full shadow-lg`}
    >
      <div className="flex items-center justify-center">
        <span
          className={`${isPaywallMode ? "text-[#FF6B6B] bg-[#FFA5A5]" : "text-[#4ADE80] bg-[#86EFAC]"} rounded-full w-4 h-4 flex items-center justify-center`}
          style={{ fontFamily: "'Cobra LL VIP Trial', sans-serif" }}
        >
          a
        </span>
      </div>
      <motion.span
        style={{ fontFamily: "'AeonikPro', sans-serif" }}
        className={`${isPaywallMode ? "text-[#4A0404]" : "text-[#052e16]"} font-medium`}
        key={displayPrice}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        ${displayPrice}
      </motion.span>
    </div>
  )
}
