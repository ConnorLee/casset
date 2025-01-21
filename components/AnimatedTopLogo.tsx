import { motion } from "framer-motion"
import Image from "next/image"

export default function AnimatedTopLogo() {
  return (
    <motion.div className="group" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%2011.02.11%E2%80%AFPM%20Copy%204-K0XQsD9pVOSyuZraeeudjGwpzNMedl.png"
        alt="Casset"
        width={120}
        height={30}
        className="h-[30px] w-auto opacity-100 md:hidden"
      />

      <div className="hidden md:block">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%2011.02.11%E2%80%AFPM%20Copy%204-Wt8LZIBBYHB5yvHq0pvFKipWDPknJP.png"
          alt="Casset"
          width={120}
          height={30}
          className="h-[30px] w-auto opacity-100 group-hover:opacity-0 transition-opacity"
        />
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%2011.02.11%E2%80%AFPM%20Copy%204-K0XQsD9pVOSyuZraeeudjGwpzNMedl.png"
          alt="Casset"
          width={120}
          height={30}
          className="h-[30px] w-auto opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 left-0"
        />
      </div>
    </motion.div>
  )
}

