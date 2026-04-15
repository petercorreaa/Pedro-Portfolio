"use client"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 25 })
  const springY = useSpring(y, { stiffness: 200, damping: 25 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor="work"]')) setHovering(true)
    }
    const onLeave = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor="work"]')) setHovering(false)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: springX,
        top: springY,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 9999,
        pointerEvents: 'none',
        width: hovering ? '120px' : '12px',
        height: hovering ? '120px' : '12px',
        borderRadius: '50%',
        background: hovering ? 'transparent' : 'rgba(247,245,241,0.8)',
        transition: 'width 0.4s ease, height 0.4s ease, background 0.4s ease',
      }}
    >
      {hovering && (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Rotating text ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <path id="cursorCircle" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
              </defs>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  fontSize: '10px',
                  fill: 'rgba(247,245,241,0.7)',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                }}
              >
                <textPath href="#cursorCircle" startOffset="0%">
                  {'SEE MY WORK'}
                </textPath>
              </motion.text>
            </svg>
          </motion.div>

          {/* Static center dot */}
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(247,245,241,0.5)' }} />
        </div>
      )}
    </motion.div>
  )
}
