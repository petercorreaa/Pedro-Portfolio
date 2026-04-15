"use client"
import { useAudio } from "@/context/AudioContext"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function FloatingPlayer() {
  const { playing, toggle, tracks } = useAudio()
  const [hasPlayed,  setHasPlayed]  = useState(false)
  const [lastPlayed, setLastPlayed] = useState(0)

  useEffect(() => {
    if (playing !== null) {
      setHasPlayed(true)
      setLastPlayed(playing)
    }
  }, [playing])

  const handleClick = () => {
    if (playing !== null) {
      toggle(playing)
    } else {
      toggle(lastPlayed)
    }
  }

  return (
    <AnimatePresence>
      {hasPlayed && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            position:       'fixed',
            bottom:         '32px',
            right:          '32px',
            zIndex:         2000,
            display:        'flex',
            alignItems:     'center',
            gap:            '12px',
            padding:        '12px 20px 12px 14px',
            borderRadius:   '999px',
            background:     'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border:         '1px solid rgba(255,255,255,0.12)',
            boxShadow:      '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
            cursor:         'pointer',
          }}
          onClick={handleClick}
        >
          {/* Animated bars — static when paused */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '18px' }}>
            {[1,2,3,4].map(b => (
              <motion.div
                key={b}
                animate={playing !== null
                  ? { height: ['4px','14px','6px','12px','4px'] }
                  : { height: '4px' }
                }
                transition={playing !== null
                  ? { duration: 0.7, repeat: Infinity, delay: b * 0.15, ease: 'easeInOut' }
                  : { duration: 0.2 }
                }
                style={{ width: '3px', background: '#e8e0f5', borderRadius: '2px' }}
              />
            ))}
          </div>

          {/* Track title */}
          <span style={{
            fontFamily:   'Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize:     '11px',
            letterSpacing:'0.15em',
            color:        'rgba(247,245,241,0.8)',
            textTransform:'uppercase',
            maxWidth:     '140px',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
          }}>
            {tracks[playing ?? lastPlayed]?.title}
          </span>

          {/* Play / Pause button */}
          <div style={{
            width:          '32px',
            height:         '32px',
            borderRadius:   '50%',
            flexShrink:     0,
            background:     '#e8e0f5',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}>
            {playing !== null ? (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <rect x="0"   y="0" width="3.5" height="12" rx="1" fill="#0d0907"/>
                <rect x="6.5" y="0" width="3.5" height="12" rx="1" fill="#0d0907"/>
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M1 1l9 5.5L1 12V1Z" fill="#0d0907"/>
              </svg>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
