import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Egor Gorbachev",
  description: "AI TypeScript Engineer",
  metadataBase: new URL("https://egor.is-a.dev"),
  openGraph: {
    title: "Egor Gorbachev",
    description: "AI TypeScript Engineer",
    url: "https://egor.is-a.dev",
    siteName: "Egor Gorbachev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Egor Gorbachev",
    description: "AI TypeScript Engineer",
  },
  alternates: {
    canonical: "https://egor.is-a.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kfx0vct.css" />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
