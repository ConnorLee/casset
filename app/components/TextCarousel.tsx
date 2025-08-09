"use client"

import { useAnimationFrame } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function TextCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useAnimationFrame(() => {
    if (carouselRef.current && isMounted) {
      xRef.current -= 0.1
      if (xRef.current <= -50) {
        // Changed from -100 to -50 for smoother loop
        xRef.current = 0
      }
      carouselRef.current.style.transform = `translateX(${xRef.current}%)`
    }
  })

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed bottom-0 w-full overflow-hidden pointer-events-none">
      <div ref={carouselRef} className="whitespace-nowrap">
        {/* Duplicate images 4 times for smoother infinite loop */}
        {[0, 1, 2, 3].map((index) => (
          <svg
            key={index}
            width="6645"
            height="1035"
            viewBox="0 0 6645 1035"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[30vh] w-auto inline-block opacity-[0.02]"
          >
            <text x="50" y="800" fill="currentColor" fontSize="900" fontFamily="Cobra VIP" letterSpacing="20">
              casset casset casset casset casset casset casset casset casset casset casset casset
            </text>
          </svg>
        ))}
      </div>
    </div>
  )
}
