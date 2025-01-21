import { motion } from "framer-motion"
import Image from "next/image"
import "../styles/hover-effects.css"

interface ArtistTagProps {
  tag: string
  isActive?: boolean
}

export function ArtistTag({ tag, isActive = false }: ArtistTagProps) {
  const rotation = 1
  return (
    <motion.div
      className="inline-flex items-center rounded-full shadow-lg transform artist-tag"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      style={{
        background: "linear-gradient(to bottom, #ffffff, #f0f0f0)",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="flex items-center whitespace-nowrap px-6 py-2">
        <div className="mr-3 flex items-center justify-center">
          <Image
            src="/images/casset-a-logo.svg" // Update to use a local file
            alt="a"
            width={24}
            height={53}
            className="w-6 h-auto"
            draggable="false"
          />
        </div>
        <span
          className="text-[#000033]"
          style={{
            fontFamily: "'AeonikPro', sans-serif",
            fontWeight: "900",
            fontSize: "2em",
            letterSpacing: "-0.02em",
          }}
        >
          {tag}
        </span>
      </div>
    </motion.div>
  )
}

