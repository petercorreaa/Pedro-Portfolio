"use client"

import { cn } from "@/lib/utils"

interface GooeyMarqueeProps {
  text: string
  className?: string
  speed?: number
}

/*
 * Two copies of the text: a blurred one under a high-contrast filter (the
 * "gooey" melt into the edges) and a crisp one on top for readability.
 * The string is rendered twice and shifted by -50% so the loop is seamless.
 */
export function GooeyMarquee({ text, className = "", speed = 16 }: GooeyMarqueeProps) {
  const strip = (
    <>
      <span className="pr-[1em]">{text}</span>
      <span className="pr-[1em]" aria-hidden="true">{text}</span>
    </>
  )

  const track: React.CSSProperties = {
    animation: `gooey-marquee ${speed}s infinite linear`,
  }

  return (
    <div
      className={cn(
        "relative w-full h-32 text-8xl flex items-center overflow-hidden",
        className,
      )}
    >
      {/* Blur layer with gooey effect */}
      <div
        className="absolute inset-0 flex items-center"
        aria-hidden="true"
        style={{
          backgroundColor: "black",
          backgroundImage: `
            linear-gradient(to right, white, 1rem, transparent 50%),
            linear-gradient(to left, white, 1rem, transparent 50%)
          `,
          filter: "contrast(15)",
        }}
      >
        <p
          className="absolute left-0 flex w-max whitespace-nowrap"
          style={{ ...track, filter: "blur(0.07em)" }}
        >
          {strip}
        </p>
      </div>

      {/* Clear text layer on top */}
      <div className="absolute inset-0 flex items-center">
        <p className="absolute left-0 flex w-max whitespace-nowrap" style={track}>
          {strip}
        </p>
      </div>
    </div>
  )
}
