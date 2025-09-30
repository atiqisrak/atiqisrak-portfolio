"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home, Search, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";

export default function NotFound() {
  const auraRef = useRef<HTMLDivElement>(null);

  const updateAuraPosition = useCallback((e: MouseEvent) => {
    if (auraRef.current) {
      auraRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      auraRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", updateAuraPosition);
    return () => window.removeEventListener("pointermove", updateAuraPosition);
  }, [updateAuraPosition]);

  return (
    <div className="relative min-h-screen bg-background">
      <div ref={auraRef} className="mouse-aura" />
      <div className="mx-auto max-w-screen-xl px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:px-24">
        <div className="flex min-h-[80vh] items-center justify-center">
          <Card className="w-full max-w-2xl p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              <h1 className="mb-4 text-6xl font-bold text-foreground md:text-8xl">
                404
              </h1>
              <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
                Page Not Found
              </h2>
              <p className="mb-8 text-muted-foreground md:text-lg">
                Oops! The page you're looking for seems to have wandered off into the digital void. 
                Don't worry, even the best explorers sometimes take a wrong turn.
              </p>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/projects">
                    <Search className="mr-2 h-4 w-4" />
                    View Projects
                  </Link>
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.history.back()}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                If you believe this is an error, please{" "}
                <Link 
                  href="/contact" 
                  className="text-primary hover:underline"
                >
                  contact me
                </Link>{" "}
                and I'll help you find what you're looking for.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
