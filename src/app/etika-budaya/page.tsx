"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Compass, CheckCircle2, ShieldCheck, Heart, Sparkles, AlertCircle } from "lucide-react";

export default function EtikaBudayaPage() {
  const guidelines = [
    {
      title: "1. Salam Hangat 'Horas!'",
      desc: "Ucapkan salam 'Horas' dengan senyum dan kedua tangan mengatup halus di depan dada saat menyapa tetua adat, tuan rumah homestay, atau warga di huta (perkampungan). Ini adalah wujud penghormatan luhur masyarakat Batak.",
    },
    {
      title: "2. Menghormati Makam Leluhur & Sarkofagus Batu",
      desc: "Di situs bersejarah seperti Makam Raja Sidabutar atau batu parsindangan, hindari duduk atau menginjak bagian atas makam batu megalitikum. Dengarkan arahan pemandu adat setempat.",
    },
    {
      title: "3. Tata Cara Pemakaian Kain Ulos",
      desc: "Kain ulos merupakan selimut kasih dan lambang berkat spiritual. Kenakan ulos di pundak kanan saat memasuki acara seremonial adat, dan perlakukan kain tenun dengan penuh rasa takzim.",
    },
    {
      title: "4. Menjaga Kesucian Air Danau Vulkanik & Sumber Mata Air",
      desc: "Danau Toba dan mata air sakral seperti Aek Sipangolu adalah sumber kehidupan. Dilarang membuang sampah plastik, mencemari air dengan sabun detergen di area sakral, dan selalu bawa kembali sampah Anda.",
    },
    {
      title: "5. Kearifan Dalihan Na Tolu",
      desc: "Filosofi kekerabatan Batak mengajarkan rasa hormat kepada pihak pemberi istri (Somba Marhula-hula), tenggang rasa kepada teman semarga (Manat Mardongan Tubu), dan mengayomi pihak wanita (Elek Marboru). Rasa hormat ini tercermin dalam keramahan warga terhadap setiap tamu yang datang beritikad baik.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Header */}
        <section className="bg-[#1a3a34] text-white pt-16 pb-20 px-4 sm:px-8 border-b border-[#c29d59]/30 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center text-center">
            <span className="font-cinzel text-[11px] font-semibold text-[#c29d59] tracking-[2.75px] uppercase mb-3">
              Kearifan Lokal Kaldera
            </span>
            <h1 className="text-3xl sm:text-5xl font-newsreader font-normal text-white max-w-3xl leading-tight mb-4">
              Pedoman Etika & Tata Krama Budaya Batak
            </h1>
            <p className="text-white/80 text-[14px] sm:text-[15px] max-w-2xl leading-relaxed">
              Panduan bagi wisatawan untuk menghormati adat istiadat, situs megalitikum, dan kearifan masyarakat lingkar Danau Toba demi terciptanya pariwisata yang bermartabat dan lestari.
            </p>
          </div>
        </section>

        {/* Guidelines List */}
        <section className="max-w-[900px] mx-auto px-4 sm:px-8 py-16 space-y-8">
          <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
            {guidelines.map((g, idx) => (
              <div key={idx} className="pb-6 border-b border-[#e8e2d9]/60 last:border-b-0 last:pb-0">
                <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34] mb-2">
                  {g.title}
                </h3>
                <p className="text-[14px] text-[#575e5b] leading-relaxed">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-[#f2ede5] border border-[#c29d59]/40 flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-[#c29d59] shrink-0 mt-1" />
            <div>
              <h4 className="font-cinzel text-sm font-bold text-[#1a3a34] uppercase tracking-wide mb-1">
                Komitmen Wisata Berkelanjutan BPODT
              </h4>
              <p className="text-[13px] text-[#575e5b] leading-relaxed">
                Dengan menghormati adat dan alam Danau Toba, Anda turut serta melestarikan warisan peradaban dunia UNESCO untuk generasi mendatang.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
