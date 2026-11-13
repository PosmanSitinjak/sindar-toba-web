import React from "react";
import { Award, Compass, HeartHandshake, ShieldCheck } from "lucide-react";

export default function TrustBannerSection() {
  const stats = [
    {
      value: "150+",
      label: "Mitra UMKM Terkurasi",
      description: "Penenun ulos, pemandu lokal, & homestay",
      icon: HeartHandshake,
    },
    {
      value: "45+",
      label: "Geosite UNESCO Resmi",
      description: "Destinasi geologis & cagar budaya terlindungi",
      icon: Compass,
    },
    {
      value: "98.4%",
      label: "Tingkat Kepuasan",
      description: "Berdasarkan ulasan wisatawan terverifikasi",
      icon: Award,
    },
    {
      value: "100%",
      label: "Otentik & Terpercaya",
      description: "Sistem reservasi berstandar resmi BPODT",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="w-full bg-[#f2ede5] border-b border-[#e8e2d9] py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#e8e2d9] flex items-center justify-center shrink-0 shadow-sm text-[#1a3a34]">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#c29d59]" />
              </div>
              <div>
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1a3a34] tracking-tight block">
                  {stat.value}
                </span>
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#1a3a34] block mt-0.5">
                  {stat.label}
                </span>
                <span className="text-[11px] text-[#575e5b] block mt-0.5 leading-snug">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}