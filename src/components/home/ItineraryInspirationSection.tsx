import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function ItineraryInspirationSection() {
  const itineraries = [
    {
      id: "3d2n-samosir",
      days: "3 Hari 2 Malam",
      title: "Pesona Kaldera Agung & Warisan Leluhur Samosir",
      route: "Silangit → Parapat → Tomok → Bukit Holbung → Pangururan",
      highlights: [
        "Matahari terbenam di punggung Bukit Holbung",
        "Eksplorasi situs megalitikum Makam Raja Sidabutar",
        "Mandi air panas alami Aek Rangat di kaki Pusuk Buhit",
        "Makan malam Ikan Mas Arsik di tepi danau Tuk-tuk",
      ],
      estimatedCost: "Rp 1.850.000",
      vibe: "Budaya & Panorama",
      image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2d1n-bakkara",
      days: "2 Hari 1 Malam",
      title: "Jejak Sejarah Raja Batak & Kopi Dataran Tinggi",
      route: "Silangit → Lembah Bakkara → Tipang → Lintongnihuta → Sipinsur",
      highlights: [
        "Menyusuri lembah mistis tanah kelahiran Sisingamangaraja",
        "Mata air sakral Aek Sipangolu & Air Terjun Janji",
        "Cupping kopi Arabika Lintong di kebun vulkanik",
        "Panorama Kaldera Toba dari ketinggian Pinus Sipinsur",
      ],
      estimatedCost: "Rp 1.250.000",
      vibe: "Sejarah & Gastronomi",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="w-full bg-[#faf8f5] border-b border-[#e8e2d9] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-cinzel text-[11px] font-semibold text-[#b8653a] tracking-[2px] sm:tracking-[2.75px] uppercase">
              Inspirasi Rencana Perjalanan
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal font-newsreader text-[#1a3a34] mt-1.5 tracking-tight">
              Rancang Perjalanan Kaldera yang Berkesan
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#575e5b] font-normal leading-relaxed mt-1">
              Pilihan rute terstruktur yang memadukan keajaiban alam, perjumpaan budaya, dan santap rempah Batak.
            </p>
          </div>

          <Link
            href="/rencana-perjalanan"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider shadow-sm transition-all self-start sm:self-end active:scale-95"
          >
            <span>Kustomisasi Rencana Sendiri</span>
            <ArrowRight className="w-4 h-4 text-[#c29d59] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2-Column Itinerary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {itineraries.map((itin) => (
            <div
              key={itin.id}
              className="group bg-white rounded-2xl border border-[#e8e2d9] overflow-hidden flex flex-col justify-between hover:border-[#c29d59] hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100">
                <img
                  src={itin.image}
                  alt={itin.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                <div className="absolute top-3.5 left-3.5 flex gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-white/95 text-[#1a3a34] text-[10.5px] font-bold tracking-wide uppercase shadow-sm">
                    {itin.days}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c29d59] text-white text-[10px] font-semibold tracking-wide uppercase">
                    {itin.vibe}
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <span className="text-[10.5px] font-medium text-[#c29d59] block mb-0.5 truncate">
                    Rute: {itin.route}
                  </span>
                  <h3 className="font-newsreader text-xl sm:text-[22px] font-semibold leading-snug">
                    {itin.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div className="mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#575e5b] block mb-2.5">
                    Sorotan Utama Rute:
                  </span>
                  <ul className="space-y-2">
                    {itin.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[12.5px] sm:text-[13px] text-[#2c3531]">
                        <Check className="w-3.5 h-3.5 text-[#c29d59] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#e8e2d9] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#575e5b] uppercase tracking-wider block">Estimasi Biaya Paket</span>
                    <span className="text-base sm:text-[18px] font-bold text-[#1a3a34]">
                      {itin.estimatedCost}
                      <span className="text-[11px] font-normal text-[#575e5b]"> /orang</span>
                    </span>
                  </div>

                  <Link
                    href={`/rencana-perjalanan?preset=${itin.id}`}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#faf8f5] hover:bg-[#1a3a34] text-[#1a3a34] hover:text-white border border-[#e8e2d9] hover:border-[#1a3a34] text-[11.5px] font-semibold tracking-wider uppercase transition-all shadow-sm active:scale-95"
                  >
                    Rincian Rute
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}