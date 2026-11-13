"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function MitraPage() {
  const steps = [
    {
      step: "01",
      title: "Isi Formulir Pendaftaran",
      desc: "Lengkapi data usaha, legalitas (NIB/KTP), dan informasi rekening bank untuk pencairan.",
    },
    {
      step: "02",
      title: "Verifikasi Kurasi BPODT",
      desc: "Tim otorita kaldera memvalidasi kelayakan, kepatuhan harga, dan standar mutu CHSE.",
    },
    {
      step: "03",
      title: "Terbitkan Listing Layanan",
      desc: "Pasang foto properti, atur kuota tiket harian, dan terima reservasi wisatawan secara otomatis.",
    },
    {
      step: "04",
      title: "Terima Pembayaran Langsung",
      desc: "Hasil penjualan ditransfer ke rekening bank Anda dengan rincian pembukuan transparan.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#1a3a34] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#c29d59]/30 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center text-center">
            <span className="font-cinzel text-[10.5px] sm:text-[11px] font-semibold text-[#c29d59] tracking-[2px] sm:tracking-[2.75px] uppercase mb-2 sm:mb-3">
              Portal Ekosistem Kemitraan
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-newsreader font-normal text-white max-w-3xl leading-tight mb-3 sm:mb-4">
              Bermitra Bersama SINDAR TOBA
            </h1>
            <p className="text-white/80 text-[13px] sm:text-[15px] max-w-2xl leading-relaxed mb-6 sm:mb-8 px-2">
              Wadah resmi pelaku pariwisata kaldera Danau Toba untuk menjangkau wisatawan berkualitas,
              meningkatkan omzet usaha, dan menjaga kelestarian warisan budaya Batak.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto px-4">
              <Link
                href="/mitra/daftar"
                className="px-7 py-3 rounded-full bg-[#c29d59] hover:bg-[#b08b47] text-[#1a3a34] font-semibold text-[12.5px] uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <span>Daftar Sebagai Mitra</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/mitra/login"
                className="px-6 py-3 rounded-full border border-white/30 hover:border-white text-white font-medium text-[12.5px] uppercase tracking-wider transition-colors text-center"
              >
                Login Akun Mitra
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Steps How It Works */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="font-cinzel text-[10.5px] sm:text-[11px] font-semibold text-[#b8653a] tracking-widest uppercase block mb-1">
              Alur Mudah & Transparan
            </span>
            <h2 className="font-newsreader text-2xl sm:text-3xl font-semibold text-[#1a3a34]">
              4 Langkah Menjadi Mitra Resmi Kaldera
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#c29d59] block mb-2 sm:mb-3">
                    {st.step}
                  </span>
                  <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-[#1a3a34] mb-2 leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-[12.5px] sm:text-[13px] text-[#575e5b] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Verification Standards Banner */}
          <div className="mt-12 sm:mt-16 bg-[#f2ede5] border border-[#e8e2d9] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#e8e2d9] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#c29d59]" />
              </div>
              <div>
                <h4 className="font-newsreader text-lg sm:text-xl font-semibold text-[#1a3a34]">
                  Standar Mutu CHSE & BPODT
                </h4>
                <p className="text-[12.5px] sm:text-[13px] text-[#575e5b] mt-0.5">
                  Setiap mitra mendapatkan lencana resmi & pendampingan tata kelola pariwisata berstandar nasional.
                </p>
              </div>
            </div>

            <Link
              href="/mitra/daftar"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1a3a34] text-white font-semibold text-[12px] uppercase tracking-wider transition-colors shrink-0 text-center"
            >
              Mulai Pendaftaran Gratis
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}