"use client";

import { useEffect } from "react";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export default function WebVitalsTracker() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return;

    // Dynamic import to avoid including web-vitals in client bundle during development
    import("web-vitals").then((webVitals) => {
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = webVitals;

      // Track Core Web Vitals
      onCLS((metric: any) => {
        console.log("CLS:", metric);
        // Send to analytics service
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "web_vitals", {
            metric_name: "CLS",
            metric_value: Math.round(metric.value * 1000),
            metric_delta: Math.round(metric.delta * 1000),
          });
        }
      });

      onINP((metric: any) => {
        console.log("INP:", metric);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "web_vitals", {
            metric_name: "INP",
            metric_value: Math.round(metric.value),
            metric_delta: Math.round(metric.delta),
          });
        }
      });

      onFCP((metric: any) => {
        console.log("FCP:", metric);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "web_vitals", {
            metric_name: "FCP",
            metric_value: Math.round(metric.value),
            metric_delta: Math.round(metric.delta),
          });
        }
      });

      onLCP((metric: any) => {
        console.log("LCP:", metric);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "web_vitals", {
            metric_name: "LCP",
            metric_value: Math.round(metric.value),
            metric_delta: Math.round(metric.delta),
          });
        }
      });

      onTTFB((metric: any) => {
        console.log("TTFB:", metric);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "web_vitals", {
            metric_name: "TTFB",
            metric_value: Math.round(metric.value),
            metric_delta: Math.round(metric.delta),
          });
        }
      });
    });
  }, []);

  return null;
}
