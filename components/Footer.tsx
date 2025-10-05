"use client";

import {
  Book,
  Github,
  Home,
  Linkedin,
  Rocket,
  Mail,
  MapPin,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="w-full bg-muted/30"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="w-full max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Top Section - Copyright and Back to Top */}
        <div className="flex justify-between items-start mb-12">
          <div className="text-muted-foreground text-sm">© {currentYear}</div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Back to top"
          >
            <span className="text-sm">BACK TO TOP</span>
            <div className="w-8 h-8 rounded-full border border-muted-foreground/30 flex items-center justify-center group-hover:border-foreground transition-colors">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </div>
          </button>
        </div>

        {/* Main CTA Section */}
        <div className="mb-12">
          <div className="text-muted-foreground text-xs mb-3">
            HAVE A PROJECT IN MIND?
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-muted-foreground/20 leading-none mb-6">
            LET&apos;S TALK
          </h2>

          {/* Contact Button */}
          <div className="flex justify-center">
            <a
              href="mailto:atiqisrak@gmail.com"
              className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-colors group"
              aria-label="Send email to atiqisrak@gmail.com"
            >
              <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="font-medium">atiqisrak@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Section - Social Links and Credits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {/* Social Links */}
          <div className="md:col-span-2">
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://github.com/atiqisrak"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-muted-foreground/30 rounded-full hover:border-foreground transition-colors text-xs"
                aria-label="View GitHub profile (opens in new tab)"
              >
                GITHUB
              </Link>
              <Link
                href="https://linkedin.com/in/atiq-israk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-muted-foreground/30 rounded-full hover:border-foreground transition-colors text-xs"
                aria-label="Connect on LinkedIn (opens in new tab)"
              >
                LINKEDIN
              </Link>
              <Link
                href="https://producthunt.com/@atiqisrak"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-muted-foreground/30 rounded-full hover:border-foreground transition-colors text-xs"
                aria-label="View Product Hunt profile (opens in new tab)"
              >
                PRODUCT HUNT
              </Link>
            </div>
          </div>

          {/* Credits */}
          <div className="text-right text-muted-foreground">
            <div className="space-y-1">
              <div>
                <strong className="text-foreground">DESIGNED BY</strong>
              </div>
              <div>© Atiq Israk</div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-muted-foreground/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div>
              <div className="font-semibold text-foreground mb-1">
                PRODUCT MANAGEMENT
              </div>
              <div>Strategy • Roadmaps • User Research</div>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">
                SOFTWARE ENGINEERING
              </div>
              <div>Full-Stack • React • Next.js</div>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">LOCATION</div>
              <div>Bangladesh</div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Atiq Israk",
            jobTitle: "Product Manager & Software Engineer",
            url: "https://atiqisrak.com",
            email: "atiqisrak@gmail.com",
            address: {
              "@type": "PostalAddress",
              addressCountry: "BD",
            },
            sameAs: [
              "https://linkedin.com/in/atiq-israk",
              "https://github.com/atiqisrak",
              "https://producthunt.com/@atiqisrak",
            ],
          }),
        }}
      />
    </footer>
  );
}
