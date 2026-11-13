"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Compass, Search, Sparkles, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState("Semua Area Kaldera Danau Toba");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori Wisata");

  const regions = [
    "Semua Area Kaldera Danau Toba",
    "Pulau Samosir & Tomok",
    "Parapat & Toba Caldera",
    "Balige & Tarabunga",
    "Tongging & Air Terjun Sipiso-piso",
    "Humbang Hasundutan (Bakkara)",
  ];

  const categories = [
    "Semua Kategori Wisata",
    "Geosite & Wisata Alam",
    "Budaya & Warisan Batak",
    "Kuliner Khas & Kopi Lintong",
    "Homestay Tradisional & Villa",
    "Tur Perahu & Solu Bolon",
  ];

  const quickTags = [
    { name: "Bukit Holbung", href: "/jelajahi?q=holbung" },
    { name: "Desa Tomok", href: "/jelajahi?q=tomok" },
    { name: "Kopi Lintong", href: "/jelajahi?q=lintong" },
    { name: "Homestay Batak", href: "/jelajahi?q=homestay" },
    { name: "Tenun Ulos", href: "/pengalaman" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/jelajahi?region=${encodeURIComponent(selectedRegion)}&category=${encodeURIComponent(selectedCategory)}`
    );
  };

  return (
    <section className="relative w-full bg-[#1a3a34] overflow-hidden text-white pt-12 pb-20 sm:pt-20 sm:pb-28 md:pt-24 md:pb-36 flex flex-col items-center">
      {/* Background Image with Caldera Scenery */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-30 scale-105 transform transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a34] via-[#1a3a34]/80 to-[#1a3a34]/60" />
      </div>

      {/* Batak Gorga Motif Watermark */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none opacity-10 flex justify-center items-center overflow-hidden">
        <svg className="w-[800px] sm:w-[1000px] h-[500px] sm:h-[600px] text-[#c29d59]" viewBox="0 0 800 500" fill="currentColor">
          <circle cx="400" cy="250" r="220" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
          <circle cx="400" cy="250" r="160" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="400" cy="250" r="100" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 4" />
          <path d="M400 30 L400 470 M180 250 L620 250" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Cultural Geo Tag & Brand Seal */}
        <div className="mb-4 sm:mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#c29d59]/40 shadow-sm">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-white p-0.5 shrink-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="SINDAR TOBA"
              width={24}
              height={24}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-cinzel text-[10px] sm:text-[11px] font-semibold tracking-[1.5px] sm:tracking-[2.5px] text-white uppercase">
            Kaldera Vulkanik UNESCO Global Geopark
          </span>
        </div>

        {/* Heading 1 - Editorial Elegance */}
        <h1 className="max-w-4xl text-3xl sm:text-5xl md:text-6xl font-light font-newsreader leading-[1.15] tracking-tight text-white mb-4 sm:mb-6">
          Temukan Keindahan dan{" "}
          <span className="italic font-normal text-[#c29d59]">Pengalaman Luhur</span>{" "}
          Danau Toba.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-[14px] sm:text-base md:text-lg text-white/85 font-sans font-normal leading-relaxed mb-8 sm:mb-10 px-2">
          Jelajahi keagungan tebing kaldera, tradisi tenun ulos ribuan tahun, sajian rempah andaliman,
          dan keramahan hangat di tepian danau vulkanik terbesar di dunia.
        </p>

        {/* Search Widget */}
        <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl sm:rounded-full p-2.5 sm:p-3 shadow-2xl text-[#1a3a34]">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full"
          >
            {/* Field 1: Kawasan */}
            <div className="flex-1 px-4 py-2 sm:py-2.5 text-left rounded-xl sm:rounded-full hover:bg-black/5 transition-colors">
              <label className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1.5px] text-[#b8653a] uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#b8653a]" />
                Kawasan Destinasi
              </label>
              <div className="relative mt-0.5">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-transparent font-semibold text-[13px] sm:text-[14px] text-[#1a3a34] focus:outline-none cursor-pointer pr-6 truncate"
                >
                  {regions.map((region) => (
                    <option key={region} value={region} className="text-[#1a3a34]">
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Divider for desktop */}
            <div className="hidden sm:block w-px h-8 bg-[#e8e2d9]" />

            {/* Field 2: Kategori */}
            <div className="flex-1 px-4 py-2 sm:py-2.5 text-left rounded-xl sm:rounded-full hover:bg-black/5 transition-colors">
              <label className="flex items-center gap-1.5 text-[10px] font-bold tracking-[1.5px] text-[#3d6b75] uppercase">
                <Compass className="w-3.5 h-3.5 text-[#3d6b75]" />
                Kategori Pengalaman
              </label>
              <div className="relative mt-0.5">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent font-semibold text-[13px] sm:text-[14px] text-[#1a3a34] focus:outline-none cursor-pointer pr-6 truncate"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="text-[#1a3a34]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white flex items-center justify-center gap-2 text-[12px] font-semibold tracking-[1px] uppercase shadow-lg transition-all shrink-0 active:scale-95"
            >
              <Search className="w-4 h-4 text-[#c29d59]" />
              <span>Eksplorasi</span>
            </button>
          </form>
        </div>

        {/* Quick Trending Tags */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 text-[12px] px-2">
          <span className="flex items-center gap-1.5 text-[#c29d59] font-semibold text-[11px] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Populer:
          </span>
          {quickTags.map((tag) => (
            <Link
              key={tag.name}
              href={tag.href}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 text-white text-[11.5px] transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}