"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 flex">
      <nav className="flex items-center gap-6">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
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
            "transition-colors hover:text-foreground/80",
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
            "text-foreground/60 transition-colors hover:text-foreground/80",
          )}
        >
          GitHub
        </Link>
      </nav>
    </div>
  );
}
