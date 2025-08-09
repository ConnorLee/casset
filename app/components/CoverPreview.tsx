"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Swanky_and_Moo_Moo } from "next/font/google"

const swankyAndMooMoo = Swanky_and_Moo_Moo({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
})

interface ImagePosition {
  id: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  image: HTMLImageElement
  dragging: boolean
}

interface CoverPreviewProps {
  files: File[]
  price: number
}

export function CoverPreview({ files, price }: CoverPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blurredCanvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [imagePositions, setImagePositions] = useState<ImagePosition[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showBlurred, setShowBlurred] = useState(false)

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        files.map(
          (file) =>
            new Promise<HTMLImageElement>((resolve) => {
              const img = new Image()
              img.crossOrigin = "anonymous"
              img.src = URL.createObjectURL(file)
              img.onload = () => resolve(img)
            }),
        ),
      )
      setImages(loadedImages)

      // Calculate initial positions
      const positions: ImagePosition[] = loadedImages
        .map((img, index) => {
          const canvas = canvasRef.current
          if (!canvas) return null

          // Calculate dimensions while maintaining aspect ratio
          let width = img.width
          let height = img.height
          const maxDimension = 300
          const scale = Math.min(maxDimension / width, maxDimension / height)
          width *= scale
          height *= scale

          // Calculate grid-based position
          const cols = Math.ceil(Math.sqrt(loadedImages.length))
          const rows = Math.ceil(loadedImages.length / cols)
          const gridX = index % cols
          const gridY = Math.floor(index / cols)
          const cellWidth = canvas.width / cols
          const cellHeight = (canvas.height - 150) / rows // Account for bottom section

          // Add random offset within cell
          const offsetX = (Math.random() - 0.5) * 50
          const offsetY = (Math.random() - 0.5) * 50

          return {
            id: `image-${index}`,
            x: gridX * cellWidth + (cellWidth - width) / 2 + offsetX,
            y: gridY * cellHeight + (cellHeight - height) / 2 + offsetY,
            width,
            height,
            rotation: (Math.random() - 0.5) * 30,
            image: img,
            dragging: false,
          }
        })
        .filter((pos): pos is ImagePosition => pos !== null)

      setImagePositions(positions)
    }

    loadImages()
  }, [files])

  const handleMouseDown = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedImage(id)
    setIsDragging(true)
    setImagePositions((prev) => prev.map((pos) => (pos.id === id ? { ...pos, dragging: true } : pos)))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const canvasBounds = canvasRef.current?.getBoundingClientRect()
      if (canvasBounds) {
        const scale = canvasBounds.width / 800 // Account for canvas scaling
        setImagePositions((prev) =>
          prev.map((pos) => {
            if (pos.dragging) {
              // Calculate new position
              const x = (e.clientX - canvasBounds.left) / scale
              const y = (e.clientY - canvasBounds.top) / scale

              // Constrain to canvas bounds and above white section
              const minX = 0
              const maxX = 800 - pos.width
              const minY = 0
              const maxY = 450 - pos.height // 600 - 150 (white section) = 450

              return {
                ...pos,
                x: Math.max(minX, Math.min(maxX, x - pos.width / 2)),
                y: Math.max(minY, Math.min(maxY, y - pos.height / 2)),
              }
            }
            return pos
          }),
        )
      }
    }
  }

  const handleMouseUp = () => {
    setSelectedImage(null)
    setIsDragging(false)
    setImagePositions((prev) => prev.map((pos) => ({ ...pos, dragging: false })))
    renderCanvas()
  }

  const handleTouchStart = (id: string, e: React.TouchEvent<HTMLDivElement>) => {
    handleMouseDown(id, e as unknown as React.MouseEvent<HTMLDivElement>)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault() // Prevent scrolling while dragging
    const touch = e.touches[0]
    const simulatedEvent = {
      clientX: touch.clientX,
      clientY: touch.clientY,
    } as React.MouseEvent<HTMLDivElement>
    handleMouseMove(simulatedEvent)
  }

  const handleTouchEnd = () => {
    handleMouseUp()
  }

  const renderCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with black background
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add noise texture
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 20
      data[i] = data[i + 1] = data[i + 2] = noise
      data[i + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)

    // Draw images
    imagePositions.forEach((pos) => {
      ctx.save()

      // Set up transform
      ctx.translate(pos.x + pos.width / 2, pos.y + pos.height / 2)
      ctx.rotate((pos.rotation * Math.PI) / 180)
      ctx.translate(-(pos.x + pos.width / 2), -(pos.y + pos.height / 2))

      // Draw torn edges
      ctx.beginPath()
      const segments = 20
      const tearAmount = 8

      const points: { x: number; y: number }[] = []
      for (let i = 0; i <= segments; i++) {
        points.push({
          x: pos.x + (pos.width * i) / segments,
          y: pos.y + (Math.random() * tearAmount - tearAmount / 2),
        })
      }
      for (let i = 0; i <= segments; i++) {
        points.push({
          x: pos.x + pos.width + (Math.random() * tearAmount - tearAmount / 2),
          y: pos.y + (pos.height * i) / segments,
        })
      }
      for (let i = segments; i >= 0; i--) {
        points.push({
          x: pos.x + (pos.width * i) / segments,
          y: pos.y + pos.height + (Math.random() * tearAmount - tearAmount / 2),
        })
      }
      for (let i = segments; i >= 0; i--) {
        points.push({
          x: pos.x + (Math.random() * tearAmount - tearAmount / 2),
          y: pos.y + (pos.height * i) / segments,
        })
      }

      ctx.moveTo(points[0].x, points[0].y)
      points.forEach((point) => ctx.lineTo(point.x, point.y))
      ctx.closePath()
      ctx.clip()

      // Draw the image
      ctx.drawImage(pos.image, pos.x, pos.y, pos.width, pos.height)

      // Add grain overlay
      const grainData = ctx.getImageData(pos.x, pos.y, pos.width, pos.height)
      const gData = grainData.data
      for (let i = 0; i < gData.length; i += 4) {
        const noise = (Math.random() - 0.5) * 30
        gData[i] += noise
        gData[i + 1] += noise
        gData[i + 2] += noise
      }
      ctx.putImageData(grainData, pos.x, pos.y)

      ctx.restore()
    })

    // Draw white bottom section
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.fillRect(0, canvas.height - 150, canvas.width, 150)

    // Draw artist name
    ctx.save()
    const artistName = "CONNOR JAMES"
    ctx.font = `32px ${swankyAndMooMoo.style.fontFamily}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    const gradient = ctx.createLinearGradient(0, canvas.height - 75, canvas.width, canvas.height - 75)
    gradient.addColorStop(0, "#4a4a4a")
    gradient.addColorStop(1, "#000000")
    ctx.fillStyle = gradient
    ctx.fillText(artistName, canvas.width / 2, canvas.height - 75)
    ctx.restore()

    // Add price tag
    ctx.save()
    ctx.fillStyle = "#FF6B6B"
    ctx.beginPath()
    ctx.roundRect(canvas.width - 120, 20, 100, 40, 20)
    ctx.fill()
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`$${price}`, canvas.width - 70, 40)
    ctx.restore()

    // Add bottom elements
    ctx.save()
    // Bottom left "casset"
    ctx.font = "12px 'Cobra VIP'"
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.textAlign = "left"
    ctx.fillText("casset", 20, canvas.height - 20)

    // Bottom right "21"
    ctx.font = "48px 'Helvetica Neue'"
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
    ctx.textAlign = "right"
    ctx.fillText("21", canvas.width - 20, canvas.height - 20)

    // Date
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "16px monospace"
    ctx.textAlign = "left"
    ctx.fillText("01.21.25", 20, canvas.height - 160)
    ctx.restore()
  }

  const createBlurredVersion = () => {
    const canvas = canvasRef.current
    const blurredCanvas = blurredCanvasRef.current
    if (!canvas || !blurredCanvas || imagePositions.length === 0) return

    const ctx = canvas.getContext("2d")
    const blurredCtx = blurredCanvas.getContext("2d")
    if (!ctx || !blurredCtx) return

    // First, render the current canvas state
    renderCanvas()

    // Create a temporary canvas for the blur effect
    const tempCanvas = document.createElement("canvas")
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height
    const tempCtx = tempCanvas.getContext("2d")
    if (!tempCtx) return

    // Copy the original canvas content
    tempCtx.drawImage(canvas, 0, 0)

    // Apply multiple passes of box blur for a gaussian-like effect
    for (let i = 0; i < 20; i++) {
      tempCtx.filter = "blur(2px)"
      tempCtx.drawImage(tempCanvas, 0, 0)
    }

    // Clear the blurred canvas
    blurredCtx.clearRect(0, 0, blurredCanvas.width, blurredCanvas.height)

    // Draw the blurred version
    blurredCtx.drawImage(tempCanvas, 0, 0)

    // Add the center text strip
    blurredCtx.save()

    // Create gradient for the text background with more subtle transparency
    const stripHeight = 80
    const stripY = (canvas.height - stripHeight) / 2
    const gradient = blurredCtx.createLinearGradient(0, stripY, 0, stripY + stripHeight)
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.85)")
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.9)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.85)")

    blurredCtx.fillStyle = gradient
    blurredCtx.fillRect(0, stripY, canvas.width, stripHeight)

    // Add the text with updated style
    blurredCtx.font = `32px ${swankyAndMooMoo.style.fontFamily}`
    blurredCtx.fillStyle = "#000000"
    blurredCtx.textAlign = "center"
    blurredCtx.textBaseline = "middle"
    blurredCtx.fillText("CONNOR JAMES", canvas.width / 2, canvas.height / 2)

    // Add price tag with updated style
    blurredCtx.save()
    const priceTagWidth = 100
    const priceTagHeight = 40
    const priceTagX = canvas.width - priceTagWidth - 20
    const priceTagY = 20

    // Draw price tag background
    blurredCtx.fillStyle = "#4ADE80"
    blurredCtx.beginPath()
    blurredCtx.roundRect(priceTagX, priceTagY, priceTagWidth, priceTagHeight, 20)
    blurredCtx.fill()

    // Add "a" symbol
    blurredCtx.font = "20px 'Cobra VIP'"
    blurredCtx.fillStyle = "#4ADE80"
    blurredCtx.textAlign = "center"
    blurredCtx.textBaseline = "middle"
    const symbolX = priceTagX + 25
    const symbolY = priceTagY + priceTagHeight / 2
    blurredCtx.beginPath()
    blurredCtx.arc(symbolX, symbolY, 12, 0, Math.PI * 2)
    blurredCtx.fill()
    blurredCtx.fillStyle = "#86EFAC"
    blurredCtx.fillText("a", symbolX, symbolY)

    // Add price
    blurredCtx.font = "bold 18px 'AeonikPro'"
    blurredCtx.fillStyle = "#052e16"
    blurredCtx.textAlign = "left"
    blurredCtx.fillText(`$${price.toFixed(2)}`, symbolX + 20, symbolY)
    blurredCtx.restore()

    // Add bottom elements with updated style
    blurredCtx.font = "16px 'Cobra VIP'"
    blurredCtx.fillStyle = "rgba(0, 0, 0, 0.3)"
    blurredCtx.textAlign = "left"
    blurredCtx.fillText("casset", 20, canvas.height - 20)

    // Update the "21" style
    blurredCtx.font = "48px 'Helvetica Neue'"
    blurredCtx.fontWeight = "200"
    blurredCtx.fillStyle = "rgba(0, 0, 0, 0.2)"
    blurredCtx.textAlign = "right"
    blurredCtx.fillText("21", canvas.width - 20, canvas.height - 20)

    blurredCtx.restore()

    setShowBlurred(true)
  }

  useEffect(() => {
    if (!isDragging) {
      renderCanvas()
    }
  }, [imagePositions, price, isDragging])

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className={`absolute top-0 left-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ${
            showBlurred ? "opacity-0" : "opacity-100"
          }`}
        />
        <canvas
          ref={blurredCanvasRef}
          width={800}
          height={600}
          className={`absolute top-0 left-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ${
            showBlurred ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0">
          {!showBlurred &&
            imagePositions.map((pos) => (
              <div
                key={pos.id}
                className="absolute cursor-move touch-none select-none z-10"
                style={{
                  width: pos.width,
                  height: pos.height,
                  transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`,
                  opacity: pos.dragging ? 0.7 : 0.4,
                  backgroundColor: pos.dragging ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                  border: "2px solid rgba(255,255,255,0.5)",
                  transition: "opacity 0.2s, background-color 0.2s",
                }}
                onMouseDown={(e) => handleMouseDown(pos.id, e)}
                onTouchStart={(e) => handleTouchStart(pos.id, e)}
              />
            ))}
        </div>
        {files.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/50">Drag and drop media to create your cover</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        {showBlurred && (
          <button
            onClick={() => setShowBlurred(false)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Edit
          </button>
        )}
        <button
          onClick={createBlurredVersion}
          disabled={imagePositions.length === 0}
          className="px-4 py-2 bg-[#F1FF9B] text-[#000033] rounded-lg hover:bg-[#F1FF9B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create
        </button>
      </div>
    </div>
  )
}
