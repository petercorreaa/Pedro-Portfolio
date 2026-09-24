"use client"
import { motion } from "framer-motion"
import { useLang } from "@/lib/i18n"

export default function ContactSection() {
  const { t } = useLang()

  return (
    <section id="contact" className="scroll-mt-24 px-4 pt-0 pb-20 md:px-12 md:py-[120px]" style={{ maxWidth: '780px', margin: '0 auto' }}>
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
          padding: 'clamp(24px, 6vw, 56px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,224,245,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: '999px', border: '1px solid rgba(232,224,245,0.2)', marginBottom: '24px', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(247,245,241,0.5)', textTransform: 'uppercase' }}>
          {t.contact.badge}
        </div>

        <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.8rem)', color: '#f7f5f1', marginBottom: '16px', lineHeight: 1.1 }}>
          {t.contact.title}
        </h2>

        <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(247,245,241,0.6)', marginBottom: 'clamp(32px, 6vw, 48px)', maxWidth: '480px' }}>
          {t.contact.body}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              label: 'Email',
              value: 'petercorrea516@gmail.com',
              href: 'mailto:petercorrea516@gmail.com',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              )
            },
            {
              label: 'LinkedIn',
              value: 'pedro-a-correa',
              href: 'https://www.linkedin.com/in/pedro-a-correa/',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="4"/>
                  <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"/>
                </svg>
              )
            },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(14px, 3vw, 20px)',
                padding: 'clamp(14px, 3vw, 20px) clamp(16px, 3.5vw, 24px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                textDecoration: 'none',
                color: '#f7f5f1',
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,224,245,0.25)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(232,224,245,0.05)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#e8e0f5' }}>
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(247,245,241,0.4)', textTransform: 'uppercase', margin: '0 0 4px 0' }}>{item.label}</p>
                <p style={{ fontSize: 'clamp(13px, 3.4vw, 14px)', color: '#f7f5f1', margin: 0, overflowWrap: 'anywhere' }}>{item.value}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(247,245,241,0.3)" style={{ flexShrink: 0 }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
