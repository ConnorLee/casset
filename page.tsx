import Image from 'next/image'
import { Space_Mono, Lekton, Baskervville, Caveat, Permanent_Marker, Square_Peg, Swanky_and_Moo_Moo } from 'next/font/google'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin']
})

const lekton = Lekton({ weight: ['400', '700'], subsets: ['latin'], style: ['normal', 'italic'] })
const baskervville = Baskervville({ weight: ['400'], subsets: ['latin'], style: ['normal', 'italic'] })
const caveat = Caveat({ subsets: ['latin'] })
const permanentMarker = Permanent_Marker({ weight: ['400'], subsets: ['latin'] })
const squarePeg = Square_Peg({ weight: ['400'], subsets: ['latin'] })
const swankyAndMooMoo = Swanky_and_Moo_Moo({ weight: ['400'], subsets: ['latin'] })

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-black text-white relative overflow-hidden flex flex-col items-center justify-center px-4">
      {/* Circular Animations */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-gray-800 rounded-full animate-pulse-out"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Central Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-gray-900/10 via-gray-800/5 to-transparent animate-radial-pulse" />
      </div>

      {/* Logo Section */}
      <div className="relative z-10 mb-16">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2010-QAjWhUiCnRa0mwzhKi9bI0Oaba5ZMK.png"
            alt="Casset Logo"
            width={96}
            height={96}
            className="w-24 h-24"
          />
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%2011.02.11%E2%80%AFPM%20Copy%204-3fnMvRSz10dvMb9IojLv7k4sfemnbM.png"
            alt="Casset Text"
            width={200}
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mb-16">
        <div className="flex items-center justify-center mb-4">
          <span className="animate-blink mr-2 text-[#F1FF9B] text-3xl md:text-4xl">|</span>
          <h1 className={`${lekton.className} text-3xl md:text-4xl font-normal leading-tight`}>
            Create a casset with exclusive content and tracks.
          </h1>
        </div>
        <p className={`${lekton.className} text-[#F1FF9B] text-xl tracking-[0.2em]`}>
          AND EARN INSTANTLY
        </p>
      </div>

      {/* Cassette Player */}
      <div className="relative z-10 w-full max-w-md perspective-1000">
        <div className="transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%205-XN9VU1WvLEqxohmxBvghgaACornSSJ.png"
            alt="Cassette Player Interface"
            width={600}
            height={400}
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </main>
  )
}

