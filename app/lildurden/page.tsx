import type { Metadata } from "next"
import LilDurdenClientPage from "./LilDurdenClientPage"

export const metadata: Metadata = {
  title: "Lil Durden | casset.fm",
  description:
    "Lil Durden used to sell soap, before being catapulted into superstardom. Listen to exclusive tracks on casset.fm",
  openGraph: {
    title: "Lil Durden | casset.fm",
    description: "Lil Durden used to sell soap, before being catapulted into superstardom.",
    url: "https://casset.fm/lildurden",
    siteName: "casset.fm",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oval%20Copy%206-q8xObFI7lcNprFbJPgHBhvaRoL7PY1.png",
        width: 1200,
        height: 630,
        alt: "Lil Durden - casset.fm",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lil Durden | casset.fm",
    description:
      "Lil Durden used to sell soap, before being catapulted into superstardom. Listen to exclusive tracks on casset.fm",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oval%20Copy%206-q8xObFI7lcNprFbJPgHBhvaRoL7PY1.png",
    ],
    creator: "@cassetfm",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LilDurdenPage() {
  return <LilDurdenClientPage />
}
