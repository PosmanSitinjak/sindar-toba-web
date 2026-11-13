import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#132a25] text-white pt-14 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#c29d59]/30">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 sm:gap-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="sm:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-all">
                <Image
                  src="/logo.png"
                  alt="SINDAR TOBA"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-[17px] sm:text-[19px] font-bold text-white tracking-[2.5px] sm:tracking-[3px] group-hover:text-[#c29d59] transition-colors">
                  SINDAR TOBA
                </span>
                <span className="text-[9px] font-medium text-[#c29d59] tracking-[1.5px] uppercase">
                  Kaldera UNESCO • Warisan Batak
                </span>
              </div>
            </Link>

            <p className="text-[13px] text-white/75 leading-relaxed max-w-sm">
              Platform kurasi resmi pariwisata berkelas dunia, pelestarian warisan budaya Batak,
              dan pemberdayaan ekonomi UMKM di sekeliling kaldera Danau Toba.
            </p>

            <div className="flex items-center gap-3 mt-1 text-white/80">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c29d59] hover:text-[#1a3a34] flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c29d59] hover:text-[#1a3a34] flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c29d59] hover:text-[#1a3a34] flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Eksplorasi */}
          <div>
            <h4 className="font-cinzel text-[12px] sm:text-[13px] font-semibold tracking-wider text-[#c29d59] uppercase mb-4">
              Eksplorasi Kaldera
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/75">
              <li>
                <Link href="/jelajahi?kategori=destinasi" className="hover:text-white transition-colors block py-0.5">
                  Destinasi Wisata Alam
                </Link>
              </li>
              <li>
                <Link href="/pengalaman" className="hover:text-white transition-colors block py-0.5">
                  Pengalaman Budaya
                </Link>
              </li>
              <li>
                <Link href="/jelajahi?kategori=kuliner" className="hover:text-white transition-colors block py-0.5">
                  Kuliner & Rempah Toba
                </Link>
              </li>
              <li>
                <Link href="/jelajahi?kategori=penginapan" className="hover:text-white transition-colors block py-0.5">
                  Homestay Tradisional
                </Link>
              </li>
              <li>
                <Link href="/jelajahi" className="hover:text-white transition-colors block py-0.5">
                  Peta Sebaran Geosite
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Perjalanan */}
          <div>
            <h4 className="font-cinzel text-[12px] sm:text-[13px] font-semibold tracking-wider text-[#c29d59] uppercase mb-4">
              Perjalanan & Adat
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/75">
              <li>
                <Link href="/rencana-perjalanan" className="hover:text-white transition-colors block py-0.5">
                  Travel Itinerary Planner
                </Link>
              </li>
              <li>
                <Link href="/etika-budaya" className="hover:text-white transition-colors block py-0.5">
                  Etika Berkunjung ke Huta
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors block py-0.5">
                  E-Tiket & Dashboard Tamu
                </Link>
              </li>
              <li>
                <Link href="/bantuan" className="hover:text-white transition-colors block py-0.5">
                  Pusat Bantuan & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Ekosistem Mitra & Admin */}
          <div>
            <h4 className="font-cinzel text-[12px] sm:text-[13px] font-semibold tracking-wider text-[#c29d59] uppercase mb-4">
              Ekosistem Mitra
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/75">
              <li>
                <Link href="/mitra/daftar" className="text-[#c29d59] font-medium hover:underline block py-0.5">
                  Daftar Sebagai Mitra
                </Link>
              </li>
              <li>
                <Link href="/mitra" className="hover:text-white transition-colors block py-0.5">
                  Info Kemitraan UMKM
                </Link>
              </li>
              <li>
                <Link href="/mitra/login" className="hover:text-white transition-colors block py-0.5">
                  Login Mitra Usaha
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-white/50 hover:text-white transition-colors block py-0.5 text-[12px]">
                  Konsol BPODT (Admin)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/60 text-center md:text-left">
          <p>© 2026 SINDAR TOBA. Hak Cipta Dilindungi.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="text-[#c29d59] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#c29d59]" />
              Didukung Resmi BPODT & Kemenparekraf
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}