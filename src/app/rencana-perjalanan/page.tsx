"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PaymentModal from "@/components/checkout/PaymentModal";
import Link from "next/link";
import {
  Clock,
  Compass,
  ArrowRight,
  Share2,
  Download,
  Sparkles,
  Car,
  Ship,
  Sun,
  ShieldCheck,
} from "lucide-react";

export default function RencanaPerjalananPage() {
  const [duration, setDuration] = useState("3D2N");
  const [travelStyle, setTravelStyle] = useState("budaya");
  const [groupType, setGroupType] = useState("pasangan");
  const [budgetLevel, setBudgetLevel] = useState("nyaman");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const dayPlans = [
    {
      day: "Hari ke-1",
      title: "Penyambutan Kaldera & Senja di Savana Holbung",
      theme: "Kedatangan & Sunset",
      items: [
        {
          time: "09:30 WIB",
          place: "Bandara Internasional Silangit (DTB)",
          activity: "Penjemputan oleh driver lokal & perjalanan menyusuri jalan lingkar darat kaldera via Tele.",
          icon: Car,
        },
        {
          time: "12:00 WIB",
          place: "Menara Pandang Tele",
          activity: "Istirahat makan siang khas Batak dan menikmati titik tertinggi memandang Pulau Samosir.",
          icon: Compass,
        },
        {
          time: "15:30 WIB",
          place: "Bukit Holbung Samosir",
          activity: "Trekking santai 15 menit ke puncak bukit teletubbies kaldera untuk menikmati sunset magis.",
          icon: Sun,
        },
        {
          time: "18:30 WIB",
          place: "Check-in Homestay Tradisional Tuk-tuk",
          activity: "Istirahat dan makan malam santai di tepi danau yang hening berangin sejuk.",
          icon: Ship,
        },
      ],
    },
    {
      day: "Hari ke-2",
      title: "Jelajah Tradisi Leluhur & Magis Danau Toba",
      theme: "Warisan & Tenun Ulos",
      items: [
        {
          time: "08:30 WIB",
          place: "Desa Wisata Tomok",
          activity: "Menyaksikan Makam Batu Raja Sidabutar, mendengarkan tutur sejarah dari tetua adat.",
          icon: Compass,
        },
        {
          time: "11:00 WIB",
          place: "Kampung Tenun Lumban Suhi-suhi",
          activity: "Melihat inang-inang menenun Ulos Harungguan dan membeli souvenir kriya langsung.",
          icon: Sparkles,
        },
        {
          time: "13:30 WIB",
          place: "Sentra Kuliner Ikan Mas Arsik Samosir",
          activity: "Santap siang autentik rempah andaliman segar dan sayur pucuk ubi tumbuk.",
          icon: Compass,
        },
        {
          time: "16:00 WIB",
          place: "Pemandian Air Panas Alami Aek Rangat",
          activity: "Relaksasi air belerang hangat alami di kaki Gunung Pusuk Buhit.",
          icon: Sun,
        },
      ],
    },
    {
      day: "Hari ke-3",
      title: "Pelayaran Solu Bolon & Oleh-oleh Kopi Lintong",
      theme: "Danau & Kepulangan",
      items: [
        {
          time: "08:00 WIB",
          place: "Pelayaran Perahu Solu Bolon Tuk-tuk",
          activity: "Tur perahu kayu tradisional menyusuri tebing danau menuju Pelabuhan Ajibata.",
          icon: Ship,
        },
        {
          time: "11:30 WIB",
          place: "Sentra Kopi Lintongnihuta",
          activity: "Beli biji kopi sangrai specialty segar dari koperasi petani setempat.",
          icon: Sparkles,
        },
        {
          time: "14:00 WIB",
          place: "Bandara Internasional Silangit",
          activity: "Check-in penerbangan pulang dengan kenangan mendalam dari tanah Batak.",
          icon: Car,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow pb-24 lg:pb-0">
        {/* Header Container */}
        <section className="bg-[#1a3a34] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#c29d59]/30 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center text-center">
            <span className="font-cinzel text-[10.5px] sm:text-[11px] font-semibold text-[#c29d59] tracking-[2px] sm:tracking-[2.75px] uppercase mb-2 sm:mb-3">
              Perencana Perjalanan Cerdas
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-newsreader font-normal text-white max-w-3xl leading-tight mb-3 sm:mb-4">
              Susun Itinerary Impian Kawasan Danau Toba
            </h1>
            <p className="text-white/80 text-[13px] sm:text-[15px] max-w-2xl leading-relaxed px-2">
              Atur durasi hari, gaya liburan, dan anggaran Anda. Sistem secara otomatis menyusun rute paling efisien yang terhubung dengan geosite resmi dan mitra lokal.
            </p>
          </div>
        </section>

        {/* Preferences Customizer Module */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
          <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-lg space-y-5">
            <div className="flex items-center gap-2 pb-3.5 border-b border-[#e8e2d9]">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#c29d59]" />
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#1a3a34] uppercase tracking-wide">
                Parameter Perjalanan Anda
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Duration */}
              <div>
                <label className="text-[10.5px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Durasi Liburan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["2D1N", "3D2N", "4D3N", "5D4N"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`py-2 px-3 rounded-xl text-[12px] font-semibold transition-all border active:scale-95 ${
                        duration === d
                          ? "bg-[#1a3a34] text-white border-[#1a3a34] shadow-sm"
                          : "bg-[#faf8f5] text-[#575e5b] border-[#e8e2d9] hover:border-[#1a3a34]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="text-[10.5px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Gaya Perjalanan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "budaya", label: "Budaya & Adat" },
                    { id: "santai", label: "Santai & Alam" },
                    { id: "petualangan", label: "Petualangan" },
                    { id: "kuliner", label: "Kuliner Khas" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setTravelStyle(s.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition-all border text-center truncate active:scale-95 ${
                        travelStyle === s.id
                          ? "bg-[#1a3a34] text-white border-[#1a3a34] shadow-sm"
                          : "bg-[#faf8f5] text-[#575e5b] border-[#e8e2d9] hover:border-[#1a3a34]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Type */}
              <div>
                <label className="text-[10.5px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Jumlah Wisatawan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "solo", label: "Solo Traveler" },
                    { id: "pasangan", label: "Pasangan (2)" },
                    { id: "keluarga", label: "Keluarga (3-5)" },
                    { id: "rombongan", label: "Rombongan" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGroupType(g.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition-all border text-center truncate active:scale-95 ${
                        groupType === g.id
                          ? "bg-[#1a3a34] text-white border-[#1a3a34] shadow-sm"
                          : "bg-[#faf8f5] text-[#575e5b] border-[#e8e2d9] hover:border-[#1a3a34]"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="text-[10.5px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Kategori Anggaran:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "hemat", label: "Hemat / Ransel" },
                    { id: "nyaman", label: "Nyaman & Asri" },
                    { id: "premium", label: "Eksklusif" },
                    { id: "kustom", label: "Custom" },
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBudgetLevel(b.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition-all border text-center truncate active:scale-95 ${
                        budgetLevel === b.id
                          ? "bg-[#1a3a34] text-white border-[#1a3a34] shadow-sm"
                          : "bg-[#faf8f5] text-[#575e5b] border-[#e8e2d9] hover:border-[#1a3a34]"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Two-Column Layout */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
            {/* Left Column: Timeline */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d9]">
                <div>
                  <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                    Rincian Jadwal Perjalanan ({duration})
                  </h3>
                  <p className="text-[12.5px] sm:text-[13px] text-[#575e5b]">
                    Disesuaikan dengan rute terpendek dan waktu buka destinasi resmi
                  </p>
                </div>
                <button
                  onClick={() => alert("Itinerary berhasil disimpan ke akun Anda!")}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#e8e2d9] bg-white text-[11.5px] font-semibold text-[#1a3a34] hover:bg-[#1a3a34] hover:text-white transition-colors active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Simpan & Bagikan</span>
                </button>
              </div>

              {/* Day-by-Day Accordion / Timeline */}
              <div className="space-y-5 sm:space-y-6">
                {dayPlans.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#e8e2d9]/60">
                      <div>
                        <span className="font-cinzel text-[11px] font-bold text-[#b8653a] uppercase tracking-wider block">
                          {day.day}
                        </span>
                        <h4 className="font-newsreader text-base sm:text-lg font-semibold text-[#1a3a34]">
                          {day.title}
                        </h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#faf8f5] text-[10.5px] font-medium text-[#575e5b] border border-[#e8e2d9]">
                        {day.theme}
                      </span>
                    </div>

                    <div className="space-y-4 relative pl-5 sm:pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#c29d59]/40">
                      {day.items.map((item, iIdx) => {
                        return (
                          <div key={iIdx} className="relative flex items-start gap-3 sm:gap-4">
                            <div className="absolute -left-5 sm:-left-6 top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#1a3a34] border-2 border-white flex items-center justify-center shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c29d59]" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12px] font-bold text-[#b8653a]">
                                <Clock className="w-3 h-3 text-[#c29d59]" />
                                <span>{item.time}</span>
                                <span className="text-[#575e5b] font-normal">• {item.place}</span>
                              </div>
                              <p className="text-[12.5px] sm:text-[13px] text-[#2c3531] mt-0.5 leading-relaxed">
                                {item.activity}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Sticky Summary & Cost Estimator Card */}
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-6 shadow-xl text-[#1a3a34] lg:sticky lg:top-28">
              <span className="font-cinzel text-[10.5px] font-bold text-[#c29d59] tracking-wider uppercase block mb-1">
                Kalkulasi Perkiraan Biaya
              </span>
              <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34] mb-3.5">
                Ringkasan Paket Perjalanan
              </h3>

              <div className="space-y-2.5 py-3 border-t border-b border-[#e8e2d9] text-[12px] text-[#575e5b]">
                <div className="flex justify-between">
                  <span>Tiket Masuk 6 Geosite & Cagar</span>
                  <span className="font-semibold text-[#1a3a34]">Rp 180.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Sewa Mobil + Driver + BBM (3 Hari)</span>
                  <span className="font-semibold text-[#1a3a34]">Rp 1.650.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Homestay Tradisional (2 Malam)</span>
                  <span className="font-semibold text-[#1a3a34]">Rp 900.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Tur Perahu Solu Bolon Tuk-tuk</span>
                  <span className="font-semibold text-[#1a3a34]">Rp 250.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Pemandu Cerita Adat Lokal</span>
                  <span className="font-semibold text-[#1a3a34]">Rp 200.000</span>
                </div>

                <div className="pt-3 border-t border-[#e8e2d9]/60 flex justify-between items-baseline text-[13px] sm:text-[14px] font-bold text-[#1a3a34]">
                  <span>Total Estimasi</span>
                  <div className="text-right">
                    <span className="font-cinzel text-lg sm:text-xl text-[#1a3a34] block">Rp 3.180.000</span>
                    <span className="text-[10px] text-[#575e5b] font-normal">
                      (± Rp 1.590.000 / orang untuk 2 peserta)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full py-3 sm:py-3.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-semibold text-[12.5px] uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Pesan Semua Paket</span>
                  <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 sm:py-3 rounded-full border border-[#e8e2d9] hover:border-[#1a3a34] bg-[#faf8f5] text-[#1a3a34] font-semibold text-[11.5px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#e8e2d9]/60 flex items-center gap-2 text-[11px] text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Rute terdaftar di BPODT & dilindungi asuransi</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Floating Bottom Booking Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e8e2d9] pt-3.5 px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] flex items-center justify-between lg:hidden shadow-lg">
        <div>
          <span className="text-[10px] text-[#575e5b] block">Estimasi Paket ({duration})</span>
          <span className="font-cinzel text-lg font-bold text-[#1a3a34]">Rp 3.180.000</span>
        </div>
        <button
          type="button"
          onClick={() => setIsPaymentModalOpen(true)}
          className="px-6 py-2.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95"
        >
          <span>Pesan Sekarang</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#c29d59]" />
        </button>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        item={{
          id: `itinerary-${duration.toLowerCase()}`,
          title: `Paket Itinerary Kaldera Toba (${duration})`,
          geositeLabel: "Paket Wisata Terpadu",
          visitDate: new Date().toISOString().split("T")[0],
          visitTime: `${duration} • Fleksibel`,
          visitorsCount: groupType === "solo" ? 1 : groupType === "pasangan" ? 2 : 4,
          visitorsLabel: groupType === "solo" ? "1 Peserta" : groupType === "pasangan" ? "2 Peserta" : "3-5 Peserta",
          addons: ["6 Geosite", "Transportasi + Driver", "Homestay 2 Malam", "Tur Solu Bolon"],
          totalAmount: 3180000,
          location: "Kawasan Kaldera Danau Toba",
          organizerName: "Concierge Resmi SINDAR TOBA",
          organizerPhone: "6281234567890",
        }}
      />

      <Footer />
    </div>
  );
}