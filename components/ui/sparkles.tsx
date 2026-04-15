"use client";

import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";

interface SparklesCoreProps {
  background?:      string;
  minSize?:         number;
  maxSize?:         number;
  speed?:           number;
  particleColor?:   string;
  particleDensity?: number;
  className?:       string;
  id?:              string;
}

export function SparklesCore({
  background      = "transparent",
  minSize         = 0.6,
  maxSize         = 1.4,
  speed           = 1,
  particleColor   = "#ffffff",
  particleDensity = 100,
  className       = "",
  id,
}: SparklesCoreProps) {
  const generatedId = useId();
  const particlesId = id ?? generatedId;
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = {
    background: { color: { value: background } },
    fullScreen: { enable: false },
    fpsLimit:   120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: false },
      },
      modes: { push: { quantity: 4 } },
    },
    particles: {
      color:  { value: particleColor },
      move: {
        direction: "none" as MoveDirection,
        enable:    true,
        outModes:  { default: "out" as OutMode },
        random:    false,
        speed:     speed,
        straight:  false,
      },
      number: {
        density: { enable: true, width: 400, height: 400 },
        value:   particleDensity,
      },
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: { enable: true, speed: 1, sync: false },
      },
      shape: { type: "circle" },
      size: {
        value: { min: minSize, max: maxSize },
      },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <Particles
      id={particlesId}
      className={className}
      options={options}
    />
  );
}
