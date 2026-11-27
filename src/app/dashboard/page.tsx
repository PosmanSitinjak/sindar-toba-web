"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { clearActiveUserSession } from "@/lib/auth";
import { generateQrDataUrl } from "@/lib/qris";
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
  Gift,
  Copy,
  Check,
  Share2,
  Wallet,
  ArrowUpRight,
  DollarSign,
  Users,
  Building,
  AlertCircle,
  Sparkles,
  ArrowRight,
  X,
  LogOut,
} from "lucide-react";

export default function DashboardWisatawanPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tiket");
  const [showQrModal, setShowQrModal] = useState<string | null>(null);
  const [activeQrDataUrl, setActiveQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (showQrModal) {
      generateQrDataUrl(showQrModal, 320).then((url) => setActiveQrDataUrl(url));
    } else {
      setActiveQrDataUrl("");
    }
  }, [showQrModal]);

  // Referral & Commission States (Reset to 0 for fresh new user)
  const [referralCode, setReferralCode] = useState("TOBA-WISATA");
  const [referralBalance, setReferralBalance] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({
    method: "BCA",
    accountNumber: "",
    accountName: "",
    amount: "50000",
  });

  const [referralList, setReferralList] = useState<any[]>([]);

  // Sync profile & referral from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("sindar_user_name");
      if (storedName) {
        const slug = storedName.toUpperCase().replace(/\s+/g, "");
        setReferralCode(`TOBA-${slug.slice(0, 10)}`);
      }

      const storedBalance = localStorage.getItem("sindar_referral_balance");
      if (storedBalance) {
        setReferralBalance(parseInt(storedBalance, 10));
      }

      const storedReferrals = localStorage.getItem("sindar_referrals_data");
      if (storedReferrals) {
        try {
          const parsed = JSON.parse(storedReferrals);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReferralList((prev) => [...parsed, ...prev]);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [router]);

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(referralCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const getReferralBaseUrl = () =>
    typeof window !== "undefined" ? window.location.origin : "https://sindar-toba-web.vercel.app";

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      const link = `${getReferralBaseUrl()}/daftar?ref=${referralCode}`;
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Horas! Yuk jelajahi keindahan Danau Toba & budaya Batak bersama SINDAR TOBA.\n\nDaftar pakai kode referalku "${referralCode}" untuk dapatkan voucher sambutan spesial & e-tiket resmi kaldera:\n${getReferralBaseUrl()}/daftar?ref=${referralCode}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmt = parseInt(withdrawForm.amount.replace(/\D/g, ""), 10) || 0;
    if (withdrawAmt > referralBalance) {
      alert("Saldo komisi Anda tidak mencukupi untuk penarikan sejumlah ini.");
      return;
    }
    if (withdrawAmt < 50000) {
      alert("Batas penarikan minimum komisi adalah Rp 50.000.");
      return;
    }

    const newBalance = referralBalance - withdrawAmt;
    setReferralBalance(newBalance);
    setTotalWithdrawn((prev) => prev + withdrawAmt);
    if (typeof window !== "undefined") {
      localStorage.setItem("sindar_referral_balance", newBalance.toString());
    }
    setWithdrawSuccess(true);
  };

  const handleLogout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    clearActiveUserSession();
    router.push("/masuk");
  };

  const [userProfile, setUserProfile] = useState({
    name: "Wisatawan",
    email: "wisatawan@gmail.com",
    phone: "-",
    membership: "Wisatawan Baru SINDAR TOBA",
    avatar: "",
    memberSince: "November 2026",
  });

  // Default empty tickets for fresh start (no purchases yet)
  const initialTickets: any[] = [];

  const [activeTickets, setActiveTickets] = useState<any[]>(initialTickets);

  // Guard dashboard: wajib masuk akun terlebih dahulu
  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("sindar_role");
      if (role !== "user") {
        router.replace("/masuk");
        return;
      }
      const storedName = localStorage.getItem("sindar_user_name");
      const storedEmail = localStorage.getItem("sindar_user_email");
      const storedPhone = localStorage.getItem("sindar_user_phone");

      if (storedName || storedEmail || storedPhone) {
        setUserProfile((prev) => ({
          ...prev,
          name: storedName || prev.name,
          email: storedEmail || prev.email,
          phone: storedPhone || prev.phone,
        }));
      }

      try {
        const storedTkt = localStorage.getItem("sindar_purchased_tickets");
        if (storedTkt) {
          const parsed = JSON.parse(storedTkt);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setActiveTickets(parsed);
          } else {
            setActiveTickets([]);
          }
        } else {
          setActiveTickets([]);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (isSupabaseConfigured && supabase) {
      supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const mapped = data.map((d: any) => ({
              id: d.id,
              bookingCode: d.booking_code,
              destination: d.destination_name,
              geosite: d.geosite_label || "Geosite Kaldera Toba",
              date: d.visit_date,
              time: d.visit_time || "08:00 - 17:00 WIB",
              visitors: `${d.visitors} Orang`,
              addons: d.addons || [],
              totalPaid: `Rp ${Number(d.total_paid).toLocaleString("id-ID")}`,
              status: d.status || "Lunas (Siap Digunakan)",
              location: d.location || "Danau Toba",
              organizerPhone: d.organizer_phone || "6281234567890",
              organizerName: d.organizer_name || "Pokdarwis Danau Toba",
            }));
            setActiveTickets(mapped);
          } else {
            // Keep empty if supabase has 0 tickets
          }
        });
    }
  }, [router]);

  const [savedItineraries, setSavedItineraries] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // Sync saved itineraries & wishlist from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedItin = localStorage.getItem("sindar_itineraries");
        if (storedItin) {
          const parsed = JSON.parse(storedItin);
          if (Array.isArray(parsed)) setSavedItineraries(parsed);
        } else {
          setSavedItineraries([]);
        }

        const storedWish = localStorage.getItem("sindar_wishlist");
        if (storedWish) {
          const parsed = JSON.parse(storedWish);
          if (Array.isArray(parsed)) setWishlistItems(parsed);
        } else {
          setWishlistItems([]);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Header Card (Responsive) */}
        <section className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-sm mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1a3a34] text-[#c29d59] border-2 border-[#c29d59] shadow-md flex items-center justify-center font-cinzel text-xl sm:text-2xl font-bold">
                  {userProfile.name
                    ? userProfile.name
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w: string) => w[0])
                        .join("")
                        .toUpperCase()
                    : "W"}
                </div>
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
                  <span className="hidden sm:inline">•</span>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#b8653a] hover:text-[#914622] transition-colors"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Keluar / Ganti Akun</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stat Counter Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full md:w-auto">
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
              <div
                onClick={() => setActiveTab("referral")}
                className="px-3 sm:px-4 py-2 rounded-2xl bg-amber-50/70 border border-[#c29d59]/50 text-center cursor-pointer hover:bg-amber-100/60 transition-colors"
                title="Buka Tab Referral & Komisi"
              >
                <span className="font-cinzel text-base sm:text-lg font-bold text-[#b8653a] block">
                  Rp {(referralBalance / 1000).toFixed(0)}rb
                </span>
                <span className="text-[9.5px] sm:text-[10px] text-[#b8653a] uppercase font-semibold tracking-wider flex items-center justify-center gap-1">
                  <Gift className="w-2.5 h-2.5" />
                  <span>Komisi</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 border-b border-[#e8e2d9] pb-px mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: "tiket", label: "Tiket & Pesanan", icon: Ticket },
            { id: "referral", label: "Referral & Komisi", icon: Gift },
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
                {tab.id === "referral" && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#b8653a] text-white text-[9.5px] font-bold">
                    Baru
                  </span>
                )}
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

            {activeTickets.length === 0 ? (
              <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#1a3a34]/10 text-[#c29d59] mx-auto flex items-center justify-center">
                  <Ticket className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34]">
                    Belum Ada Tiket Dipesan
                  </h3>
                  <p className="text-xs sm:text-sm text-[#575e5b] max-w-md mx-auto mt-1">
                    Anda belum memiliki tiket wisata aktif. Jelajahi 16 Geosite resmi UNESCO Kaldera Toba dan pesan tiket pengalaman budaya Anda sekarang.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/jelajahi"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <span>Mulai Jelajahi Destinasi</span>
                    <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                  </Link>
                </div>
              </div>
            ) : (
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
                        <span
                          className={`px-2.5 py-0.5 rounded-full border text-[10.5px] font-semibold ${
                            tkt.status?.toLowerCase().includes("menunggu")
                              ? "bg-amber-50 border-amber-200 text-amber-800"
                              : tkt.status?.toLowerCase().includes("selesai") ||
                                (tkt.status?.toLowerCase().includes("digunakan") && !tkt.status?.toLowerCase().includes("lunas"))
                              ? "bg-stone-100 border-stone-300 text-stone-600 font-bold"
                              : "bg-emerald-50 border-emerald-200 text-emerald-800"
                          }`}
                        >
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
                          {tkt.addons.map((add: string, idx: number) => (
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
            )}
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

            {savedItineraries.length === 0 ? (
              <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#1a3a34]/10 text-[#c29d59] mx-auto flex items-center justify-center">
                  <Compass className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34]">
                    Belum Ada Rencana Perjalanan
                  </h3>
                  <p className="text-xs sm:text-sm text-[#575e5b] max-w-md mx-auto mt-1">
                    Anda belum membuat itinerary. Susun rute liburan kaldera Danau Toba impian Anda dengan estimasi biaya otomatis.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/rencana-perjalanan"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <span>Mulai Susun Rencana</span>
                    <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                  </Link>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        )}

        {/* TAB 3: WISHLIST */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            <h2 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
              Destinasi & Produk Favorit Anda
            </h2>

            {wishlistItems.length === 0 ? (
              <div className="bg-white border border-[#e8e2d9] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#1a3a34]/10 text-[#c29d59] mx-auto flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34]">
                    Belum Ada Destinasi Favorit
                  </h3>
                  <p className="text-xs sm:text-sm text-[#575e5b] max-w-md mx-auto mt-1">
                    Anda belum menyimpan geosite atau produk kriya lokal ke daftar favorit. Tandai tempat yang ingin Anda kunjungi saat menjelajahi kaldera.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/jelajahi"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <span>Jelajahi Sekarang</span>
                    <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                  </Link>
                </div>
              </div>
            ) : (
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
            )}
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

        {/* TAB 5: REFERRAL & KOMISI */}
        {activeTab === "referral" && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            {/* Header Referral */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-cinzel text-[10.5px] font-bold text-[#c29d59] uppercase tracking-wider block">
                  Program Kemitraan Wisatawan
                </span>
                <h2 className="font-newsreader text-2xl sm:text-3xl font-semibold text-[#1a3a34]">
                  Kode Referral & Komisi Tunai
                </h2>
                <p className="text-[13px] text-[#575e5b] mt-0.5">
                  Ajak teman & keluarga mendaftar akun SINDAR TOBA. Dapatkan <strong>komisi Rp 25.000</strong> per orang langsung ke saldo Anda.
                </p>
              </div>

              <button
                onClick={() => {
                  setWithdrawSuccess(false);
                  setIsWithdrawModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 shrink-0"
              >
                <Wallet className="w-4 h-4 text-[#c29d59]" />
                <span>Cairkan Komisi</span>
              </button>
            </div>

            {/* Main Referral Sharing Hero Card */}
            <div className="bg-gradient-to-br from-[#1a3a34] via-[#122a25] to-[#0c1c18] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#c29d59]/40 relative overflow-hidden">
              {/* Batak Watermark */}
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10 pointer-events-none">
                <Gift className="w-72 h-72 text-[#c29d59]" />
              </div>

              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#c29d59]/50 text-[#c29d59] text-[11px] font-semibold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Komisi Tunai Rp 25.000 / Pendaftaran</span>
                </div>

                <h3 className="font-newsreader text-2xl sm:text-3xl font-light text-white mb-2">
                  Bagikan Cinta Danau Toba,{" "}
                  <span className="italic text-[#c29d59] font-normal">Dapatkan Penghasilan Tambahan</span>
                </h3>

                <p className="text-[13px] sm:text-[14px] text-white/80 leading-relaxed mb-6">
                  Setiap orang yang mendaftar menggunakan kode atau tautan unik Anda akan mendapatkan voucher diskon selamat datang, dan Anda akan menerima komisi tunai yang bisa dicairkan ke rekening bank atau e-wallet.
                </p>

                {/* Referral Code Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {/* Code Card */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/60 uppercase font-semibold tracking-wider block">
                        KODE REFERRAL ANDA
                      </span>
                      <span className="font-mono text-lg font-bold tracking-widest text-[#c29d59]">
                        {referralCode}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-[#1a3a34] hover:bg-[#faf8f5] text-[11px] font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? "Tersalin!" : "Salin"}</span>
                    </button>
                  </div>

                  {/* Share Link Card */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex items-center justify-between">
                    <div className="truncate pr-2">
                      <span className="text-[10px] text-white/60 uppercase font-semibold tracking-wider block">
                        TAUTAN UNDANGAN LANGSUNG
                      </span>
                      <span className="text-xs text-white/90 truncate block">
                        {`${getReferralBaseUrl().replace(/^https?:\/\//, "")}/daftar?ref=${referralCode}`}
                      </span>
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-[#1a3a34] hover:bg-[#faf8f5] text-[11px] font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? "Tersalin!" : "Salin Link"}</span>
                    </button>
                  </div>
                </div>

                {/* Quick Share to WhatsApp Button */}
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-[12.5px] font-semibold uppercase tracking-wider shadow-lg transition-transform active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Bagikan Undangan ke WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Financial Stat Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {/* Card 1: Saldo Siap Tarik */}
              <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider">
                      Saldo Komisi Tersedia
                    </span>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Wallet className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1a3a34]">
                    Rp {referralBalance.toLocaleString("id-ID")}
                  </div>
                  <span className="text-[11.5px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Siap dicairkan ke rekening kapan saja</span>
                  </span>
                </div>
                <button
                  onClick={() => {
                    setWithdrawSuccess(false);
                    setIsWithdrawModalOpen(true);
                  }}
                  className="mt-4 w-full py-2.5 rounded-xl border border-[#1a3a34] text-[#1a3a34] hover:bg-[#1a3a34] hover:text-white text-[11.5px] font-semibold uppercase tracking-wider transition-all text-center"
                >
                  Tarik Dana Sekarang
                </button>
              </div>

              {/* Card 2: Total Ditarik */}
              <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider">
                      Total Telah Dicairkan
                    </span>
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#575e5b]">
                    Rp {totalWithdrawn.toLocaleString("id-ID")}
                  </div>
                  <span className="text-[11.5px] text-[#575e5b] mt-1 block">
                    Semua penarikan berhasil dikirim
                  </span>
                </div>
                <div className="mt-4 py-2 px-3 bg-[#faf8f5] rounded-xl text-[11px] text-[#575e5b] border border-[#e8e2d9] text-center">
                  BCA • Mandiri • BRI • GoPay • DANA
                </div>
              </div>

              {/* Card 3: Total Teman */}
              <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider">
                      Teman Berhasil Bergabung
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1a3a34]">
                    {referralList.length} Orang
                  </div>
                  <span className="text-[11.5px] text-[#575e5b] mt-1 block">
                    Semua akun aktif terverifikasi
                  </span>
                </div>
                <div className="mt-4 py-2 px-3 bg-emerald-50 text-emerald-800 rounded-xl text-[11px] font-semibold text-center border border-emerald-200">
                  + Rp 25.000 / undangan baru
                </div>
              </div>
            </div>

            {/* How It Works Explainer */}
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-6 sm:p-8 shadow-sm">
              <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#1a3a34] uppercase tracking-wider mb-5 text-center sm:text-left">
                Cara Kerja Sistem Referral SINDAR TOBA
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9]">
                  <div className="w-9 h-9 rounded-full bg-[#1a3a34] text-[#c29d59] font-cinzel font-bold text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-[#1a3a34] mb-1">
                      Bagikan Kode Anda
                    </h5>
                    <p className="text-[12px] text-[#575e5b] leading-relaxed">
                      Kirimkan kode referral atau tautan pendaftaran ke teman, grup keluarga, atau media sosial Anda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9]">
                  <div className="w-9 h-9 rounded-full bg-[#1a3a34] text-[#c29d59] font-cinzel font-bold text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-[#1a3a34] mb-1">
                      Teman Mendaftar Akun
                    </h5>
                    <p className="text-[12px] text-[#575e5b] leading-relaxed">
                      Teman Anda memasukkan kode referral saat membuat akun wisatawan dan langsung menerima diskon sambutan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9]">
                  <div className="w-9 h-9 rounded-full bg-[#1a3a34] text-[#c29d59] font-cinzel font-bold text-sm flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-[#1a3a34] mb-1">
                      Komisi Rp 25.000 Cair
                    </h5>
                    <p className="text-[12px] text-[#575e5b] leading-relaxed">
                      Komisi tunai Rp 25.000 per orang langsung masuk ke saldo Anda dan dapat ditarik ke rekening bank atau e-wallet.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Invitee History Table */}
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e8e2d9] mb-4 gap-2">
                <div>
                  <h4 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                    Riwayat Teman yang Diajak
                  </h4>
                  <p className="text-[12.5px] text-[#575e5b]">
                    Daftar teman yang mendaftar menggunakan kode referral Anda beserta rincian komisi.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold self-start sm:self-auto">
                  Total {referralList.length} Undangan
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[12.5px]">
                  <thead>
                    <tr className="border-b border-[#e8e2d9] text-[10.5px] font-bold text-[#575e5b] uppercase tracking-wider">
                      <th className="py-3 px-3">Nama Pengguna</th>
                      <th className="py-3 px-3">Tanggal Bergabung</th>
                      <th className="py-3 px-3">Aktivitas</th>
                      <th className="py-3 px-3">Komisi Diterima</th>
                      <th className="py-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e2d9]/60">
                    {referralList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#faf8f5] transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-[#1a3a34]">{item.name}</div>
                          <div className="text-[10.5px] text-[#575e5b]">ID: {item.id}</div>
                        </td>
                        <td className="py-3.5 px-3 text-[#575e5b] whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="py-3.5 px-3 text-[#1a3a34]">
                          {item.reward}
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-emerald-700 whitespace-nowrap">
                          + Rp {item.commission.toLocaleString("id-ID")}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] font-semibold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{item.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Penarikan Komisi (Withdraw Modal) */}
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="absolute right-5 top-5 p-1.5 rounded-full hover:bg-gray-100 text-[#575e5b]"
              >
                <X className="w-5 h-5" />
              </button>

              {!withdrawSuccess ? (
                <>
                  <div className="text-center mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#b8653a] mx-auto mb-2 flex items-center justify-center border border-amber-200">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <span className="font-cinzel text-[10.5px] font-bold text-[#c29d59] uppercase tracking-wider block">
                      Pencairan Saldo Komisi
                    </span>
                    <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34]">
                      Tarik Dana Referral
                    </h3>
                    <p className="text-[12px] text-[#575e5b] mt-1">
                      Saldo Anda: <strong className="text-emerald-700 font-bold">Rp {referralBalance.toLocaleString("id-ID")}</strong>
                    </p>
                  </div>

                  <form onSubmit={handleWithdrawSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                        Metode Pencairan (Bank / E-Wallet)
                      </label>
                      <select
                        value={withdrawForm.method}
                        onChange={(e) => setWithdrawForm({ ...withdrawForm, method: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] font-medium text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                      >
                        <option value="BCA">Bank BCA</option>
                        <option value="Mandiri">Bank Mandiri</option>
                        <option value="BRI">Bank BRI</option>
                        <option value="BNI">Bank BNI</option>
                        <option value="Bank Sumut">Bank Sumut</option>
                        <option value="GoPay">GoPay</option>
                        <option value="OVO">OVO</option>
                        <option value="DANA">DANA</option>
                        <option value="ShopeePay">ShopeePay</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                        Nomor Rekening / Nomor HP E-Wallet
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 8271039821 atau 08123456789"
                        value={withdrawForm.accountNumber}
                        onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                        Nama Pemilik Rekening / Akun
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama lengkap sesuai buku tabungan"
                        value={withdrawForm.accountName}
                        onChange={(e) => setWithdrawForm({ ...withdrawForm, accountName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block">
                          Jumlah Penarikan (Rp)
                        </label>
                        <button
                          type="button"
                          onClick={() => setWithdrawForm({ ...withdrawForm, amount: referralBalance.toString() })}
                          className="text-[10.5px] font-bold text-[#b8653a] hover:underline"
                        >
                          Tarik Semua
                        </button>
                      </div>
                      <input
                        type="number"
                        min={50000}
                        max={referralBalance}
                        required
                        value={withdrawForm.amount}
                        onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] font-bold text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                      />
                      <span className="text-[10px] text-[#575e5b] mt-1 block">
                        Min. penarikan Rp 50.000 • Bebas biaya admin
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-colors shadow-md mt-4"
                    >
                      Konfirmasi Pencairan Dana
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto mb-3 flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34] mb-1">
                    Permintaan Berhasil Dikirim!
                  </h3>
                  <p className="text-[13px] text-[#575e5b] max-w-sm mx-auto mb-5 leading-relaxed">
                    Dana sebesar <strong>Rp {parseInt(withdrawForm.amount, 10).toLocaleString("id-ID")}</strong> sedang diproses ke {withdrawForm.method} ({withdrawForm.accountNumber}) atas nama {withdrawForm.accountName}. Estimasi dana masuk: 1x24 jam.
                  </p>
                  <button
                    onClick={() => setIsWithdrawModalOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#1a3a34] text-white text-[12px] font-semibold uppercase tracking-wider"
                  >
                    Tutup
                  </button>
                </div>
              )}
            </div>
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
        {showQrModal && (() => {
          const matchedTicket = activeTickets.find((t) => t.bookingCode === showQrModal);
          const rawStatus = matchedTicket?.status?.toLowerCase() || "";
          const isUsed =
            rawStatus.includes("sudah digunakan") ||
            rawStatus.includes("telah digunakan") ||
            (rawStatus.includes("selesai") && !rawStatus.includes("siap") && !rawStatus.includes("lunas"));

          return (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-xs sm:max-w-sm w-full p-6 sm:p-8 text-center shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                <span className="font-cinzel text-[10.5px] font-bold text-[#c29d59] uppercase tracking-wider block mb-1">
                  Verifikasi Geosite Resmi
                </span>
                <h3 className="font-newsreader text-xl sm:text-2xl font-bold text-[#1a3a34] mb-1.5">
                  QR Code E-Tiket
                </h3>
                <p className="text-[11.5px] sm:text-[12px] text-[#575e5b] mb-3">
                  {isUsed
                    ? "Tiket ini telah divalidasi dan digunakan di pintu masuk geosite."
                    : "Scan kode ini di pintu masuk geosite untuk konfirmasi kedatangan."}
                </p>

                {/* Status Validasi Tiket */}
                <div className="mb-4">
                  {isUsed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-bold border border-stone-300">
                      ✓ Telah Digunakan di Loket
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      E-Tiket Aktif • Siap Di-scan
                    </span>
                  )}
                </div>

                {/* Real Scannable E-Tiket Barcode with Used Overlay if scanned */}
                <div className="relative w-48 h-48 sm:w-52 sm:h-52 mx-auto bg-white p-3 rounded-2xl border-2 border-[#1a3a34] flex items-center justify-center shadow-inner mb-4">
                  {activeQrDataUrl ? (
                    <img
                      src={activeQrDataUrl}
                      alt={`QR Code E-Tiket ${showQrModal}`}
                      className={`w-full h-full object-contain transition-opacity ${
                        isUsed ? "opacity-25" : ""
                      }`}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5 text-stone-400">
                      <QrCode className="w-16 h-16 animate-pulse" />
                      <span className="text-[11px]">Memuat Barcode...</span>
                    </div>
                  )}
                  {isUsed && (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <div className="bg-stone-900/95 border border-stone-500 text-stone-100 rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider rotate-[-12deg] shadow-2xl">
                        Sudah Digunakan
                      </div>
                    </div>
                  )}
                </div>

                <div className="font-mono text-xs font-bold text-[#1a3a34] bg-[#faf8f5] py-2 px-3 rounded-lg border border-[#e8e2d9] mb-3">
                  {showQrModal}
                </div>

                {activeQrDataUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.download = `E-Tiket-${showQrModal}.png`;
                      link.href = activeQrDataUrl;
                      link.click();
                    }}
                    className="w-full mb-3 py-2 px-3 rounded-full border border-[#e8e2d9] hover:bg-stone-50 text-[11px] font-semibold text-[#1a3a34] flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-[#c29d59]" />
                    <span>Unduh Gambar Barcode</span>
                  </button>
                )}

                <button
                  onClick={() => setShowQrModal(null)}
                  className="w-full py-2.5 sm:py-3 rounded-full bg-[#1a3a34] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[#122a25] transition-colors"
                >
                  Tutup QR Code
                </button>
              </div>
            </div>
          );
        })()}
      </main>

      <Footer />
    </div>
  );
}