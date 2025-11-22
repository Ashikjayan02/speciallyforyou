import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Special Surprise for You 💕",
  description: "A romantic surprise web experience with floating hearts, magical animations, and a special love message.",
  keywords: ["love", "romance", "surprise", "hearts", "princess", "special message"],
  authors: [{ name: "Your Secret Admirer" }],
  openGraph: {
    title: "A Special Surprise for You 💕",
    description: "I made something special just for you...",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Special Surprise for You 💕",
    description: "I made something special just for you...",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFE0EC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}