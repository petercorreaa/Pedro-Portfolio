"use client"
import { MeshGradient } from "@paper-design/shaders-react"

export function FixedBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <MeshGradient
        style={{ width: '100%', height: '100%' }}
        colors={["#0d0907", "#5c1a1a", "#2d0a3d", "#3d1500", "#8B3a0a", "#0d0907"]}
        speed={0.2}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 20%, rgba(13,9,7,0.6) 100%)' }} />
    </div>
  )
}
