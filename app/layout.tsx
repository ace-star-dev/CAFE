import React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"], 
  variable: "--font-dm-sans",
  display: 'swap',
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f9f4ee",
};

export const metadata: Metadata = {
  title: "Café com Prétte | Podcast de Liderança e Comunicação",
  description: "Um podcast para líderes e mentes inquietas que não aceitam o mediano. Conversas sobre liderança, comunicação e impacto.",
  openGraph: {
    title: "Café com Prétte | Podcast",
    description: "Liderança e comunicação em alto nível.",
    type: "website",
    locale: "pt_BR",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}