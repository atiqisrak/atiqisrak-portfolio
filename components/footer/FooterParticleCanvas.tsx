"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  getGustMultiplier,
  getWindForce,
  resetWindTime,
  smoothNoise1D,
} from "@/lib/wind-noise";
import { cn } from "@/lib/utils";

type ParticleKind = "snow" | "cherry";

type Particle = {
  x: number;
  y: number;
  kind: ParticleKind;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  noiseOffset: number;
  spriteIndex: 0 | 1;
};

const BASE_ANGLE = (-3 * Math.PI) / 4;
const FLOWER_SRCS = ["/Flower.png", "/Flowers.png"] as const;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function spawnAtTop(width: number, kind: ParticleKind): Particle {
  return {
    x: randomBetween(width * 0.35, width + 50),
    y: randomBetween(-50, -5),
    kind,
    size: kind === "snow" ? randomBetween(1, 3) : randomBetween(22, 38),
    speed: kind === "snow" ? randomBetween(0.4, 1.2) : randomBetween(0.2, 0.7),
    opacity: kind === "snow" ? randomBetween(0.35, 0.85) : randomBetween(0.55, 0.9),
    rotation: randomBetween(0, Math.PI * 2),
    rotationSpeed: randomBetween(-0.02, 0.02),
    noiseOffset: randomBetween(0, 1000),
    spriteIndex: Math.random() > 0.5 ? 1 : 0,
  };
}

function spawnAnywhere(width: number, height: number, kind: ParticleKind): Particle {
  return {
    ...spawnAtTop(width, kind),
    x: randomBetween(-20, width + 20),
    y: randomBetween(0, height),
  };
}

function initParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = [];
  const cherryCount = Math.floor(count * 0.25);

  for (let i = 0; i < count - cherryCount; i++) {
    particles.push(spawnAnywhere(width, height, "snow"));
  }
  for (let i = 0; i < cherryCount; i++) {
    particles.push(spawnAnywhere(width, height, "cherry"));
  }

  return particles;
}

type FooterParticleCanvasProps = {
  active?: boolean;
  className?: string;
  containerRef?: RefObject<HTMLElement | null>;
};

export function FooterParticleCanvas({
  active = true,
  className,
  containerRef,
}: FooterParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const spritesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef<number>(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    spritesRef.current = FLOWER_SRCS.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resetWindTime();

    const getContainer = () => containerRef?.current ?? canvas.parentElement;

    const resize = () => {
      const container = getContainer();
      if (!container) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;

      sizeRef.current = { width, height, dpr };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 640;
      const count = isMobile ? 40 : width < 1024 ? 80 : 110;
      particlesRef.current = initParticles(width, height, count);
    };

    const observer = new ResizeObserver(resize);
    const container = getContainer();
    if (container) {
      observer.observe(container);
    }
    resize();

    const tick = () => {
      const { width, height } = sizeRef.current;
      if (!width || !height) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const windAngle = getWindForce();
      const gust = getGustMultiplier(performance.now() * 0.001);

      for (const p of particlesRef.current) {
        const wobble =
          smoothNoise1D(p.noiseOffset + performance.now() * 0.001) * 0.35;
        const angle =
          BASE_ANGLE + windAngle * (p.kind === "cherry" ? 1.2 : 0.8) + wobble;

        const dx = Math.cos(angle) * p.speed * gust;
        const dy = Math.sin(angle) * p.speed * gust + (p.kind === "snow" ? 0.15 : 0.08);

        p.x += dx;
        p.y += dy;
        p.rotation += p.rotationSpeed + windAngle * 0.02;

        if (p.x < -40 || p.y > height + 40 || p.x > width + 40) {
          Object.assign(p, spawnAtTop(width, p.kind));
        }

        if (p.kind === "snow") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();
        } else {
          const sprite = spritesRef.current[p.spriteIndex];
          if (sprite?.complete && sprite.naturalWidth > 0) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = p.opacity;
            const half = p.size / 2;
            ctx.drawImage(sprite, -half, -half, p.size, p.size);
            ctx.restore();
          }
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, [active, containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    />
  );
}
