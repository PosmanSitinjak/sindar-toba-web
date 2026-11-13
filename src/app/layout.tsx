import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SINDAR TOBA — Dari Toba, Untuk Masa Depan",
  description:
    "Dari Toba, Untuk Masa Depan. Platform kurasi pariwisata berkelas dunia, pelestarian budaya Batak, dan pemberdayaan UMKM di kaldera Danau Toba UNESCO.",
  keywords: [
    "Danau Toba",
    "Wisata Danau Toba",
    "Kaldera Toba UNESCO",
    "Samosir",
    "Ulos Batak",
    "Kopi Lintong",
    "Geosite Toba",
    "Sindar Toba",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#faf8f5]">
        {children}
      </body>
    </html>
  );
}
