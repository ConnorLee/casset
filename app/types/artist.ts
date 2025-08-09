export interface Artist {
  id: string
  name: string
  image: string
  tag: string
  order: number
}

export const artists: Artist[] = [
  {
    id: "casset",
    name: "Casset",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pfp-L8oPoTb8df07DGHqNZkcEtFDr9qAAC.png",
    tag: "casset",
    order: -2,
  },
  {
    id: "connor-james",
    name: "Connor James",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oval%20Copy%205%202-0VYlqNEcbyDuOyy4ZJVWLiFfwDXLXY.png",
    tag: "connorjames",
    order: -1,
  },
  {
    id: "baby-koi",
    name: "Baby Koi",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oval%20Copy%206%202-5eCY8qY8NFLDn5hdvgqaIyiYEbHAp8.png",
    tag: "babykoi",
    order: 1,
  },
  {
    id: "lil-durden",
    name: "Lil Durden",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oval%20Copy%206-q8xObFI7lcNprFbJPgHBhvaRoL7PY1.png",
    tag: "lildurden",
    order: 2,
  },
  {
    id: "lil-durden-2",
    name: "Lil Durden",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oval%20Copy%205-j9wndYCeEClxsvDI9Ktg9CzBO9pqxE.png",
    tag: "lildurden",
    order: 3,
  },
]
