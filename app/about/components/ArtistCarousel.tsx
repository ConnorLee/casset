"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
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

  useEffect(() => {
    const selectedIndex = artists.findIndex((a) => a.id === selectedArtist.id)
    const sideCount = Math.floor(artists.length / 2)

    const newOrder = []
    for (let i = -sideCount; i <= sideCount; i++) {
      const index = (selectedIndex + i + artists.length) % artists.length
      newOrder.push(artists[index])
    }

    setOrderedArtists(newOrder)
  }, [selectedArtist.id, artists])

  const getImageSize = (index: number) => {
    const centerIndex = Math.floor(orderedArtists.length / 2)
    const distance = Math.abs(index - centerIndex)

    if (distance === 0) return "w-64 h-64"
    if (distance === 1) return "w-48 h-48"
    return "w-32 h-32"
  }

  const getXOffset = (index: number) => {
    const centerIndex = Math.floor(orderedArtists.length / 2)
    const distance = index - centerIndex

    if (distance === 0) return 0
    if (Math.abs(distance) === 1) return distance * 200
    return distance * 160
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto py-24">
      <div className="flex items-center justify-center h-[400px]">
        {orderedArtists.map((artist, index) => {
          const isCentered = index === Math.floor(orderedArtists.length / 2)
          const xOffset = getXOffset(index)

          return (
            <motion.div
              key={`${artist.id}-${index}`}
              className="absolute"
              initial={false}
              animate={{
                x: xOffset,
                scale: isCentered ? 1 : 0.95,
                zIndex: isCentered ? 10 : 5 - Math.abs(index - Math.floor(orderedArtists.length / 2)),
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            >
              <motion.div
                className="relative cursor-pointer"
                onClick={() => onArtistSelect(artist)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Artist Image */}
                <div
                  className={`
                    relative rounded-full overflow-hidden transition-all duration-300 ease-out
                    ${getImageSize(index)}
                    ${isCentered ? "border-[24px] border-white shadow-2xl" : "border-[16px] border-white/90 shadow-xl"}
                  `}
                >
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                    sizes={isCentered ? "256px" : "192px"}
                    priority
                  />
                </div>

                {/* Artist Tag - Always centered below the image */}
                <AnimatePresence>
                  {isCentered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-6 whitespace-nowrap"
                      style={{ top: "100%" }}
                    >
                      <ArtistTag tag={artist.tag} isActive={true} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Folder Preview - Only for centered item */}
                <AnimatePresence>
                  {isCentered && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute left-1/2 -translate-x-1/2 -top-24 w-full min-w-[280px]"
                    >
                      <ArtistFolderPreview storage={21} duration={133} tracks={36} playlists={3} isActive={true} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
