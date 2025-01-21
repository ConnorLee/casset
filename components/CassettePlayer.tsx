"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { playlists } from "../data/playlists"
import { CassetteDisplay } from "./CassetteDisplay"

interface CassettePlayerProps {
  isSideA: boolean
  onSideChange: (isSideA: boolean) => void
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

export function CassettePlayer({ isSideA, onSideChange, theme, useSkinGradient = false }: CassettePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentPlaylist, setCurrentPlaylist] = useState<"connorJames" | "lilDurden">("connorJames")
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const PREVIEW_DURATION = 33

  const loadSong = useCallback(async (playlist: "connorJames" | "lilDurden", index: number) => {
    if (!audioRef.current) return false

    setIsLoading(true)
    setIsAudioReady(false)

    const song = playlists[playlist][index]
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
  }, [])

  useEffect(() => {
    setIsShaking(true)
    const newPlaylist = isSideA ? "connorJames" : "lilDurden"
    setCurrentPlaylist(newPlaylist)
    setCurrentSongIndex(0)
    setIsPlaying(false)
    setCurrentTime(0)

    loadSong(newPlaylist, 0)
    setTimeout(() => setIsShaking(false), 500)
  }, [isSideA, loadSong])

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      const currentSong = playlists[currentPlaylist][currentSongIndex]
      const elapsedTime = audio.currentTime - currentSong.startTime

      setCurrentTime(elapsedTime)

      if (elapsedTime >= PREVIEW_DURATION) {
        audio.currentTime = currentSong.startTime
      }
    }
  }, [currentPlaylist, currentSongIndex])

  const handleSongEnd = useCallback(() => {
    const nextIndex = (currentSongIndex + 1) % playlists[currentPlaylist].length
    setCurrentSongIndex(nextIndex)
    setCurrentTime(0)

    loadSong(currentPlaylist, nextIndex).then((success) => {
      if (success && audioRef.current && isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    })
  }, [currentPlaylist, currentSongIndex, isPlaying, loadSong])

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
        ? (currentSongIndex + 1) % playlists[currentPlaylist].length
        : (currentSongIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length

    setCurrentSongIndex(newIndex)
    setCurrentTime(0)

    const success = await loadSong(currentPlaylist, newIndex)
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

  const flipCassette = () => {
    setIsShaking(true)
    setTimeout(() => {
      onSideChange(!isSideA)
      setIsShaking(false)
    }, 500)
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  useEffect(() => {
    loadSong(currentPlaylist, currentSongIndex)
  }, [loadSong, currentPlaylist, currentSongIndex])

  return (
    <div className="flex items-center justify-center">
      <CassetteDisplay
        isSideA={isSideA}
        isPlaying={isPlaying}
        isLoading={isLoading}
        currentTime={currentTime}
        currentSong={playlists[currentPlaylist][currentSongIndex].title}
        isShaking={isShaking}
        showInfo={showInfo}
        onTogglePlay={togglePlay}
        onSkip={handleSkip}
        onFlipCassette={flipCassette}
        onToggleInfo={toggleInfo}
        PREVIEW_DURATION={PREVIEW_DURATION}
        isAudioReady={isAudioReady}
        theme={theme}
        useSkinGradient={useSkinGradient}
      />
      <audio ref={audioRef} preload="auto" />
    </div>
  )
}

export default CassettePlayer

