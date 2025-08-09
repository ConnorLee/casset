"use client"

import { motion } from "framer-motion"

export function MovingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent_50%)]">
        <div className="relative h-[200vh] w-full">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-50%" }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "linear",
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-[40vh] font-bold text-black/[0.02]"
          >
            <div className="flex flex-col items-center justify-center leading-none">
              <div>casset!</div>
              <div>casset!</div>
              <div>casset!</div>
              <div>casset!</div>
              <div>casset!</div>
              <div>casset!</div>
              <div>casset!</div>
              <div>casset!</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
