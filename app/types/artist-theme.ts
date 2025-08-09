export interface ArtistTheme {
  id: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    hover: string
    gradient: string
  }
}

// Default theme as fallback
const defaultTheme: ArtistTheme = {
  id: "default",
  colors: {
    primary: "#F1FF9B",
    secondary: "#202020",
    accent: "#6666FF",
    text: "#FFFFFF",
    background: "rgba(32, 32, 32, 0.8)",
    hover: "#F7FFB8",
    gradient: "linear-gradient(135deg, #202020 0%, #404040 100%)",
  },
}

export const artistThemes: Record<string, ArtistTheme> = {
  casset: {
    id: "casset",
    colors: {
      primary: "#F1FF9B",
      secondary: "#202020",
      accent: "#6666FF",
      text: "#FFFFFF",
      background: "rgba(32, 32, 32, 0.8)",
      hover: "#F7FFB8",
      gradient: "linear-gradient(135deg, #202020 0%, #404040 100%)",
    },
  },
  "connor-james": {
    id: "connor-james",
    colors: {
      primary: "#E8E5E3",
      secondary: "#2C2C2C",
      accent: "#B8B8B8",
      text: "#FFFFFF",
      background: "rgba(44, 44, 44, 0.8)",
      hover: "#F5F5F5",
      gradient: "linear-gradient(135deg, #2C2C2C 0%, #4C4C4C 100%)",
    },
  },
  "baby-koi": {
    id: "baby-koi",
    colors: {
      primary: "#FFB7B7",
      secondary: "#2A1F1F",
      accent: "#FF9494",
      text: "#FFFFFF",
      background: "rgba(42, 31, 31, 0.8)",
      hover: "#FFC7C7",
      gradient: "linear-gradient(135deg, #2A1F1F 0%, #4A3F3F 100%)",
    },
  },
  "lil-durden": {
    id: "lil-durden",
    colors: {
      primary: "#9B6B9E",
      secondary: "#241C25",
      accent: "#B68BB9",
      text: "#FFFFFF",
      background: "rgba(36, 28, 37, 0.8)",
      hover: "#AC7CAF",
      gradient: "linear-gradient(135deg, #241C25 0%, #443C45 100%)",
    },
  },
}

// Add default theme as fallback
artistThemes.default = defaultTheme
