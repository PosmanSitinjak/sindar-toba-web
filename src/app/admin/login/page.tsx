"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, UserCheck, ArrowRight, ArrowLeft, KeyRound, AlertTriangle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("BPODT-ADM-018");
  const [password, setPassword] = useState("••••••••••••");
  const [securityPin, setSecurityPin] = useState("892014");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#122a25] text-white flex flex-col justify-between py-6 relative overflow-hidden">
      {/* Background Subtle Gorga Accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <svg className="w-[1200px] h-[600px] text-[#c29d59]" viewBox="0 0 1000 500" fill="currentColor">
          <circle cx="500" cy="250" r="200" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="500" cy="250" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
          <path d="M500 0 L500 500 M0 250 L1000 250" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Top Header */}
      <header className="px-6 max-w-[1280px] w-full mx-auto flex items-center justify-between relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website Utama</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1a3a34] border border-[#c29d59] flex items-center justify-center">
            <span className="font-cinzel text-xs font-bold text-[#c29d59]">ST</span>
          </div>
          <span className="font-cinzel text-sm font-semibold tracking-widest text-white">
            BPODT CONSOLE
          </span>
        </div>
      </header>

      {/* Main Form Center */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md bg-[#1a3a34]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c29d59]/20 border border-[#c29d59]/40 text-[#c29d59] text-[10px] font-bold tracking-widest uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Akses Khusus Pengelola</span>
            </div>
            <h1 className="font-newsreader text-3xl font-semibold text-white tracking-tight">
              Konsol Superadmin BPODT
            </h1>
            <p className="text-[12px] text-white/70 mt-2 leading-relaxed">
              Pusat kendali ekosistem pariwisata kaldera, verifikasi mitra UMKM, dan audit transaksi resmi Danau Toba.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-white/75 uppercase tracking-wider block mb-1">
                NIP / ID Administrator
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-[#c29d59] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[13px] text-white focus:outline-none focus:border-[#c29d59]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-white/75 uppercase tracking-wider block mb-1">
                Kata Sandi Pengelola
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#c29d59] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[13px] text-white focus:outline-none focus:border-[#c29d59]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-white/75 uppercase tracking-wider block mb-1">
                Kode Keamanan 2FA / OTP
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#c29d59] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="6 Digit Kode OTP"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-[13px] text-white tracking-widest font-mono focus:outline-none focus:border-[#c29d59]"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/20 border border-white/10 flex items-start gap-2.5 text-[11px] text-white/70">
              <AlertTriangle className="w-4 h-4 text-[#c29d59] shrink-0 mt-0.5" />
              <span>
                Setiap aktivitas di dalam konsol ini tercatat secara terenkripsi dalam log audit pemerintah.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#c29d59] hover:bg-[#b08b47] text-[#1a3a34] font-bold text-[12px] uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              <span>Otorisasi & Masuk Konsol</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-white/50 relative z-10">
        Badan Pelaksana Otorita Danau Toba (BPODT) • Kementerian Pariwisata dan Ekonomi Kreatif RI
      </footer>
    </div>
  );
}
