"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export default function MitraLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("homestay.rurabatak@gmail.com");
  const [password, setPassword] = useState("••••••••••••");
  const [partnerCode, setPartnerCode] = useState("MIT-BPODT-0482");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("sindar_role", "mitra");
      localStorage.setItem("sindar_mitra_name", "Homestay Rura Batak");
    }
    router.push("/mitra/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a3a34] flex flex-col justify-between py-6">
      {/* Top Header Bar */}
      <header className="px-4 sm:px-6 max-w-[1280px] w-full mx-auto flex items-center justify-between">
        <Link
          href="/mitra"
          className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#1a3a34] hover:text-[#b8653a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Informasi Mitra</span>
        </Link>
      </header>

      {/* Main Login Form */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white border border-[#e8e2d9] rounded-3xl p-6 sm:p-10 shadow-[0px_20px_45px_-15px_rgba(26,58,52,0.12)]">
          <div className="text-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SINDAR TOBA"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a3a34]/10 border border-[#1a3a34]/20 text-[#1a3a34] text-[10.5px] font-bold tracking-widest uppercase mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#c29d59]" />
              <span>Portal Mitra Usaha</span>
            </div>
            <h1 className="font-newsreader text-2xl sm:text-3xl font-semibold text-[#1a3a34] tracking-tight">
              Masuk ke Akun Mitra
            </h1>
            <p className="text-[12.5px] sm:text-[13px] text-[#575e5b] mt-2 leading-relaxed">
              Kelola kamar homestay, pemesanan kriya tenun, kuota tur perahu, dan pencairan saldo Anda.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email or Phone */}
            <div>
              <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                Email Usaha atau No. WhatsApp
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="contoh@gmail.com / 0812..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider">
                  Kata Sandi
                </label>
                <Link
                  href="/lupa-sandi"
                  className="text-[11px] text-[#b8653a] hover:underline font-medium"
                >
                  Lupa Kata Sandi?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            {/* Kode Mitra BPODT */}
            <div>
              <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                Kode Kemitraan BPODT (Opsional)
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-[#c29d59] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={partnerCode}
                  onChange={(e) => setPartnerCode(e.target.value)}
                  placeholder="Contoh: MIT-BPODT-0482"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] font-mono text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-semibold text-[12.5px] uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Masuk ke Dashboard Mitra</span>
              <ArrowRight className="w-4 h-4 text-[#c29d59]" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 pt-5 border-t border-[#e8e2d9] text-center">
            <span className="text-[12.5px] text-[#575e5b]">
              Belum terdaftar sebagai pelaku usaha?{" "}
            </span>
            <Link
              href="/mitra/daftar"
              className="text-[12.5px] font-bold text-[#b8653a] hover:underline"
            >
              Daftar Mitra Baru
            </Link>
          </div>

          {/* Verification Badge */}
          <div className="p-3.5 rounded-2xl bg-[#f2ede5] border border-[#e8e2d9] flex items-center gap-3 text-[11.5px] text-[#575e5b]">
            <CheckCircle2 className="w-4 h-4 text-[#c29d59] shrink-0" />
            <span>Terhubung langsung ke sistem pencairan Bank Sumut resmi BPODT</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[11.5px] text-[#575e5b]">
        SINDAR TOBA PARTNERS • Badan Pelaksana Otorita Danau Toba (BPODT)
      </footer>
    </div>
  );
}