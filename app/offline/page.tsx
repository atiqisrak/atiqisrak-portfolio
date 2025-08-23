"use client";

import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">You're Offline</h1>
          <p className="text-gray-300 mb-6">
            It looks like you've lost your internet connection. Don't worry, you
            can still view some parts of my portfolio that are cached.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          Some features may not be available offline
        </p>
      </div>
    </div>
  );
}
