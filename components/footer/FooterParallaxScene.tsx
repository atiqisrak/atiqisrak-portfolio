"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { getJapaneseAccent } from "@/lib/design/accent-colors";
import { useMotionPrefs } from "@/lib/motion";

const CLOUD_VIDEO_URL =
  "https://videos.pexels.com/video-files/32985050/14057857_2560_1440_30fps.mp4";
const VIDEO_PLAYBACK_RATE = 1;

type FooterParallaxSceneProps = {
  footerRef: RefObject<HTMLElement | null>;
};

export function FooterParallaxScene({ footerRef }: FooterParallaxSceneProps) {
  const { prefersReducedMotion } = useMotionPrefs();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [summitGlow, setSummitGlow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });

  const fujiY = useTransform(scrollYProgress, [0, 0.45, 1], ["55%", "8%", "-4%"]);
  const fujiScale = useTransform(scrollYProgress, [0, 0.45], [0.92, 1]);
  const fujiOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setSummitGlow(v > 0.4);
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [footerRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = VIDEO_PLAYBACK_RATE;

    if (prefersReducedMotion || isMobile) return;

    if (isVisible) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isVisible, prefersReducedMotion, isMobile]);

  const sky = getJapaneseAccent("ikigaiSky");
  const horizon = getJapaneseAccent("ikigaiHorizon");
  const cerulean = getJapaneseAccent("ikigaiCerulean");
  const deep = getJapaneseAccent("ikigaiDeep");

  const showMotion = !prefersReducedMotion;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {showMotion && !isMobile ? (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="absolute left-1/2 top-0 h-full w-full min-w-full -translate-x-1/2 scale-[1.15] object-cover object-top"
            src={CLOUD_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = VIDEO_PLAYBACK_RATE;
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#C5E4F7] via-[#D9EDFA] to-[#E8F4FC] dark:from-[#0f1a24] dark:via-[#152535] dark:to-[#1a3050]" />
      )}

      <div className="absolute inset-0 z-[1] bg-white/50 dark:bg-black/30" />

      <div
        className="absolute -left-[10%] -top-[5%] h-56 w-56 rounded-full blur-3xl sm:h-72 sm:w-72"
        style={{ backgroundColor: `${sky.hex}14` }}
      />
      <div
        className="absolute -right-[8%] top-[8%] h-48 w-48 rounded-full blur-3xl sm:h-64 sm:w-64"
        style={{ backgroundColor: `${horizon.hex}14` }}
      />
      <div
        className="absolute bottom-[12%] left-[4%] h-52 w-52 rounded-full blur-3xl sm:h-64 sm:w-64"
        style={{ backgroundColor: `${cerulean.hex}14` }}
      />
      <div
        className="absolute bottom-[6%] right-[6%] h-48 w-48 rounded-full blur-3xl sm:h-60 sm:w-60"
        style={{ backgroundColor: `${deep.hex}14` }}
      />

      <div className="absolute inset-x-0 bottom-0 z-[2] w-full">
        <motion.div
          className="w-full"
          style={
            showMotion
              ? {
                  y: fujiY,
                  scale: fujiScale,
                  opacity: fujiOpacity,
                  transformOrigin: "bottom center",
                }
              : { y: "8%", opacity: 1, transformOrigin: "bottom center" }
          }
        >
          <div className="relative aspect-[3/2] w-full">
            {summitGlow || !showMotion ? (
              <div
                className="absolute left-1/2 top-[18%] z-10 h-24 w-24 -translate-x-1/2 rounded-full blur-2xl transition-opacity duration-700 sm:h-32 sm:w-32"
                style={{
                  backgroundColor: `${deep.hex}1f`,
                  opacity: summitGlow ? 1 : 0.6,
                }}
              />
            ) : null}
            <Image
              src="/MountFuji.png"
              alt=""
              fill
              className="object-contain object-bottom object-center"
              sizes="100vw"
              priority={false}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
