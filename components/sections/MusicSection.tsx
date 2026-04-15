"use client"
import { motion } from "framer-motion"
import { useAudio } from "@/context/AudioContext"

export default function MusicSection() {
  const { playing, toggle, tracks } = useAudio()

  return (
    <section id="music" style={{ padding: '0 48px', maxWidth: '780px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '32px',
          padding: '56px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,224,245,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '999px', border: '1px solid rgba(232,224,245,0.2)', marginBottom: '24px', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(247,245,241,0.5)', textTransform: 'uppercase' }}>
          Beyond Design
        </div>

        <h2 style={{ fontFamily: 'AkiraExpanded, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#f7f5f1', marginBottom: '16px', lineHeight: 1.2 }}>
          Music has always<br />been my other passion.
        </h2>

        <p style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '15px', lineHeight: '1.8', color: 'rgba(247,245,241,0.6)', marginBottom: '48px', maxWidth: '520px' }}>
          Long before I was designing brands and interfaces, I was making music. It&apos;s always been my other creative outlet — feel free to listen while you explore my work.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tracks.map((track, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => toggle(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '20px',
                padding: '20px 24px',
                borderRadius: '16px',
                border: `1px solid ${playing === i ? 'rgba(232,224,245,0.25)' : 'rgba(255,255,255,0.08)'}`,
                background: playing === i ? 'rgba(232,224,245,0.06)' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Play/pause button */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                background: playing === i ? '#e8e0f5' : 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(232,224,245,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}>
                {playing === i ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="1" width="4" height="12" rx="1" fill="#0d0907"/>
                    <rect x="8" y="1" width="4" height="12" rx="1" fill="#0d0907"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 1.5L12 7L3 12.5V1.5Z" fill="#f7f5f1"/>
                  </svg>
                )}
              </div>

              {/* Track info */}
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'AkiraExpanded, sans-serif', fontSize: '12px', color: '#f7f5f1', margin: 0, letterSpacing: '0.05em' }}>{track.title}</p>
              </div>

              {/* Animated bars when playing */}
              {playing === i && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '20px' }}>
                  {[1,2,3,4].map(b => (
                    <motion.div key={b} animate={{ height: ['4px','16px','6px','14px','4px'] }} transition={{ duration: 0.8, repeat: Infinity, delay: b * 0.15 }} style={{ width: '3px', background: '#e8e0f5', borderRadius: '2px' }} />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
