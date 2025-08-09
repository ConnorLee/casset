"use client"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"

interface FileUploaderProps {
  onDrop: (acceptedFiles: File[]) => void
}

export function FileUploader({ onDrop }: FileUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "video/*": [".mp4", ".webm", ".ogg"],
    },
    multiple: true,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-[#F1FF9B] bg-[#F1FF9B]/5" : "border-white/20 hover:border-white/40"}`}
    >
      <input {...getInputProps()} />
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isDragActive ? 1.05 : 1 }}
        className="flex flex-col items-center gap-2"
      >
        <Upload className="w-8 h-8 opacity-50" />
        <p className="text-sm">{isDragActive ? "Drop your files here" : "Drag & drop files or click to select"}</p>
        <p className="text-xs opacity-50">Supports images and videos</p>
      </motion.div>
    </div>
  )
}
