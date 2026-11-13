"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Ticket,
  Calendar,
  Heart,
  History,
  QrCode,
  Download,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Compass,
} from "lucide-react";

export default function DashboardWisatawanPage() {
  const [activeTab, setActiveTab] = useState("tiket");
  const [showQrModal, setShowQrModal] = useState<string | null>(null);

  const userProfile = {
    name: "Christofer Sitinjak",
    email: "posmansitinjak06@gmail.com",
    phone: "+62 812-3456-7890",
    membership: "Wisatawan Terverifikasi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    memberSince: "November 2026",
  };

  const activeTickets = [
    {
      id: "TKT-001",
      bookingCode: "ST-2026-HB0491",
      destination: "Bukit Holbung Samosir",
      geosite: "Geosite UNESCO #04",
      date: "Jumat, 20 Nov 2026",
      time: "07:00 - 18:00 WIB",
      visitors: "2 Orang",
      addons: ["Pemandu Cerita Adat", "Sewa 2 Kain Ulos"],
      totalPaid: "Rp 155.000",
      status: "Lunas (Siap Digunakan)",
      location: "Janji Martahan, Samosir",
      organizerPhone: "6281234567890",
      organizerName: "Pokdarwis Harian Boho",
    },
    {
      id: "TKT-002",
      bookingCode: "ST-2026-SB0182",
      destination: "Pelayaran Perahu Solu Bolon",
      geosite: "Pengalaman Danau Kaldera",
      date: "Sabtu, 21 Nov 2026",
      time: "08:30 WIB",
      visitors: "2 Peserta",
      addons: ["Pelampung Keselamatan", "Teh & Sarapan Ringan"],
      totalPaid: "Rp 500.000",
      status: "Terkonfirmasi",
      location: "Dermaga Tuk-tuk, Samosir",
      organizerPhone: "6281234567891",
      organizerName: "Komunitas Nahkoda Solu",
    },
  ];

  const savedItineraries = [
    {
      id: "itin-01",
      title: "3 Hari 2 Malam: Kaldera Agung & Warisan Leluhur Samosir",
      duration: "3 Hari 2 Malam",
      stops: 6,
      estimatedCost: "Rp 1.850.000 / org",
      createdDate: "12 November 2026",
      route: "Silangit → Parapat → Tomok → Holbung → Tuk-tuk",
    },
  ];

  const wishlistItems = [
    {
      id: "desa-tomok",
      name: "Desa Wisata Tomok & Sigale-gale",
      region: "Pulau Samosir",
      price: "Rp 25.000",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "kopi-lintong-specialty",
      name: "Kopi Arabika Lintong Specialty 250g",
      region: "Humbang Hasundutan",
      price: "Rp 95.000",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "lembah-bakkara",
      name: "Lembah Bakkara & Aek Sipangolu",
      region: "Humbang Hasundutan",
      price: "Rp 20.000",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "ulos-harungguan",
      name: "Kain Tenun Ulos Harungguan Suhi-suhi",
      region: "Samosir",
      price: "Rp 850.000",
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Header Card (Responsive) */}
        <section className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-sm mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#c29d59] shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-newsreader text-xl sm:text-2xl md:text-3xl font-semibold text-[#1a3a34]">
                    {userProfile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] font-semibold">
                    {userProfile.membership}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11.5px] sm:text-[12px] text-[#575e5b]">
                  <span>{userProfile.email}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{userProfile.phone}</span>
                </div>
              </div>
            </div>

            {/* Quick Stat Counter Pills */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full md:w-auto">
              <div className="px-3 sm:px-4 py-2 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] text-center">
                <span className="font-cinzel text-lg sm:text-xl font-bold text-[#1a3a34] block">
                  {activeTickets.length}
                </span>
                <span className="text-[9.5px] sm:text-[10px] text-[#575e5b] uppercase tracking-wider">Tiket Aktif</span>
              </div>
              <div className="px-3 sm:px-4 py-2 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] text-center">
                <span className="font-cinzel text-lg sm:text-xl font-bold text-[#1a3a34] block">
                  {savedItineraries.length}
                </span>
                <span className="text-[9.5px] sm:text-[10px] text-[#575e5b] uppercase tracking-wider">Itinerary</span>
              </div>
              <div className="px-3 sm:px-4 py-2 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] text-center">
                <span className="font-cinzel text-lg sm:text-xl font-bold text-[#1a3a34] block">
                  {wishlistItems.length}
                </span>
                <span className="text-[9.5px] sm:text-[10px] text-[#575e5b] uppercase tracking-wider">Favorit</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 border-b border-[#e8e2d9] pb-px mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: "tiket", label: "Tiket & Pesanan", icon: Ticket },
            { id: "itinerary", label: "Itinerary Saya", icon: Calendar },
            { id: "wishlist", label: "Favorit", icon: Heart },
            { id: "riwayat", label: "Riwayat", icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3 px-3.5 sm:px-4 text-[12px] sm:text-[13px] font-semibold transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#1a3a34] text-[#1a3a34]"
                    : "border-transparent text-[#575e5b] hover:text-[#1a3a34]"
                }`}
              >
                <Icon className="w-4 h-4 text-[#c29d59]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: TIKET & PESANAN AKTIF */}
        {activeTab === "tiket" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h2 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                E-Tiket & Voucher Kaldera
              </h2>
              <span className="text-[12px] text-[#575e5b]">
                Tunjukkan QR Code di loket untuk verifikasi instan
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {activeTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="bg-white border border-[#e8e2d9] hover:border-[#c29d59] rounded-3xl p-5 sm:p-6 shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Code & Badge */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#e8e2d9]/60">
                      <div>
                        <span className="font-cinzel text-[10.5px] font-bold text-[#b8653a] tracking-wider block">
                          KODE BOOKING
                        </span>
                        <span className="text-[13px] sm:text-sm font-bold text-[#1a3a34]">
                          {tkt.bookingCode}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] font-semibold">
                        {tkt.status}
                      </span>
                    </div>

                    {/* Middle: Title & Geosite */}
                    <div className="py-3.5">
                      <span className="text-[10.5px] font-semibold text-[#c29d59] uppercase tracking-wider block mb-1">
                        {tkt.geosite}
                      </span>
                      <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                        {tkt.destination}
                      </h3>
                      <p className="flex items-center gap-1.5 text-[12px] text-[#575e5b] mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#c29d59]" />
                        {tkt.location}
                      </p>
                    </div>

                    {/* Meta Details */}
                    <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9]/60 text-[12px] mb-3.5">
                      <div>
                        <span className="text-[#575e5b] block text-[10.5px]">Jadwal:</span>
                        <span className="font-semibold text-[#1a3a34] block text-[11.5px]">{tkt.date}</span>
                        <span className="text-[#575e5b] text-[10.5px]">{tkt.time}</span>
                      </div>
                      <div>
                        <span className="text-[#575e5b] block text-[10.5px]">Jumlah:</span>
                        <span className="font-semibold text-[#1a3a34] block text-[11.5px]">{tkt.visitors}</span>
                        <span className="text-emerald-700 font-semibold text-[10.5px]">
                          {tkt.totalPaid}
                        </span>
                      </div>
                    </div>

                    {/* Addons List */}
                    <div className="mb-4">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#575e5b] block mb-1.5">
                        Layanan Termasuk:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {tkt.addons.map((add, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-white border border-[#e8e2d9] text-[10.5px] text-[#2c3531] flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#c29d59]" />
                            {add}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & QR Code Trigger */}
                  <div className="pt-3.5 border-t border-[#e8e2d9] flex items-center gap-2">
                    <button
                      onClick={() => setShowQrModal(tkt.bookingCode)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#1a3a34] hover:bg-[#122a25] text-white text-[11.5px] sm:text-[12px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <QrCode className="w-4 h-4 text-[#c29d59]" />
                      <span>QR Code E-Tiket</span>
                    </button>

                    <a
                      href={`https://wa.me/${tkt.organizerPhone}?text=Halo%20${encodeURIComponent(tkt.organizerName)},%20saya%20pemegang%20tiket%20${tkt.bookingCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl border border-[#e8e2d9] hover:bg-[#faf8f5] text-emerald-700 transition-colors"
                      title="Hubungi Mitra via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() =>
                        alert(`Mengunduh E-Tiket PDF untuk ${tkt.bookingCode}...`)
                      }
                      className="p-2.5 rounded-xl border border-[#e8e2d9] hover:bg-[#faf8f5] text-[#1a3a34] transition-colors"
                      title="Unduh PDF Tiket"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ITINERARY SAYA */}
        {activeTab === "itinerary" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                Rencana Perjalanan Tersimpan
              </h2>
              <Link
                href="/rencana-perjalanan"
                className="px-4 py-2 rounded-full bg-[#1a3a34] text-white text-[11.5px] font-semibold uppercase tracking-wider hover:bg-[#122a25]"
              >
                + Buat Baru
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {savedItineraries.map((itin) => (
                <div
                  key={itin.id}
                  className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 shadow-sm space-y-3.5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#c29d59]/20 text-[#b8653a] text-[10px] font-bold uppercase tracking-wider">
                        {itin.duration}
                      </span>
                      <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-[#1a3a34] mt-1.5">
                        {itin.title}
                      </h3>
                      <p className="text-[12px] text-[#575e5b] mt-1">{itin.route}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#e8e2d9]/60 flex items-center justify-between text-[12px]">
                    <span className="text-[#575e5b]">Perkiraan: {itin.estimatedCost}</span>
                    <Link
                      href="/rencana-perjalanan"
                      className="font-semibold text-[#1a3a34] hover:text-[#b8653a]"
                    >
                      Lihat Rute →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            <h2 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
              Destinasi & Produk Favorit Anda
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-[10px] text-[#575e5b] block">{item.region}</span>
                      <h4 className="font-newsreader text-base font-semibold text-[#1a3a34] leading-snug mt-0.5 mb-2">
                        {item.name}
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-[#e8e2d9]/60 flex justify-between items-center text-[12px]">
                      <span className="font-bold text-[#1a3a34]">{item.price}</span>
                      <Link
                        href={`/destinasi/${item.id}`}
                        className="font-semibold text-[#b8653a] hover:underline"
                      >
                        Buka Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RIWAYAT */}
        {activeTab === "riwayat" && (
          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-8 text-center text-[#575e5b]">
            <History className="w-10 h-10 text-[#c29d59] mx-auto mb-3" />
            <h3 className="font-newsreader text-lg sm:text-xl font-semibold text-[#1a3a34] mb-1">
              Riwayat Kunjungan yang Selesai
            </h3>
            <p className="text-[12.5px] max-w-md mx-auto">
              Setelah Anda mengunjungi destinasi dan melakukan scan QR E-Tiket di lokasi, ulasan serta kenangan perjalanan Anda akan tersimpan di sini.
            </p>
          </div>
        )}

        {/* Cultural Etiquette Notice Banner */}
        <section className="mt-10 sm:mt-12 bg-[#1a3a34] text-white rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#c29d59]/20 border border-[#c29d59]/50 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-[#c29d59]" />
            </div>
            <div>
              <h4 className="font-cinzel text-[14px] sm:text-base font-semibold text-white">
                Pedoman Santun di Huta Adat Batak
              </h4>
              <p className="text-[12px] sm:text-[13px] text-white/80 mt-0.5 max-w-xl">
                Hargai makam leluhur dan rumah bolon dengan mengenakan pakaian sopan serta menjaga ketenangan saat tetua adat membagikan cerita tradisi.
              </p>
            </div>
          </div>
          <Link
            href="/etika-budaya"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#c29d59] text-[#c29d59] hover:bg-[#c29d59] hover:text-[#1a3a34] text-[11.5px] font-semibold uppercase tracking-wider transition-colors shrink-0 text-center"
          >
            Baca Panduan Etika
          </Link>
        </section>

        {/* QR Code Modal Popup (Mobile Responsive) */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xs sm:max-w-sm w-full p-6 sm:p-8 text-center shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <span className="font-cinzel text-[10.5px] font-bold text-[#c29d59] uppercase tracking-wider block mb-1">
                Verifikasi Geosite Resmi
              </span>
              <h3 className="font-newsreader text-xl sm:text-2xl font-bold text-[#1a3a34] mb-1.5">
                QR Code E-Tiket
              </h3>
              <p className="text-[11.5px] sm:text-[12px] text-[#575e5b] mb-4 sm:mb-6">
                Scan kode ini di pintu masuk geosite untuk konfirmasi kedatangan.
              </p>

              {/* High-res SVG QR Mockup */}
              <div className="w-44 h-44 sm:w-48 sm:h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-[#1a3a34] flex items-center justify-center shadow-inner mb-4">
                <svg className="w-full h-full text-[#1a3a34]" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="5" y="5" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="11" y="11" width="13" height="13" />
                  <rect x="70" y="5" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="76" y="11" width="13" height="13" />
                  <rect x="5" y="70" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
                  <rect x="11" y="76" width="13" height="13" />
                  <rect x="36" y="10" width="8" height="8" />
                  <rect x="50" y="15" width="8" height="8" />
                  <rect x="36" y="25" width="12" height="6" />
                  <rect x="10" y="36" width="8" height="15" />
                  <rect x="25" y="42" width="10" height="8" />
                  <rect x="42" y="42" width="16" height="16" rx="2" fill="#c29d59" />
                  <rect x="65" y="38" width="10" height="8" />
                  <rect x="80" y="45" width="12" height="8" />
                  <rect x="36" y="65" width="8" height="15" />
                  <rect x="50" y="75" width="15" height="8" />
                  <rect x="72" y="70" width="8" height="10" />
                  <rect x="85" y="65" width="8" height="18" />
                </svg>
              </div>

              <div className="font-mono text-xs font-bold text-[#1a3a34] bg-[#faf8f5] py-2 px-3 rounded-lg border border-[#e8e2d9] mb-5">
                {showQrModal}
              </div>

              <button
                onClick={() => setShowQrModal(null)}
                className="w-full py-2.5 sm:py-3 rounded-full bg-[#1a3a34] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[#122a25] transition-colors"
              >
                Tutup QR Code
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}