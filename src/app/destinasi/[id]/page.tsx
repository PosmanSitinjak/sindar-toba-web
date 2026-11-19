"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  MapPin,
  Star,
  Share2,
  Heart,
  Calendar,
  Users,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ThumbsUp,
  MessageSquare,
  Plus,
  LogIn,
  Check,
  X,
  AlertCircle,
  ArrowLeft,
  CreditCard,
  QrCode,
  Building2,
  Copy,
  Lock,
  RefreshCw,
  ExternalLink,
  Clock,
  Wallet,
} from "lucide-react";

// Data catalog destinasi
const destinationsData: { [key: string]: any } = {
  "bukit-holbung": {
    id: "bukit-holbung",
    title: "Bukit Holbung Samosir (Bukit Teletubbies Kaldera)",
    badge: "Geosite UNESCO Resmi #04",
    location: "Harian Boho, Pulau Samosir",
    basePrice: 15000,
    priceUnit: "/pengunjung",
    rating: 4.9,
    baseReviews: 1240,
    photos: [
      "/images/destinations/bukit-holbung.jpg",
      "/images/destinations/bukit-tarabunga.jpg",
    ],
    aboutTitle: "Keajaiban Savana Kaldera di Jantung Samosir",
    aboutP1:
      "Bukit Holbung adalah salah satu situs bentang alam paling menakjubkan di kawasan Danau Toba. Berdiri di atas perbukitan hijau bergelombang yang telah berusia ratusan ribu tahun sejak letusan supervulkan Toba, bukit ini menyajikan sudut pandang 360 derajat ke perairan biru danau dan punggungan tebing caldera.",
    aboutP2:
      "Dikenal secara populer sebagai 'Bukit Teletubbies' karena lekukan rumput savananya yang lembut, tempat ini menjadi saksi sejarah migrasi suku Batak kuno yang menyeberang dari daratan utama Sumatera menuju pulau Samosir.",
    manager: "Dikelola oleh Pokdarwis Holbung Harian Boho",
  },
  "tenun-ulos-suhi-suhi": {
    id: "tenun-ulos-suhi-suhi",
    title: "Kampung Penenun Ulos Huta Raja Suhi-suhi",
    badge: "Cagar Kriya Budaya UNESCO",
    location: "Lumban Suhi-suhi Toruan, Pangururan, Samosir",
    basePrice: 20000,
    priceUnit: "/pengunjung",
    rating: 4.9,
    baseReviews: 620,
    photos: [
      "/images/destinations/tenun-ulos.jpg",
      "/images/destinations/desa-tomok.jpg",
    ],
    aboutTitle: "Warisan Luhur Tenun Gedog Rumah Bolon Huta Raja",
    aboutP1:
      "Desa Huta Raja di Lumban Suhi-suhi Toruan adalah sentra pelestarian tenun kain Ulos Batak tertua yang masih mempertahankan teknik gedog tradisional tanpa mesin. Di pelataran deretan Rumah Bolon yang berjejer menghadap Danau Toba, para Inang penenun merajut benang dengan pewarna alami dari tanaman hutan kaldera.",
    aboutP2:
      "Wisatawan dapat belajar langsung filosofi ragam motif Ulos seperti Sadum, Ragi Hotang, dan Harungguan, serta membeli karya tenun otentik langsung dari tangan pengrajin tanpa perantara.",
    manager: "Dikelola oleh Komunitas Penenun Inang Huta Raja",
  },
  "desa-tomok": {
    id: "desa-tomok",
    title: "Desa Wisata Tomok & Makam Batu Raja Sidabutar",
    badge: "Situs Arkeologi Megalitikum",
    location: "Tomok, Simanindo, Pulau Samosir",
    basePrice: 25000,
    priceUnit: "/pengunjung",
    rating: 4.8,
    baseReviews: 890,
    photos: [
      "/images/destinations/desa-tomok.jpg",
      "/images/destinations/sigale-gale.jpg",
    ],
    aboutTitle: "Pusat Peradaban Megalitikum dan Sejarah Dinasti Batak",
    aboutP1:
      "Desa Tomok adalah gerbang utama mengenal sejarah awal peradaban masyarakat Batak Toba di Pulau Samosir. Di desa ini terdapat sarkofagus batu monolithic berusia lebih dari 450 tahun milik Raja Ompu Soribuntu Sidabutar beserta patung tari sakral Sigale-gale.",
    aboutP2:
      "Setiap sudut desa dipenuhi ukiran Gorga Batak bercorak merah, hitam, dan putih, menceritakan kosmologi penciptaan Benua Atas, Benua Tengah, dan Benua Bawah.",
    manager: "Dikelola oleh Lembaga Adat Kenegerian Tomok & Dinas Kebudayaan",
  },
  "lembah-bakkara": {
    id: "lembah-bakkara",
    title: "Lembah Bakkara & Mata Air Keramat Aek Sipangolu",
    badge: "Geosite Geopark Kaldera",
    location: "Bakti Raja, Humbang Hasundutan",
    basePrice: 20000,
    priceUnit: "/pengunjung",
    rating: 4.9,
    baseReviews: 520,
    photos: [
      "/images/destinations/lembah-bakkara.jpg",
      "/images/destinations/bukit-holbung.jpg",
    ],
    aboutTitle: "Tanah Kelahiran Raja-Raja di Dasar Kaldera Toba",
    aboutP1:
      "Lembah Bakkara diapit tebing-tebing raksasa kaldera yang menjulang tinggi hingga 400 meter. Di lembah subur yang dialiri dua sungai purba ini lahir Pahlawan Nasional Raja Sisingamangaraja XII.",
    aboutP2:
      "Terdapat mata air jernih Aek Sipangolu yang keluar dari celah batu padas dan diyakini membawa khasiat kesegaran alami bagi siapa pun yang membasuh diri.",
    manager: "Dikelola oleh Pokdarwis Bakkara & Disparpora Humbahas",
  },
  "bukit-tarabunga": {
    id: "bukit-tarabunga",
    title: "Bukit Tarabunga Balige (Panorama Terasering Danau)",
    badge: "Geosite UNESCO Resmi #13",
    location: "Tampahan, Balige, Kabupaten Toba",
    basePrice: 10000,
    priceUnit: "/pengunjung",
    rating: 4.8,
    baseReviews: 410,
    photos: [
      "/images/destinations/bukit-tarabunga.jpg",
      "/images/destinations/bukit-holbung.jpg",
    ],
    aboutTitle: "Sudut Pandang Sunset dan Terasering Sawah Kaldera Balige",
    aboutP1:
      "Bukit Tarabunga menyajikan panorama lengkung teluk Danau Toba bagian selatan yang berpadu dengan petak-petak persawahan terasering hijau. Dari ketinggian 1.150 mdpl, pengunjung dapat menyaksikan perahu nelayan tradisional dan pemandangan matahari terbenam yang memantul di permukaan danau.",
    aboutP2:
      "Terletak hanya 5 kilometer dari pusat kota Balige dan Museum Batak TB Silalahi Center, bukit ini menjadi spot favorit para fotografer lanskap dan penikmat ketenangan alam pedesaan Batak.",
    manager: "Dikelola oleh Komunitas Sadar Wisata Tarabunga Tampahan",
  },
  "sipiso-piso": {
    id: "sipiso-piso",
    name: "Air Terjun Sipiso-piso & Tongging",
    title: "Air Terjun Sipiso-piso & Teluk Tongging",
    badge: "Geosite UNESCO Resmi #01",
    location: "Merek, Kabupaten Karo",
    basePrice: 10000,
    priceUnit: "/pengunjung",
    rating: 4.9,
    baseReviews: 1850,
    photos: [
      "/images/destinations/sipiso-piso.jpg",
      "/images/destinations/bukit-tarabunga.jpg",
    ],
    aboutTitle: "Kemegahan Air Terjun Vertikal di Bibir Kaldera Utara",
    aboutP1:
      "Sipiso-piso adalah air terjun vertikal tunggal setinggi 120 meter yang jatuh dari aliran sungai bawah tanah di tepi plato Karo menuju dasar kaldera Danau Toba. Aliran airnya membelah batuan piroklastik hasil letusan dahsyat gunung api purba ratusan ribu tahun lalu.",
    aboutP2:
      "Dari gardu pandang, pengunjung dapat menikmati panorama teluk Tongging yang memanjang hingga ke perbatasan Samosir dan Simalungun.",
    manager: "Dikelola oleh Dinas Kebudayaan & Pariwisata Kab. Karo",
  },
  "menara-tele": {
    id: "menara-tele",
    title: "Menara Pandang Tele (Punggungan Barat Kaldera)",
    badge: "Geosite UNESCO Resmi #03",
    location: "Harian Boho, Kabupaten Samosir",
    basePrice: 15000,
    priceUnit: "/pengunjung",
    rating: 4.8,
    baseReviews: 1420,
    photos: [
      "/images/destinations/bukit-holbung.jpg",
      "/images/destinations/bukit-tarabunga.jpg",
    ],
    aboutTitle: "Gardu Pandang 360 Derajat di Punggung Kaldera Toba",
    aboutP1:
      "Menara Pandang Tele berdiri di ketinggian 1.450 mdpl pada lereng barat kaldera. Dari puncak menara 4 lantai ini terlihat seluruh tubuh Pulau Samosir yang dikepung perairan biru Danau Toba serta perbukitan pinus yang megah.",
    aboutP2:
      "Jalur darat Tele merupakan rute bersejarah satu-satunya yang menyambungkan daratan utama Pulau Sumatera ke Samosir melalui jembatan terusan Tano Ponggol.",
    manager: "Dikelola oleh Dinas Pariwisata Kab. Samosir",
  },
  "kopi-lintong-roastery": {
    id: "kopi-lintong-roastery",
    title: "Sentra Kopi Arabika Lintong & Cupping Room",
    badge: "Indikasi Geografis Nasional",
    location: "Lintongnihuta, Humbang Hasundutan",
    basePrice: 45000,
    priceUnit: "/porsi cupping",
    rating: 4.9,
    baseReviews: 310,
    photos: [
      "/images/destinations/kopi-lintong.jpg",
      "/images/destinations/lembah-bakkara.jpg",
    ],
    aboutTitle: "Cita Rasa Kopi Arabika Specialty Dataran Tinggi Kaldera",
    aboutP1:
      "Kopi Lintong ditanam di dataran tinggi vulkanik berketinggian 1.400 - 1.600 mdpl di selatan Danau Toba. Diproses menggunakan metode khas 'Giling Basah' (Wet-Hulled) yang menghasilkan karakter kopi berat (full body), keasaman seimbang, dan aroma rempah-rempah tanah vulkanik yang mendunia.",
    aboutP2:
      "Pengunjung dapat mengikuti tur kebun kopi organik, belajar memilah biji merah matang, dan mencicipi cupping room profesional bersama roaster lokal.",
    manager: "Dikelola oleh Koperasi Petani Kopi Organik Lintong",
  },
};

export default function DetailDestinasiPage({ params }: { params?: { id?: string } }) {
  const destId = params?.id || "bukit-holbung";
  const [currentDest, setCurrentDest] = useState(
    destinationsData[destId] || destinationsData["bukit-holbung"]
  );

  const [activeTab, setActiveTab] = useState("tentang");
  const [ticketCount, setTicketCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState("2026-11-20");
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    ulos: false,
    guide: true,
  });

  // User Authentication State
  const [authRole, setAuthRole] = useState<"guest" | "user" | "mitra">("guest");
  const [userName, setUserName] = useState<string>("Christofer Sitinjak");

  useEffect(() => {
    // If available in Supabase, sync data
    if (isSupabaseConfigured && supabase && destId) {
      supabase
        .from("destinations")
        .select("*")
        .eq("id", destId)
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            setCurrentDest((prev: any) => ({
              ...prev,
              id: data.id,
              title: data.title || prev.title,
              basePrice: data.price !== null ? Number(data.price) : prev.basePrice,
              priceUnit: data.price_unit ? `/${data.price_unit}` : prev.priceUnit,
              location: data.subregion || `${data.regency}, Danau Toba`,
              badge: data.category || prev.badge,
              photos: data.image ? [data.image, ...(prev.photos || [])] : prev.photos,
              aboutP1: data.description || prev.aboutP1,
            }));
          }
        });
    }

    if (typeof window !== "undefined") {
      const role = localStorage.getItem("sindar_role") as "user" | "mitra" | null;
      if (role === "user" || role === "mitra") {
        setAuthRole(role);
      }
      const savedName = localStorage.getItem("sindar_user_name");
      if (savedName) {
        setUserName(savedName);
      }

      // Load persisted reviews if available
      try {
        const stored = localStorage.getItem("sindar_reviews_holbung");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReviews(parsed);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Review List State
  const [reviews, setReviews] = useState([
    {
      id: "rev-1",
      author: "Bagus Pratama",
      tripType: "Bersama Keluarga",
      date: "Oktober 2026",
      rating: 5,
      comment:
        "Pemandangannya luar biasa magis saat pagi hari sekitar jam 06.30! Kabut Danau Toba terlihat seperti kapas di bawah bukit. Sangat recommended menyewa pemandu lokal dari Sindar Toba agar diceritakan sejarah Bukit Holbung.",
      verified: true,
      likes: 24,
    },
    {
      id: "rev-2",
      author: "Sarah Jenkins",
      tripType: "Solo Traveler",
      date: "September 2026",
      rating: 5,
      comment:
        "Breathtaking views of Lake Toba! The hike is gentle and suitable for beginners. Wearing comfortable shoes is a must. The local community at Harian Boho is very welcoming and hospitable.",
      verified: true,
      likes: 18,
    },
    {
      id: "rev-3",
      author: "Rian Sitompul",
      tripType: "Grup Teman",
      date: "Agustus 2026",
      rating: 5,
      comment:
        "Sewa kain ulos di pos tiket untuk foto-foto sangat worth it! Tarif terjangkau dan hasilnya estetik sekali berlatar danau dan bukit savana hijau.",
      verified: true,
      likes: 12,
    },
  ]);

  // Review Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newTripType, setNewTripType] = useState("Bersama Keluarga");
  const [newComment, setNewComment] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [likedReviews, setLikedReviews] = useState<{ [id: string]: boolean }>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      showToast("Mohon tuliskan ulasan pengalaman Anda!");
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      author: userName || "Christofer Sitinjak",
      tripType: newTripType,
      date: "Baru saja",
      rating: newRating,
      comment: newComment.trim(),
      verified: true,
      likes: 0,
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("sindar_reviews_holbung", JSON.stringify(updated));
    }

    setNewComment("");
    setIsFormOpen(false);
    showToast("Terima kasih! Ulasan & rating bintang Anda berhasil diterbitkan.");
  };

  const handleLike = (id: string) => {
    const isLiked = likedReviews[id];
    setLikedReviews({ ...likedReviews, [id]: !isLiked });
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + (isLiked ? -1 : 1) } : r))
    );
  };

  const basePrice = currentDest.basePrice;
  const ulosPrice = 25000;
  const guidePrice = 75000;

  const totalPrice =
    basePrice * ticketCount +
    (addons.ulos ? ulosPrice * ticketCount : 0) +
    (addons.guide ? guidePrice : 0);

  const photos: string[] = currentDest.photos || [];

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

    const selectedAddonsList: string[] = [];
    if (addons.ulos) selectedAddonsList.push("Sewa Kain Ulos Tradisional");
    if (addons.guide) selectedAddonsList.push("Pemandu Cerita Adat Lokal");

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
      destination: currentDest.title,
      geosite: currentDest.badge || "Geosite Kaldera Toba",
      date: selectedDate,
      time: "08:00 - 17:00 WIB",
      visitors: `${ticketCount} Orang`,
      addons: selectedAddonsList,
      totalPaid: `Rp ${totalPrice.toLocaleString("id-ID")}`,
      status: "Lunas (Siap Digunakan)",
      location: currentDest.location,
      organizerPhone: "6281234567890",
      organizerName: currentDest.manager || "Pokdarwis Danau Toba",
      paymentChannel: channelLabel,
      purchasedAt: new Date().toISOString(),
    };

    const newTrx = {
      trxId: `TRX-${bookingCode}`,
      traveler: userName || "Christofer Sitinjak",
      item: `${ticketCount}x ${currentDest.title}${selectedAddonsList.length > 0 ? " + " + selectedAddonsList[0] : ""}`,
      amount: `Rp ${totalPrice.toLocaleString("id-ID")}`,
      channel: channelLabel,
      escrowStatus: "Tertahan di Escrow",
      time: "Baru saja",
    };

    // 1. Simpan ke Supabase tickets table jika tersedia
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("tickets").insert({
          id: ticketId,
          booking_code: bookingCode,
          destination_id: currentDest.id || destId,
          destination_name: currentDest.title,
          geosite_label: currentDest.badge || "Geosite Kaldera Toba",
          visit_date: selectedDate,
          visit_time: "08:00 - 17:00 WIB",
          visitors: ticketCount,
          addons: selectedAddonsList,
          total_paid: totalPrice,
          status: "Lunas (Siap Digunakan)",
          location: currentDest.location,
          organizer_name: currentDest.manager || "Pokdarwis Danau Toba",
          organizer_phone: "6281234567890",
        });
      } catch (err) {
        console.error("Supabase ticket insertion error:", err);
      }
    }

    // 2. Simpan ke localStorage untuk traveler dashboard dan admin dashboard
    if (typeof window !== "undefined") {
      try {
        const storedTkt = JSON.parse(localStorage.getItem("sindar_purchased_tickets") || "[]");
        localStorage.setItem("sindar_purchased_tickets", JSON.stringify([newTicket, ...storedTkt]));

        const storedTrx = JSON.parse(localStorage.getItem("sindar_transactions") || "[]");
        localStorage.setItem("sindar_transactions", JSON.stringify([newTrx, ...storedTrx]));
      } catch (e) {
        console.error("LocalStorage write error:", e);
      }
    }

    // Simulasi delay gateway 1.2 detik
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIssuedTicket(newTicket);
      setPaymentStep("success");
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#1a3a34] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-[#c29d59]/40 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#c29d59] shrink-0" />
          <p className="text-[12.5px] font-medium leading-snug">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 lg:pb-8">
        {/* Back Navigation & Header Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <Link
            href="/jelajahi"
            className="inline-flex items-center gap-2.5 text-[12.5px] sm:text-[13px] font-semibold text-[#1a3a34] hover:text-[#b8653a] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full border border-[#e8e2d9] bg-white group-hover:border-[#1a3a34] group-hover:bg-[#faf8f5] flex items-center justify-center transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4 text-[#1a3a34] group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Kembali ke Jelajahi</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Tautan Bukit Holbung berhasil disalin ke clipboard!")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8e2d9] bg-white hover:border-[#1a3a34] text-[#1a3a34] transition-colors text-[11.5px]"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan</span>
            </button>
            <button
              onClick={() => alert("Bukit Holbung disimpan ke daftar destinasi favorit!")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8e2d9] bg-white hover:border-red-400 text-[#1a3a34] transition-colors text-[11.5px]"
            >
              <Heart className="w-3.5 h-3.5 text-red-500" />
              <span>Simpan</span>
            </button>
          </div>
        </div>

        {/* Title & Metadata (Clean, Single Location Display) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-[#c29d59]/15 border border-[#c29d59]/30 text-[#b8653a] text-[10.5px] font-semibold tracking-wider uppercase">
              {currentDest.badge}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-newsreader font-normal text-[#1a3a34] tracking-tight mb-3">
            {currentDest.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[12.5px] sm:text-[13px] text-[#575e5b]">
            <div className="flex items-center gap-1 text-[#1a3a34] font-semibold">
              <Star className="w-4 h-4 fill-[#c29d59] text-[#c29d59]" />
              <span>{currentDest.rating}</span>
              <span
                onClick={() => setActiveTab("ulasan")}
                className="text-[#575e5b] hover:text-[#1a3a34] font-normal underline cursor-pointer ml-1"
                title="Lihat Ulasan Wisatawan"
              >
                ({currentDest.baseReviews + reviews.length - 3} ulasan)
              </span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#1a3a34] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#c29d59] shrink-0" />
              {currentDest.location}
            </span>
          </div>
        </div>

        {/* Photo Gallery (Responsive) */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[250px] sm:h-[380px] md:h-[460px] rounded-3xl overflow-hidden shadow-sm">
            {/* Main Primary Image */}
            <div className="md:col-span-2 h-full relative group overflow-hidden bg-slate-100">
              <img
                src={photos[activePhotoIdx]}
                alt="Bukit Holbung Utama"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Photo Counter Pill visible on all screens */}
              <button
                onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % photos.length)}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1a3a34] text-[11px] font-semibold tracking-wider uppercase shadow-md hover:bg-white transition-colors"
              >
                Lihat Foto ({activePhotoIdx + 1}/{photos.length})
              </button>
            </div>

            {/* Secondary Images on Desktop */}
            <div className="hidden md:flex flex-col gap-3 h-full">
              <div
                onClick={() => setActivePhotoIdx(1)}
                className="h-1/2 relative group overflow-hidden cursor-pointer"
              >
                <img
                  src={photos[1]}
                  alt="Panorama Holbung"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                onClick={() => setActivePhotoIdx(2)}
                className="h-1/2 relative group overflow-hidden cursor-pointer"
              >
                <img
                  src={photos[2]}
                  alt="Danau Toba dari Holbung"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div
              onClick={() => setActivePhotoIdx(3)}
              className="hidden md:block h-full relative group overflow-hidden cursor-pointer"
            >
              <img
                src={photos[3]}
                alt="Sunset di Holbung"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Mobile Thumbnail Row */}
          <div className="flex md:hidden items-center gap-2 mt-2.5 overflow-x-auto no-scrollbar">
            {photos.map((p: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activePhotoIdx === idx ? "border-[#1a3a34] scale-95" : "border-transparent opacity-70"
                }`}
              >
                <img src={p} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Main Content & Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {/* Left Column (Content & Tabs) */}
          <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
            {/* Segmented Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#e8e2d9] pb-px overflow-x-auto no-scrollbar">
              {[
                { id: "tentang", label: "Tentang & Cerita" },
                { id: "fasilitas", label: "Fasilitas" },
                { id: "rute", label: "Akses & Rute" },
                { id: "ulasan", label: "Ulasan Wisatawan" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-3.5 sm:px-4 text-[12.5px] sm:text-[13px] font-semibold transition-all whitespace-nowrap border-b-2 ${
                    activeTab === tab.id
                      ? "border-[#1a3a34] text-[#1a3a34]"
                      : "border-transparent text-[#575e5b] hover:text-[#1a3a34]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Tentang & Cerita */}
            {activeTab === "tentang" && (
              <div className="flex flex-col gap-6 text-[#2c3531] leading-relaxed">
                <div>
                  <h2 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34] mb-3">
                    Keajaiban Savana Kaldera di Jantung Samosir
                  </h2>
                  <p className="text-[14px] sm:text-[15px] mb-3.5">
                    Bukit Holbung adalah salah satu situs bentang alam paling menakjubkan di kawasan Danau Toba. Berdiri di atas perbukitan hijau bergelombang yang telah berusia ratusan ribu tahun sejak letusan supervulkan Toba, bukit ini menyajikan sudut pandang 360 derajat ke perairan biru danau dan punggungan tebing caldera.
                  </p>
                  <p className="text-[14px] sm:text-[15px]">
                    Dikenal secara populer sebagai &apos;Bukit Teletubbies&apos; karena lekukan rumput savananya yang lembut, tempat ini menjadi saksi sejarah migrasi suku Batak kuno yang menyeberang dari daratan utama Sumatera menuju pulau Samosir.
                  </p>
                </div>

                <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 shadow-sm">
                  <h3 className="font-cinzel text-xs font-bold text-[#b8653a] uppercase tracking-wider mb-3">
                    Sorotan Pengalaman
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12.5px] sm:text-[13px]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c29d59] shrink-0" />
                      <span>Trekking ramah keluarga (15-20 menit)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c29d59] shrink-0" />
                      <span>Panorama matahari terbit & kabut danau</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c29d59] shrink-0" />
                      <span>Spot foto berlatar Desa Meat & Pusuk Buhit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#c29d59] shrink-0" />
                      <span>Dikelola kelompok sadar wisata (Pokdarwis)</span>
                    </div>
                  </div>
                </div>

                {/* Host / Pokdarwis Profile */}
                <div className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#f2ede5] border border-[#e8e2d9]">
                  <div className="w-11 h-11 rounded-full bg-[#1a3a34] text-white flex items-center justify-center font-cinzel font-bold text-sm shrink-0">
                    HB
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a3a34] text-[13.5px] sm:text-[14px]">
                      Dikelola oleh Pokdarwis Holbung Harian Boho
                    </h4>
                    <p className="text-[11.5px] text-[#575e5b]">
                      Mitra Resmi Terverifikasi BPODT sejak 2022 • Standar CHSE Pariwisata Bersih
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Fasilitas */}
            {activeTab === "fasilitas" && (
              <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-4">
                <h3 className="font-newsreader text-xl font-semibold text-[#1a3a34]">
                  Fasilitas di Lokasi Geosite
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-[13px] text-[#575e5b]">
                  <span className="flex items-center gap-2">✓ Area Parkir Mobil & Motor</span>
                  <span className="flex items-center gap-2">✓ Toilet & Kamar Mandi Bersih</span>
                  <span className="flex items-center gap-2">✓ Musholla & Tempat Wudhu</span>
                  <span className="flex items-center gap-2">✓ Gazebo / Pondok Istirahat</span>
                  <span className="flex items-center gap-2">✓ Warung Kopi & Kuliner Lokal</span>
                  <span className="flex items-center gap-2">✓ Jalur Anak Tangga Permanen</span>
                </div>
              </div>
            )}

            {/* Tab: Akses & Rute */}
            {activeTab === "rute" && (
              <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 sm:p-6 space-y-3.5">
                <h3 className="font-newsreader text-xl font-semibold text-[#1a3a34]">
                  Petunjuk Menuju Lokasi
                </h3>
                <div className="space-y-3 text-[13px] text-[#575e5b] leading-relaxed">
                  <p>
                    <strong>Dari Bandara Internasional Silangit (DTB):</strong> Berkendara sekitar 2 jam (85 km) melalui jalur darat via Tele / Menara Pandang Tele menuju Simpang Harian Boho.
                  </p>
                  <p>
                    <strong>Dari Pelabuhan Feri Tomok / Simanindo:</strong> Sekitar 1,5 jam perjalanan menyusuri jalan lingkar pesisir barat Pulau Samosir dengan jalan aspal mulus.
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Ulasan Wisatawan & Rating Bintang */}
            {activeTab === "ulasan" && (
              <div className="space-y-6">
                {/* 1. Rating Overview & Write Review Header */}
                <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e8e2d9]">
                    {/* Score summary */}
                    <div className="flex items-center gap-5">
                      <div className="text-center p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] shrink-0">
                        <span className="font-newsreader text-4xl sm:text-5xl font-bold text-[#1a3a34] block">
                          4.9
                        </span>
                        <div className="flex items-center justify-center gap-0.5 text-[#c29d59] my-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-[#c29d59] text-[#c29d59]" />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#575e5b] block font-medium">
                          dari 5.0 bintang
                        </span>
                      </div>

                      <div>
                        <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                          Ulasan & Pengalaman Wisatawan
                        </h3>
                        <p className="text-[12.5px] sm:text-[13px] text-[#575e5b] mt-0.5">
                          Berdasarkan {1240 + reviews.length - 3} ulasan terverifikasi dari pengunjung Geosite Bukit Holbung
                        </p>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10.5px] font-semibold mt-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          98% Wisatawan Merekomendasikan Tempat Ini
                        </span>
                      </div>
                    </div>

                    {/* Write Review CTA Button */}
                    <div className="self-start md:self-auto shrink-0">
                      {authRole === "user" || authRole === "mitra" ? (
                        <button
                          onClick={() => setIsFormOpen(!isFormOpen)}
                          className="px-5 py-2.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm active:scale-95"
                        >
                          <Plus className="w-4 h-4 text-[#c29d59]" />
                          <span>{isFormOpen ? "Tutup Formulir" : "Tulis Ulasan & Rating"}</span>
                        </button>
                      ) : (
                        <Link
                          href="/masuk"
                          className="px-5 py-2.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm active:scale-95"
                        >
                          <LogIn className="w-4 h-4 text-[#c29d59]" />
                          <span>Masuk untuk Mengulas</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Rating Distribution Barometer */}
                  <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#575e5b]">
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-semibold">5 Bintang</span>
                      <div className="flex-grow h-2 rounded-full bg-[#faf8f5] overflow-hidden border border-[#e8e2d9]">
                        <div className="h-full bg-[#c29d59] rounded-full w-[94%]" />
                      </div>
                      <span className="w-10 text-right font-medium">94%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 font-semibold">4 Bintang</span>
                      <div className="flex-grow h-2 rounded-full bg-[#faf8f5] overflow-hidden border border-[#e8e2d9]">
                        <div className="h-full bg-[#c29d59] rounded-full w-[5%]" />
                      </div>
                      <span className="w-10 text-right font-medium">5%</span>
                    </div>
                  </div>
                </div>

                {/* 2. Login Prompt Banner (Shown only when guest) */}
                {authRole === "guest" && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[#1a3a34]">
                          Pernah berkunjung ke Bukit Holbung?
                        </h4>
                        <p className="text-[12px] text-[#575e5b]">
                          Masuk dengan akun wisatawan Anda untuk membagikan ulasan, foto, dan memberikan rating bintang.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/masuk"
                      className="px-4 py-2 rounded-full bg-[#1a3a34] text-white text-xs font-semibold uppercase tracking-wider shrink-0 text-center hover:bg-[#122a25]"
                    >
                      Masuk Sekarang
                    </Link>
                  </div>
                )}

                {/* 3. Interactive Review Form (Collapsible / Active) */}
                {isFormOpen && (
                  <div className="bg-white border-2 border-[#c29d59]/50 rounded-3xl p-5 sm:p-7 shadow-lg animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between pb-4 border-b border-[#e8e2d9] mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1a3a34] text-[#c29d59] font-cinzel text-xs font-bold flex items-center justify-center">
                          CS
                        </div>
                        <div>
                          <span className="font-bold text-sm text-[#1a3a34] block">
                            {userName}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">
                            Wisatawan Terverifikasi SINDAR TOBA
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsFormOpen(false)}
                        className="text-[#575e5b] hover:text-[#1a3a34] p-1.5 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      {/* Interactive Star Rating Selector */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1.5">
                          Beri Rating Pengalaman Anda *
                        </label>
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((starVal) => {
                              const isFilled = (hoverRating || newRating) >= starVal;
                              return (
                                <button
                                  type="button"
                                  key={starVal}
                                  onClick={() => setNewRating(starVal)}
                                  onMouseEnter={() => setHoverRating(starVal)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                                >
                                  <Star
                                    className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                                      isFilled
                                        ? "fill-[#c29d59] text-[#c29d59]"
                                        : "fill-stone-200 text-stone-300"
                                    }`}
                                  />
                                </button>
                              );
                            })}
                          </div>
                          <span className="px-3 py-1 rounded-full bg-[#faf8f5] border border-[#e8e2d9] text-xs font-bold text-[#b8653a]">
                            {newRating === 5 && "5/5 Bintang • Luar Biasa!"}
                            {newRating === 4 && "4/5 Bintang • Sangat Bagus"}
                            {newRating === 3 && "3/5 Bintang • Cukup Baik"}
                            {newRating === 2 && "2/5 Bintang • Kurang Memuaskan"}
                            {newRating === 1 && "1/5 Bintang • Perlu Ditingkatkan"}
                          </span>
                        </div>
                      </div>

                      {/* Trip Type & Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                            Kategori Kunjungan
                          </label>
                          <select
                            value={newTripType}
                            onChange={(e) => setNewTripType(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                          >
                            <option value="Bersama Keluarga">Bersama Keluarga</option>
                            <option value="Pasangan">Pasangan / Liburan Berdua</option>
                            <option value="Solo Traveler">Solo Traveler</option>
                            <option value="Grup Teman">Grup Teman / Komunitas</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                            Waktu Kunjungan
                          </label>
                          <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] focus:outline-none focus:border-[#c29d59]">
                            <option value="November 2026">November 2026 (Bulan Ini)</option>
                            <option value="Oktober 2026">Oktober 2026</option>
                            <option value="September 2026">September 2026</option>
                            <option value="Lebih dari 3 bulan lalu">Lebih dari 3 bulan lalu</option>
                          </select>
                        </div>
                      </div>

                      {/* Comment Area */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                          Tulis Ulasan & Cerita Pengalaman Anda *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Ceritakan keindahan pemandangan savana Bukit Holbung, kondisi trek tangga, pemandu lokal, atau tips berkunjung bagi wisatawan lainnya..."
                          className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] placeholder:text-stone-400 focus:outline-none focus:border-[#c29d59] resize-none"
                        />
                      </div>

                      {/* Submit Actions */}
                      <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#e8e2d9]">
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          className="px-4 py-2 rounded-full border border-[#e8e2d9] text-xs font-semibold text-[#575e5b] hover:bg-[#faf8f5] transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-[#c29d59] border border-[#c29d59] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                        >
                          Terbitkan Ulasan
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* 4. List of Reviews */}
                <div className="space-y-3.5">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white border border-[#e8e2d9] hover:border-[#c29d59]/60 rounded-2xl p-5 sm:p-6 transition-all shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#1a3a34]/10 text-[#1a3a34] font-cinzel font-bold text-xs flex items-center justify-center shrink-0">
                            {rev.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-sm text-[#1a3a34]">
                                {rev.author}
                              </span>
                              {rev.verified && (
                                <span className="px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200 flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                  Wisatawan Terverifikasi
                                </span>
                              )}
                            </div>
                            <span className="text-[11.5px] text-[#575e5b] block">
                              Kunjungan {rev.date} • {rev.tripType}
                            </span>
                          </div>
                        </div>

                        {/* Star Rating Display */}
                        <div className="flex items-center gap-1 text-[#c29d59]">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating
                                  ? "fill-[#c29d59] text-[#c29d59]"
                                  : "fill-stone-200 text-stone-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-[13px] sm:text-[13.5px] text-[#2c3531] leading-relaxed">
                        &ldquo;{rev.comment}&rdquo;
                      </p>

                      {/* Helpful Button */}
                      <div className="mt-3.5 pt-3 border-t border-[#e8e2d9]/60 flex items-center justify-between text-xs text-[#575e5b]">
                        <button
                          onClick={() => handleLike(rev.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                            likedReviews[rev.id]
                              ? "bg-[#1a3a34] text-white border-[#1a3a34]"
                              : "border-[#e8e2d9] hover:bg-[#faf8f5] text-[#575e5b]"
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Membantu ({rev.likes})</span>
                        </button>
                        <span className="text-[11px] text-[#575e5b]">Ulasan resmi SINDAR TOBA</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sticky Reservation / Booking Card) */}
          <div id="booking-section" className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-6 shadow-xl text-[#1a3a34] lg:sticky lg:top-28">
            <div className="flex items-baseline justify-between pb-4 border-b border-[#e8e2d9]">
              <div>
                <span className="text-[10.5px] text-[#575e5b] uppercase tracking-wider block">Harga Tiket Masuk</span>
                <span className="text-2xl sm:text-3xl font-bold font-cinzel text-[#1a3a34]">
                  Rp {basePrice.toLocaleString("id-ID")}
                </span>
                <span className="text-[12px] text-[#575e5b] font-normal"> /pengunjung</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wide">
                Tersedia Hari Ini
              </span>
            </div>

            {/* Booking Form Fields */}
            <div className="space-y-4 my-5">
              {/* Date Selector */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#575e5b] block mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c29d59]" />
                  Pilih Tanggal Kunjungan
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] font-semibold text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>

              {/* Guest Counter */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#575e5b] block mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c29d59]" />
                  Jumlah Pengunjung
                </label>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9]">
                  <button
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-[#e8e2d9] flex items-center justify-center font-bold text-base hover:bg-slate-100 active:scale-95"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm">{ticketCount} Tiket</span>
                  <button
                    onClick={() => setTicketCount(ticketCount + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-[#e8e2d9] flex items-center justify-center font-bold text-base hover:bg-slate-100 active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add-ons */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#575e5b] block mb-2">
                  Layanan Tambahan (Opsional):
                </span>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#e8e2d9] hover:bg-[#faf8f5] cursor-pointer text-[12px]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addons.ulos}
                        onChange={(e) => setAddons({ ...addons, ulos: e.target.checked })}
                        className="rounded text-[#1a3a34]"
                      />
                      <span>Sewa Kain Ulos Tradisional</span>
                    </div>
                    <span className="font-semibold">+Rp 25.000</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#e8e2d9] hover:bg-[#faf8f5] cursor-pointer text-[12px]">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addons.guide}
                        onChange={(e) => setAddons({ ...addons, guide: e.target.checked })}
                        className="rounded text-[#1a3a34]"
                      />
                      <span>Pemandu Cerita Adat Lokal</span>
                    </div>
                    <span className="font-semibold">+Rp 75.000</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="py-3 border-t border-b border-[#e8e2d9] space-y-1.5 text-[12px] text-[#575e5b]">
              <div className="flex justify-between">
                <span>Tiket Masuk ({ticketCount}x)</span>
                <span>Rp {(basePrice * ticketCount).toLocaleString("id-ID")}</span>
              </div>
              {addons.ulos && (
                <div className="flex justify-between">
                  <span>Sewa Ulos ({ticketCount}x)</span>
                  <span>Rp {(ulosPrice * ticketCount).toLocaleString("id-ID")}</span>
                </div>
              )}
              {addons.guide && (
                <div className="flex justify-between">
                  <span>Pemandu Cerita Adat</span>
                  <span>Rp {guidePrice.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 text-[14px] font-bold text-[#1a3a34] border-t border-[#e8e2d9]/60">
                <span>Total Pembayaran</span>
                <span className="font-cinzel text-lg">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleBooking}
              className="w-full py-3.5 mt-5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-semibold text-[12.5px] uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Pesan Tiket Resmi Sekarang</span>
              <ArrowRight className="w-4 h-4 text-[#c29d59]" />
            </button>

            <div className="mt-4 pt-3 border-t border-[#e8e2d9]/60 text-[11px] text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Tiket resmi terhubung langsung ke pintu masuk Pokdarwis</span>
            </div>
          </div>
        </div>

        {/* Floating Mobile Bottom Booking Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e8e2d9] p-3.5 px-4 flex items-center justify-between lg:hidden shadow-lg safe-bottom">
          <div>
            <span className="text-[10px] text-[#575e5b] block">Total ({ticketCount} Tiket)</span>
            <span className="font-cinzel text-lg font-bold text-[#1a3a34]">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("booking-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else handleBooking();
            }}
            className="px-6 py-2.5 rounded-full bg-[#1a3a34] text-white text-[12px] font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95"
          >
            <span>Pesan Tiket</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c29d59]" />
          </button>
        </div>

        {/* MODAL PEMBAYARAN INTERAKTIF (CHECKOUT PAYMENT GATEWAY FOR TESTING & DEMO) */}
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
                  {/* Order Summary Pill */}
                  <div className="p-3.5 rounded-2xl bg-white border border-[#e8e2d9] space-y-1 text-xs">
                    <div className="flex justify-between font-semibold text-[#1a3a34]">
                      <span>{currentDest.title}</span>
                      <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-[#575e5b] text-[11px]">
                      <span>{selectedDate} • {ticketCount} Pengunjung</span>
                      <span>{addons.ulos || addons.guide ? "+Layanan Tambahan" : "Tiket Standar"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#575e5b] block mb-2">
                      Pilih Kanal Pembayaran Resmi:
                    </label>

                    <div className="space-y-2.5">
                      {/* Option 1: QRIS */}
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
                          name="paymentMethod"
                          checked={selectedMethod === "qris"}
                          onChange={() => setSelectedMethod("qris")}
                          className="accent-[#1a3a34]"
                        />
                      </label>

                      {/* Option 2: Bank Sumut */}
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
                          name="paymentMethod"
                          checked={selectedMethod === "va_sumut"}
                          onChange={() => setSelectedMethod("va_sumut")}
                          className="accent-[#1a3a34]"
                        />
                      </label>

                      {/* Option 3: Bank Mandiri */}
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
                          name="paymentMethod"
                          checked={selectedMethod === "va_mandiri"}
                          onChange={() => setSelectedMethod("va_mandiri")}
                          className="accent-[#1a3a34]"
                        />
                      </label>

                      {/* Option 4: BCA */}
                      <label
                        onClick={() => setSelectedMethod("va_bca")}
                        className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                          selectedMethod === "va_bca"
                            ? "bg-white border-[#1a3a34] shadow-sm"
                            : "bg-white/60 border-[#e8e2d9] hover:border-stone-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center font-bold text-xs border border-indigo-200">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-xs text-[#1a3a34] block">
                              Virtual Account BCA
                            </span>
                            <span className="text-[10.5px] text-[#575e5b] block">
                              BCA Mobile, myBCA & KlikBCA
                            </span>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={selectedMethod === "va_bca"}
                          onChange={() => setSelectedMethod("va_bca")}
                          className="accent-[#1a3a34]"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Escrow Guarantee Banner */}
                  <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 flex items-start gap-2.5 text-[11px] leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Jaminan Keamanan Escrow BPODT:</strong>
                      Dana Anda ditampung di rekening bersama resmi SINDAR TOBA dan baru diteruskan ke mitra setelah Anda tiba dan memindai e-tiket di lokasi.
                    </div>
                  </div>

                  <button
                    onClick={() => setPaymentStep("pay")}
                    className="w-full py-3.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Lanjutkan Pembayaran (Rp {totalPrice.toLocaleString("id-ID")})</span>
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

                  {/* IF QRIS */}
                  {selectedMethod === "qris" ? (
                    <div className="bg-white rounded-3xl p-5 border border-[#e8e2d9] shadow-sm text-center space-y-3">
                      <div className="flex items-center justify-center gap-1.5 pb-2 border-b border-[#e8e2d9]">
                        <span className="font-bold text-xs tracking-widest text-[#1a3a34]">QRIS DINAMIS</span>
                        <span className="text-[10px] text-[#575e5b]">• Standar Pembayaran Nasional</span>
                      </div>

                      {/* Dynamic Realistic QR Code Container */}
                      <div className="w-48 h-48 mx-auto bg-stone-50 rounded-2xl p-3 border-2 border-dashed border-[#1a3a34] flex flex-col items-center justify-center relative shadow-inner">
                        <QrCode className="w-36 h-36 text-[#1a3a34]" />
                        <span className="text-[9px] font-mono text-[#575e5b] mt-1">SINDAR TOBA - BPODT</span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[11px] text-[#575e5b]">Total Tagihan Tiket:</span>
                        <div className="font-cinzel text-2xl font-bold text-[#1a3a34]">
                          Rp {totalPrice.toLocaleString("id-ID")}
                        </div>
                      </div>

                      <p className="text-[11px] text-[#575e5b] leading-relaxed">
                        Buka aplikasi <strong>GoPay, OVO, Dana, ShopeePay, BCA Mobile</strong>, atau mobile banking Anda dan pindai kode QR di atas.
                      </p>
                    </div>
                  ) : (
                    /* IF VIRTUAL ACCOUNT */
                    <div className="bg-white rounded-3xl p-5 border border-[#e8e2d9] shadow-sm space-y-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-[#e8e2d9]">
                        <span className="font-bold text-xs text-[#1a3a34]">
                          {selectedMethod === "va_sumut" ? "Bank Sumut Virtual Account" : selectedMethod === "va_mandiri" ? "Bank Mandiri Virtual Account" : "Bank BCA Virtual Account"}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Otomatis Terverifikasi
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] text-[#575e5b] block">Nomor Virtual Account:</span>
                        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9]">
                          <span className="font-mono text-base font-bold text-[#1a3a34] tracking-wider">
                            {selectedMethod === "va_sumut" ? "102 889 0481 9281" : selectedMethod === "va_mandiri" ? "8890 8123 4567 8901" : "8077 7123 4567 8901"}
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

                      <div className="flex justify-between items-center text-xs pt-1">
                        <span className="text-[#575e5b]">Nama Akun:</span>
                        <span className="font-semibold text-[#1a3a34]">SINDAR TOBA — {userName || "Wisatawan"}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#575e5b]">Total Pembayaran:</span>
                        <span className="font-bold text-[#1a3a34] font-cinzel text-base">
                          Rp {totalPrice.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SPECIAL DEMO / TESTING TRIGGER BUTTON */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-[#1a3a34] space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                        Fitur Pengujian & Demo Berjalan:
                      </span>
                    </div>
                    <p className="text-[11.5px] text-[#575e5b] leading-relaxed">
                      Klik tombol di bawah ini untuk mensimulasikan respons instan dari bank saat pengujian demo transaksi berlangsung.
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

              {/* STEP 3: LAYAR SUKSES & E-TIKET RESMI TERBIT */}
              {paymentStep === "success" && issuedTicket && (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-md animate-bounce">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">
                      Transaksi Selesai & Lunas
                    </span>
                    <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34]">
                      Pembayaran Berhasil Diverifikasi!
                    </h3>
                    <p className="text-xs text-[#575e5b] mt-1">
                      E-Tiket resmi telah diterbitkan dan tersimpan di database Supabase Cloud.
                    </p>
                  </div>

                  {/* Ticket Card Details */}
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
                        Tanggal: <strong>{issuedTicket.date}</strong> ({issuedTicket.visitors})
                      </div>
                      {issuedTicket.addons.length > 0 && (
                        <div className="text-[#575e5b] text-[11px]">
                          Layanan: {issuedTicket.addons.join(", ")}
                        </div>
                      )}
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

                  {/* Navigation CTA Buttons */}
                  <div className="space-y-2 pt-2">
                    <Link
                      href="/dashboard"
                      className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>Buka E-Tiket di Dashboard Saya</span>
                      <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                    </Link>

                    <Link
                      href="/admin/dashboard"
                      target="_blank"
                      className="w-full py-2.5 rounded-full border border-[#c29d59] text-[#1a3a34] hover:bg-[#c29d59]/10 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#c29d59]" />
                      <span>Cek di Pusat Kendali BPODT / Admin</span>
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