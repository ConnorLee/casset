import { Music, Play } from "lucide-react"
import { Permanent_Marker } from "next/font/google"

const permanentMarker = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
})

interface ArtistFolderPreviewProps {
  storage: number
  duration: number
  tracks: number
  playlists: number
  isActive?: boolean
}

export function ArtistFolderPreview({
  storage,
  duration,
  tracks,
  playlists,
  isActive = false,
}: ArtistFolderPreviewProps) {
  return (
    <div
      className={`
        bg-white rounded-sm px-4 py-2 
        shadow-lg
        flex items-center
        w-[280px]
        transition-all duration-300
        ${isActive ? "opacity-100" : "opacity-70"}
      `}
      style={{
        transform: "rotate(-2deg)",
      }}
    >
      <div className={`flex items-center justify-between w-full text-black text-sm ${permanentMarker.className}`}>
        <div className="flex items-center gap-8">
          <span>{storage} GB</span>
          <span>{duration} mins</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <Music size={14} />
            {tracks}
          </div>
          <div className="flex items-center gap-1">
            <Play size={14} />
            {playlists}
          </div>
        </div>
      </div>
    </div>
  )
}
