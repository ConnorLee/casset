import { Play, Pause, SkipBack, SkipForward, Repeat, Info, X, Loader } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface CassetteDisplayProps {
  isSideA: boolean
  isPlaying: boolean
  isLoading: boolean
  currentTime: number
  currentSong: string
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
}

const BlurredBackground = ({
  isPlaying,
  imageSrc,
  className = "",
}: {
  isPlaying: boolean
  imageSrc: string
  className?: string
}) => {
  return (
    <>
      {/* Base blurred layer */}
      <div
        className={`absolute inset-0 z-0 ${className}`}
        style={{
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)", // Prevent blur edges
        }}
      />
      {/* Animated hue layer with additional blur */}
      <div
        className={`absolute inset-0 z-1 ${isPlaying ? "animate-hue-shift" : ""}`}
        style={{
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)", // Prevent blur edges
          mixBlendMode: "color",
          opacity: 0.5,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Additional blur overlay for consistency */}
      <div
        className="absolute inset-0 z-2"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      />
    </>
  )
}

export function CassetteDisplay({
  isSideA,
  isPlaying,
  isLoading,
  currentTime,
  currentSong,
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
}: CassetteDisplayProps) {
  const [showIcons, setShowIcons] = useState(false)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const sideLabel = `absolute top-1 left-1/2 transform -translate-x-1/2 text-[10px] font-sans font-thin tracking-[2px] uppercase`
  const bottomSideLabel = `absolute bottom-1 left-1/2 transform -translate-x-1/2 rotate-180 text-[10px] font-sans font-thin tracking-[2px] uppercase`

  const commonStyles = {
    textColor: theme.text,
    hoverColor: theme.hover,
    bgColor: theme.background,
    darkBgColor: theme.secondary,
  }

  const buttonClass = `p-2 rounded-full ${commonStyles.textColor} ${commonStyles.hoverColor} hover:bg-${theme.secondary}/50 transition-colors active:scale-95 ${!isAudioReady && "opacity-50 cursor-not-allowed"}`

  const mainContainerStyle = useSkinGradient
    ? {
        backgroundImage: theme.gradient,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundColor: isSideA ? "rgba(10, 10, 10, 0.8)" : "rgba(139, 0, 0, 0.4)",
        backgroundImage: `linear-gradient(to bottom, ${isSideA ? "rgba(20, 20, 20, 0.1), rgba(5, 5, 5, 0.1)" : "rgba(139, 0, 0, 0.2), rgba(75, 0, 0, 0.2)"})`,
      }

  const SvgIcon = ({ path, className }: { path: any; className: string }) => (
    <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {path}
    </svg>
  )

  useEffect(() => {
    setShowIcons(false)
  }, [isSideA])

  return (
    <div className="relative w-96 h-64">
      {/* Gaussian blur background */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          backgroundColor: "rgba(200, 220, 255, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      ></div>

      <div
        className={`w-full h-full rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_-5px_10px_rgba(0,0,0,0.2)] p-6 flex flex-col justify-between relative overflow-hidden transform rotate-[-3deg] transition-all duration-500 ${isShaking ? "animate-shake" : ""} z-10`}
        style={{
          ...mainContainerStyle,
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), ${mainContainerStyle.backgroundImage}`,
        }}
      >
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url(#fencePattern)" }}></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <pattern id="fencePattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          </pattern>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.05" />
        </svg>

        <div className={`${sideLabel} ${isSideA ? "text-gray-200" : "text-[#FF3333]"}`}>
          {isSideA ? "SIDE A" : "SIDE B"}
        </div>

        <div className="absolute top-2 left-2 z-30">
          <button
            onClick={onToggleInfo}
            className={`${commonStyles.textColor} ${commonStyles.hoverColor} transition-colors`}
          >
            <Info size={16} />
          </button>
        </div>

        <div className="absolute top-[4px] right-2 flex items-center z-30">
          {" "}
          {/* Updated line */}
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%2011.02.11%E2%80%AFPM%20Copy%206-rLbsxnbr8f499wfc9vahSq2coGhrT2.png"
            alt="Casset Logo"
            width={60}
            height={20}
            className={`h-3.5 w-auto opacity-70 ${commonStyles.textColor}`}
          />
        </div>

        {showInfo && (
          <div className="absolute inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-start p-4">
            <button
              onClick={onToggleInfo}
              className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            {isSideA ? (
              <>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2015%20Copy-Ob1kDMERmqHqM5UBwdV9g1RVlZRNa9.png"
                  alt="Connor James"
                  width={240}
                  height={34}
                  className="mb-6 mt-4 h-[34px] w-auto"
                />
                <p className="text-white text-center font-permanent-marker leading-relaxed">
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2015%20Copy%202-ugcpmVsFGuHXKAvfTl6dxsjBKPUn6X.png"
                  alt="Lil Durden"
                  width={240}
                  height={34}
                  className="mb-6 mt-4 h-[34px] w-auto"
                />
                <p className="text-white text-center font-permanent-marker">
                  lil durden used to sell soap, before being catapulted into superstardom
                </p>
              </>
            )}
          </div>
        )}

        <div
          className={`${isSideA ? "bg-transparent" : "bg-[#66000040]"} bg-opacity-10 rounded-lg h-24 mb-4 relative overflow-hidden backdrop-blur-md border border-black`}
          style={{
            background: showIcons
              ? `linear-gradient(135deg, rgba(255, 45, 85, 0.3), rgba(30, 215, 96, 0.3))`
              : `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
            backgroundSize: isSideA ? "cover" : undefined,
            backgroundPosition: isSideA ? "center" : undefined,
            boxShadow: isSideA
              ? "inset 0 0 20px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.2)"
              : "inset 0 0 20px rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(0, 0, 0, 0.5)",
          }}
        >
          {isSideA && !showIcons && (
            <BlurredBackground
              isPlaying={isPlaying}
              imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%2011.58.34%E2%80%AFAM-UipPPUWVKcYjubG5thHQUsaedsyZHi.png"
            />
          )}
          {!isSideA && !showIcons && (
            <BlurredBackground
              isPlaying={isPlaying}
              imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-15%20at%206.23.38%E2%80%AFPM-Poo7Y3YEgdzULOpGbkxFXil5SibKKF.png"
            />
          )}
          <div
            className={`absolute inset-2 ${isSideA ? "bg-transparent" : "bg-[#8B000040]"} rounded-md flex justify-between items-center p-2`}
            style={{
              background: isSideA
                ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
                : undefined,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: isSideA ? "1px solid rgba(255,255,255,0.05)" : undefined,
            }}
          >
            {/* Spinning reels */}
            {[0, 1].map((index) => (
              <div
                key={index}
                className={`w-16 h-16 ${isSideA ? "bg-white bg-opacity-10" : "bg-[#8B0000] bg-opacity-50"} rounded-full flex items-center justify-center shadow-inner`}
              >
                <div
                  className={`relative w-10 h-10 ${isSideA ? "bg-white bg-opacity-10" : "bg-[#4B0000] bg-opacity-50"} rounded-full ${isPlaying ? "animate-spin-slow" : ""}`}
                >
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-50">
                    {[...Array(12)].map((_, i) => (
                      <line
                        key={i}
                        x1="50"
                        y1="5"
                        x2="50"
                        y2="15"
                        stroke={isSideA ? "#333333" : "#FF6666"}
                        strokeWidth="3"
                        transform={`rotate(${i * 30} 50 50)`}
                      />
                    ))}
                    <circle cx="50" cy="50" r="8" fill={isSideA ? "rgba(255, 255, 255, 0.35)" : "#FF6666"} />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <svg
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-12"
            viewBox="0 0 192 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L4 4L0 8L4 12L0 16L4 20L0 24L4 28L0 32L4 36L0 40L4 44L0 48H192L188 44L192 40L188 36L192 32L188 28L192 24L188 20L192 16L188 12L192 8L188 4L192 0H184L180 4L176 0H168L164 4L160 0H152L148 4L144 0H136L132 4L128 0H120L116 4L112 0H104L100 4L96 0H88L84 4L80 0H72L68 4L64 0H56L52 4L48 0H40L36 4L32 0H24L20 4L16 0H8L4 4L0 0Z"
              fill="white"
              fillOpacity="0.2"
            />
            <path
              d="M0 48L4 44L0 40L4 36L0 32L4 28L0 24L4 20L0 16L4 12L0 8L4 4L0 0H192L188 4L192 8L188 12L192 16L188 20L192 24L188 28L192 32L188 36L192 40L188 44L192 48H184L180 44L176 48H168L164 44L160 48H152L148 44L144 48H136L132 44L128 48H120L116 44L112 48H104L100 44L96 48H88L84 44L80 48H72L68 44L64 48H56L52 44L48 48H40L36 44L32 48H24L20 44L16 48H8L4 44L0 48Z"
              fill="black"
              fillOpacity="0.1"
            />
            <rect x="0" y="0" width="192" height="48" fill="white" fillOpacity="0.15" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button
              onClick={() => setShowIcons(!showIcons)}
              className={`text-xl font-swanky-and-moo-moo uppercase tracking-[1.5px] bg-gradient-to-br from-gray-900 via-black to-gray-800 bg-clip-text text-transparent hover:from-black hover:via-gray-900 hover:to-black transition-all duration-300 cursor-pointer z-50 relative ${showIcons ? "hidden" : ""}`}
              style={{
                textShadow: "0 0 1px rgba(0,0,0,0.5), 0 0 2px rgba(0,0,0,0.2)",
                WebkitBackgroundClip: "text",
                filter: "contrast(1.2)",
              }}
            >
              {isSideA ? "Connor James" : "Lil Durden"}
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
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/url-PG7smXSlZ5v9tvTpyfxgbcNR51hDFE.png"
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
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/url-MQ9fRTSlZ4tZyirkU9LrVdXFpQiDPJ.png"
                    alt="Spotify"
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            )}
          </div>
        </div>

        <div
          className={`text-center font-bold mb-2 truncate font-square-peg text-[1.2rem] uppercase ${commonStyles.textColor}`}
          style={{
            textShadow: isSideA ? "1px 1px 2px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {currentSong}
        </div>

        <div
          className={`h-2 ${isSideA ? "bg-gray-700" : "bg-[#4B000040]"} bg-opacity-40 rounded-full overflow-hidden mb-2`}
        >
          <div
            className={`h-full ${isSideA ? "bg-gray-500" : "bg-[#FF666680]"}`}
            style={{ width: `${(currentTime / PREVIEW_DURATION) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-xs ${commonStyles.textColor} font-bold`}
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            {formatTime(currentTime)}
          </span>
          <span
            className={`text-xs ${commonStyles.textColor} font-bold`}
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            {formatTime(PREVIEW_DURATION)}
          </span>
        </div>

        <div className="flex justify-center space-x-6 relative z-40">
          <button onClick={() => onSkip("backward")} className={buttonClass} disabled={!isAudioReady || isLoading}>
            <SkipBack size={24} />
          </button>
          <button onClick={onTogglePlay} className={buttonClass} disabled={!isAudioReady || isLoading}>
            {isLoading ? (
              <Loader size={24} className="animate-spin" />
            ) : isPlaying ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>
          <button onClick={() => onSkip("forward")} className={buttonClass} disabled={!isAudioReady || isLoading}>
            <SkipForward size={24} />
          </button>
        </div>

        <div className={`${bottomSideLabel} ${isSideA ? "text-gray-200" : "text-[#FF3333]"}`}>
          {isSideA ? "SIDE A" : "SIDE B"}
        </div>

        {/* VHS icon and text */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 z-40">
          <SvgIcon
            className={commonStyles.textColor}
            path={
              <>
                <path
                  d="M4 5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20V5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M15 3V21M9 3V21" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </>
            }
          />
          <span
            className={`text-xs ${commonStyles.textColor} font-bold`}
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            VHS
          </span>
          <SvgIcon
            className={isSideA ? "text-gray-300" : "text-[#FF3333]"}
            path={
              isSideA ? (
                <path
                  d="M12 2L14.2451 8.90983H21.5106L15.6327 13.1803L17.8779 20.0902L12 15.82L6.12215 20.0902L8.36729 13.1803L2.48944 13.1803L12 2Z"
                  fill="currentColor"
                />
              ) : (
                <>
                  <path
                    d="M12 2C10.4178 2 8.87103 2.46919 7.55544 3.34824C6.23985 4.22729 5.21447 5.47672 4.60897 6.93853C4.00347 8.40034 3.84504 10.0089 4.15372 11.5607C4.4624 13.1126 5.22433 14.538 6.34315 15.6569C7.46197 16.7757 8.88743 17.5376 10.4393 17.8463C11.9911 18.155 13.5997 17.9965 15.0615 17.391C16.5233 16.7855 17.7727 15.7602 18.6518 14.4446C19.5308 13.129 20 11.5823 20 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M20 2L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )
            }
          />
        </div>

        {/* '94' text */}
        <div className="absolute bottom-2 right-2 z-40">
          <span
            className={`text-4xl font-thin ${commonStyles.textColor}`}
            style={{ fontFamily: "Helvetica Neue, Arial, sans-serif", opacity: 0.5 }}
          >
            94
          </span>
        </div>

        {/* Casset.am text */}
        <div
          className="absolute top-[109px] left-0 w-full overflow-hidden pointer-events-none text-center"
          style={{
            fontFamily: "Helvetica Neue, Arial, sans-serif",
            fontSize: "6.8px",
            fontWeight: "normal",
            letterSpacing: "1px",
            opacity: 0.3,
            color: theme.primary,
          }}
        >
          <div className="whitespace-nowrap">CASSET.FM • EMPOWERING ARTISTS TO EARN INDEPENDENTLY • CASSET.FM</div>
        </div>

        {/* VA watermark */}
        <div
          className="absolute inset-0 flex items-end justify-start overflow-hidden pointer-events-none"
          style={{
            fontFamily: "Helvetica Neue, Arial, sans-serif",
            fontSize: "120px",
            fontWeight: "normal",
            opacity: 0.04,
            color: isSideA ? theme.secondary : theme.primary,
            transform: "rotate(-3deg)",
            letterSpacing: "-18px",
          }}
        >
          VA
        </div>
      </div>
    </div>
  )
}

