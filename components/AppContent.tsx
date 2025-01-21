"use client"

import { useState, useRef, useEffect } from "react"
import { Lekton } from "next/font/google"
import { playlists } from "../data/playlists"
import { formatFileSize, formatDate, formatDateMobile } from "../utils/formatters"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, X } from "lucide-react"

const lekton = Lekton({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
})

const generateSVGPattern = (index: number) => {
  return [...Array(8)].map((_, i) => (
    <rect key={i} x={i * 3 + 1} y={12 - (i % 3) * 4} width="2" height={8 + (i % 3) * 4} className="fill-current" />
  ))
}

const TRACK_SIZES = {
  "baby blue": 7.91,
  doll: 8.32,
  wrapped: 7.45,
  lilacs: 6.89,
  "love again": 8.12,
  better: 7.76,
  DAYTRIPPIN: 7.91,
  "whats my name": 8.03,
  "BREAK YOU": 7.55,
  "IN THE RAIN": 7.88,
  "PRETTY LIES": 8.21,
  "MARBLE CRACKS": 7.67,
  SEVENTEEN: 7.93,
  "IN YOUR HEAD": 8.15,
  "By My Side": 7.82,
  lavender: 7.44,
  SABATOGE: 8.01,
  STARLIGHT: 7.77,
  "Late Nights In Milan": 8.33,
  "Let Down (i am too)": 7.89,
  "DANCE OF LIFE": 8.11,
}

export function AppContent() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const [isDraggingVolume, setIsDraggingVolume] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const volumeSliderRef = useRef<HTMLDivElement>(null)
  const connorJamesSongs = playlists.connorJames
  const scrollTimeout = useRef<NodeJS.Timeout>()

  const handleTrackSelect = (title: string, index: number) => {
    setSelectedTrack(title)
    setActiveIndex(index)
    setIsPlaying(true)
    setCurrentTime(0)
    document.body.style.overflow = "hidden"
  }

  const handleClose = () => {
    setSelectedTrack(null)
    setIsPlaying(false)
    document.body.style.overflow = "auto"
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration

    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!volumeSliderRef.current) return

    const rect = volumeSliderRef.current.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const newVolume = Math.max(0, Math.min(1, x / rect.width))
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleVolumeDragStart = () => {
    setIsDraggingVolume(true)
  }

  const handleVolumeDragEnd = () => {
    setIsDraggingVolume(false)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingVolume) {
        handleVolumeChange(e as unknown as React.MouseEvent<HTMLDivElement>)
      }
    }

    const handleMouseUp = () => {
      setIsDraggingVolume(false)
    }

    if (isDraggingVolume) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDraggingVolume])

  useEffect(() => {
    const selectedSong = connorJamesSongs[activeIndex]
    if (selectedSong && audioRef.current) {
      audioRef.current.src = selectedSong.url
      audioRef.current.currentTime = 0
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [activeIndex, connorJamesSongs, isPlaying])

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      let isScrolling = false
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isScrolling) {
          isScrolling = true
          if (e.deltaY > 0 && activeIndex < connorJamesSongs.length - 1) {
            setActiveIndex((prev) => prev + 1)
          } else if (e.deltaY < 0 && activeIndex > 0) {
            setActiveIndex((prev) => prev - 1)
          }
          setTimeout(() => {
            isScrolling = false
          }, 200) // Adjust this value to control the scroll sensitivity
        }
      }

      carousel.addEventListener("wheel", handleWheel, { passive: false })

      return () => {
        carousel.removeEventListener("wheel", handleWheel)
      }
    }
  }, [activeIndex, connorJamesSongs.length])

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      let touchStartY = 0
      let touchEndY = 0
      let isSwiping = false

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY
        isSwiping = true
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (!isSwiping) return
        e.preventDefault()
        touchEndY = e.touches[0].clientY

        const swipeDistance = touchStartY - touchEndY
        if (Math.abs(swipeDistance) > 50) {
          // Increased threshold for more controlled swipes
          if (swipeDistance > 0 && activeIndex < connorJamesSongs.length - 1) {
            setActiveIndex((prev) => prev + 1)
            isSwiping = false
          } else if (swipeDistance < 0 && activeIndex > 0) {
            setActiveIndex((prev) => prev - 1)
            isSwiping = false
          }
          touchStartY = touchEndY // Reset touch start for continuous swiping
        }
      }

      const handleTouchEnd = () => {
        isSwiping = false
      }

      carousel.addEventListener("touchstart", handleTouchStart, { passive: true })
      carousel.addEventListener("touchmove", handleTouchMove, { passive: false })
      carousel.addEventListener("touchend", handleTouchEnd, { passive: true })

      return () => {
        carousel.removeEventListener("touchstart", handleTouchStart)
        carousel.removeEventListener("touchmove", handleTouchMove)
        carousel.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [activeIndex, connorJamesSongs.length])

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-gray-800 px-4 py-2 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-sm z-50">
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">•</span>
          <span className="text-gray-400 hover:text-[#F1FF9B] transition-colors">@connorjames</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/skins" className="px-2 py-1 bg-gray-900 rounded text-xs hover:text-[#F1FF9B] transition-colors">
            SKINS
          </a>
          <span className="text-xs text-gray-500">
            {new Date().toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </span>
          <span className="px-2 py-1 bg-gray-900 rounded text-xs hover:text-[#F1FF9B] transition-colors">FOLDER</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative min-h-[calc(100vh-48px)]">
        {/* File List */}
        <div className="p-4 space-y-2">
          {connorJamesSongs.map((song, index) => (
            <motion.div
              key={song.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group rounded-lg hover:bg-gray-900/50 border-b border-white/40 last:border-b-0"
            >
              <div
                className="grid grid-cols-[24px,1fr,auto,auto] md:grid-cols-[auto,1fr,auto,auto,auto] gap-1 md:gap-2 items-center py-1 px-2 cursor-pointer"
                onClick={() => handleTrackSelect(song.title, index)}
              >
                <div className="w-3 md:w-4 h-8 relative mr-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full text-gray-400 group-hover:text-[#F1FF9B] transition-colors"
                  >
                    {generateSVGPattern(index)}
                  </svg>
                </div>

                <div
                  className={`${lekton.className} text-sm truncate min-w-0 group-hover:text-[#F1FF9B] transition-colors`}
                >
                  {song.title.toUpperCase()}
                </div>
                <div className="hidden md:block text-xs text-gray-500 group-hover:text-[#F1FF9B] transition-colors">
                  {formatFileSize(TRACK_SIZES[song.title] || 7.91)}MB
                </div>
                <div className="text-xs text-gray-500 group-hover:text-[#F1FF9B] transition-colors">
                  {formatDateMobile(new Date(Date.now() - Math.random() * 10000000000))}
                </div>
                <button
                  className="px-1.5 md:px-2 py-1 text-xs bg-gray-800 hover:bg-[#F1FF9B]/20 hover:text-[#F1FF9B] rounded flex items-center gap-1 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(song.url, `${song.title}.mp3`)
                  }}
                >
                  DOWNLOAD
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 9l-7 7-7-7M12 16V4" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel View */}
        <AnimatePresence>
          {selectedTrack && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-hidden"
              onClick={handleClose}
            >
              <div
                ref={carouselRef}
                className="relative w-full max-w-3xl h-[80vh] mx-auto touch-none select-none"
                onClick={(e) => e.stopPropagation()}
              >
                {connorJamesSongs.map((song, index) => {
                  const distance = Math.abs(index - activeIndex)
                  return (
                    <motion.div
                      key={song.title}
                      initial={false}
                      animate={{
                        y: (index - activeIndex) * 160,
                        scale: index === activeIndex ? 1 : 0.95,
                        opacity: distance <= 3 ? 1 - distance * 0.15 : 0,
                        filter: index === activeIndex ? "blur(0px)" : "blur(2px)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 1,
                      }}
                      className="absolute left-0 right-0 px-4"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                      <div
                        className={`bg-black/60 backdrop-blur-sm rounded-lg p-6 ${
                          index === activeIndex ? "ring-1 ring-[#F1FF9B]/20" : ""
                        }`}
                      >
                        {index === activeIndex ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                          >
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={handlePlayPause}
                                  className="text-white hover:text-[#F1FF9B] transition-colors"
                                >
                                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                                </button>
                                <span className="text-[#F1FF9B]/70 font-mono">{index + 1}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Volume2 size={16} className="text-[#F1FF9B]/50" />
                                <div
                                  ref={volumeSliderRef}
                                  className="w-24 h-2 bg-gray-800 rounded-full cursor-pointer"
                                  onClick={handleVolumeChange}
                                  onMouseDown={handleVolumeDragStart}
                                  onTouchStart={handleVolumeDragStart}
                                  onTouchMove={handleVolumeChange}
                                  onTouchEnd={handleVolumeDragEnd}
                                >
                                  <div
                                    className="h-full bg-[#F1FF9B]/30 rounded-full"
                                    style={{ width: `${volume * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div
                              className={`${lekton.className} text-2xl font-bold mb-2 hover:text-[#F1FF9B] transition-colors`}
                            >
                              {song.title.toUpperCase()}
                            </div>

                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-[#F1FF9B]/50 font-mono">{formatTime(currentTime)}</span>
                              <span className="text-xs text-[#F1FF9B]/50 font-mono">02:32</span>
                            </div>

                            <div
                              className="h-3 bg-gray-800/50 rounded-full overflow-hidden mb-6 cursor-pointer relative group"
                              onClick={handleProgressBarClick}
                            >
                              {/* Hover effect */}
                              <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute inset-0 bg-[#F1FF9B]/10" />
                              </div>

                              {/* Progress bar */}
                              <motion.div
                                className="h-full bg-[#F1FF9B]/30 group-hover:bg-[#F1FF9B]/50 transition-colors"
                                style={{ width: `${(currentTime / duration || 0) * 100}%` }}
                              />
                            </div>

                            <div className="grid gap-1 text-xs font-mono text-gray-500">
                              <div className="hover:text-[#F1FF9B] transition-colors">{`MODIFIED ${formatDate(new Date())}`}</div>
                              <div className="hover:text-[#F1FF9B] transition-colors">{`${formatFileSize(TRACK_SIZES[song.title] || 7.91)}MB`}</div>
                              <div className="hover:text-[#F1FF9B] transition-colors">AUDIO</div>
                            </div>

                            <button
                              className="absolute bottom-6 right-6 px-3 py-1.5 text-xs bg-white/10 text-white rounded hover:bg-[#F1FF9B]/20 hover:text-[#F1FF9B] transition-colors font-mono"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownload(song.url, `${song.title}.mp3`)
                              }}
                            >
                              DOWNLOAD
                            </button>
                          </motion.div>
                        ) : (
                          // Preview content for non-active tracks
                          <div className="py-4">
                            <div
                              className={`${lekton.className} text-lg truncate opacity-60 hover:text-[#F1FF9B] transition-colors`}
                            >
                              {song.title.toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Navigation hints */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-[#F1FF9B]/30 flex items-center gap-4">
                <span>↑ Previous</span>
                <span>↓ Next</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration)
          e.currentTarget.volume = volume
        }}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

