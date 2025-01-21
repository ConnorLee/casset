"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import Image from "next/image"
import type { Artist } from "../types/artist"
import { ArtistTag } from "./ArtistTag"
import { ArtistFolderPreview } from "./ArtistFolderPreview"

interface ArtistCarouselProps {
  artists: Artist[]
  onArtistSelect: (artist: Artist) => void
  selectedArtist: Artist
}

export function ArtistCarousel({ artists, onArtistSelect, selectedArtist }: ArtistCarouselProps) {
  const [orderedArtists, setOrderedArtists] = useState<Artist[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<number>(0)
  const lastTouchTimeRef = useRef<number>(0)
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const calculateOrderedArtists = useCallback(() => {
    const selectedIndex = artists.findIndex((a) => a.id === selectedArtist.id)
    const sideCount = Math.floor(artists.length / 2)
    return Array.from({ length: artists.length }, (_, i) => {
      const index = (selectedIndex + i - sideCount + artists.length) % artists.length
      return artists[index]
    })
  }, [selectedArtist.id, artists])

  useEffect(() => {
    setOrderedArtists(calculateOrderedArtists())
  }, [calculateOrderedArtists])

  const getStyles = useMemo(() => {
    const centerIndex = Math.floor(orderedArtists.length / 2)
    return {
      getImageSize: (index: number) => {
        const distance = Math.abs(index - centerIndex)
        if (distance === 0) return "w-[200px] h-[200px] md:w-[300px] md:h-[300px]"
        if (distance === 1) return "w-24 h-24 md:w-36 md:h-36"
        return "w-16 h-16 md:w-24 md:h-24"
      },
      getXOffset: (index: number) => {
        const distance = index - centerIndex
        if (distance === 0) return 0
        if (Math.abs(distance) === 1) return distance * 120
        return distance * 100
      },
      getZIndex: (index: number) => {
        return 10 - Math.abs(index - centerIndex)
      },
    }
  }, [orderedArtists.length])

  const folderPreviewData = useMemo(() => {
    const data: Record<string, { storage: number; duration: number; tracks: number; playlists: number }> = {}
    artists.forEach((artist) => {
      data[artist.id] = {
        storage: Math.floor(Math.random() * 100) + 1,
        duration: Math.floor(Math.random() * 200) + 60,
        tracks: Math.floor(Math.random() * 20) + 1,
        playlists: Math.floor(Math.random() * 5) + 1,
      }
    })
    return data
  }, [artists])

  const handleArtistClick = useCallback(
    (artist: Artist) => {
      if (artist.id !== selectedArtist.id && !isTransitioning) {
        setIsTransitioning(true)
        const currentIndex = artists.findIndex((a) => a.id === selectedArtist.id)
        const newIndex = artists.findIndex((a) => a.id === artist.id)
        setDirection(newIndex > currentIndex ? -1 : 1)
        onArtistSelect(artist)
        setTimeout(() => setIsTransitioning(false), 500)
      }
    },
    [selectedArtist.id, isTransitioning, onArtistSelect, artists],
  )

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX
    lastTouchTimeRef.current = Date.now()
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (throttleTimeoutRef.current) return

      const touchEnd = e.touches[0].clientX
      const timeDiff = Date.now() - lastTouchTimeRef.current

      if (timeDiff > 50) {
        const diff = touchEnd - touchStartRef.current
        if (Math.abs(diff) > 50) {
          const currentIndex = artists.findIndex((a) => a.id === selectedArtist.id)
          const newIndex =
            diff > 0 ? (currentIndex - 1 + artists.length) % artists.length : (currentIndex + 1) % artists.length
          setDirection(diff > 0 ? 1 : -1)
          onArtistSelect(artists[newIndex])

          touchStartRef.current = touchEnd
          lastTouchTimeRef.current = Date.now()

          throttleTimeoutRef.current = setTimeout(() => {
            throttleTimeoutRef.current = null
          }, 300)
        }
      }
    },
    [artists, selectedArtist.id, onArtistSelect],
  )

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()

      if (throttleTimeoutRef.current) return

      const currentIndex = artists.findIndex((a) => a.id === selectedArtist.id)
      const newIndex =
        e.deltaY > 0 ? (currentIndex + 1) % artists.length : (currentIndex - 1 + artists.length) % artists.length

      setDirection(e.deltaY > 0 ? -1 : 1)
      onArtistSelect(artists[newIndex])

      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null
      }, 300)
    },
    [artists, selectedArtist.id, onArtistSelect],
  )

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("touchstart", handleTouchStart, { passive: true })
      carousel.addEventListener("touchmove", handleTouchMove, { passive: false })
      carousel.addEventListener("wheel", handleWheel, { passive: false })

      return () => {
        carousel.removeEventListener("touchstart", handleTouchStart)
        carousel.removeEventListener("touchmove", handleTouchMove)
        carousel.removeEventListener("wheel", handleWheel)
      }
    }
  }, [handleTouchStart, handleTouchMove, handleWheel])

  return (
    <div
      ref={carouselRef}
      className="relative w-full max-w-6xl mx-auto py-12 md:py-24 flex items-center justify-center h-[400px] md:h-[500px]"
      role="region"
      aria-label="Artist carousel"
    >
      <AnimatePresence initial={false} custom={direction}>
        {orderedArtists.map((artist, index) => {
          const isCentered = index === Math.floor(orderedArtists.length / 2)
          const xOffset = getStyles.getXOffset(index)
          const imageSize = getStyles.getImageSize(index)
          const zIndex = getStyles.getZIndex(index)

          return (
            <motion.div
              key={`${artist.id}-${index}`}
              className="absolute"
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 200 : -200 }}
              animate={{
                opacity: 1,
                x: xOffset,
                scale: isCentered ? 1 : 0.95,
                zIndex,
              }}
              exit={{ opacity: 0, x: direction > 0 ? -200 : 200 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
                duration: 0.5,
              }}
            >
              <motion.div
                className="relative cursor-pointer"
                onClick={() => handleArtistClick(artist)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 17,
                }}
              >
                <div className="relative">
                  {/* Folder Preview */}
                  <AnimatePresence>
                    {isCentered && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 transform -translate-y-full -top-12"
                      >
                        <ArtistFolderPreview
                          storage={folderPreviewData[artist.id].storage}
                          duration={folderPreviewData[artist.id].duration}
                          tracks={folderPreviewData[artist.id].tracks}
                          playlists={folderPreviewData[artist.id].playlists}
                          isActive={true}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Artist Image */}
                  <motion.div
                    className={`
                      relative rounded-full overflow-hidden transition-all duration-300
                      ${imageSize}
                      ${isCentered ? "border-[24px] border-white/50 shadow-2xl" : "border-[12px] border-white/50 shadow-xl"}
                    `}
                    initial={false}
                    animate={{
                      rotate: isCentered ? [0, -5, 0] : 0,
                      scale: isCentered ? [1, 1.05, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={artist.image || "/placeholder.svg"}
                      alt={`${artist.name}'s profile`}
                      fill
                      sizes={isCentered ? "300px" : "144px"}
                      priority={isCentered}
                      className="rounded-full object-cover"
                      draggable="false"
                    />
                  </motion.div>

                  {/* Artist Tag */}
                  <AnimatePresence>
                    {isCentered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 transform translate-y-1/2 bottom-0"
                      >
                        <ArtistTag tag={artist.tag} isActive={true} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

