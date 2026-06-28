"use client";

import { ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
}

export default function LazySection({
  children,
  className = "",
}: LazySectionProps) {
  return <div className={className}>{children}</div>;
}
