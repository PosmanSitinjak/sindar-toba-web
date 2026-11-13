import React from "react";
import Link from "next/link";
import { ArrowRight, Mountain, Utensils, Sparkles, Home, Map } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      id: "destinasi",
      title: "Destinasi Alam",
      description: "Air terjun megah, bukit pandang kaldera, dan savana teletubbies.",
      count: "68+ Titik",
      icon: Mountain,
      href: "/jelajahi?kategori=destinasi",
      color: "text-[#1a3a34]",
      bgColor: "bg-[#1a3a34]/10",
    },
    {
      id: "kuliner",
      title: "Kuliner & Rempah",
      description: "Kopi Arabika Lintong, kuliner andaliman, dan ikan mas arsik.",
      count: "45+ Kuliner",
      icon: Utensils,
      href: "/jelajahi?kategori=kuliner",
      color: "text-[#b8653a]",
      bgColor: "bg-[#b8653a]/10",
    },
    {
      id: "budaya",
      title: "Budaya & Kriya",
      description: "Tenun ulos autentik dari penenun asli dan ukir kayu gorga.",
      count: "32+ Sentra",
      icon: Sparkles,
      href: "/jelajahi?kategori=budaya",
      color: "text-[#c29d59]",
      bgColor: "bg-[#c29d59]/10",
    },
    {
      id: "penginapan",
      title: "Homestay & Villa",
      description: "Homestay tepi danau di Samosir, eco-resort berarsitektur Batak.",
      count: "54+ Akomodasi",
      icon: Home,
      href: "/jelajahi?kategori=penginapan",
      color: "text-[#3d6b75]",
      bgColor: "bg-[#3d6b75]/10",
    },
    {
      id: "paket-tur",
      title: "Paket Terkurasi",
      description: "Geosite UNESCO, rute perahu Solu Bolon, dan tur sejarah Raja.",
      count: "28+ Tur Resmi",
      icon: Map,
      href: "/jelajahi?kategori=paket-tur",
      color: "text-[#1a3a34]",
      bgColor: "bg-[#1a3a34]/10",
    },
  ];

  return (
    <section className="w-full bg-[#faf8f5] border-b border-[#e8e2d9] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-cinzel text-[11px] font-semibold text-[#b8653a] tracking-[2px] sm:tracking-[2.75px] uppercase">
              Kurasi Direktori
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal font-newsreader text-[#1a3a34] mt-1.5 tracking-tight">
              Jelajahi Ragam Keistimewaan Toba
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#575e5b] font-normal leading-relaxed mt-1">
              Panduan komprehensif merencanakan perjalanan bernilai luhur dengan reservasi aman dan terpercaya.
            </p>
          </div>

          <Link
            href="/jelajahi"
            className="group inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1a3a34] uppercase tracking-[1px] border-b border-[#1a3a34]/30 hover:border-[#1a3a34] transition-colors self-start sm:self-end pb-0.5"
          >
            <span>Lihat Semua Kategori</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group bg-white border border-[#e8e2d9] hover:border-[#c29d59] rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${cat.bgColor} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="font-newsreader text-base sm:text-lg font-semibold text-[#1a3a34] mb-1.5 leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-[#575e5b] leading-relaxed mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e8e2d9]/60 flex items-center justify-between text-[11px] font-semibold text-[#1a3a34]">
                  <span>{cat.count}</span>
                  <ArrowRight className="w-3 h-3 text-[#c29d59] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}