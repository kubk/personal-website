import { ReactNode } from "react";

export function PostTitle({ children }: { children?: ReactNode }) {
  return (
    <h1 className="pt-2 pb-8 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}
