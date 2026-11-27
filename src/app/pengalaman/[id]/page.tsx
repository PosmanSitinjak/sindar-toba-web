"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PaymentModal from "@/components/checkout/PaymentModal";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock,
  Users,
  Star,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  LogIn,
  X,
} from "lucide-react";

export default function DetailPengalamanPage({ params }: { params: { id: string } }) {
  const [participants, setParticipants] = useState(2);
  const [selectedDate, setSelectedDate] = useState("2026-11-22");

  const experiencesData: { [key: string]: any } = {
    "kopi-lintong": {
      title: "Jelajah Kebun & Cupping Kopi Arabika Lintong Specialty",
      category: "Agrowisata Kopi",
      location: "Lintongnihuta, Humbang Hasundutan",
      duration: "4 Jam",
      groupSize: "Maks. 8 orang per sesi",
      price: 220000,
      rating: 4.9,
      reviews: 215,
      host: "Kelompok Tani Kopi Organik Lintong",
      image: "/images/destinations/kopi-lintong.jpg",
      desc: "Menyusuri kebun kopi vulkanik di ketinggian 1.400 mdpl, memetik ceri kopi merah, memahami proses giling basah (wet-hulled), serta teknik sangrai khas Batak.",
      itinerary: [
        { time: "09:00 - 10:00", title: "Menyusuri Kebun Kopi Vulkanik", desc: "Berjalan di antara pohon kopi Arabika varietas Lasuna & Sigarar Utang, mengenal karakteristik tanah andosol kaldera." },
        { time: "10:00 - 11:00", title: "Praktik Petik Ceri Merah & Pascapanen", desc: "Memilah ceri kopi matang pohon sempurna dan melihat proses pengupasan kulit ceri (pulping) tradisional." },
        { time: "11:00 - 12:00", title: "Sesi Sangrai (Roasting) Tradisional", desc: "Mencoba menyangrai kopi menggunakan kuali tanah liat dengan aroma harum rempah khas Lintong." },
        { time: "12:00 - 13:00", title: "Cupping Lab & Makan Siang Kebun", desc: "Mencicipi perbedaan cita rasa (cupping) 3 proses kopi berbeda ditemani santapan makan siang desa." },
      ],
      includes: [
        "Pemandu ahli cupping lokal berlisensi",
        "Sesi cupping & mencicipi 3 jenis racikan kopi",
        "Bawa pulang 200gr biji kopi sangrai specialty segar",
        "Makan siang khas Humbahas di pondok kebun",
        "Alat pelindung kebun (topi caping & keranjang petik)",
      ],
    },
    "menenun-ulos": {
      title: "Workshop Menenun Ulos bersama Maestro Desa Suhi-suhi",
      category: "Kriya & Tenun",
      location: "Lumban Suhi-suhi, Samosir",
      duration: "3 Jam",
      groupSize: "Maks. 6 orang per sesi",
      price: 175000,
      rating: 4.9,
      reviews: 340,
      host: "Sanggar Tenun Harungguan Suhi-suhi",
      image: "/images/destinations/tenun-ulos.jpg",
      desc: "Pelajari filosofi ragi motif Harungguan, teknik pewarnaan alam dari daun tanaman lokal, dan praktik menenun langsung di alat tenun gedog tradisional.",
      itinerary: [
        { time: "09:30 - 10:15", title: "Filosofi Ragi & Makna Ulos Batak", desc: "Mendengarkan kisah makna spiritual ulos dari tetua adat wanita." },
        { time: "10:15 - 11:30", title: "Praktik Menenun Alat Gedog", desc: "Mencoba langsung memasang benang dan menenun pola sederhana." },
        { time: "11:30 - 12:30", title: "Pewarnaan Daun Alam & Teh Serai", desc: "Melihat rebusan daun tarum dan kulit kayu mahoni." },
      ],
      includes: [
        "Bimbingan langsung dari inang penenun senior",
        "Suvenir selendang tenun mini buatan tangan",
        "Teh serai hangat dan penganan tradisional Batak",
      ],
    },
    "perahu-solu": {
      title: "Pelayaran Damai Kaldera dengan Perahu Kayu Solu Bolon",
      category: "Wisata Danau",
      location: "Tuk-tuk Siadong, Samosir",
      duration: "2 Jam",
      groupSize: "Maks. 10 orang per sesi",
      price: 250000,
      rating: 4.8,
      reviews: 480,
      host: "Komunitas Nahkoda Solu Bolon Toba",
      image: "/images/destinations/bukit-holbung.jpg",
      desc: "Mengarungi danau vulkanik hening saat kabut pagi merekah dengan perahu kayu bertatahkan ornamen Gorga Batak menuju teluk-teluk tersembunyi.",
      itinerary: [
        { time: "08:00 - 08:30", title: "Briefing & Doa Keberangkatan", desc: "Penjelasan rute teluk dan pengenaan pelampung keselamatan." },
        { time: "08:30 - 09:30", title: "Mengarungi Perairan Kaldera", desc: "Menikmati pantulan bukit kaldera di permukaan air danau yang tenang." },
        { time: "09:30 - 10:00", title: "Singgah di Teluk Terpencil", desc: "Menikmati kopi panas di tepian bebatuan sebelum kembali ke dermaga." },
      ],
      includes: [
        "Perahu kayu Solu Bolon tradisional bersertifikasi keselamatan",
        "Pelampung standar & pemandu lokal berpengalaman",
        "Kopi tubruk atau teh hangat + kue lapet ketan Batak",
      ],
    },
    "kuliner-andaliman": {
      title: "Masterclass Kuliner Rempah Andaliman & Ikan Mas Arsik",
      category: "Gastronomi Lokal",
      location: "Meat, Balige, Toba",
      duration: "3.5 Jam",
      groupSize: "Maks. 6 orang per sesi",
      price: 190000,
      rating: 4.9,
      reviews: 190,
      host: "Dapur Rempah Pusaka Balige",
      image: "/images/destinations/lembah-bakkara.jpg",
      desc: "Mengenal 'merica Batak' andaliman yang memberikan sensasi getir segar khas, dipadukan kecombrang dan asam gelugur untuk meracik Ikan Mas Arsik otentik.",
      itinerary: [
        { time: "10:00 - 10:45", title: "Mengenal 12 Rempah Khas Batak", desc: "Mencium dan mencicipi andaliman mentah, unte jungga, dan asam cikala." },
        { time: "10:45 - 12:00", title: "Meracik & Memasak Arsik Kuali", desc: "Menyusun bumbu dan ikan mas segar di atas lapisan batang serai dan rebung." },
        { time: "12:00 - 13:30", title: "Makan Siang Bersama", desc: "Menikmati arsik yang baru matang ditemani nasi hangat dan daun ubi tumbuk." },
      ],
      includes: [
        "Semua bahan masakan dan bumbu rempah segar",
        "Makan siang lengkap hasil masakan Anda",
        "Buku saku resep pusaka kuliner Danau Toba",
      ],
    },
  };

  const routeParams = useParams();
  const expId = (routeParams?.id as string) || params?.id || "kopi-lintong";
  const exp = experiencesData[expId] || experiencesData["kopi-lintong"];
  const totalCost = exp.price * participants;

  // Payment Gateway & Auth State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAuthRequiredModalOpen, setIsAuthRequiredModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<"guest" | "user" | "mitra">("guest");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("sindar_role") as "user" | "mitra" | null;
      if (role === "user" || role === "mitra") {
        setAuthRole(role);
      }
    }
  }, []);

  const handleBooking = () => {
    if (authRole === "guest") {
      setIsAuthRequiredModalOpen(true);
      return;
    }
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 md:pb-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6 text-[12px] text-[#575e5b]">
          <nav className="flex items-center gap-1.5 sm:gap-2 truncate">
            <Link href="/" className="hover:text-[#1a3a34]">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/pengalaman" className="hover:text-[#1a3a34]">
              Pengalaman
            </Link>
            <span>/</span>
            <span className="text-[#1a3a34] font-semibold truncate">{exp.title}</span>
          </nav>
        </div>

        {/* Title Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-[#c29d59]/15 border border-[#c29d59]/30 text-[#b8653a] text-[10.5px] font-semibold tracking-wider uppercase">
              {exp.category}
            </span>
            <span className="text-[12px] text-[#575e5b]">• {exp.location}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-newsreader font-normal text-[#1a3a34] tracking-tight mb-3">
            {exp.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[12px] sm:text-[13px] text-[#575e5b]">
            <div className="flex items-center gap-1 text-[#1a3a34] font-semibold">
              <Star className="w-4 h-4 fill-[#c29d59] text-[#c29d59]" />
              <span>{exp.rating}</span>
              <span className="text-[#575e5b] font-normal underline ml-1">
                ({exp.reviews} ulasan)
              </span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#c29d59]" />
              {exp.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#c29d59]" />
              {exp.groupSize}
            </span>
          </div>
        </div>

        {/* Main Hero Photo */}
        <div className="relative h-[240px] sm:h-[380px] md:h-[460px] rounded-3xl overflow-hidden mb-8 sm:mb-10 shadow-sm bg-slate-100">
          <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#c29d59] block mb-0.5">
              Dipandu Oleh
            </span>
            <h3 className="font-newsreader text-lg sm:text-2xl font-semibold">{exp.host}</h3>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {/* Left Column: Details & Itinerary */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-8 shadow-sm">
              <h2 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34] mb-3">
                Tentang Aktivitas Luhur Ini
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#2c3531] leading-relaxed mb-6">
                {exp.desc}
              </p>

              {/* Inclusions */}
              <div className="pt-6 border-t border-[#e8e2d9]">
                <h3 className="font-cinzel text-xs font-bold text-[#b8653a] uppercase tracking-wider mb-4">
                  Fasilitas & Manfaat yang Termasuk
                </h3>
                <div className="space-y-2.5">
                  {exp.includes.map((inc: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 text-[12.5px] sm:text-[13px] text-[#2c3531]">
                      <CheckCircle2 className="w-4 h-4 text-[#c29d59] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule Itinerary */}
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-8 shadow-sm">
              <h2 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34] mb-5 sm:mb-6">
                Rangkaian Jadwal Aktivitas
              </h2>
              <div className="space-y-5 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#c29d59]/40">
                {exp.itinerary.map((it: any, idx: number) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#1a3a34] border-2 border-white flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c29d59]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#b8653a] block">
                      {it.time}
                    </span>
                    <h4 className="font-semibold text-sm sm:text-base text-[#1a3a34] mt-0.5">{it.title}</h4>
                    <p className="text-[12px] sm:text-[13px] text-[#575e5b] mt-0.5 leading-relaxed">{it.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Reservation Box */}
          <div id="booking-box" className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-6 shadow-xl text-[#1a3a34] lg:sticky lg:top-28">
            <div className="pb-4 border-b border-[#e8e2d9]">
              <span className="text-[10.5px] text-[#575e5b] uppercase tracking-wider block">
                Biaya Partisipasi
              </span>
              <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1a3a34]">
                Rp {exp.price.toLocaleString("id-ID")}
              </span>
              <span className="text-[12px] text-[#575e5b] font-normal"> /peserta</span>
            </div>

            <div className="space-y-4 my-5">
              <div>
                <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Pilih Tanggal Kegiatan
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] font-semibold text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Jumlah Peserta
                </label>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9]">
                  <button
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-[#e8e2d9] font-bold text-base hover:bg-slate-100 flex items-center justify-center active:scale-95"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm">{participants} Peserta</span>
                  <button
                    onClick={() => setParticipants(participants + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-[#e8e2d9] font-bold text-base hover:bg-slate-100 flex items-center justify-center active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e8e2d9] flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#1a3a34]">Total Biaya</span>
                <span className="font-cinzel text-xl font-bold text-[#1a3a34]">
                  Rp {totalCost.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {authRole === "guest" ? (
              <button
                type="button"
                onClick={handleBooking}
                className="w-full py-3.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-semibold text-[12px] uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <LogIn className="w-4 h-4 text-[#c29d59]" />
                <span>Masuk Akun untuk Daftar Sesi</span>
                <ArrowRight className="w-4 h-4 text-[#c29d59]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleBooking}
                className="w-full py-3.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-semibold text-[12.5px] uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Daftar Sesi Sekarang</span>
                <ArrowRight className="w-4 h-4 text-[#c29d59]" />
              </button>
            )}

            {authRole === "guest" && (
              <p className="text-[11px] text-[#575e5b] text-center mt-2.5">
                Masuk ke akun wisatawan agar E-Tiket sesi resmi otomatis tersimpan di dashboard Anda.
              </p>
            )}

            <div className="mt-4 pt-3 border-t border-[#e8e2d9]/60 text-[11px] text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>100% didampingi pemandu lokal terverifikasi BPODT</span>
            </div>
          </div>
        </div>

        {/* Mobile Floating Bottom Booking Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e8e2d9] pt-3.5 px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] flex items-center justify-between lg:hidden shadow-lg">
          <div>
            <span className="text-[10px] text-[#575e5b] block">Total ({participants} Peserta)</span>
            <span className="font-cinzel text-lg font-bold text-[#1a3a34]">
              Rp {totalCost.toLocaleString("id-ID")}
            </span>
          </div>
          {authRole === "guest" ? (
            <button
              type="button"
              onClick={handleBooking}
              className="px-5 py-2.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[11.5px] font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5 text-[#c29d59]" />
              <span>Masuk & Pesan</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleBooking}
              className="px-6 py-2.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <span>Pesan Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c29d59]" />
            </button>
          )}
        </div>

        {/* Auth Required Modal */}
        {isAuthRequiredModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#c29d59]/40 relative text-center">
              <button
                type="button"
                onClick={() => setIsAuthRequiredModalOpen(false)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500 absolute top-4 right-4"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-[#1a3a34] text-[#c29d59] mx-auto flex items-center justify-center mb-4 border border-[#c29d59]/40 shadow-sm">
                <LogIn className="w-7 h-7" />
              </div>

              <span className="font-cinzel text-[11px] font-bold text-[#c29d59] uppercase tracking-wider block mb-1">
                Autentikasi Wisatawan
              </span>
              <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34] mb-2">
                Masuk untuk Melanjutkan Pemesanan
              </h3>
              <p className="text-xs text-[#575e5b] leading-relaxed mb-5">
                Untuk menerbitkan E-Tiket berbarcode resmi BPODT atas nama Anda serta keamanan dana transaksi, silakan masuk ke akun wisatawan terlebih dahulu.
              </p>

              <div className="space-y-2.5">
                <Link
                  href={`/masuk?redirect=/pengalaman/${params.id}`}
                  className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <LogIn className="w-4 h-4 text-[#c29d59]" />
                  <span>Masuk ke Akun Saya</span>
                  <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                </Link>

                <Link
                  href={`/daftar?redirect=/pengalaman/${params.id}`}
                  className="w-full py-2.5 rounded-full border border-[#c29d59] text-[#1a3a34] hover:bg-[#c29d59]/10 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Belum Punya Akun? Daftar Baru (1 Menit)</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsAuthRequiredModalOpen(false)}
                  className="text-xs text-[#575e5b] hover:text-[#1a3a34] pt-1 block mx-auto"
                >
                  Batal & Kembali
                </button>
              </div>
            </div>
          </div>
        )}

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          item={{
            id: params.id,
            title: exp.title,
            geositeLabel: exp.category || "Pengalaman Budaya",
            visitDate: selectedDate,
            visitTime: exp.duration || "09:00 WIB",
            visitorsCount: participants,
            visitorsLabel: `${participants} Peserta`,
            addons: ["Termasuk Fasilitas & Pemandu"],
            totalAmount: totalCost,
            location: exp.location,
            organizerName: exp.host || "Mitra Pengalaman Toba",
            organizerPhone: "6281234567890",
          }}
        />
      </main>

      <Footer />
    </div>
  );
}