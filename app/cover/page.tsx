"use client"

import { useState, useCallback } from "react"
import { FileUploader } from "../components/FileUploader"
import { CoverPreview } from "../components/CoverPreview"
import Link from "next/link"

export default function CoverPage() {
  const [files, setFiles] = useState<File[]>([])
  const [price, setPrice] = useState(45)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2F1ED] to-[#E8E5D9] text-[#000033] relative overflow-hidden">
      <nav className="fixed top-8 w-full px-4 md:px-8 flex justify-between items-center z-50">
        <Link href="/" aria-label="Go to homepage">
          <svg
            width="104"
            height="50"
            viewBox="0 0 104 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 md:w-24 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <text x="2" y="35" fill="currentColor" fontSize="40" fontFamily="Cobra VIP">
              casset
            </text>
          </svg>
        </Link>
        <Link
          href="/app"
          className="px-4 py-1.5 bg-[#F1FF9B] text-[#000033] text-sm hover:bg-[#F1FF9B]/90 transition-colors"
          style={{ borderRadius: 0 }}
        >
          coming soon
        </Link>
      </nav>

      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Cover Preview */}
            <div className="w-full md:w-2/3">
              <CoverPreview files={files} price={price} />
            </div>

            {/* Right side - Controls */}
            <div className="w-full md:w-1/3 space-y-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Cover Design</h2>
                <FileUploader onDrop={onDrop} />

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md"
                    min="0"
                    step="1"
                  />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Uploaded Media</h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm truncate">{file.name}</span>
                      <button
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
