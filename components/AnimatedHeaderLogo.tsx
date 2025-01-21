import { motion } from "framer-motion"
import Image from "next/image"

export default function AnimatedHeaderLogo() {
  return (
    <div className="relative group">
      <motion.div
        className="relative flex flex-col items-center -space-y-1.5"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              className="absolute rounded-full border border-[#F1FF9B] transform-gpu"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 1.8 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
                repeatDelay: 0.2,
              }}
              style={{
                willChange: "transform",
                width: "100%",
                height: "100%",
                top: "-50%",
                left: "-50%",
              }}
            />
          </div>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2011-MZlpY4KVE37Ck4jMtJT16ROdT2z1TD.png"
              alt="Casset Logo"
              width={96}
              height={96}
              className="w-16 h-16 md:w-24 md:h-24 relative z-20"
            />
          </motion.div>
        </div>

        <div className="relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2010%20Copy-xv5Iz0Ep1Djm3VQc4P48TxTkQpsImm.png"
            alt="Casset Text"
            width={200}
            height={40}
            className="w-32 md:w-48 h-auto"
          />
        </div>
      </motion.div>
    </div>
  )
}

