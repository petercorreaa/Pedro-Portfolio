"use client";

const FONT_FAMILY = '"AkiraExpanded", sans-serif';

interface PerspectiveMarqueeProps {
  items:           string[];
  fontSize?:       number;
  color?:          string;
  fontWeight?:     number;
  pixelsPerFrame?: number;
  rotateY?:        number;
  rotateX?:        number;
  perspective?:    number;
  background?:     string;
  fadeColor?:      string;
  speed?:          number;
}

export function PerspectiveMarquee({
  items          = [],
  fontSize       = 22,
  color          = "#f7f5f1",
  fontWeight     = 400,
  pixelsPerFrame = 1.5,
  rotateY        = 0,
  rotateX        = 2,
  perspective    = 1200,
  background     = "transparent",
  fadeColor      = "#000000",
  speed          = 1,
}: PerspectiveMarqueeProps) {
  /* Three copies with "|" separators between each word */
  const withSeps = items.flatMap((item) => [item, "|"]);
  const repeated = [...withSeps, ...withSeps, ...withSeps];

  /* Approximate pixel width of one full set of items */
  const approxItemWidth = items.length * (fontSize * 6 + 40);

  /* Duration so the strip moves at pixelsPerFrame * 60fps * speed px/s */
  const duration = approxItemWidth / (pixelsPerFrame * 60 * speed);

  return (
    <div
      style={{
        width:      "100%",
        height:     "100%",
        background,
        position:   "relative",
        overflow:   "hidden",
        display:    "flex",
        alignItems: "center",
      }}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0px); }
          100% { transform: translateX(-${approxItemWidth}px); }
        }
      `}</style>

      {/* 3-D perspective wrapper */}
      <div
        style={{
          width:             "100%",
          perspective:       `${perspective}px`,
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          style={{
            transform:     `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Scrolling text strip */}
          <div
            style={{
              display:   "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              userSelect: "none",
              gap:        "2.5em",
              animation:  `marquee ${duration}s linear infinite`,
            }}
          >
            {repeated.map((item, i) =>
              item === "|" ? (
                <span
                  key={i}
                  style={{
                    fontFamily:  FONT_FAMILY,
                    fontSize:    `${fontSize * 0.6}px`,
                    color:       "rgba(247,245,241,0.25)",
                    lineHeight:  1,
                    flexShrink:  0,
                    paddingRight: `${fontSize * 0.3}px`,
                  }}
                >
                  |
                </span>
              ) : (
                <span
                  key={i}
                  style={{
                    fontFamily:    FONT_FAMILY,
                    fontSize:      `${fontSize}px`,
                    fontWeight,
                    color,
                    lineHeight:    1,
                    letterSpacing: "0.2em",
                    flexShrink:    0,
                    opacity:       1,
                  }}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Horizontal edge fade */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          background:    `linear-gradient(90deg, ${fadeColor} 0%, transparent 25%, transparent 75%, ${fadeColor} 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Vertical overlay */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          background:    `linear-gradient(180deg, ${fadeColor} 0%, transparent 40%, transparent 60%, ${fadeColor} 100%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
