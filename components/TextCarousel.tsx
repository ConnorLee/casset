"use client"

import { motion, useAnimationFrame } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function TextCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)

  useAnimationFrame(() => {
    if (carouselRef.current) {
      xRef.current -= 0.1 // Decreased from 0.2 to 0.1
      if (xRef.current <= -100) {
        xRef.current = 0
      }
      carouselRef.current.style.transform = `translateX(${xRef.current}%)`
    }
  })

  return (
    <div className="fixed bottom-0 w-full overflow-hidden pointer-events-none">
      <div ref={carouselRef} className="whitespace-nowrap">
        {[0, 1].map((index) => (
          <Image
            key={index}
            src="/images/casset-text-carousel.svg" // Update to use a local file
            alt="casset"
            width={6645}
            height={1035}
            className="h-[30vh] w-auto inline-block opacity-60"
            draggable="false"
          />
        ))}
      </div>
    </div>
  )
}

