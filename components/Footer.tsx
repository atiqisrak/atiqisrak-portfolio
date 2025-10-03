"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full text-white py-8">
      <div className="w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">
            🚀 Let&apos;s Build Something Amazing Together!
          </h2>
          <p className="text-gray-300">
            Whether it&apos;s a groundbreaking product strategy, a tech
            innovation, or just a friendly chat about the future of product
            management and software engineering, I&apos;m all ears. Let&apos;s
            connect and create something extraordinary!
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="https://linkedin.com/in/atiq-israk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/atiqisrak"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              GitHub
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="https://atiqisrak.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="https://www.linkedin.com/in/atiq-israk/recent-activity/all/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="https://producthunt.com/@atiqisrak"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              Product Hunt
            </Link>
          </div>
        </div>
        <div className="text-center text-gray-300 text-sm mt-4">
          <p>
            © {new Date().getFullYear()} <strong>Atiq Israk</strong>. All rights
            reserved.
            <br />
          </p>
        </div>
      </div>
    </footer>
  );
}
