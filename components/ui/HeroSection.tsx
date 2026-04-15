"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { ButtonColorful } from "@/components/ui/button-colorful"

export default function HeroSection() {
  return (
    <>
      {/* HERO — centered image + name only */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', padding: '140px 48px 80px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ position: 'relative', width: '200px', height: '240px', borderRadius: '100px', overflow: 'hidden', border: '1px solid rgba(232,224,245,0.2)', boxShadow: '0 0 40px rgba(232,224,245,0.08)' }}>
          <Image src="/images/profile.png" alt="Pedro Correa" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(247,245,241,0.5)', textTransform: 'uppercase', margin: 0 }}>
          Multidisciplinary Designer
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} style={{ fontFamily: 'AkiraExpanded, sans-serif', fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#f7f5f1', lineHeight: 1.05, margin: 0, textAlign: 'center' }}>
          PEDRO<br />CORREA
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <ButtonColorful label="View Work" onClick={() => document.getElementById('sections')?.scrollIntoView({ behavior: 'smooth' })} />
        </motion.div>
      </section>

      {/* ABOUT — full text section */}
      <section id="about" style={{ padding: '120px 48px 0', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
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
            padding: 'clamp(40px, 4vw, 72px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,224,245,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '999px', border: '1px solid rgba(232,224,245,0.2)', marginBottom: '36px', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(247,245,241,0.5)', textTransform: 'uppercase' }}>
            About me
          </div>

          <div style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.85', color: 'rgba(247,245,241,0.8)' }}>
            {[
              `Hi, I'm Pedro — but you can call me Peter.`,
              `I'm a multidisciplinary designer. What does that actually mean? Honestly, I didn't fully know either… until a few months after graduating.`,
              `Once I stepped into the real world, I realized something pretty quickly: people and businesses are constantly facing problems, needs, and the occasional "we know we want something… we just have no idea what or why."`,
              <>Everyone wants to solve something. Some know <em><strong>what</strong></em> they want, but not <em><strong>how</strong></em> to get there. Others don&apos;t even know <em><strong>why</strong></em> they want it in the first place.</>,
              `That's where I come in.`,
              <>As a multidisciplinary designer, my role is to understand the <em><strong>why</strong></em> behind a need — and then figure out <em><strong>how</strong></em> to turn it into something real (as long as it involves design… otherwise, I&apos;m probably not your guy).</>,
              `I design brands, content, websites, e-commerce experiences, visual systems, and pretty much anything that helps ideas take shape and make sense.`,
            ].map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                style={{ marginBottom: '20px', margin: '0 0 20px 0' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(247,245,241,0.3)', textTransform: 'uppercase' }}>
            Branding · UX/UI · Visual · Communication Design
          </div>
        </motion.div>
      </section>
    </>
  )
}
