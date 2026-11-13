"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { HelpCircle, Phone, Mail, MessageCircle, ChevronDown, ShieldCheck, MapPin } from "lucide-react";

export default function BantuanPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Bagaimana cara melakukan reservasi dan mendapatkan E-Tiket?",
      a: "Pilih destinasi atau pengalaman yang Anda inginkan, tentukan tanggal kunjungan dan jumlah tiket pada kartu reservasi, lalu selesaikan pembayaran melalui QRIS atau Virtual Account bank. Setelah pembayaran terverifikasi, E-Tiket berbarcode/QR Code resmi BPODT akan langsung muncul di Dashboard Wisatawan Anda dan dikirimkan otomatis ke WhatsApp Anda.",
    },
    {
      q: "Bagaimana jadwal kapal feri penyeberangan ke Pulau Samosir?",
      a: "Penyeberangan utama beroperasi setiap hari: Rute Pelabuhan Ajibata (Parapat) ke Pelabuhan Tomok beroperasi mulai pukul 07.00 s/d 21.00 WIB (interval tiap 1-2 jam). Tersedia Kapal Feri KMP Ihan Batak dan KMP Pora-Pora yang melayani kendaraan roda 4 dan roda 2.",
    },
    {
      q: "Apakah tiket yang sudah dibeli bisa dibatalkan atau di-reschedule?",
      a: "Perubahan jadwal (reschedule) dapat dilakukan hingga 24 jam sebelum tanggal kunjungan tanpa dikenakan biaya tambahan melalui menu kontak mitra pengelola di Dashboard Wisatawan.",
    },
    {
      q: "Bagaimana jika saya memerlukan pemandu berbahasa asing?",
      a: "Sebagian besar pemandu wisata berlisensi resmi di SINDAR TOBA fasih berbahasa Inggris dan beberapa berbahasa Belanda/Jerman. Anda dapat memilih opsi pemandu pada halaman detail destinasi.",
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
              Layanan Wisatawan
            </span>
            <h1 className="text-3xl sm:text-5xl font-newsreader font-normal text-white max-w-3xl leading-tight mb-4">
              Pusat Bantuan & Layanan Informasi
            </h1>
            <p className="text-white/80 text-[14px] sm:text-[15px] max-w-2xl leading-relaxed">
              Tim Concierge BPODT & SINDAR TOBA siap membantu kelancaran perjalanan, informasi penyeberangan feri, dan keamanan berwisata Anda di Danau Toba.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#e8e2d9] rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#1a3a34]">WhatsApp Concierge</h4>
                <p className="text-[12px] text-[#575e5b] mt-0.5 mb-2">Konsultasi liburan & darurat</p>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[13px] text-emerald-800 hover:underline"
                >
                  +62 812-3456-7890
                </a>
              </div>
            </div>

            <div className="bg-white border border-[#e8e2d9] rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1a3a34]/5 text-[#1a3a34] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-[#c29d59]" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#1a3a34]">Email Bantuan</h4>
                <p className="text-[12px] text-[#575e5b] mt-0.5 mb-2">Pertanyaan resmi & kerjasama</p>
                <a href="mailto:info@sindartoba.id" className="font-bold text-[13px] text-[#1a3a34] hover:underline">
                  info@sindartoba.id
                </a>
              </div>
            </div>

            <div className="bg-white border border-[#e8e2d9] rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#1a3a34]">Hotline SAR & Darurat Kaldera</h4>
                <p className="text-[12px] text-[#575e5b] mt-0.5 mb-2">Posko Siaga Danau Toba</p>
                <span className="font-bold text-[13px] text-red-800">115 / (0625) 41234</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-[900px] mx-auto px-4 sm:px-8 py-16">
          <h2 className="font-newsreader text-3xl font-semibold text-[#1a3a34] text-center mb-8">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1a3a34]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#c29d59] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-[13px] text-[#575e5b] leading-relaxed border-t border-[#e8e2d9]/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
