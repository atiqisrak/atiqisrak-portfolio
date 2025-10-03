"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full text-foreground py-6 px-4 md:py-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            🚀 Let&apos;s Build Something Amazing Together!
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed px-2">
            Whether it&apos;s a groundbreaking product strategy, a tech
            innovation, or just a friendly chat about the future of product
            management and software engineering, I&apos;m all ears. Let&apos;s
            connect and create something extraordinary!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-row sm:justify-center sm:items-center gap-4 mb-6">
          <Link
            href="https://linkedin.com/in/atiq-israk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors text-sm md:text-base text-center"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/atiqisrak"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors text-sm md:text-base text-center"
          >
            GitHub
          </Link>
          <Link
            href="https://atiqisrak.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors text-sm md:text-base text-center"
          >
            Portfolio
          </Link>
          <Link
            href="https://www.linkedin.com/in/atiq-israk/recent-activity/all/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors text-sm md:text-base text-center"
          >
            Blog
          </Link>
          <Link
            href="https://producthunt.com/@atiqisrak"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors text-sm md:text-base text-center col-span-2 sm:col-span-1"
          >
            Product Hunt
          </Link>
        </div>
        <div className="text-center text-muted-foreground text-xs md:text-sm mt-4">
          <p>
            © {new Date().getFullYear()} <strong>Atiq Israk</strong>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
