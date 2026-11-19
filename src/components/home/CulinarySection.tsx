import React from "react";
import Link from "next/link";
import { ShoppingBag, ShieldCheck } from "lucide-react";

export default function CulinarySection() {
  const products = [
    {
      id: "kopi-lintong-specialty",
      name: "Kopi Arabika Lintong Specialty (250g)",
      category: "Kopi Kaldera",
      producer: "Koperasi Tani Humbahas",
      price: "95.000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
      notes: "Notes: Dark Chocolate, Herbal Spice, Earthy Sweetness",
    },
    {
      id: "ulos-harungguan",
      name: "Kain Tenun Ulos Harungguan Asli Samosir",
      category: "Kriya Tenun",
      producer: "Sanggar Tenun Suhi-suhi",
      price: "850.000",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80",
      notes: "Pewarnaan Alami Daun Tarum & Kulit Kayu, 100% Gedog",
    },
    {
      id: "sambal-andaliman-organik",
      name: "Pasta Sambal Andaliman Segar (180g)",
      category: "Rempah Khas Toba",
      producer: "Dapur Olahan Meat Balige",
      price: "55.000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
      notes: "Sensasi Getir Khas Jeruk Andaliman Asli Hutan Kaldera",
    },
    {
      id: "kriya-gorga-kayu",
      name: "Plakat Ukir Kayu Gorga Simataniari",
      category: "Kriya Ukir Kayu",
      producer: "Perajin Seni Desa Tomok",
      price: "340.000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
      notes: "Simbol Kemakmuran & Penolak Bala, Kayu Mahoni",
    },
  ];

  return (
    <section className="w-full bg-[#f8f6f2] border-b border-[#e8e2d9] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 sm:gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <span className="font-cinzel text-[11px] font-semibold text-[#c29d59] tracking-[2px] sm:tracking-[2.75px] uppercase">
              Produk Unggulan UMKM
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal font-newsreader text-[#1a3a34] mt-1.5 tracking-tight">
              Karya Luhur Para Pengrajin & Cita Rasa Kaldera
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#575e5b] font-normal leading-relaxed mt-1">
              Beli langsung dari tangan pertama petani dan penenun lokal untuk menggerakkan perekonomian masyarakat lingkar danau.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11.5px] sm:text-[12px] text-[#1a3a34] bg-white px-3.5 py-1.5 rounded-full border border-[#e8e2d9] shadow-sm self-start md:self-end">
            <ShieldCheck className="w-4 h-4 text-[#c29d59] shrink-0" />
            <span className="font-medium">100% Produk Otentik Terverifikasi BPODT</span>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-[#e8e2d9] overflow-hidden flex flex-col justify-between hover:border-[#b8653a] hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-52 sm:h-56 w-full bg-[#f2ede5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-[#1a3a34] shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[11px] text-[#575e5b] block mb-1">
                    {item.producer}
                  </span>
                  <h3 className="font-newsreader text-base sm:text-[18px] font-semibold text-[#1a3a34] mb-1.5 leading-snug group-hover:text-[#b8653a] transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#575e5b] bg-[#faf8f5] p-2 rounded-lg border border-[#e8e2d9]/60 mb-3 leading-relaxed">
                    {item.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e8e2d9]/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#575e5b] block">Harga</span>
                    <span className="text-[15px] sm:text-[16px] font-bold text-[#1a3a34]">
                      Rp {item.price}
                    </span>
                  </div>

                  <Link
                    href={`/jelajahi?kategori=kuliner`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a3a34] hover:bg-[#b8653a] text-white text-[11px] font-semibold tracking-wider uppercase transition-colors active:scale-95 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Lihat</span>
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