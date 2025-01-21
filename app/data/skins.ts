export interface SkinConfig {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    hover: string
    gradient: string
  }
  preview: string
}

export const skins: SkinConfig[] = [
  {
    id: "red",
    name: "Blood Red",
    colors: {
      primary: "#FF0000",
      secondary: "#8B0000",
      accent: "#FF3333",
      text: "#FFFFFF",
      background: "rgba(139, 0, 0, 0.4)",
      hover: "#FF6666",
      gradient: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
    },
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%20Copy%2027-ADj6t1GOe5cCaq3UzjpEsGVAGAe5KJ.png",
  },
  {
    id: "pink",
    name: "Hot Pink",
    colors: {
      primary: "#FF1493",
      secondary: "#C71585",
      accent: "#FF69B4",
      text: "#FFFFFF",
      background: "rgba(199, 21, 133, 0.4)",
      hover: "#FFB6C1",
      gradient: "linear-gradient(135deg, #FF0080 0%, #7928CA 100%)",
    },
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%20Copy%2027-ADj6t1GOe5cCaq3UzjpEsGVAGAe5KJ.png",
  },
  {
    id: "blue",
    name: "Electric Blue",
    colors: {
      primary: "#0000FF",
      secondary: "#000080",
      accent: "#1E90FF",
      text: "#FFFFFF",
      background: "rgba(0, 0, 128, 0.4)",
      hover: "#87CEFA",
      gradient: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
    },
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%20Copy%2027-ADj6t1GOe5cCaq3UzjpEsGVAGAe5KJ.png",
  },
  {
    id: "magenta",
    name: "Cyber Magenta",
    colors: {
      primary: "#FF00FF",
      secondary: "#8B008B",
      accent: "#FF66FF",
      text: "#FFFFFF",
      background: "rgba(139, 0, 139, 0.4)",
      hover: "#DDA0DD",
      gradient: "linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)",
    },
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%20Copy%2027-ADj6t1GOe5cCaq3UzjpEsGVAGAe5KJ.png",
  },
  {
    id: "green",
    name: "Matrix Green",
    colors: {
      primary: "#00FF00",
      secondary: "#006400",
      accent: "#32CD32",
      text: "#FFFFFF",
      background: "rgba(0, 100, 0, 0.4)",
      hover: "#90EE90",
      gradient: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
    },
    preview:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%20Copy%2027-ADj6t1GOe5cCaq3UzjpEsGVAGAe5KJ.png",
  },
]

