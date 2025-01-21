export interface Song {
  title: string;
  url: string;
  startTime: number;
}

export interface Playlist {
  [key: string]: Song[];
}

export const playlists: Playlist = {
  connorJames: [
    { title: "baby blue", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/baby%20blue-VSLIkBdIma10NfFW4g5qh9ZVj6qTzE.mp3", startTime: 63 },
    { title: "doll", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/doll-jUNFbJBDutNuQnbMxXNdufPNlSGYOH.mp3", startTime: 30.5 },
    { title: "wrapped", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wrapped-UMXYoNyb7kWgV7rThUEPDJ4EIgO9wO.mp3", startTime: 30 },
    { title: "lilacs", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lilacs-Ci5Y9gkIBaAw3hznHuy0G9Oo56Z8eN.mp3", startTime: 30 },

    { title: "love again", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/love%20again-vWePycMa2QAFPLoLIZOqlVqkmcwyCp.mp3", startTime: 107 },
    { title: "better", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/better-MFNDIZTZk3NsAGafg1iG3TQZZmBzfD.mp3", startTime: 187 },

    { title: "DAYTRIPPIN", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DAYTRIPPIN-emECktgvmEPko9dTmdmTxLrPygFCxd.mp3", startTime: 42 },
    { title: "whats my name", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whats%20my%20name-IUGy5UA9gnh2ySAODs4PI25TiItvmR.mp3", startTime: 78 },



    { title: "BREAK YOU", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BREAK%20YOU%20copy-mruRTZQrgmVOLn9Hm5SY6x2PKpvCJ9.mp3", startTime: 11 },
    { title: "IN THE RAIN", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IN%20THE%20RAIN-G2uvs1CH0GInbpzA78TVNCjx4iy73q.mp3", startTime: 46 },
    { title: "PRETTY LIES", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PRETTY%20LIES-Nc0ivkOS7aw8XD9Lq6a5n5iZXF5Ej0.mp3", startTime: 75 },
    { title: "MARBLE CRACKS", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MARBLE%20CRACKS-TqSAENytMkkx5cfFd8E7dKc1BFE2Y7.mp3", startTime: 40 },

     { title: "SEVENTEEN", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SEVENTEEN-B9MMGdNQZRs8FpRh8tjUEXVgKzQyfb.mp3", startTime: 35 },
      { title: "IN YOUR HEAD", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IN%20YOUR%20HEAD-5Y9ABWGDdzuHL24nTWSd5HBEKedGxw.mp3", startTime: 35 },
      { title: "By My Side", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/By%20My%20Side-HwjY8AT7yWZgjMYTFcNaTCpbFPkg5n.mp3", startTime: 42 },
      { title: "lavender", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lavender-6OJB5F6ctADIRPO2GenSOk3FV2ksPV.mp3", startTime: 55 },
    { title: "SABATOGE", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SABATOGE-raH39ZaaVK7goqHNrka569W6ulAtdy.mp3", startTime: 32 },
    { title: "STARLIGHT", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STARLIGHT-ml4trZY5TpF87Qu6gv6B3gv4yjvtqu.mp3", startTime: 45 },
    { title: "Late Nights In Milan", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Late%20Nights%20In%20Milan-WNjPEFpsRWcDiPfElMYZLFRQ3HeaYR.mp3", startTime: 45 },
    { title: "Let Down (i am too)", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Let%20Down%20(i%20am%20too)-g5bBbGCwvaNoGVyV3Yr3zUcT6B2yEa.mp3", startTime: 40 },

    { title: "DANCE OF LIFE", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DANCE%20OF%20LIFE-n8AqSR6P5kXPvE3lPQ7AT1sejqclhs.mp3", startTime: 45 }
  ],
  lilDurden: [
    { title: "fake shit", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fake%20shit%20-Mwaovkf8HC6K8vlpPNP1bMQ52o0s5w.mp3", startTime: 20 },
    { title: "goo gone - remix", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/goo%20gone%20-%20remix-iLoibemyugcPDTquCiKRHXKLgW7bAH.mp3", startTime: 20 },
    { title: "say u luv me", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/say%20u%20luv%20me-pM56WlxnuulSX2BCRIfGiaJ8LPjYcP.mp3", startTime: 20 },
    { title: "retarded", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/retarded-TAAKb4d6Et6UO3KnQ8hMmphubEhN4C.mp3", startTime: 20 },
    { title: "flickflick", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flickflick-9QkshUjlRpZKBK2vzkItei5eVqtANH.mp3", startTime: 20 },
    { title: "dirty durden", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dirty%20durden-1GKQ7SeEcWSmUGiawTBArDWAoOJ4Zm.mp3", startTime: 20 },
    { title: "clips", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clips-ucteX1eJ7sWDCSBzRLvlPzfhi1e7rN.mp3", startTime: 20 },
    { title: "down", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/down-wXBteFM7YVWeTFxiRtnHzkpPtk4Fyw.mp3", startTime: 20 },
    { title: "crash & burn", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crash%20&%20burn-U4ZCJ4tB5cJy6lUVWLXtZTDyWUjLoK.mp3", startTime: 20 },
    { title: "lifeless", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lifeless-WqvOzaxmsPUIsFiAz3R1JoKBPl3ylt.mp3", startTime: 20 },
    { title: "cap", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cap-srIpatCD3PQIgCn5YTXgzmT7udefzC.mp3", startTime: 20 },
    { title: "what u hurd", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/what%20u%20hurd-JmV3hPjgi0vlSLCwu6eX6PvM8DeYZH.mp3", startTime: 20 },
    { title: "hurts me - remix", url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hurts%20me%20-%20remix-9p9QL25mSIKnOegBkn7t927P11XREk.mp3", startTime: 20 }
  ]
};

