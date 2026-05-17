// app/layout.tsx (updated to include new components)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import { Header } from "./components/Header";
import { FloatingSocialButtons } from "./components/FloatingSocialButtons";
import { SocialProofPopups } from "./components/SocialProofPopups";
import { LiveActivityFeed } from "./components/LiveActivityFeed";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexusStreamPro - Premium IPTV Subscription",
  description: "10,000+ channels, 4K quality, sports, movies, and TV shows. Instant activation. Watch on any device.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Header />
           {children}
        <FloatingSocialButtons />
        <SocialProofPopups />
        <LiveActivityFeed />
      </body>
    </html>
  );
}