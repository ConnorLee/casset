import type { Metadata } from "next"
import ConnorPageClient from "./ConnorPageClient"

export const metadata: Metadata = {
  title: "Connor James | casset.fm",
  description:
    "Multi-instrumentalist, singer/songwriter, and producer. All albums recorded and produced solo. Listen to exclusive tracks on casset.fm",
  openGraph: {
    title: "Connor James | casset.fm",
    description: "Multi-instrumentalist, singer/songwriter, and producer. All albums recorded and produced solo.",
    url: "https://casset.fm/connor",
    siteName: "casset.fm",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7673-d2E7Y1VpaQrxDBErSLQ4HrWmTM4RqG.png",
        width: 1200,
        height: 630,
        alt: "Connor James - casset.fm",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connor James | casset.fm",
    description: "Multi-instrumentalist, singer/songwriter, and producer. Listen to exclusive tracks on casset.fm",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7673-d2E7Y1VpaQrxDBErSLQ4HrWmTM4RqG.png"],
    creator: "@cassetfm",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ConnorPage() {
  return <ConnorPageClient />
}
