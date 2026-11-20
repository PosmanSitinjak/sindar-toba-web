"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  Clock,
  Users,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  ArrowRight,
} from "lucide-react";

export default function PengalamanPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = [
    "Semua",
    "Kriya & Tenun",
    "Agrowisata Kopi",
    "Wisata Danau",
    "Gastronomi Lokal",
  ];

  const experiences = [
    {
      id: "menenun-ulos",
      title: "Workshop Menenun Ulos bersama Maestro Desa Suhi-suhi",
      category: "Kriya & Tenun",
      location: "Lumban Suhi-suhi, Samosir",
      duration: "3 Jam",
      groupSize: "Maks. 6 orang",
      price: "175.000",
      rating: 4.9,
      reviews: 340,
      image: "/images/destinations/tenun-ulos.jpg",
      desc: "Pelajari filosofi ragi motif Harungguan, teknik pewarnaan alam dari daun tanaman lokal, dan praktik menenun langsung di alat tenun gedog tradisional.",
      highlights: [
        "Praktek menenun langsung bersama inang penenun senior",
        "Suvenir selendang tenun mini buatan tangan",
        "Teh serai hangat & kue tradisional khas Batak",
      ],
    },
    {
      id: "kopi-lintong",
      title: "Jelajah Kebun & Cupping Kopi Arabika Lintong Specialty",
      category: "Agrowisata Kopi",
      location: "Lintongnihuta, Humbahas",
      duration: "4 Jam",
      groupSize: "Maks. 8 orang",
      price: "220.000",
      rating: 4.9,
      reviews: 215,
      image: "/images/destinations/kopi-lintong.jpg",
      desc: "Menyusuri kebun kopi vulkanik di ketinggian 1.400 mdpl, memetik ceri kopi merah, memahami proses giling basah (wet-hulled), serta teknik sangrai khas Batak.",
      highlights: [
        "Sesi cupping 3 varietas kopi Arabika Lintong",
        "Bawa pulang 200gr biji kopi sangrai segar",
        "Makan siang bersama keluarga petani di kebun",
      ],
    },
    {
      id: "perahu-solu",
      title: "Pelayaran Damai Kaldera dengan Perahu Kayu Solu Bolon",
      category: "Wisata Danau",
      location: "Perairan Tuk-tuk, Samosir",
      duration: "2 Jam",
      groupSize: "Maks. 10 orang",
      price: "250.000",
      rating: 4.8,
      reviews: 480,
      image: "/images/destinations/bukit-holbung.jpg",
      desc: "Mengarungi danau vulkanik hening saat kabut pagi merekah dengan perahu kayu bertatahkan ornamen Gorga Batak menuju teluk-teluk tersembunyi.",
      highlights: [
        "Perahu kayu tradisional berstandar pelampung",
        "Spot foto terbaik dengan refleksi tebing kaldera",
        "Pemandu lokal bercerita tentang legenda danau",
      ],
    },
    {
      id: "kuliner-andaliman",
      title: "Masterclass Kuliner Rempah Andaliman & Ikan Mas Arsik",
      category: "Gastronomi Lokal",
      location: "Meat, Balige, Toba",
      duration: "3.5 Jam",
      groupSize: "Maks. 6 orang",
      price: "190.000",
      rating: 4.9,
      reviews: 190,
      image: "/images/destinations/lembah-bakkara.jpg",
      desc: "Mengenal 'merica Batak' andaliman yang memberikan sensasi getir segar khas, dipadukan kecombrang dan asam gelugur untuk meracik Ikan Mas Arsik otentik.",
      highlights: [
        "Bahan baku segar dari pasar tradisional Balige",
        "Makan siang lengkap hasil masakan Anda",
        "Buku resep rempah pusaka keluarga Batak",
      ],
    },
  ];

  const filtered =
    selectedCategory === "Semua"
      ? experiences
      : experiences.filter((e) => e.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Header */}
        <section className="bg-[#1a3a34] text-white pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#c29d59]/30 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center text-center">
            <span className="font-cinzel text-[10.5px] sm:text-[11px] font-semibold text-[#c29d59] tracking-[2px] sm:tracking-[2.75px] uppercase mb-2 sm:mb-3">
              Kurasi Pengalaman Luhur
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-newsreader font-normal text-white max-w-3xl leading-tight mb-3 sm:mb-4">
              Pengalaman Budaya & Aktivitas Otentik
            </h1>
            <p className="text-white/80 text-[13px] sm:text-[15px] max-w-2xl leading-relaxed px-2">
              Bukan sekadar berkunjung, namun melebur langsung bersama tetua adat, maestro penenun ulos,
              dan petani kaldera untuk membawa pulang kenangan hidup yang mendalam.
            </p>
          </div>
        </section>

        {/* Category Filter Pills (Mobile Scrollable) */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-7 relative z-20">
          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-2 sm:p-2.5 shadow-md flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#1a3a34] text-white shadow-sm"
                    : "text-[#575e5b] hover:text-[#1a3a34] hover:bg-[#faf8f5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Experiences Listing */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="space-y-6 sm:space-y-8">
            {filtered.map((exp) => (
              <div
                key={exp.id}
                className="bg-white border border-[#e8e2d9] hover:border-[#c29d59] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row"
              >
                {/* Left/Top: Image */}
                <div className="relative w-full lg:w-[42%] h-56 sm:h-72 lg:h-auto min-h-[240px] overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1a3a34] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {exp.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 text-white text-[11.5px] font-medium bg-black/60 backdrop-blur-md px-3 py-1 rounded-full">
                    <MapPin className="w-3.5 h-3.5 text-[#c29d59]" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Right/Bottom: Content & Inclusions */}
                <div className="p-5 sm:p-7 lg:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3 sm:gap-4 text-[11.5px] sm:text-[12px] text-[#575e5b]">
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

                      <div className="flex items-center gap-1 text-[11.5px] sm:text-[12px] font-bold text-[#1a3a34]">
                        <Star className="w-3.5 h-3.5 fill-[#c29d59] text-[#c29d59]" />
                        <span>{exp.rating}</span>
                        <span className="text-[#575e5b] font-normal">({exp.reviews})</span>
                      </div>
                    </div>

                    <Link href={`/pengalaman/${exp.id}`}>
                      <h2 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34] mb-2 sm:mb-3 hover:text-[#b8653a] transition-colors leading-snug">
                        {exp.title}
                      </h2>
                    </Link>

                    <p className="text-[13px] sm:text-[14px] text-[#575e5b] leading-relaxed mb-4 sm:mb-5">
                      {exp.desc}
                    </p>

                    <div className="bg-[#faf8f5] p-3.5 sm:p-4 rounded-2xl border border-[#e8e2d9]/60 mb-5">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#b8653a] block mb-2">
                        Fasilitas & Manfaat Termasuk:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-[#2c3531]">
                        {exp.highlights.map((item, idx) => (
                          <span key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#c29d59] shrink-0" />
                            <span className="truncate">{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Bar */}
                  <div className="pt-4 border-t border-[#e8e2d9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <span className="text-[10px] text-[#575e5b] block">Tarif Per Peserta:</span>
                      <span className="text-xl sm:text-2xl font-bold font-cinzel text-[#1a3a34]">
                        Rp {exp.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Link
                        href={`/pengalaman/${exp.id}`}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 text-center"
                      >
                        <Calendar className="w-4 h-4 text-[#c29d59]" />
                        <span>Reservasi Aktivitas</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}