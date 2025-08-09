"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { playlists } from "../data/playlists"
import { CassetteDisplay } from "../components/CassetteDisplay"
import { Lekton } from "next/font/google"
import { Link, RotateCcw } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const lekton = Lekton({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
})

export default function LilDurdenClientPage() {
  const router = useRouter()
  const [isSideA, setIsSideA] = useState(false) // false = Lil Durden (Side B)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const PREVIEW_DURATION = 33

  const currentPlaylist = isSideA ? playlists.connorJames : playlists.lilDurden
  const currentArtist = isSideA ? "Connor James" : "Lil Durden"
  const currentUsername = isSideA ? "connor" : "lildurden"
  const currentProfileImage = isSideA
    ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7673-d2E7Y1VpaQrxDBErSLQ4HrWmTM4RqG.png"
    : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oval%20Copy%206-q8xObFI7lcNprFbJPgHBhvaRoL7PY1.png"
  const currentDescription = isSideA
    ? "Multi-instrumentalist, singer/songwriter, and producer. All albums recorded and produced solo."
    : "Lil Durden used to sell soap, before being catapulted into superstardom."
  const currentSpotifyUrl = isSideA
    ? "https://open.spotify.com/artist/3mdpZr77d6QPF2DsDVlXUn"
    : "https://open.spotify.com/artist/11RkcPHh2oXv8Mtuuzratn"
  const currentAppleMusicUrl = isSideA
    ? "https://music.apple.com/us/artist/connor-james/1492389123"
    : "https://music.apple.com/us/artist/lil-durden/1680622986"

  const loadSong = useCallback(
    async (index: number) => {
      if (!audioRef.current) return false

      setIsLoading(true)
      setIsAudioReady(false)

      const song = currentPlaylist[index]
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
    [currentPlaylist],
  )

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      const currentSong = currentPlaylist[currentSongIndex]
      const elapsedTime = audio.currentTime - currentSong.startTime

      setCurrentTime(elapsedTime)

      if (elapsedTime >= PREVIEW_DURATION) {
        audio.currentTime = currentSong.startTime
      }
    }
  }, [currentSongIndex, currentPlaylist])

  const handleSongEnd = useCallback(() => {
    const nextIndex = (currentSongIndex + 1) % currentPlaylist.length
    setCurrentSongIndex(nextIndex)
    setCurrentTime(0)

    loadSong(nextIndex).then((success) => {
      if (success && audioRef.current && isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    })
  }, [currentSongIndex, isPlaying, loadSong, currentPlaylist.length])

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
        ? (currentSongIndex + 1) % currentPlaylist.length
        : (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length

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

  const flipSide = () => {
    setIsPlaying(false)
    setCurrentSongIndex(0)
    setCurrentTime(0)
    setIsShaking(true)

    if (!isSideA) {
      // Going to Side A - navigate to /connor
      setTimeout(() => {
        router.push("/connor")
      }, 250)
    } else {
      // Going to Side B - stay on current page
      setIsSideA(false)
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  useEffect(() => {
    loadSong(currentSongIndex)
  }, [loadSong, currentSongIndex, isSideA])

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-950 via-black to-black text-white relative overflow-hidden">
      {/* Conditional Background for Connor James */}
      {isSideA && (
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Palm_Trees_master.jpg-cqzwTGpL4Dbry10n6iHHDzOhhFXx35.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
              opacity: 0.3,
              transform: "scale(1.1)", // Prevent blur edges
            }}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      )}

      {/* Conditional Background for Lil Durden */}
      {!isSideA && (
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202023-04-02%20at%202.38.29%20PM-OIoeiUUengvCJcUa0NyWwjjgVXlwZM.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
              opacity: 0.3,
              transform: "scale(1.1)", // Prevent blur edges
            }}
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-8 w-full px-4 md:px-8 flex justify-between items-center z-50">
        <Link href="/" aria-label="Go to homepage">
          <div className="w-20 md:w-24 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
            <span
              className="text-2xl md:text-3xl text-white"
              style={{
                fontFamily: "'Cobra VIP', 'Arial Black', sans-serif",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              casset
            </span>
          </div>
        </Link>

        {/* Flip Side Button */}
        <button
          onClick={flipSide}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20"
        >
          <RotateCcw size={16} className="text-white" />
          <span className="text-white text-sm font-medium">{isSideA ? "SIDE B" : "SIDE A"}</span>
        </button>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-16 relative z-10">
        {/* Artist Header */}
        <div className="text-center mb-12 relative">
          {/* Profile Photo - positioned above the name */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
              <Image
                src={currentProfileImage || "/placeholder.svg"}
                alt={`${currentArtist} Profile`}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Artist Name Tag - styled like the mobile interface */}
          <div className="flex justify-center mb-6">
            <div
              className="bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-700/50"
              style={{ transform: `rotate(${Math.random() * 6 - 3}deg)` }}
            >
              <div className="flex items-center whitespace-nowrap px-4 py-2">
                <span className="text-[#F1FF9B] text-lg mr-3" style={{ fontFamily: "'Cobra VIP', sans-serif" }}>
                  a
                </span>
                <span
                  className="text-white text-xl"
                  style={{
                    fontFamily: "'AeonikPro', sans-serif",
                    fontWeight: "900",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {currentUsername}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={`${lekton.className} text-gray-300 text-lg max-w-md mx-auto leading-relaxed`}>
            {currentDescription}
          </p>
        </div>

        {/* Cassette Player */}
        <div className="mb-12">
          <CassetteDisplay
            isSideA={isSideA}
            isPlaying={isPlaying}
            isLoading={isLoading}
            currentTime={currentTime}
            currentSong={currentPlaylist[currentSongIndex]?.title || ""}
            isShaking={isShaking}
            showInfo={showInfo}
            onTogglePlay={togglePlay}
            onSkip={handleSkip}
            onFlipCassette={flipSide}
            onToggleInfo={toggleInfo}
            PREVIEW_DURATION={PREVIEW_DURATION}
            isAudioReady={isAudioReady}
          />
        </div>

        {/* Track List */}
        <div className="w-full max-w-2xl">
          <h3 className={`${lekton.className} text-xl font-bold mb-6 text-center`}>
            {isSideA ? "Connor James" : "Lil Durden"} - Featured Tracks
          </h3>
          <div className="space-y-2">
            {currentPlaylist.slice(0, 8).map((song, index) => (
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
            href={currentAppleMusicUrl}
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
            href={currentSpotifyUrl}
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
