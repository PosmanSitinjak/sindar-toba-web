import React from "react";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";

export default function LocalExperiencesSection() {
  const experiences = [
    {
      id: "menenun-ulos",
      title: "Workshop Menenun Ulos bersama Maestro Desa Suhi-suhi",
      location: "Lumban Suhi-suhi, Samosir",
      duration: "3 Jam",
      groupSize: "Maks. 6 org",
      price: "175.000",
      image: "/images/destinations/tenun-ulos.jpg",
      category: "Kriya & Tenun",
      desc: "Pelajari filosofi ragi motif Harungguan, teknik pewarnaan alam dari daun tanaman lokal, dan praktik menenun langsung.",
    },
    {
      id: "kopi-lintong",
      title: "Jelajah Kebun & Cupping Kopi Arabika Lintong Specialty",
      location: "Lintongnihuta, Humbahas",
      duration: "4 Jam",
      groupSize: "Maks. 8 org",
      price: "220.000",
      image: "/images/destinations/kopi-lintong.jpg",
      category: "Agrowisata Kopi",
      desc: "Menyusuri kebun kopi vulkanik di ketinggian 1.400 mdpl, memetik ceri kopi merah, serta teknik sangrai khas Batak.",
    },
    {
      id: "perahu-solu",
      title: "Pelayaran Damai Kaldera dengan Perahu Kayu Solu Bolon",
      location: "Perairan Tuk-tuk, Samosir",
      duration: "2 Jam",
      groupSize: "Maks. 10 org",
      price: "250.000",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      category: "Wisata Danau",
      desc: "Mengarungi danau vulkanik hening saat kabut pagi merekah dengan perahu kayu bertatahkan ornamen Gorga Batak.",
    },
    {
      id: "kuliner-andaliman",
      title: "Masterclass Kuliner Rempah Andaliman & Ikan Mas Arsik",
      location: "Meat, Balige, Toba",
      duration: "3.5 Jam",
      groupSize: "Maks. 6 org",
      price: "190.000",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
      category: "Gastronomi",
      desc: "Mengenal 'merica Batak' andaliman yang memberikan sensasi getir segar khas, dipadukan kecombrang dan asam gelugur.",
    },
  ];

  return (
    <section className="w-full bg-[#faf8f5] border-b border-[#e8e2d9] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-cinzel text-[11px] font-semibold text-[#b8653a] tracking-[2px] sm:tracking-[2.75px] uppercase">
              Pengalaman Otentik
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal font-newsreader text-[#1a3a34] mt-1.5 tracking-tight">
              Selami Kehidupan Luhur Masyarakat Batak
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#575e5b] font-normal leading-relaxed mt-1">
              Bukan sekadar melihat, namun ikut merasakan denyut tradisi para penenun, tetua adat, dan petani kaldera.
            </p>
          </div>

          <Link
            href="/pengalaman"
            className="group inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1a3a34] uppercase tracking-[1px] border-b border-[#1a3a34]/30 hover:border-[#1a3a34] transition-colors self-start sm:self-end pb-0.5"
          >
            <span>Lihat Semua Pengalaman</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group bg-white rounded-2xl border border-[#e8e2d9] overflow-hidden flex flex-col justify-between hover:border-[#c29d59] hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-[#1a3a34]">
                  {exp.category}
                </span>
                <span className="absolute bottom-2.5 left-3 text-[11px] text-white/95 font-medium">
                  {exp.location}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-newsreader text-base sm:text-[18px] font-semibold text-[#1a3a34] mb-1.5 leading-snug group-hover:text-[#b8653a] transition-colors line-clamp-2">
                    {exp.title}
                  </h3>
                  <p className="text-[12px] text-[#575e5b] line-clamp-2 leading-relaxed mb-3">
                    {exp.desc}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-[#575e5b] mb-3 pb-3 border-b border-[#e8e2d9]/60">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c29d59]" />
                      {exp.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#c29d59]" />
                      {exp.groupSize}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#575e5b] block">Mulai dari</span>
                    <span className="text-[15px] font-bold text-[#1a3a34]">
                      Rp {exp.price}
                    </span>
                  </div>

                  <Link
                    href={`/pengalaman/${exp.id}`}
                    className="px-3.5 py-1.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[11px] font-semibold tracking-wider uppercase transition-colors active:scale-95 shadow-sm"
                  >
                    Ikuti
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