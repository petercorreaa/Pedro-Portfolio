"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { ButtonColorful } from "@/components/ui/button-colorful"
import { useLang } from "@/lib/i18n"

export default function HeroSection() {
  const { t } = useLang()

  return (
    <>
      {/* HERO — centered image + name only */}
      <section className="min-h-screen min-h-svh flex flex-col items-center justify-center gap-6 md:gap-8 px-5 pt-[120px] pb-16 md:px-12 md:pt-[140px] md:pb-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative w-[160px] h-[192px] md:w-[200px] md:h-[240px]" style={{ borderRadius: '100px', overflow: 'hidden', border: '1px solid rgba(232,224,245,0.2)', boxShadow: '0 0 40px rgba(232,224,245,0.08)' }}>
          <Image src="/images/profile.png" alt="Pedro Correa" fill priority sizes="200px" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        </motion.div>

        <motion.p key={t.hero.role} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontSize: '11px', letterSpacing: '0.3em', color: 'rgba(247,245,241,0.5)', textTransform: 'uppercase', margin: 0, textAlign: 'center' }}>
          {t.hero.role}
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} style={{ fontFamily: 'AkiraExpanded, sans-serif', fontSize: 'clamp(2.4rem, 11vw, 6rem)', color: '#f7f5f1', lineHeight: 1.05, margin: 0, textAlign: 'center' }}>
          PEDRO<br />CORREA
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <ButtonColorful label={t.hero.cta} onClick={() => document.getElementById('sections')?.scrollIntoView({ behavior: 'smooth' })} />
        </motion.div>
      </section>

      {/* ABOUT — full text section */}
      <section id="about" className="scroll-mt-24 px-4 pt-16 md:px-12 md:pt-[120px]" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[24px] md:rounded-[32px]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: 'clamp(24px, 5vw, 72px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,224,245,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div className="mb-7 md:mb-9" style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '999px', border: '1px solid rgba(232,224,245,0.2)', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(247,245,241,0.5)', textTransform: 'uppercase' }}>
            {t.about.badge}
          </div>

          <div style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.85', color: 'rgba(247,245,241,0.8)' }}>
            {t.about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                style={{ margin: '0 0 20px 0' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="mt-8 md:mt-10" style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '11px', letterSpacing: '0.2em', lineHeight: 1.8, color: 'rgba(247,245,241,0.3)', textTransform: 'uppercase' }}>
            {t.about.disciplines}
          </div>
        </motion.div>
      </section>
    </>
  )
}
