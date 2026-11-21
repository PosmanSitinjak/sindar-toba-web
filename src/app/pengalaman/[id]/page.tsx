"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  Clock,
  Users,
  Star,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Share2,
  Heart,
  QrCode,
  Building2,
  CreditCard,
  Lock,
  Copy,
  Sparkles,
  X,
  RefreshCw,
  Check,
  ExternalLink,
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

  const exp = experiencesData[params.id] || experiencesData["kopi-lintong"];
  const totalCost = exp.price * participants;

  // Payment Gateway Modal States
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"method" | "pay" | "success">("method");
  const [selectedMethod, setSelectedMethod] = useState<"qris" | "va_sumut" | "va_mandiri" | "va_bca">("qris");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [issuedTicket, setIssuedTicket] = useState<any | null>(null);
  const [vaCopied, setVaCopied] = useState(false);

  const handleBooking = () => {
    setIsPaymentModalOpen(true);
    setPaymentStep("method");
  };

  const handleConfirmPayment = async () => {
    setIsProcessingPayment(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `ST-${new Date().getFullYear()}-${randomSuffix}`;
    const ticketId = `TKT-${Date.now().toString().slice(-6)}`;

    const channelLabel =
      selectedMethod === "qris"
        ? "QRIS Dinamis"
        : selectedMethod === "va_sumut"
        ? "VA Bank Sumut"
        : selectedMethod === "va_mandiri"
        ? "VA Bank Mandiri"
        : "VA Bank BCA";

    const newTicket = {
      id: ticketId,
      bookingCode: bookingCode,
      destination: exp.title,
      geosite: exp.category || "Pengalaman Budaya",
      date: selectedDate,
      time: exp.duration || "09:00 WIB",
      visitors: `${participants} Peserta`,
      addons: ["Termasuk Fasilitas & Pemandu"],
      totalPaid: `Rp ${totalCost.toLocaleString("id-ID")}`,
      status: "Lunas (Siap Digunakan)",
      location: exp.location,
      organizerPhone: "6281234567890",
      organizerName: exp.host || "Mitra Pengalaman Toba",
      paymentChannel: channelLabel,
      purchasedAt: new Date().toISOString(),
    };

    const travelerName =
      (typeof window !== "undefined" && localStorage.getItem("sindar_user_name")) ||
      "Wisatawan";

    const newTrx = {
      trxId: `TRX-${bookingCode}`,
      traveler: travelerName,
      item: `${participants}x ${exp.title}`,
      amount: `Rp ${totalCost.toLocaleString("id-ID")}`,
      channel: channelLabel,
      escrowStatus: "Tertahan di Escrow",
      time: "Baru saja",
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("tickets").insert({
          id: ticketId,
          booking_code: bookingCode,
          destination_id: params.id,
          destination_name: exp.title,
          geosite_label: exp.category,
          visit_date: selectedDate,
          visit_time: exp.duration || "09:00 WIB",
          visitors: participants,
          addons: ["Fasilitas Lengkap"],
          total_paid: totalCost,
          status: "Lunas (Siap Digunakan)",
          location: exp.location,
          organizer_name: exp.host,
          organizer_phone: "6281234567890",
        });
      } catch (err) {
        console.error("Supabase insert error:", err);
      }
    }

    if (typeof window !== "undefined") {
      try {
        const storedTkt = JSON.parse(localStorage.getItem("sindar_purchased_tickets") || "[]");
        localStorage.setItem("sindar_purchased_tickets", JSON.stringify([newTicket, ...storedTkt]));

        const storedTrx = JSON.parse(localStorage.getItem("sindar_transactions") || "[]");
        localStorage.setItem("sindar_transactions", JSON.stringify([newTrx, ...storedTrx]));
      } catch (e) {
        console.error(e);
      }
    }

    setTimeout(() => {
      setIsProcessingPayment(false);
      setIssuedTicket(newTicket);
      setPaymentStep("success");
    }, 1200);
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

            <button
              onClick={handleBooking}
              className="w-full py-3.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-semibold text-[12.5px] uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Daftar Sesi Sekarang</span>
              <ArrowRight className="w-4 h-4 text-[#c29d59]" />
            </button>

            <div className="mt-4 pt-3 border-t border-[#e8e2d9]/60 text-[11px] text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>100% didampingi pemandu lokal terverifikasi BPODT</span>
            </div>
          </div>
        </div>

        {/* Mobile Floating Bottom Booking Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e8e2d9] p-3.5 px-4 flex items-center justify-between lg:hidden shadow-lg safe-bottom">
          <div>
            <span className="text-[10px] text-[#575e5b] block">Total ({participants} Peserta)</span>
            <span className="font-cinzel text-lg font-bold text-[#1a3a34]">
              Rp {totalCost.toLocaleString("id-ID")}
            </span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("booking-box");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else handleBooking();
            }}
            className="px-6 py-2.5 rounded-full bg-[#1a3a34] text-white text-[12px] font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <span>Daftar Sesi</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c29d59]" />
          </button>
        </div>

        {/* MODAL PEMBAYARAN INTERAKTIF PENGALAMAN (CHECKOUT GATEWAY FOR TESTING & DEMO) */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
            <div className="bg-[#faf8f5] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-[#c29d59]/50 overflow-hidden text-[#1a3a34] max-h-[92vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#e8e2d9] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#1a3a34] text-[#c29d59] font-cinzel font-bold text-[11px] flex items-center justify-center border border-[#c29d59]">
                    ST
                  </div>
                  <div>
                    <span className="font-cinzel text-xs font-bold text-[#1a3a34] tracking-wider block">
                      GATEWAY PEMBAYARAN SINDAR TOBA
                    </span>
                    <span className="text-[9.5px] text-[#575e5b] uppercase tracking-wider">
                      BPODT Escrow Protection • Mode Testing Aktif
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps Indicator */}
              <div className="grid grid-cols-3 gap-2 mb-5 text-[10px] sm:text-[11px] font-semibold text-center uppercase tracking-wider">
                <div className={`pb-1.5 border-b-2 transition-all ${paymentStep === "method" ? "border-[#1a3a34] text-[#1a3a34] font-bold" : "border-emerald-700 text-emerald-800"}`}>
                  1. Metode Bayar
                </div>
                <div className={`pb-1.5 border-b-2 transition-all ${paymentStep === "pay" ? "border-[#1a3a34] text-[#1a3a34] font-bold" : paymentStep === "success" ? "border-emerald-700 text-emerald-800" : "border-stone-300 text-stone-400"}`}>
                  2. Selesaikan Bayar
                </div>
                <div className={`pb-1.5 border-b-2 transition-all ${paymentStep === "success" ? "border-emerald-700 text-emerald-800 font-bold" : "border-stone-300 text-stone-400"}`}>
                  3. E-Tiket Terbit
                </div>
              </div>

              {/* STEP 1: PILIH METODE PEMBAYARAN */}
              {paymentStep === "method" && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#e8e2d9] space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-[#1a3a34]">
                      <span>{exp.title}</span>
                      <span>Rp {totalCost.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-[#575e5b] text-[11px]">
                      <span>{selectedDate} • {participants} Peserta</span>
                      <span>{exp.category}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#575e5b] block mb-2">
                      Pilih Kanal Pembayaran Resmi:
                    </label>

                    <div className="space-y-2.5">
                      <label
                        onClick={() => setSelectedMethod("qris")}
                        className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                          selectedMethod === "qris"
                            ? "bg-white border-[#1a3a34] shadow-sm"
                            : "bg-white/60 border-[#e8e2d9] hover:border-stone-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold text-xs border border-red-200">
                            <QrCode className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-[#1a3a34]">QRIS Dinamis</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                Rekomendasi Instan
                              </span>
                            </div>
                            <span className="text-[10.5px] text-[#575e5b] block">
                              GoPay, OVO, Dana, ShopeePay, BCA Mobile & Semua M-Banking
                            </span>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="expPaymentMethod"
                          checked={selectedMethod === "qris"}
                          onChange={() => setSelectedMethod("qris")}
                          className="accent-[#1a3a34]"
                        />
                      </label>

                      <label
                        onClick={() => setSelectedMethod("va_sumut")}
                        className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                          selectedMethod === "va_sumut"
                            ? "bg-white border-[#1a3a34] shadow-sm"
                            : "bg-white/60 border-[#e8e2d9] hover:border-stone-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs border border-amber-200 font-cinzel">
                            BS
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-[#1a3a34]">Virtual Account Bank Sumut</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                                Bank Daerah Sumut
                              </span>
                            </div>
                            <span className="text-[10.5px] text-[#575e5b] block">
                              Verifikasi Otomatis 24 Jam Tanpa Bukti Transfer
                            </span>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="expPaymentMethod"
                          checked={selectedMethod === "va_sumut"}
                          onChange={() => setSelectedMethod("va_sumut")}
                          className="accent-[#1a3a34]"
                        />
                      </label>

                      <label
                        onClick={() => setSelectedMethod("va_mandiri")}
                        className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                          selectedMethod === "va_mandiri"
                            ? "bg-white border-[#1a3a34] shadow-sm"
                            : "bg-white/60 border-[#e8e2d9] hover:border-stone-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-xs border border-blue-200">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-xs text-[#1a3a34] block">
                              Virtual Account Bank Mandiri
                            </span>
                            <span className="text-[10.5px] text-[#575e5b] block">
                              Livin&apos; by Mandiri & ATM Mandiri
                            </span>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="expPaymentMethod"
                          checked={selectedMethod === "va_mandiri"}
                          onChange={() => setSelectedMethod("va_mandiri")}
                          className="accent-[#1a3a34]"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 flex items-start gap-2.5 text-[11px] leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Jaminan Keamanan Escrow BPODT:</strong>
                      Dana Anda ditampung di rekening bersama resmi SINDAR TOBA dan baru diteruskan ke pemandu/mitra setelah sesi selesai.
                    </div>
                  </div>

                  <button
                    onClick={() => setPaymentStep("pay")}
                    className="w-full py-3.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Lanjutkan Pembayaran (Rp {totalCost.toLocaleString("id-ID")})</span>
                    <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                  </button>
                </div>
              )}

              {/* STEP 2: INSTRUKSI PEMBAYARAN & TESTING SIMULATOR */}
              {paymentStep === "pay" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setPaymentStep("method")}
                      className="text-xs text-[#575e5b] hover:text-[#1a3a34] flex items-center gap-1 font-semibold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Ganti Metode</span>
                    </button>
                    <div className="flex items-center gap-1 text-[11px] text-amber-700 font-mono font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>Sisa Waktu: 14:48</span>
                    </div>
                  </div>

                  {selectedMethod === "qris" ? (
                    <div className="bg-white rounded-3xl p-5 border border-[#e8e2d9] shadow-sm text-center space-y-3">
                      <div className="flex items-center justify-center gap-1.5 pb-2 border-b border-[#e8e2d9]">
                        <span className="font-bold text-xs tracking-widest text-[#1a3a34]">QRIS DINAMIS</span>
                        <span className="text-[10px] text-[#575e5b]">• Standar Pembayaran Nasional</span>
                      </div>

                      <div className="w-48 h-48 mx-auto bg-stone-50 rounded-2xl p-3 border-2 border-dashed border-[#1a3a34] flex flex-col items-center justify-center relative shadow-inner">
                        <QrCode className="w-36 h-36 text-[#1a3a34]" />
                        <span className="text-[9px] font-mono text-[#575e5b] mt-1">SINDAR TOBA - PENGALAMAN</span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[11px] text-[#575e5b]">Total Tagihan Sesi:</span>
                        <div className="font-cinzel text-2xl font-bold text-[#1a3a34]">
                          Rp {totalCost.toLocaleString("id-ID")}
                        </div>
                      </div>

                      <p className="text-[11px] text-[#575e5b] leading-relaxed">
                        Buka aplikasi GoPay, OVO, Dana, ShopeePay, atau mobile banking Anda dan pindai kode QR di atas.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl p-5 border border-[#e8e2d9] shadow-sm space-y-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-[#e8e2d9]">
                        <span className="font-bold text-xs text-[#1a3a34]">
                          {selectedMethod === "va_sumut" ? "Bank Sumut Virtual Account" : "Bank Mandiri Virtual Account"}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Otomatis Terverifikasi
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] text-[#575e5b] block">Nomor Virtual Account:</span>
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9]">
                          <span className="font-mono text-base font-bold text-[#1a3a34] tracking-wider">
                            {selectedMethod === "va_sumut" ? "102 889 0481 9281" : "8890 8123 4567 8901"}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(selectedMethod === "va_sumut" ? "10288904819281" : "8890812345678901");
                              setVaCopied(true);
                              setTimeout(() => setVaCopied(false), 2000);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white border border-[#e8e2d9] text-[11px] font-semibold text-[#1a3a34] hover:bg-slate-50 flex items-center gap-1"
                          >
                            {vaCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{vaCopied ? "Tersalin!" : "Salin"}</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#575e5b]">Total Tagihan:</span>
                        <span className="font-bold text-[#1a3a34] font-cinzel text-base">
                          Rp {totalCost.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-[#1a3a34] space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                        Fitur Pengujian & Demo Berjalan:
                      </span>
                    </div>
                    <p className="text-[11.5px] text-[#575e5b] leading-relaxed">
                      Klik tombol di bawah ini untuk mensimulasikan konfirmasi pembayaran instan dari bank saat demo berlangsung.
                    </p>

                    <button
                      onClick={handleConfirmPayment}
                      disabled={isProcessingPayment}
                      className="w-full py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Memverifikasi Gateway Bank...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                          <span>Simulasikan Pembayaran Sukses (Testing Mode)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: E-TIKET PENGALAMAN TERBIT */}
              {paymentStep === "success" && issuedTicket && (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-md animate-bounce">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">
                      Reservasi Selesai & Lunas
                    </span>
                    <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34]">
                      Pendaftaran Sesi Berhasil!
                    </h3>
                    <p className="text-xs text-[#575e5b] mt-1">
                      E-Tiket resmi telah diterbitkan dan tersimpan di database Supabase Cloud.
                    </p>
                  </div>

                  <div className="p-4 rounded-3xl bg-white border border-[#e8e2d9] shadow-sm text-left space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#e8e2d9]">
                      <div>
                        <span className="text-[9.5px] text-[#575e5b] uppercase tracking-wider block">Kode Booking</span>
                        <span className="font-mono text-sm font-bold text-[#b8653a]">
                          {issuedTicket.bookingCode}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {issuedTicket.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="font-semibold text-sm text-[#1a3a34]">
                        {issuedTicket.destination}
                      </div>
                      <div className="text-[#575e5b] text-[11.5px]">
                        Jadwal: <strong>{issuedTicket.date}</strong> ({issuedTicket.visitors})
                      </div>
                      <div className="text-[#1a3a34] font-bold text-xs pt-1">
                        Total Biaya: {issuedTicket.totalPaid} ({issuedTicket.paymentChannel})
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] flex items-center justify-between text-[11px]">
                      <span className="text-[#575e5b]">Status Dana di Escrow:</span>
                      <span className="font-bold text-emerald-800 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-emerald-700" /> Diamankan BPODT
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                      href="/dashboard"
                      className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>Buka E-Tiket di Dashboard Saya</span>
                      <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                    </Link>

                    <button
                      onClick={() => setIsPaymentModalOpen(false)}
                      className="text-xs text-[#575e5b] hover:text-[#1a3a34] pt-1 block mx-auto"
                    >
                      Selesai & Tutup Jendela Ini
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}