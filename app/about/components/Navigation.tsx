"use client"

import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="fixed top-8 w-full px-8 flex justify-between items-center z-50">
      <Link href="/">
        <div
          className="text-xl opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          style={{ fontFamily: "'Cobra LL VIP Trial', sans-serif", fontWeight: "bold" }}
        >
          casset
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <span className="text-sm">ABOUT</span>
        <Link
          href="/sign-up"
          className="px-4 py-1.5 bg-[#F1FF9B] text-[#000033] text-sm hover:bg-[#F1FF9B]/90 transition-colors"
          style={{ borderRadius: 0 }}
        >
          sign-up
        </Link>
      </div>
    </nav>
  )
}
