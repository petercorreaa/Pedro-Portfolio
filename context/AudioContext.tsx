"use client"
import { createContext, useContext, useRef, useState } from "react"

const TRACKS = [
  { title: "Track 1 (AFROHOUSE)", file: "/work/music/Track 1 (AFROHOUSE).mp3" },
  { title: "Track 2 (PIANO)",     file: "/work/music/Track 2 (PIANO).mp3"     },
  { title: "Track 3 (PIANO)",     file: "/work/music/Track 3 (PIANO).mp3"     },
  { title: "Track 4 (AFROHOUSE)", file: "/work/music/Track 4 (AFROHOUSE).mp3" },
]

type AudioContextType = {
  playing: number | null
  toggle: (i: number) => void
  tracks: { title: string; file: string }[]
}

const AudioCtx = createContext<AudioContextType>({ playing: null, toggle: () => {}, tracks: [] })

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState<number | null>(null)
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])

  const toggle = (i: number) => {
    if (playing === i) {
      audioRefs.current[i]?.pause()
      setPlaying(null)
    } else {
      if (playing !== null) audioRefs.current[playing]?.pause()
      audioRefs.current[i]?.play()
      setPlaying(i)
    }
  }

  return (
    <AudioCtx.Provider value={{ playing, toggle, tracks: TRACKS }}>
      {TRACKS.map((track, i) => (
        <audio
          key={i}
          ref={el => { audioRefs.current[i] = el }}
          src={track.file}
          onEnded={() => setPlaying(null)}
        />
      ))}
      {children}
    </AudioCtx.Provider>
  )
}

export const useAudio = () => useContext(AudioCtx)
