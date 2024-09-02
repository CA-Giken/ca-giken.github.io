import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

// For Github Pages
import nextConfig from "../next.config.mjs";
const BASE_PATH = nextConfig.basePath ? nextConfig.basePath : "";

const inter = Inter({ subsets: ["latin"] });

// TODO: SEO対策のメタデータ更新
export const metadata: Metadata = {
  title: "CA技研",
  description: "CA技研の公式サイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className={inter.className}>
        {children}
        <footer>
          <a
            href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span>
              CA技研
            </span>
          </a>
        </footer>
      </body>
    </html>
  );
}
