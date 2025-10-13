import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Egor Gorbachev",
  description: "FullStack Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kfx0vct.css" />
      </head>
      <body className={`antialiased`}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
