"use client"

import { Play, Pause, SkipBack, SkipForward, Info, X, Loader } from "lucide-react"
import { useState, useEffect } from "react"
import "../styles/fonts.css"
import { playlists } from "../data/playlists"

interface CassetteDisplayNewProps {
  isSideA: boolean
  isPlaying: boolean
  isLoading: boolean
  currentTime: number
  currentSongIndex: number
  isShaking: boolean
  showInfo: boolean
  onTogglePlay: () => void
  onSkip: (direction: "forward" | "backward") => void
  onFlipCassette: () => void
  onToggleInfo: () => void
  PREVIEW_DURATION: number
  isAudioReady: boolean
  theme?: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    hover: string
    gradient: string
  }
  useSkinGradient?: boolean
  selectedArtist?: {
    image: string
    tag: string
  }
  rotation?: number
  onClick?: () => void
}

export function CassetteDisplayNew({
  isSideA,
  isPlaying,
  isLoading,
  currentTime,
  currentSongIndex,
  isShaking,
  showInfo,
  onTogglePlay,
  onSkip,
  onFlipCassette,
  onToggleInfo,
  PREVIEW_DURATION,
  isAudioReady,
  theme = {
    primary: "#F1FF9B",
    secondary: "#000000",
    accent: "#F1FF9B",
    text: "#FFFFFF",
    background: "rgba(0, 0, 0, 0.4)",
    hover: "#FFFFFF",
    gradient: `linear-gradient(to bottom, rgba(10, 10, 10, 0.8), rgba(139, 0, 0, 0.4))`,
  },
  useSkinGradient = false,
  selectedArtist,
  rotation = 0,
  onClick,
}: CassetteDisplayNewProps) {
  const [showIcons, setShowIcons] = useState(false)

  const currentPlaylist = isSideA ? playlists.connorJames : playlists.lilDurden
  const currentSong = currentPlaylist[currentSongIndex] || null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const sideLabel = `absolute top-1 left-1/2 transform -translate-x-1/2 text-[8px] md:text-[10px] font-sans font-thin tracking-[2px] uppercase`
  const bottomSideLabel = `absolute bottom-1 left-1/2 transform -translate-x-1/2 rotate-180 text-[8px] md:text-[10px] font-sans font-thin tracking-[2px] uppercase`

  const commonStyles = {
    textColor: theme.text,
    hoverColor: theme.hover,
    bgColor: theme.background,
    darkBgColor: theme.secondary,
  }

  const buttonClass = `p-2 rounded-full ${commonStyles.textColor} hover:${commonStyles.hoverColor} hover:bg-gray-200/50 transition-colors active:scale-95 ${!isAudioReady && "opacity-50 cursor-not-allowed"}`

  const SvgIcon = ({ path, className }: { path: any; className: string }) => (
    <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {path}
    </svg>
  )

  useEffect(() => {
    setShowIcons(false)
  }, [])

  return (
    <div
      className="relative w-72 h-48 md:w-96 md:h-64 bg-gray-100 bg-opacity-50 rounded-lg overflow-hidden backdrop-blur-md border border-gray-300"
      style={{ transform: `rotate(${rotation || 0}deg)` }}
      onClick={onClick}
    >
      {selectedArtist && (
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(240,240,255,0.05))`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${selectedArtist.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(12px)",
              opacity: 0.1,
            }}
          />
        </div>
      )}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          backgroundColor: "rgba(240, 240, 255, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      ></div>

      <div className={`${sideLabel} ${isSideA ? "text-gray-600" : "text-gray-700"}`}>
        {isSideA ? "SIDE A" : "SIDE B"}
      </div>

      <div className="absolute top-1 md:top-2 left-1 md:left-2 z-40">
        <button
          onClick={onToggleInfo}
          className={`${commonStyles.textColor} hover:${commonStyles.hoverColor} transition-colors`}
        >
          <Info size={12} className="md:w-4 md:h-4" />
        </button>
      </div>

      <div className="absolute top-[2px] md:top-[4px] right-1 md:right-2 flex items-center z-40">
        <svg
          width="48"
          height="16"
          viewBox="0 0 48 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-2.5 md:h-3.5 w-auto opacity-70 ${commonStyles.textColor}`}
        >
          <text x="1" y="12" fill="currentColor" fontSize="14" fontFamily="Cobra VIP">
            casset
          </text>
        </svg>
      </div>

      {showInfo && (
        <div className="absolute inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-start p-4">
          <button
            onClick={onToggleInfo}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>
          {isSideA ? (
            <>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casset%20copy%203-X8fSmUFGMonh4by6KqrxtWHc0U0o.png"
                alt="Connor James"
                width={240}
                height={34}
                className="mb-6 mt-4 h-[34px] w-auto"
              />
              <p className="text-gray-700 text-center font-permanent-marker leading-relaxed">
                multi-instrumentalist
                <br />
                singer/songwriter, producer
                <br />
                all albums recorded and produced solo.
              </p>
            </>
          ) : (
            <>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casset%20copy%203-X8fSmUFGMonh4by6KqrxtWHc0U0o.png"
                alt="Lil Durden"
                width={240}
                height={34}
                className="mb-6 mt-4 h-[34px] w-auto"
              />
              <p className="text-gray-700 text-center font-permanent-marker">
                lil durden used to sell soap, before being catapulted into superstardom
              </p>
            </>
          )}
        </div>
      )}

      <div
        className={`${isSideA ? "bg-gray-100" : "bg-gray-200"} bg-opacity-50 rounded-lg h-16 md:h-24 mb-2 md:mb-4 relative overflow-hidden backdrop-blur-md border border-gray-300 z-40`}
        style={{
          background: showIcons
            ? `linear-gradient(135deg, rgba(200, 200, 255, 0.3), rgba(220, 255, 220, 0.3))`
            : `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(240,240,240,0.2) 100%)`,
          backgroundSize: isSideA ? "cover" : undefined,
          backgroundPosition: isSideA ? "center" : undefined,
          boxShadow: isSideA
            ? "inset 0 0 20px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.05)"
            : "inset 0 0 20px rgba(0,0,0,0.1)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(200, 200, 200, 0.5)",
        }}
      >
        {/* Artist Image Background with Blur */}
        {selectedArtist && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${selectedArtist.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
              opacity: 0.95,
            }}
          />
        )}
        <div
          className={`absolute inset-2 ${isSideA ? "bg-white" : "bg-gray-100"} bg-opacity-50 rounded-md flex justify-between items-center p-2 z-40`}
          style={{
            background: isSideA
              ? "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(240,240,240,0.3) 100%)"
              : undefined,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: isSideA ? "1px solid rgba(200,200,200,0.2)" : undefined,
          }}
        >
          {[0, 1].map((index) => (
            <div
              key={index}
              className={`w-16 h-16 ${isSideA ? "bg-gray-200" : "bg-gray-300"} bg-opacity-50 rounded-full flex items-center justify-center shadow-inner`}
            >
              <div
                className={`relative w-10 h-10 ${isSideA ? "bg-gray-100" : "bg-gray-200"} bg-opacity-50 rounded-full ${isPlaying ? "animate-spin-slow" : ""}`}
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-50">
                  {[...Array(12)].map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="5"
                      x2="50"
                      y2="15"
                      stroke={isSideA ? "#999999" : "#777777"}
                      strokeWidth="3"
                      transform={`rotate(${i * 30} 50 50)`}
                    />
                  ))}
                  <circle cx="50" cy="50" r="8" fill={isSideA ? "rgba(150, 150, 150, 0.35)" : "#999999"} />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <svg
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-12 z-40"
          viewBox="0 0 192 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L4 4L0 8L4 12L0 16L4 20L0 24L4 28L0 32L4 36L0 40L4 44L0 48H192L188 44L192 40L188 36L192 32L188 28L192 24L188 20L192 16L188 12L192 8L188 4L192 0H184L180 4L176 0H168L164 4L160 0H152L148 4L144 0H136L132 4L128 0H120L116 4L112 0H104L100 4L96 0H88L84 4L80 0H72L68 4L64 0H56L52 4L48 0H40L36 4L32 0H24L20 4L16 0H8L4 4L0 0Z"
            fill="#CCCCCC"
            fillOpacity="0.2"
          />
          <path
            d="M0 48L4 44L0 40L4 36L0 32L4 28L0 24L4 20L0 16L4 12L0 8L4 4L0 0H192L188 4L192 8L188 12L192 16L188 20L192 24L188 28L192 32L188 36L192 40L188 44L192 48H184L180 44L176 48H168L164 44L160 48H152L148 44L144 48H136L132 44L128 48H120L116 44L112 48H104L100 44L96 48H88L84 44L80 48H72L68 44L64 48H56L52 44L48 48H40L36 44L32 48H24L20 44L16 48H8L4 44L0 48Z"
            fill="#AAAAAA"
            fillOpacity="0.1"
          />
          <rect x="0" y="0" width="192" height="48" fill="#DDDDDD" fillOpacity="0.15" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
          <button
            onClick={() => setShowIcons(!showIcons)}
            className={`text-xl uppercase tracking-[1.5px] bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 bg-clip-text text-transparent hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 transition-all duration-300 cursor-pointer z-40 relative ${showIcons ? "hidden" : ""}`}
            style={{
              textShadow: "0 0 1px rgba(0,0,0,0.2), 0 0 2px rgba(0,0,0,0.1)",
              WebkitBackgroundClip: "text",
              filter: "contrast(1.2)",
              fontFamily: "var(--font-swankyandmoomoo)",
            }}
          >
            {selectedArtist?.tag || (isSideA ? "Connor James" : "Lil Durden")}
          </button>
          {showIcons && (
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href={
                  isSideA
                    ? "https://music.apple.com/us/artist/connor-james/1492389123"
                    : "https://music.apple.com/us/artist/lil-durden/1680622986"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 transition-transform hover:scale-110"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/url-QE3tOEPazxW1erNEzDVCSH9WhD4GUP%20Copy-LJ7q9S6fkgS3YWhFsW4BYLoFOwwtIZ.png"
                  alt="Apple Music"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href={
                  isSideA
                    ? "https://open.spotify.com/artist/3mdpZr77d6QPF2DsDVlXUn"
                    : "https://open.spotify.com/artist/11RkcPHh2oXv8Mtuuzratn"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 transition-transform hover:scale-110"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/url-QE3tOEPazxW1erNEzDVCSH9WhD4GUP%20Copy-LJ7q9S6fkgS3YWhFsW4BYLoFOwwtIZ.png"
                  alt="Spotify"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex flex-col gap-1 md:gap-2 z-40">
        {/* Track Name Display */}
        <div className="text-center mb-1">
          <span
            className="text-lg md:text-2xl font-bold text-gray-800"
            style={{ fontFamily: "'Autoscape Round Variable', sans-serif" }}
          >
            {(currentSong?.title || "No song selected").toUpperCase()}
          </span>
        </div>
        {/* Playback Progress Bar */}
        <div className="px-4 md:px-6">
          <div className="h-1 bg-gray-300/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-600/50 transition-all duration-200"
              style={{ width: `${(currentTime / PREVIEW_DURATION) * 100}%` }}
            />
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex justify-center space-x-8 md:space-x-12">
          <button onClick={() => onSkip("backward")} className="text-gray-800 hover:text-gray-600 transition-colors">
            <SkipBack size={24} className="md:w-8 md:h-8" />
          </button>
          <button onClick={onTogglePlay} className="text-gray-800 hover:text-gray-600 transition-colors">
            {isLoading ? (
              <Loader size={24} className="md:w-8 md:h-8 animate-spin" />
            ) : isPlaying ? (
              <Pause size={24} className="md:w-8 md:h-8" />
            ) : (
              <Play size={24} className="md:w-8 md:h-8" />
            )}
          </button>
          <button onClick={() => onSkip("forward")} className="text-gray-800 hover:text-gray-600 transition-colors">
            <SkipForward size={24} className="md:w-8 md:h-8" />
          </button>
        </div>
      </div>

      <div className={`${bottomSideLabel} ${isSideA ? "text-gray-600" : "text-gray-700"} z-40`}>
        {isSideA ? "SIDE A" : "SIDE B"}
      </div>

      <div className="absolute bottom-2 left-2 z-40">
        <span
          className={`text-sm ${commonStyles.textColor}`}
          style={{ fontFamily: "'Cobra LL VIP Trial', sans-serif", fontWeight: "300" }}
        >
          casset
        </span>
      </div>

      <div className="absolute bottom-2 right-2 z-40">
        <span
          className={`text-4xl font-thin ${commonStyles.textColor}`}
          style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", opacity: 0.5 }}
        >
          {isSideA ? playlists.connorJames.length : playlists.lilDurden.length}
        </span>
      </div>

      <div
        className="absolute top-[109px] left-0 w-full overflow-hidden pointer-events-none text-center z-40"
        style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: "6.8px",
          fontWeight: "normal",
          letterSpacing: "1px",
          opacity: 0.3,
          color: "#333333",
        }}
      >
        <div className="whitespace-nowrap">CASSET.FM • EMPOWERING ARTISTS TO EARN INDEPENDENTLY • CASSET.FM</div>
      </div>

      <div
        className="absolute inset-0 flex items-end justify-start overflow-hidden pointer-events-none z-40"
        style={{
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          fontSize: "120px",
          fontWeight: "normal",
          opacity: 0.04,
          color: isSideA ? "#333333" : "#666666",
          transform: "rotate(-3deg)",
          letterSpacing: "-3px",
        }}
      >
        .fm
      </div>
      <svg className="absolute inset-0 w-full h-full z-0" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <pattern id="fencePattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="4" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </pattern>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.05" />
      </svg>
      <div className="absolute inset-0 z-0" style={{ backgroundImage: "url(#fencePattern)" }}></div>
    </div>
  )
}
