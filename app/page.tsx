"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import "./styles/fonts.css"
import "./styles/hover-effects.css"
import { CassetteDisplayNew } from "./components/CassetteDisplayNew"
import { ArtistCarousel } from "./components/ArtistCarousel"
import TextCarousel from "./components/TextCarousel"
import StreamingLines from "./components/StreamingLines"
import type { Artist } from "./types/artist"
import { artists } from "./types/artist"
import { artistThemes } from "./types/artist-theme"
import { playlists } from "./data/playlists"
import { ArtistTag } from "./components/ArtistTag"

export default function NewLandingPage() {
  const [selectedArtist, setSelectedArtist] = useState<Artist>(artists[0])
  const [isSideA, setIsSideA] = useState(true)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [autoCycling, setAutoCycling] = useState(true)
  const autoCyclingRef = useRef(autoCycling)
  const selectedArtistRef = useRef(selectedArtist)

  useEffect(() => {
    setCurrentSongIndex(0)
  }, [isSideA])

  useEffect(() => {
    setAudio(new Audio())
  }, [])

  useEffect(() => {
    autoCyclingRef.current = autoCycling
  }, [autoCycling])

  useEffect(() => {
    selectedArtistRef.current = selectedArtist
  }, [selectedArtist])

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      if (autoCyclingRef.current) {
        const currentIndex = artists.findIndex((a) => a.id === selectedArtistRef.current.id)
        const nextIndex = (currentIndex + 1) % artists.length
        setSelectedArtist(artists[nextIndex])
      }
    }, 3000)

    return () => clearInterval(cycleInterval)
  }, [])

  const currentTheme = artistThemes[selectedArtist.id] || artistThemes["casset"]

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const skipTrack = (direction: "forward" | "backward") => {
    const playlist = isSideA ? playlists.connorJames : playlists.lilDurden
    if (playlist.length > 0) {
      let newIndex
      if (direction === "forward") {
        newIndex = (currentSongIndex + 1) % playlist.length
      } else {
        newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length
      }
      setCurrentSongIndex(newIndex)
      if (audio) {
        audio.src = playlist[newIndex].url
        audio.currentTime = playlist[newIndex].startTime
        if (isPlaying) {
          audio.play()
        }
      }
    }
  }

  const handleArtistSelect = useCallback((artist: Artist) => {
    setSelectedArtist(artist)
    setAutoCycling(false)
  }, [])

  const handleCassetteClick = useCallback(() => {
    setAutoCycling(false)
  }, [])

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2F1ED] to-[#E8E5D9] text-[#000033] relative overflow-hidden">
      <StreamingLines />
      <TextCarousel />

      <nav className="fixed top-8 w-full px-4 md:px-8 flex justify-between items-center z-50">
        <div className="w-20 md:w-24 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
          <span
            className="text-2xl md:text-3xl"
            style={{
              fontFamily: "'Cobra VIP', 'Arial Black', sans-serif",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            casset
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/app"
            className="px-4 py-1.5 bg-[#F1FF9B] text-[#000033] text-sm hover:bg-[#F1FF9B]/90 transition-colors"
            style={{ borderRadius: 0 }}
          >
            coming soon
          </Link>
        </div>
      </nav>

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-4 md:pt-0 px-8 md:px-16">
        {/* Mobile content */}
        <div className="md:hidden w-full px-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-3xl"
                style={{ fontFamily: "'Satoshi-Variable', sans-serif", letterSpacing: "-2px" }}
              >
                What's on your
              </span>
              <ArtistTag tag="casset" isActive={true} />
              <span className="text-3xl" style={{ fontFamily: "'Satoshi-Variable', sans-serif" }}>
                ?
              </span>
            </div>
            <p
              className="text-lg leading-relaxed font-normal"
              style={{ fontFamily: "'Satoshi-Variable', sans-serif", fontWeight: 400 }}
            >
              create a casset with exclusive content and tracks.
              <br />
              start earning from friends & fans.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <Link
                href="/app"
                className="px-6 py-2 bg-[#F1FF9B] text-[#000033] text-sm hover:bg-[#F1FF9B]/90 transition-colors"
                style={{ borderRadius: 0 }}
              >
                coming soon
              </Link>
              <Image
                src="https://mann172d906w0mrr.public.blob.vercel-storage.com/base-logo-Ejd0Pns9yJKAUAqVPiX5GedbvLoOgc.svg"
                alt="BASE"
                width={60}
                height={20}
                className="opacity-50 hover:opacity-100 transition-opacity"
                draggable="false"
              />
            </div>
          </motion.div>
        </div>

        {/* Left side - Artist Carousel and Cassette Player */}
        <div className="w-full md:w-3/5 flex flex-col items-center justify-center relative px-4 md:pr-8">
          <div className="w-full max-w-4xl mb-4 md:mb-[-60px] -mt-[4em] md:mt-0 scale-75 md:scale-90">
            <ArtistCarousel artists={artists} selectedArtist={selectedArtist} onArtistSelect={handleArtistSelect} />
          </div>

          {/* Cassette player - smaller and positioned better */}
          <div
            className="transform hover:scale-105 transition-transform duration-500 -mt-[5em] md:mt-[10px] scale-75 md:scale-85"
            onClick={handleCassetteClick}
          >
            <CassetteDisplayNew
              isSideA={isSideA}
              isPlaying={isPlaying}
              isLoading={false}
              currentTime={0}
              currentSongIndex={currentSongIndex}
              isShaking={false}
              showInfo={false}
              onTogglePlay={togglePlay}
              onSkip={skipTrack}
              onFlipCassette={() => setIsSideA(!isSideA)}
              onToggleInfo={() => {}}
              PREVIEW_DURATION={33}
              isAudioReady={true}
              theme={currentTheme.colors}
              useSkinGradient={true}
              selectedArtist={selectedArtist}
              rotation={Math.random() * 12 - 6}
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="hidden md:flex w-full md:w-2/5 flex-col justify-center pl-8 pr-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <svg
              width="120"
              height="58"
              viewBox="0 0 120 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <text x="2" y="42" fill="currentColor" fontSize="48" fontFamily="Cobra VIP">
                casset
              </text>
            </svg>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-4xl"
                style={{ fontFamily: "'Satoshi-Variable', sans-serif", letterSpacing: "-2px" }}
              >
                What's on your
              </span>
              <ArtistTag tag="casset" isActive={true} />
              <span className="text-4xl" style={{ fontFamily: "'Satoshi-Variable', sans-serif" }}>
                ?
              </span>
            </div>
            <p
              className="text-lg leading-relaxed font-normal"
              style={{ fontFamily: "'Satoshi-Variable', sans-serif", fontWeight: 400 }}
            >
              create a casset with exclusive content and tracks.
              <br />
              start earning from friends & fans.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <Link
                href="/app"
                className="px-6 py-2 bg-[#F1FF9B] text-[#000033] text-sm hover:bg-[#F1FF9B]/90 transition-colors"
                style={{ borderRadius: 0 }}
              >
                coming soon
              </Link>
              <Image
                src="https://mann172d906w0mrr.public.blob.vercel-storage.com/base-logo-Ejd0Pns9yJKAUAqVPiX5GedbvLoOgc.svg"
                alt="BASE"
                width={60}
                height={20}
                className="opacity-50 hover:opacity-100 transition-opacity"
                draggable="false"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="fixed bottom-4 md:bottom-8 w-full px-4 md:px-8 flex justify-between items-center text-xs font-bold">
        <span className="opacity-50">© 2025 CASSET</span>
        <div className="flex items-center gap-2 md:gap-8">
          <Link href="#" className="hover:opacity-100 opacity-50 transition-opacity">
            JOBS
          </Link>
          <Link href="#" className="hover:opacity-100 opacity-50 transition-opacity">
            MARKETING
          </Link>
          <Link href="#" className="hover:opacity-100 opacity-50 transition-opacity">
            CONTACT
          </Link>
        </div>
      </footer>
    </main>
  )
}
