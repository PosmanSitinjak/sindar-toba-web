"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";

export default function PopularDestinationsSection() {
  const [activeTab, setActiveTab] = useState("Semua");

  const filterTabs = [
    "Semua",
    "Pulau Samosir",
    "Parapat & Toba",
    "Balige",
    "Humbang Hasundutan",
  ];

  const destinations = [
    {
      id: "bukit-holbung",
      name: "Bukit Holbung",
      category: "Geosite Alam",
      region: "Pulau Samosir",
      subregion: "Harian Boho, Samosir",
      rating: 4.9,
      reviews: 1240,
      price: "15.000",
      image: "/images/destinations/bukit-holbung.jpg",
      description: "Pemandangan bukit savana hijau yang membentang luas berhadapan langsung dengan kaldera Danau Toba.",
      badge: "Favorit Wisatawan",
    },
    {
      id: "desa-tomok",
      name: "Desa Wisata Tomok",
      category: "Warisan Budaya",
      region: "Pulau Samosir",
      subregion: "Simanindo, Samosir",
      rating: 4.8,
      reviews: 890,
      price: "25.000",
      image: "/images/destinations/desa-tomok.jpg",
      description: "Pusat kebudayaan Batak kuno, makam batu Raja Sidabutar, dan pertunjukan sakral Patung Sigale-gale.",
      badge: "Situs Bersejarah",
    },
    {
      id: "lembah-bakkara",
      name: "Lembah Bakkara & Aek Sipangolu",
      category: "Geosite & Budaya",
      region: "Humbang Hasundutan",
      subregion: "Bakti Raja, Humbahas",
      rating: 4.9,
      reviews: 520,
      price: "20.000",
      image: "/images/destinations/lembah-bakkara.jpg",
      description: "Lembah subur diapit tebing terjal kaldera, mata air abadi Aek Sipangolu, dan istana Raja Sisingamangaraja.",
      badge: "Pemandangan Spektakuler",
    },
    {
      id: "bukit-tarabunga",
      name: "Bukit Tarabunga Balige",
      category: "Geosite Alam",
      region: "Balige",
      subregion: "Tampahan, Toba",
      rating: 4.9,
      reviews: 410,
      price: "10.000",
      image: "/images/destinations/bukit-tarabunga.jpg",
      description: "Titik terbaik menikmati matahari terbenam dengan pemandangan lekuk danau dan hamparan sawah bertingkat.",
      badge: "Sunset Point",
    },
    {
      id: "parapat-lakefront",
      name: "Semenanjung Parapat & Batu Gantung",
      category: "Wisata Danau",
      region: "Parapat & Toba",
      subregion: "Girsang Sipangan Bolon",
      rating: 4.7,
      reviews: 980,
      price: "50.000",
      image: "/images/destinations/sigale-gale.jpg",
      description: "Tur perahu motor menyusuri tebing legenda Batu Gantung dan menikmati angin sejuk teluk Parapat.",
      badge: "Tur Perahu",
    },
    {
      id: "air-terjun-efrata",
      name: "Air Terjun Efrata",
      category: "Geosite Alam",
      region: "Pulau Samosir",
      subregion: "Sosor Dolok, Samosir",
      rating: 4.8,
      reviews: 640,
      price: "10.000",
      image: "/images/destinations/sipiso-piso.jpg",
      description: "Tirai air megah setinggi 20 meter yang dikelilingi perbukitan hijau rimbun dan persawahan asri.",
      badge: "Air Terjun Alami",
    },
  ];

  const filteredDestinations =
    activeTab === "Semua"
      ? destinations
      : destinations.filter((d) => d.region === activeTab);

  return (
    <section className="w-full bg-[#f8f6f2] border-b border-[#e8e2d9] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 sm:gap-10">
        {/* Header and Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <span className="font-cinzel text-[11px] font-semibold text-[#c29d59] tracking-[2px] sm:tracking-[2.75px] uppercase">
              Pilihan Populer
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal font-newsreader text-[#1a3a34] mt-1.5 tracking-tight">
              Destinasi Ikonik Paling Dicari
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#575e5b] font-normal leading-relaxed mt-1">
              Jelajahi titik-titik legendaris kaldera yang telah dikurasi oleh para penjelajah lokal.
            </p>
          </div>

          {/* Horizontal scrollable Filter Pills on mobile */}
          <div className="flex items-center gap-1.5 bg-[#f2ede5] border border-[#e8e2d9] p-1.5 rounded-full overflow-x-auto no-scrollbar max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11.5px] sm:text-[12px] font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-[#1a3a34] text-white shadow-sm"
                    : "text-[#575e5b] hover:text-[#1a3a34]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Listing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-[#e8e2d9] overflow-hidden flex flex-col justify-between hover:border-[#c29d59] hover:shadow-xl transition-all duration-300"
            >
              {/* Image & Badges */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-[#1a3a34] shadow-sm">
                    {item.badge}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                  <Star className="w-3 h-3 fill-[#c29d59] text-[#c29d59]" />
                  <span>{item.rating}</span>
                  <span className="text-white/60 text-[10px]">({item.reviews})</span>
                </div>

                {/* Region Tag */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/95 text-[11.5px] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#c29d59]" />
                  <span>{item.subregion}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#b8653a]">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-[20px] font-semibold font-newsreader text-[#1a3a34] mt-1 mb-2 leading-snug group-hover:text-[#b8653a] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[13px] text-[#575e5b] line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="pt-3.5 border-t border-[#e8e2d9]/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#575e5b] uppercase tracking-wider block">Tiket Masuk</span>
                    <span className="text-[15px] sm:text-[16px] font-bold text-[#1a3a34]">
                      Rp {item.price}
                      <span className="text-[11px] font-normal text-[#575e5b]"> /org</span>
                    </span>
                  </div>

                  <Link
                    href={`/destinasi/${item.id}`}
                    className="px-4 py-2 rounded-full bg-[#faf8f5] hover:bg-[#1a3a34] text-[#1a3a34] hover:text-white border border-[#e8e2d9] hover:border-[#1a3a34] text-[11.5px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <span>Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-2">
          <Link
            href="/jelajahi"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold tracking-[1px] uppercase shadow-md transition-all active:scale-95"
          >
            <span>Jelajahi 68+ Destinasi Kaldera Lainnya</span>
            <ArrowRight className="w-4 h-4 text-[#c29d59]" />
          </Link>
        </div>
      </div>
    </section>
  );
}