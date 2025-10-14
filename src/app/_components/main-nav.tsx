"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex">
      <nav className="flex items-center">
        <Link
          href="/"
          className={cn(
            "transition-colors cursor-pointer hover:text-foreground/80 inline-flex items-center h-14 px-3",
            pathname === "/"
              ? "text-foreground font-semibold"
              : "text-foreground/60",
          )}
        >
          Main
        </Link>
        <Link
          href="/blog"
          className={cn(
            "transition-colors cursor-pointer hover:text-foreground/80 inline-flex items-center h-14 px-3",
            pathname.startsWith("/blog")
              ? "text-foreground font-semibold"
              : "text-foreground/60",
          )}
        >
          Blog
        </Link>
        <Link
          href="https://github.com/kubk"
          className={cn(
            "text-foreground/60 transition-colors cursor-pointer hover:text-foreground/80 inline-flex items-center h-14 px-3",
          )}
        >
          GitHub
        </Link>
      </nav>
    </div>
  );
}
