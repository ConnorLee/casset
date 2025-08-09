"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AnimatedLogo() {
  return (
    <div className="relative">
      {/* Ripple animations - only visible on hover */}
      <div className="absolute inset-0 group-hover:opacity-100 opacity-0 transition-opacity">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-[#F1FF9B]"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{
              duration: 1.5,
              delay: i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="relative group">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-17%20at%2012.16.05%E2%80%AFAM-VSygIlkni72AwIjgpQ0azj7eTkQo4u.png"
          alt="Casset Logo"
          width={40}
          height={40}
          className="opacity-50 hover:opacity-100 transition-opacity"
        />
      </motion.div>
    </div>
  )
}
