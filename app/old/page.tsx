"use client"

import Image from "next/image"
import { Space_Mono, Lekton } from "next/font/google"
import AnimatedHeaderLogo from "../components/AnimatedHeaderLogo"
import AnimatedTopLogo from "../components/AnimatedTopLogo"
import BackgroundAnimations from "../components/BackgroundAnimations"
import CassettePlayer from "../components/CassettePlayer"
import { useState } from "react"
import "../styles/fonts.css"
import Link from "next/link"

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
})

const lekton = Lekton({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
})

export default function Home() {
  const [isSideA, setIsSideA] = useState(true)

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_hsl(260,100%,3%)_0%,_hsl(200,100%,2%)_50%,_hsl(140,100%,1%)_100%)] text-white relative overflow-hidden flex flex-col items-center justify-center px-2 md:px-4">
      <BackgroundAnimations />

      {/* Top left logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 md:left-8 md:transform-none z-20 hidden md:block">
        <AnimatedTopLogo />
      </div>

      {/* Logo Section - adjust top margin */}
      <div className="relative z-10 mb-8 md:mb-16 mt-4 md:mt-0">
        <div className="flex flex-col items-center gap-4">
          <AnimatedHeaderLogo />
        </div>
      </div>

      {/* Content - added more spacing */}
      <div className="relative z-10 text-center max-w-2xl mb-8 md:mb-16 mt-8">
        <div className="flex items-center justify-center mb-6">
          <h1 className={`${lekton.className} text-xl md:text-3xl font-normal leading-tight flex items-center`}>
            <div className="mr-2 text-[#F1FF9B] text-2xl md:text-3xl animate-blink">|</div>Create a casset with
            exclusive content and tracks.
          </h1>
        </div>
        <p className={`${lekton.className} text-[#F1FF9B] text-lg md:text-xl tracking-[0.2em]`}>AND EARN INSTANTLY</p>
        <div className="flex flex-col items-center mt-12">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/url-QE3tOEPazxW1erNEzDVCSH9WhD4GUP.png"
            alt="BASE"
            width={60}
            height={20}
            className="opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Cassette Player */}
      <div className="relative z-10 w-full max-w-md transform hover:rotate-0 rotate-[-5deg] transition-all duration-500 hover:scale-105 -mb-20">
        <CassettePlayer isSideA={isSideA} onSideChange={setIsSideA} />
      </div>

      {/* Bottom Center Logo */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%2011.02.11%E2%80%AFPM%20Copy%204-Wt8LZIBBYHB5yvHq0pvFKipWDPknJP.png"
          alt="Casset"
          width={120}
          height={30}
          className="h-[15px] w-auto"
        />
      </div>

      {/* Add before the Copyright Text */}
      <Link
        href="/"
        className={`${lekton.className} absolute top-8 right-8 z-20 text-sm text-gray-400 hover:text-white transition-colors`}
      >
        NEW →
      </Link>

      {/* Copyright Text */}
      <p
        className="absolute bottom-8 left-8 z-20 text-xs opacity-15 uppercase"
        style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
      >
        © CASSET 2025
      </p>
    </main>
  )
}

