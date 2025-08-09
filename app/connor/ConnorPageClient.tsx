"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { playlists } from "../data/playlists"
import { CassetteDisplay } from "../components/CassetteDisplay"
import { Lekton } from "next/font/google"
import { RotateCcw, Plus, X, Play } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const lekton = Lekton({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
})

// Mock video data
const videoData = {
  connorjames: [
    {
      id: 1,
      title: "BABY BLUE - LIVE SESSION",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-08%20at%208.20.31%E2%80%AFPM-HACBv.png",
      duration: "3:42",
      views: "1.2K",
    },
    {
      id: 2,
      title: "STUDIO SESSIONS - BEHIND THE SCENES",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-08%20at%208.20.31%E2%80%AFPM-HACBv.png",
      duration: "8:15",
      views: "856",
    },
  ],
  lildurden: [
    {
      id: 1,
      title: "FAKE SHIT - MUSIC VIDEO",
      thumbnail:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-08%20at%208.20.31%E2%80%AFPM-HACBv.png",
      duration: "2:58",
      views: "3.4K",
    },
  ],
}

export default function ConnorPageClient() {
  const router = useRouter()
  const [isSideA, setIsSideA] = useState(true) // true = Connor James (Side A), false = Lil Durden (Side B)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showAddToHomeDialog, setShowAddToHomeDialog] = useState(false)
  const [activeTab, setActiveTab] = useState<"tracks" | "videos">("tracks") // New state for tab switching
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const PREVIEW_DURATION = 33
  const [scrollY, setScrollY] = useState(0)

  const currentPlaylist = isSideA ? playlists.connorJames : playlists.lilDurden
  const currentArtist = isSideA ? "Connor James" : "Lil Durden"
  const currentUsername = isSideA ? "connorjames" : "lildurden"
  const currentVideos = isSideA ? videoData.connorjames : videoData.lildurden
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

  // Background images for each artist - Using new provided backgrounds
  const currentBackgroundImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Palm_Trees_master.jpg-1MeGuGCTMFasbde0H41j8yY7FSurWd.jpeg"

  // Stats
  const trackCount = currentPlaylist.length
  const videoCount = currentVideos.length
  const price = isSideA ? "$0.99" : "$1.49"

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

    if (isSideA) {
      // Going to Side B - navigate to /lildurden
      setTimeout(() => {
        router.push("/lildurden")
      }, 250)
    } else {
      // Going to Side A - stay on current page
      setIsSideA(true)
      setTimeout(() => setIsShaking(false), 500)
    }
  }

  const handleAddToHome = () => {
    setShowAddToHomeDialog(true)
  }

  useEffect(() => {
    loadSong(currentSongIndex)
  }, [loadSong, currentSongIndex, isSideA])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* Background Image - Connor James: Dark aesthetic */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${currentBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)",
          opacity: 1,
        }}
      />

      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60 z-1" />

      {/* Navigation */}
      <nav className="fixed top-8 w-full px-4 md:px-8 flex justify-between items-center z-50">
        {/* Add to Home Screen Button */}
        <button
          onClick={handleAddToHome}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20"
          aria-label="Add to home screen"
        >
          <Plus size={20} className="text-white" />
        </button>

        {/* Casset Logo */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casset-1VeeIJGLAluNE9b4Cn7PdyHM3CXt4f.png"
            alt="Casset"
            width={120}
            height={30}
            className="h-6 w-auto opacity-70"
          />
        </div>

        {/* Flip Side Button */}
        <button
          onClick={flipSide}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors border border-white/20"
        >
          <RotateCcw size={16} className="text-white" />
          <span className="text-white text-sm font-medium">{isSideA ? "SIDE B" : "SIDE A"}</span>
        </button>
      </nav>

      {/* Add to Home Screen Dialog */}
      {showAddToHomeDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900/95 backdrop-blur-md rounded-lg p-6 max-w-sm w-full border border-white/20 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">Add to Home Screen</h3>
              <button
                onClick={() => setShowAddToHomeDialog(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Add casset to your home screen to save your favorite artists and access them quickly.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowAddToHomeDialog(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                Maybe Later
              </button>
              <button
                onClick={() => setShowAddToHomeDialog(false)}
                className="flex-1 px-4 py-2 bg-[#F1FF9B] text-black rounded-lg hover:bg-[#F1FF9B]/90 transition-colors text-sm font-medium"
              >
                Add Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-16 relative z-10">
        {/* Artist Header */}
        <div className="text-center mb-12 relative">
          {/* Profile Photo with Verified Badge and Price */}
          <div className="flex justify-center mb-8 relative">
            <div className="relative">
              {/* Profile Image */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                <Image
                  src={currentProfileImage || "/placeholder.svg"}
                  alt={`${currentArtist} Profile`}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Verified Badge - Star shaped */}
              <div className="absolute -top-2 -left-2 w-10 h-10 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/url-5IZsuUt9mvexoT5rgNyEsVxnLL2vg2.png"
                  alt="Verified"
                  width={40}
                  height={40}
                  className="w-full h-full"
                />
              </div>

              {/* Price Tag */}
              <div className="absolute -top-4 -right-4">
                <div className="relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%203-lZ9xn2LHZTWvGpK2J5tSkvphXeSBnn.png"
                    alt="Price background"
                    width={80}
                    height={40}
                    className="w-20 h-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-black text-sm font-bold">{price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Artist Name Tag - More compact with larger handle */}
          <div className="flex justify-center mb-8">
            <div
              className="backdrop-blur-sm rounded-full shadow-lg border border-gray-700/50 px-4 py-2"
              style={{
                transform: `rotate(-8deg)`,
                backgroundColor: "rgb(255 255 255 / 21%)",
              }}
            >
              <div className="flex items-center whitespace-nowrap">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 312 688"
                  className="mr-2 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    transform="translate(149, 344) rotate(1) translate(-149, -344)"
                    fill="#EDFF7E"
                    fontFamily="CobraLLVIPTrial-500, Cobra LL VIP Trial"
                    fontSize="620.165992"
                    fontWeight="normal"
                    letterSpacing="-19.88424"
                  >
                    <tspan x="6" y="543">
                      a
                    </tspan>
                  </text>
                </svg>
                <span
                  className="text-white text-lg"
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

          {/* Stats - Now clickable tabs */}
          <div className="flex justify-center gap-16 mb-8">
            <button
              onClick={() => setActiveTab("tracks")}
              className={`text-center transition-colors ${
                activeTab === "tracks" ? "text-[#9AFF9A]" : "text-white hover:text-[#9AFF9A]"
              }`}
            >
              <div className="text-4xl font-bold">{trackCount}</div>
              <div className="text-sm uppercase tracking-wider opacity-70">TRACKS</div>
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`text-center transition-colors ${
                activeTab === "videos" ? "text-[#9AFF9A]" : "text-white hover:text-[#9AFF9A]"
              }`}
            >
              <div className="text-4xl font-bold">{videoCount}</div>
              <div className="text-sm uppercase tracking-wider opacity-70">VIDEOS</div>
            </button>
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

        {/* Content List - Tracks or Videos */}
        <div className="w-full max-w-2xl">
          <h3 className={`${lekton.className} text-xl font-bold mb-6 text-center`}>
            {isSideA ? "Connor James" : "Lil Durden"} - Featured {activeTab === "tracks" ? "Tracks" : "Videos"}
          </h3>

          {activeTab === "tracks" ? (
            <div className="space-y-2">
              {currentPlaylist.slice(0, 8).map((song, index) => (
                <div
                  key={song.title}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                    index === currentSongIndex ? "bg-white/10 text-[#9AFF9A]" : "hover:bg-white/5 text-gray-300"
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
                      <div className="w-1 h-3 bg-[#9AFF9A] animate-pulse"></div>
                      <div className="w-1 h-2 bg-[#9AFF9A] animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-1 h-4 bg-[#9AFF9A] animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play size={16} className="text-white" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`${lekton.className} text-sm font-medium text-white truncate`}>{video.title}</h4>
                    <p className="text-xs text-gray-400">{video.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
