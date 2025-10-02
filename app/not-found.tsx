"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home, Search, Zap, Sparkles } from "lucide-react";
import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const auraRef = useRef<HTMLDivElement>(null);

  const updateAuraPosition = useCallback((e: MouseEvent) => {
    if (auraRef.current) {
      auraRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      auraRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
    window.addEventListener("pointermove", updateAuraPosition);

    // Create floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);

    return () => window.removeEventListener("pointermove", updateAuraPosition);
  }, [updateAuraPosition]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Mouse Aura Effect */}
      <div
        ref={auraRef}
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative mx-auto max-w-screen-xl px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:px-24">
        <div className="flex min-h-[80vh] items-center justify-center">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-2xl"
              >
                <Card className="relative w-full p-8 md:p-12 text-center backdrop-blur-sm bg-background/80 border-border/50 shadow-2xl">
                  {/* Animated 404 Icon */}
                  <motion.div className="mb-8" variants={itemVariants}>
                    <motion.div
                      className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-destructive/20 via-destructive/10 to-destructive/5 relative overflow-hidden"
                      variants={pulseVariants}
                      animate="animate"
                    >
                      {/* Animated 404 Text */}
                      <motion.div
                        className="text-6xl font-bold text-destructive relative z-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        {/* 404 */}
                        <Image
                          src="/404.png"
                          alt="404"
                          width={100}
                          height={100}
                        />
                      </motion.div>

                      {/* Floating Icons */}
                      <motion.div
                        className="absolute top-2 right-2"
                        variants={floatingVariants}
                        animate="animate"
                      >
                        <Zap className="h-6 w-6 text-primary" />
                      </motion.div>
                      <motion.div
                        className="absolute bottom-2 left-2"
                        variants={floatingVariants}
                        animate="animate"
                        style={{ animationDelay: "1s" }}
                      >
                        <Sparkles className="h-5 w-5 text-blue-500" />
                      </motion.div>
                    </motion.div>

                    <motion.h2
                      className="mb-4 text-3xl font-bold text-foreground md:text-4xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text"
                      variants={itemVariants}
                    >
                      Page Not Found
                    </motion.h2>

                    <motion.p
                      className="mb-8 text-muted-foreground md:text-lg leading-relaxed"
                      variants={itemVariants}
                    >
                      Oops! The page you&apos;re looking for seems to have
                      wandered off into the digital void. Don&apos;t worry, even
                      the best explorers sometimes take a wrong turn.
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className="mb-8 space-y-6"
                    variants={itemVariants}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          asChild
                          size="lg"
                          className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                        >
                          <Link href="/" className="flex items-center">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                          </Link>
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="w-full sm:w-auto border-2 hover:bg-primary/10"
                        >
                          <Link href="/projects" className="flex items-center">
                            <Search className="mr-2 h-4 w-4" />
                            View Projects
                          </Link>
                        </Button>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.history.back()}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div className="border-t pt-6" variants={itemVariants}>
                    <p className="text-sm text-muted-foreground">
                      If you believe this is an error, please{" "}
                      <Link
                        href="/contact"
                        className="text-primary hover:underline font-medium transition-colors"
                      >
                        contact me
                      </Link>{" "}
                      and I&apos;ll help you find what you&apos;re looking for.
                    </p>
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
