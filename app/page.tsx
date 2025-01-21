"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import "./styles/fonts.css"
import "./styles/hover-effects.css"
import RadialAnimationsNew from "./components/RadialAnimationsNew"
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
        <Image
          src="/images/casset-logo.svg"
          alt="Casset"
          width={104}
          height={50}
          className="w-20 md:w-24 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          priority
          draggable="false"
        />
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

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-4 md:pt-0">
        {/* Mobile content */}
        <div className="md:hidden w-full px-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div
              className="text-4xl opacity-70"
              style={{ fontFamily: "'Cobra LL VIP Trial', sans-serif", fontWeight: "200" }}
            >
              casset
            </div>
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
                src="/images/base-logo.svg"
                alt="BASE"
                width={60}
                height={20}
                className="opacity-50 hover:opacity-100 transition-opacity"
                draggable="false"
              />
            </div>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-start relative px-4 md:pr-8 mt-4 md:-mt-48">
          <div className="w-full max-w-2xl mb-8 md:mb-[-80px] -mt-[4em] md:mt-0">
            <ArtistCarousel artists={artists} selectedArtist={selectedArtist} onArtistSelect={handleArtistSelect} />
          </div>
          <div
            className="transform hover:scale-105 transition-transform duration-500 -mt-[7em] md:mt-[20px]"
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

        {/* Desktop content */}
        <div className="hidden md:flex w-full md:w-1/2 flex-col justify-center pl-16 pr-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Remove this div */}
            {/* <div
              className="hidden md:block text-6xl opacity-70"
              style={{ fontFamily: "'Cobra LL VIP Trial', sans-serif", fontWeight: "200" }}
            >
              casset
            </div> */}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casset%20copy%203-WAa2H8yl8balsP7xvDa1bXZTN8FnoZ.svg"
              alt="Casset"
              width={140}
              height={68}
              className="hidden md:block opacity-70 hover:opacity-100 transition-opacity"
              priority
              draggable="false"
            />
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-5xl"
                style={{ fontFamily: "'Satoshi-Variable', sans-serif", letterSpacing: "-2px" }}
              >
                What's on your
              </span>
              <ArtistTag tag="casset" isActive={true} />
              <span className="text-5xl" style={{ fontFamily: "'Satoshi-Variable', sans-serif" }}>
                ?
              </span>
            </div>
            <p
              className="text-xl leading-relaxed font-normal"
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
                src="/images/base-logo.svg"
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

