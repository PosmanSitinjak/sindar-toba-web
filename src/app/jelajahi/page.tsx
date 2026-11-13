"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import CalderaMapModal from "@/components/discovery/CalderaMapModal";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  Map as MapIcon,
  MessageCircle,
} from "lucide-react";

export default function JelajahiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedRegency, setSelectedRegency] = useState("Semua Kabupaten");
  const [sortBy, setSortBy] = useState("popular");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const categories = [
    "Semua",
    "Geosite Alam",
    "Warisan Budaya",
    "Kuliner Khas",
    "Kriya & Tenun",
    "Homestay & Villa",
  ];

  const regencies = [
    "Semua Kabupaten",
    "Samosir",
    "Toba (Balige)",
    "Humbang Hasundutan",
    "Tapanuli Utara",
    "Simalungun (Parapat)",
    "Karo (Tongging)",
  ];

  const listings = [
    {
      id: "bukit-holbung",
      title: "Bukit Holbung Samosir",
      category: "Geosite Alam",
      regency: "Samosir",
      subregion: "Harian Boho, Samosir",
      rating: 4.9,
      reviews: 1240,
      price: "15.000",
      priceUnit: "tiket",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      description: "Pemandangan bukit savana hijau yang membentang luas berhadapan langsung dengan bentang kaldera Danau Toba.",
      tags: ["Geosite UNESCO", "Sunset Point", "Trekking Ringan"],
    },
    {
      id: "desa-tomok",
      title: "Desa Wisata Tomok & Makam Raja Sidabutar",
      category: "Warisan Budaya",
      regency: "Samosir",
      subregion: "Simanindo, Samosir",
      rating: 4.8,
      reviews: 890,
      price: "25.000",
      priceUnit: "orang",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      description: "Pusat kebudayaan Batak kuno, makam sarkofagus batu Raja Sidabutar, dan pertunjukan sakral Patung Sigale-gale.",
      tags: ["Cagar Budaya", "Museum Batak", "Sigale-gale"],
    },
    {
      id: "lembah-bakkara",
      title: "Lembah Bakkara & Aek Sipangolu",
      category: "Geosite Alam",
      regency: "Humbang Hasundutan",
      subregion: "Bakti Raja, Humbahas",
      rating: 4.9,
      reviews: 520,
      price: "20.000",
      priceUnit: "orang",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      description: "Lembah subur diapit tebing kaldera, mata air abadi Aek Sipangolu, dan istana pahlawan Raja Sisingamangaraja.",
      tags: ["Mata Air Alami", "Situs Sejarah", "Bawang Bakkara"],
    },
    {
      id: "kopi-lintong-roastery",
      title: "Sentra Kopi Arabika Lintong & Cupping Room",
      category: "Kuliner Khas",
      regency: "Humbang Hasundutan",
      subregion: "Lintongnihuta, Humbahas",
      rating: 4.9,
      reviews: 310,
      price: "45.000",
      priceUnit: "porsi",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
      description: "Cicipi kemurnian kopi specialty dataran tinggi 1.400 mdpl dengan aroma rempah tanah vulkanik yang mendunia.",
      tags: ["Specialty Coffee", "Agrowisata", "Oleh-oleh"],
    },
    {
      id: "tenun-ulos-suhi-suhi",
      title: "Kampung Penenun Ulos Huta Raja Suhi-suhi",
      category: "Kriya & Tenun",
      regency: "Samosir",
      subregion: "Pangururan, Samosir",
      rating: 4.9,
      reviews: 620,
      price: "Free",
      priceUnit: "kunjungan",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      description: "Deretan rumah adat Batak tradisional tempat para inang menenun kain Ulos Harungguan dan Sadum secara turun-temurun.",
      tags: ["Rumah Adat Bolon", "Penenun Asli", "Kriya Budaya"],
    },
    {
      id: "bukit-tarabunga",
      title: "Bukit Tarabunga Balige",
      category: "Geosite Alam",
      regency: "Toba (Balige)",
      subregion: "Tampahan, Balige",
      rating: 4.8,
      reviews: 410,
      price: "10.000",
      priceUnit: "orang",
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80",
      description: "Titik terbaik menikmati panorama lengkung air danau kebiruan yang dipagari terasering persawahan hijau.",
      tags: ["Spot Foto", "Sunset Point", "Persawahan"],
    },
  ];

  const filteredListings = listings.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchRegency =
      selectedRegency === "Semua Kabupaten" ||
      item.regency.toLowerCase().includes(selectedRegency.toLowerCase().replace(" (balige)", "").replace(" (parapat)", "").replace(" (tongging)", ""));
    return matchSearch && matchCategory && matchRegency;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow">
        {/* Page Hero Header */}
        <section className="bg-[#1a3a34] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#c29d59]/30 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center text-center">
            <span className="font-cinzel text-[10.5px] sm:text-[11px] font-semibold text-[#c29d59] tracking-[2px] sm:tracking-[2.75px] uppercase mb-2 sm:mb-3">
              Direktori Resmi Geopark Kaldera
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-newsreader font-normal text-white max-w-3xl leading-tight mb-3 sm:mb-4">
              Jelajahi Wisata & Produk UMKM Danau Toba
            </h1>
            <p className="text-white/80 text-[13px] sm:text-[15px] max-w-2xl leading-relaxed px-2">
              Temukan keajaiban alam tersembunyi, cagar budaya leluhur Batak, ragam kuliner andaliman,
              hingga kriya tenun otentik langsung dari tangan pengrajin lokal.
            </p>
          </div>
        </section>

        {/* Filter & Search Bar Toolbar */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-3 sm:p-4 shadow-lg flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari destinasi, kuliner, tenun, atau nama desa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
              />
            </div>

            {/* Regency Filter */}
            <div className="w-full md:w-56 shrink-0">
              <select
                value={selectedRegency}
                onChange={(e) => setSelectedRegency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] font-medium focus:outline-none focus:border-[#1a3a34] cursor-pointer"
              >
                {regencies.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by */}
            <div className="w-full md:w-44 shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] font-medium focus:outline-none focus:border-[#1a3a34] cursor-pointer"
              >
                <option value="popular">Paling Populer</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="price-asc">Harga Terendah</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto py-5 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#1a3a34] text-white shadow-sm"
                    : "bg-white text-[#575e5b] border border-[#e8e2d9] hover:border-[#1a3a34] hover:text-[#1a3a34]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Listing Grid */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="flex items-center justify-between mb-5 text-[12.5px] sm:text-[13px] text-[#575e5b]">
            <span>
              Menampilkan <strong className="text-[#1a3a34]">{filteredListings.length}</strong> hasil kurasi resmi
            </span>
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a3a34] hover:bg-[#122421] text-[#c29d59] hover:text-white text-[11.5px] font-semibold transition-all shadow-sm active:scale-95"
            >
              <MapIcon className="w-3.5 h-3.5 text-[#c29d59]" />
              <span>Buka Mode Peta Kaldera</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-[#e8e2d9] overflow-hidden flex flex-col justify-between hover:border-[#c29d59] hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-[#1a3a34] shadow-sm">
                    {item.category}
                  </span>

                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                    <Star className="w-3 h-3 fill-[#c29d59] text-[#c29d59]" />
                    <span>{item.rating}</span>
                    <span className="text-white/60 text-[10px]">({item.reviews})</span>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/95 text-[11.5px] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#c29d59]" />
                    <span>{item.subregion}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg sm:text-[20px] font-semibold font-newsreader text-[#1a3a34] mb-2 leading-snug group-hover:text-[#b8653a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#575e5b] line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full bg-[#faf8f5] border border-[#e8e2d9] text-[10.5px] font-medium text-[#575e5b]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-[#e8e2d9]/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#575e5b] uppercase tracking-wider block">Mulai dari</span>
                      <span className="text-[15px] sm:text-[16px] font-bold text-[#1a3a34]">
                        {item.price === "Free" ? "Gratis" : `Rp ${item.price}`}
                        <span className="text-[11px] font-normal text-[#575e5b]"> /{item.priceUnit}</span>
                      </span>
                    </div>

                    <Link
                      href={`/destinasi/${item.id}`}
                      className="px-4 py-2 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[11.5px] font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Discovery Map Preview Banner */}
          <div className="mt-12 sm:mt-16 bg-[#1a3a34] text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl">
            <div className="max-w-xl z-10 text-center md:text-left">
              <span className="font-cinzel text-[10.5px] sm:text-[11px] font-semibold text-[#c29d59] tracking-widest uppercase block mb-1.5">
                Peta Kaldera Interaktif
              </span>
              <h3 className="font-newsreader text-xl sm:text-2xl md:text-3xl font-normal leading-snug mb-2 sm:mb-3">
                Jelajahi Sebaran Geosite & Sentra UMKM di Sekeliling Danau
              </h3>
              <p className="text-white/80 text-[13px] sm:text-[14px] leading-relaxed mb-6">
                Buka peta digital interaktif dengan titik koordinat resmi BPODT untuk merencanakan rute pelayaran atau berkendara lingkar kaldera.
              </p>
              <button
                onClick={() => setIsMapModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#c29d59] hover:bg-[#b08b47] text-[#1a3a34] font-semibold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                <MapIcon className="w-4 h-4" />
                <span>Buka Mode Peta Interaktif</span>
              </button>
            </div>

            <div
              onClick={() => setIsMapModalOpen(true)}
              className="w-full md:w-72 h-44 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 flex flex-col justify-center items-center text-center shrink-0 cursor-pointer hover:bg-white/15 transition-all group"
            >
              <MapPin className="w-8 h-8 text-[#c29d59] mb-2 animate-bounce group-hover:scale-110 transition-transform" />
              <span className="font-cinzel text-base font-semibold">16 Geosite UNESCO</span>
              <span className="text-[11.5px] text-white/70 mt-0.5">8 Kabupaten Kawasan Danau Toba</span>
              <span className="mt-2 text-[10px] text-[#c29d59] font-semibold uppercase tracking-wider group-hover:underline">
                Klik untuk Membuka Peta →
              </span>
            </div>
          </div>

          {/* Curated Concierge CTA Banner */}
          <div className="mt-6 sm:mt-8 bg-[#faf8f5] border border-[#e8e2d9] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-sm">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-600/30 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-newsreader text-lg sm:text-xl font-semibold text-[#1a3a34]">
                  Butuh Rekomendasi Rute Khusus?
                </h4>
                <p className="text-[12.5px] sm:text-[13px] text-[#575e5b] mt-0.5">
                  Konsultasikan liburan Anda langsung bersama Tim Concierge Lokal SINDAR TOBA via WhatsApp.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Sindar%20Toba,%20saya%20ingin%20konsultasi%20wisata"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[12px] uppercase tracking-wider transition-colors shrink-0 shadow-sm flex items-center justify-center gap-2 active:scale-95 text-center"
            >
              <span>Chat WhatsApp Concierge</span>
            </a>
          </div>
        </section>
      </main>

      {/* Interactive Caldera Discovery Map Modal */}
      <CalderaMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />

      <Footer />
    </div>
  );
}