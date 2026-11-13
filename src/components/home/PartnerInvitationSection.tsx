import React from "react";
import Link from "next/link";
import { Handshake, CheckCircle2, ArrowRight } from "lucide-react";

export default function PartnerInvitationSection() {
  const benefits = [
    "Jangkau ribuan wisatawan nusantara & mancanegara setiap bulan",
    "Pencairan dana otomatis & pembukuan transparan tanpa ribet",
    "Verifikasi kurasi resmi berstandar BPODT & Kemenparekraf",
    "Bantuan pelatihan hospitality dan digitalisasi usaha lokal",
  ];

  return (
    <section className="w-full bg-[#1a3a34] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Delicate Gorga line background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg className="w-[1000px] h-[400px] text-[#c29d59]" viewBox="0 0 1000 400" fill="none" stroke="currentColor">
          <circle cx="500" cy="200" r="180" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="500" cy="200" r="140" strokeWidth="2" />
          <path d="M0 200 L1000 200" strokeWidth="1" />
          <path d="M500 0 L500 400" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
        <div className="max-w-2xl w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-3.5">
            <Handshake className="w-4 h-4 text-[#c29d59]" />
            <span className="font-cinzel text-[10.5px] font-semibold tracking-wider text-[#c29d59] uppercase">
              Kolaborasi Ekosistem Toba
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-newsreader font-normal text-white mb-3.5 leading-tight">
            Tumbuh Bersama Ekosistem Pariwisata Berkelanjutan
          </h2>

          <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
            Apakah Anda pemilik homestay, pemandu lokal, penenun ulos, atau peracik kuliner tradisional?
            Bergabunglah bersama SINDAR TOBA untuk memperluas jangkauan wisatawan premium secara aman dan bermartabat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 sm:mb-8">
            {benefits.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] text-white/90">
                <CheckCircle2 className="w-4 h-4 text-[#c29d59] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/mitra/daftar"
              className="px-7 py-3 rounded-full bg-[#c29d59] hover:bg-[#b08b47] text-[#1a3a34] font-semibold text-[12.5px] uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 text-center"
            >
              <span>Daftar Sebagai Mitra</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/mitra"
              className="px-6 py-3 rounded-full border border-white/30 hover:border-white text-white font-medium text-[12.5px] uppercase tracking-wider transition-colors text-center"
            >
              Pelajari Ketentuan
            </Link>
          </div>
        </div>

        {/* Visual Partner Info Card */}
        <div className="w-full lg:w-[400px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
          <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-white/15">
            <div className="w-12 h-12 rounded-2xl bg-[#c29d59]/20 border border-[#c29d59]/60 flex items-center justify-center shrink-0">
              <span className="font-cinzel text-lg font-bold text-[#c29d59]">ST</span>
            </div>
            <div>
              <h4 className="font-cinzel text-[14px] sm:text-[15px] font-semibold text-white tracking-wide">
                SINDAR TOBA MITRA
              </h4>
              <p className="text-[11.5px] text-white/70">Gerbang Digital Pelaku Wisata Kaldera</p>
            </div>
          </div>

          <div className="space-y-3.5 text-[12.5px]">
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-white/70">Kategori</span>
              <span className="font-semibold text-[#c29d59]">Homestay, Tour, UMKM</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-white/70">Verifikasi</span>
              <span className="font-semibold">Maks. 1 x 24 Jam</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/10">
              <span className="text-white/70">Biaya Daftar</span>
              <span className="font-semibold text-emerald-400">Gratis (0 IDR)</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-white/70">Dukungan</span>
              <span className="font-semibold">Pendampingan BPODT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}