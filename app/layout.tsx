import type React from "react"
import "./globals.css"
import "./styles/fonts.css"
import type { Metadata } from "next"
import {
  Space_Mono,
  Lekton,
  Baskervville,
  Caveat,
  Permanent_Marker,
  Square_Peg,
  Swanky_and_Moo_Moo as SwankyAndMooMoo,
} from "next/font/google"

// Configure fonts with display swap
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
})

const lekton = Lekton({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lekton",
})

const baskervville = Baskervville({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-baskervville",
})

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
})

const permanentMarker = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-permanent-marker",
})

const squarePeg = Square_Peg({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-square-peg",
})

const swankyandmoomoo = SwankyAndMooMoo({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-swankyandmoomoo",
})

export const metadata: Metadata = {
  title: "casset.fm : empowering artists to earn independently",
  description: "Create a casset with exclusive content and tracks, and earn instantly.",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casset-uWqAjD7R0Is7KlHmjYTwLaJ629Iq7M.png",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casset-uWqAjD7R0Is7KlHmjYTwLaJ629Iq7M.png",
  },
  openGraph: {
    title: "casset.fm : empowering artists to earn independently",
    description: "Create a casset with exclusive content and tracks, and earn instantly.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2011-fFkW2J7aYJDIpLWZl1xyroeRMmt0wL.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "casset.fm : empowering artists to earn independently",
    description: "Create a casset with exclusive content and tracks, and earn instantly.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2011-fFkW2J7aYJDIpLWZl1xyroeRMmt0wL.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Casset",
    startupImage: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casset-uWqAjD7R0Is7KlHmjYTwLaJ629Iq7M.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${lekton.variable} ${baskervville.variable} ${caveat.variable} ${permanentMarker.variable} ${squarePeg.variable} ${swankyandmoomoo.variable}`}
    >
      <head>
        <link
          rel="apple-touch-icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/casset-uWqAjD7R0Is7KlHmjYTwLaJ629Iq7M.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Preload custom fonts */}
        <link
          rel="preload"
          href="/fonts/AutoscapeRoundLLTrialWeb-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AutoscapeRoundLLTrialWeb-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SuperstudioTrial-Bold.otf"
          as="font"
          type="font/opentype"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/CobraVIPTrial-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-[#F0F0FF] antialiased">{children}</body>
    </html>
  )
}

//Make sure to place all font files in the `/public/fonts/` directory:
//- /public/fonts/AutoscapeRoundLLTrialWeb-Regular.woff2
//- /public/fonts/AutoscapeRoundLLTrialWeb-Bold.woff2
//- /public/fonts/SuperstudioTrial-Bold.otf
//- /public/fonts/CobraVIPTrial-Regular.woff2
