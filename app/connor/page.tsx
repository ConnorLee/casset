"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { playlists } from "../data/playlists"
import { CassetteDisplay } from "../components/CassetteDisplay"
import { Lekton } from "next/font/google"
import Link from "next/link"
import Image from "next/image"

const lekton = Lekton({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
})

export default function ConnorPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const PREVIEW_DURATION = 33

  const connorJamesSongs = playlists.connorJames

  const loadSong = useCallback(
    async (index: number) => {
      if (!audioRef.current) return false

      setIsLoading(true)
      setIsAudioReady(false)

      const song = connorJamesSongs[index]
      audioRef.current.src = song.url

      try {
        await audioRef.current.load()
        audioRef.current.currentTime = song.startTime
        setIsLoading(false)
        return true
      } catch (error) {
        console.error("Error loading song:", error)
        setIsLoading(false)
        return false
      }
    },
    [connorJamesSongs],
  )

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      const currentSong = connorJamesSongs[currentSongIndex]
      const elapsedTime = audio.currentTime - currentSong.startTime

      setCurrentTime(elapsedTime)

      if (elapsedTime >= PREVIEW_DURATION) {
        audio.currentTime = currentSong.startTime
      }
    }
  }, [currentSongIndex, connorJamesSongs])

  const handleSongEnd = useCallback(() => {
    const nextIndex = (currentSongIndex + 1) % connorJamesSongs.length
    setCurrentSongIndex(nextIndex)
    setCurrentTime(0)

    loadSong(nextIndex).then((success) => {
      if (success && audioRef.current && isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    })
  }, [currentSongIndex, isPlaying, loadSong, connorJamesSongs.length])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener("timeupdate", updateTime)
      audio.addEventListener("ended", handleSongEnd)
      audio.addEventListener("canplaythrough", () => setIsAudioReady(true))
      audio.addEventListener("waiting", () => setIsAudioReady(false))

      return () => {
        audio.removeEventListener("timeupdate", updateTime)
        audio.removeEventListener("ended", handleSongEnd)
        audio.removeEventListener("canplaythrough", () => setIsAudioReady(true))
        audio.removeEventListener("waiting", () => setIsAudioReady(false))
      }
    }
  }, [updateTime, handleSongEnd])

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause()
        } else {
          const playPromise = audioRef.current.play()
          if (playPromise !== undefined) {
            await playPromise
          }
        }
        setIsPlaying(!isPlaying)
      } catch (error) {
        console.error("Error toggling play state:", error)
        setIsPlaying(false)
      }
    }
  }

  const handleSkip = async (direction: "forward" | "backward") => {
    const wasPlaying = isPlaying
    setIsPlaying(false)

    const newIndex =
      direction === "forward"
        ? (currentSongIndex + 1) % connorJamesSongs.length
        : (currentSongIndex - 1 + connorJamesSongs.length) % connorJamesSongs.length

    setCurrentSongIndex(newIndex)
    setCurrentTime(0)

    const success = await loadSong(newIndex)
    if (success && wasPlaying && audioRef.current) {
      try {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          await playPromise
          setIsPlaying(true)
        }
      } catch (error) {
        console.error("Error playing after skip:", error)
        setIsPlaying(false)
      }
    }
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  useEffect(() => {
    loadSong(currentSongIndex)
  }, [loadSong, currentSongIndex])

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-950 via-black to-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-8 w-full px-4 md:px-8 flex justify-between items-center z-50">
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%2011.02.11%E2%80%AFPM%20Copy%204-K0XQsD9pVOSyuZraeeudjGwpzNMedl.png"
            alt="Casset"
            width={120}
            height={30}
            className="h-[30px] w-auto opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </Link>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-16">
        {/* Artist Header */}
        <div className="text-center mb-12">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2015%20Copy-Ob1kDMERmqHqM5UBwdV9g1RVlZRNa9.png"
            alt="Connor James"
            width={400}
            height={60}
            className="mb-6 h-[60px] w-auto mx-auto"
          />
          <p className={`${lekton.className} text-gray-300 text-lg max-w-md mx-auto leading-relaxed`}>
            Multi-instrumentalist, singer/songwriter, and producer.
            <br />
            All albums recorded and produced solo.
          </p>
        </div>

        {/* Cassette Player */}
        <div className="mb-12">
          <CassetteDisplay
            isSideA={true}
            isPlaying={isPlaying}
            isLoading={isLoading}
            currentTime={currentTime}
            currentSong={connorJamesSongs[currentSongIndex]?.title || ""}
            isShaking={isShaking}
            showInfo={showInfo}
            onTogglePlay={togglePlay}
            onSkip={handleSkip}
            onFlipCassette={() => {}} // Connor page only shows Side A
            onToggleInfo={toggleInfo}
            PREVIEW_DURATION={PREVIEW_DURATION}
            isAudioReady={isAudioReady}
          />
        </div>

        {/* Track List */}
        <div className="w-full max-w-2xl">
          <h3 className={`${lekton.className} text-xl font-bold mb-6 text-center`}>Featured Tracks</h3>
          <div className="space-y-2">
            {connorJamesSongs.slice(0, 8).map((song, index) => (
              <div
                key={song.title}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                  index === currentSongIndex ? "bg-white/10 text-[#F1FF9B]" : "hover:bg-white/5 text-gray-300"
                }`}
                onClick={() => {
                  setCurrentSongIndex(index)
                  setCurrentTime(0)
                }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm opacity-50 w-6">{index + 1}</span>
                  <span className={`${lekton.className} text-sm`}>{song.title.toUpperCase()}</span>
                </div>
                {index === currentSongIndex && isPlaying && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-3 bg-[#F1FF9B] animate-pulse"></div>
                    <div className="w-1 h-2 bg-[#F1FF9B] animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-1 h-4 bg-[#F1FF9B] animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 mt-12">
          <a
            href="https://music.apple.com/us/artist/connor-james/1492389123"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/url-PG7smXSlZ5v9tvTpyfxgbcNR51hDFE.png"
              alt="Apple Music"
              width={20}
              height={20}
            />
            <span className="text-sm">Apple Music</span>
          </a>
          <a
            href="https://open.spotify.com/artist/3mdpZr77d6QPF2DsDVlXUn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/url-MQ9fRTSlZ4tZyirkU9LrVdXFpQiDPJ.png"
              alt="Spotify"
              width={20}
              height={20}
            />
            <span className="text-sm">Spotify</span>
          </a>
        </div>
      </div>

      <audio ref={audioRef} preload="auto" />

      {/* Footer */}
      <footer className="fixed bottom-4 w-full px-8 flex justify-center items-center text-xs opacity-50">
        <span>© 2025 CASSET</span>
      </footer>
    </main>
  )
}
