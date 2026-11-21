"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function MasukPage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isJustRegistered, setIsJustRegistered] = useState(false);
  const [registeredName, setRegisteredName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("registered") === "true") {
        setIsJustRegistered(true);
      }
      const savedEmail = localStorage.getItem("sindar_user_email");
      const savedName = localStorage.getItem("sindar_user_name");
      if (savedEmail) {
        setEmailOrPhone(savedEmail);
      }
      if (savedName) {
        setRegisteredName(savedName);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanIdentifier = emailOrPhone.trim();

    // 1. Verifikasi dengan Supabase Authentication jika memasukkan email
    if (isSupabaseConfigured && supabase && cleanIdentifier.includes("@")) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanIdentifier,
          password: password,
        });

        if (!error && data?.user) {
          const meta = data.user.user_metadata;
          if (meta?.full_name && typeof window !== "undefined") {
            localStorage.setItem("sindar_user_name", meta.full_name);
          }
          if (meta?.phone && typeof window !== "undefined") {
            localStorage.setItem("sindar_user_phone", meta.phone);
          }
        }
      } catch (err) {
        console.error("Supabase login check:", err);
      }
    }

    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("sindar_user_email");
      const savedName = localStorage.getItem("sindar_user_name");

      let finalName = "";
      if (savedEmail && savedEmail.toLowerCase() === cleanIdentifier.toLowerCase() && savedName) {
        finalName = savedName;
      } else {
        finalName = cleanIdentifier.includes("@")
          ? cleanIdentifier.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          : cleanIdentifier || "Wisatawan";
      }

      localStorage.setItem("sindar_role", "user");
      localStorage.setItem("sindar_user_name", finalName);
      localStorage.setItem("sindar_user_email", cleanIdentifier);
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between">
      {/* Top Bar */}
      <header className="px-6 py-5 max-w-[1280px] w-full mx-auto flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1a3a34] hover:text-[#b8653a] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </header>

      {/* Main Form Center */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white border border-[#e8e2d9] rounded-3xl p-8 sm:p-10 shadow-[0px_20px_45px_-15px_rgba(26,58,52,0.12)]">
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
            <span className="font-cinzel text-[11px] font-semibold text-[#c29d59] tracking-[2.5px] uppercase block mb-1">
              Portal Wisatawan
            </span>
            <h1 className="font-newsreader text-3xl font-semibold text-[#1a3a34] tracking-tight">
              Masuk ke Akun Anda
            </h1>
            <p className="text-[13px] text-[#575e5b] mt-2">
              Akses e-tiket kaldera, riwayat pemesanan geosite, dan koleksi kriya favorit Anda.
            </p>
          </div>

          {/* Quick Google SSO */}
          <button
            type="button"
            onClick={() => {
              const savedEmail = typeof window !== "undefined" ? localStorage.getItem("sindar_user_email") : null;
              const savedName = typeof window !== "undefined" ? localStorage.getItem("sindar_user_name") : null;
              const inputName = prompt("Simulasi Masuk Akun Google SSO. Masukkan Nama Akun Anda:", savedName || "Wisatawan Danau Toba") || savedName || "Wisatawan Danau Toba";
              const cleanName = inputName.trim();
              const gEmail = savedEmail || `${cleanName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`;
              if (typeof window !== "undefined") {
                localStorage.setItem("sindar_role", "user");
                localStorage.setItem("sindar_user_name", cleanName);
                localStorage.setItem("sindar_user_email", gEmail);
              }
              router.push("/dashboard");
            }}
            className="w-full py-2.5 px-4 rounded-xl border border-[#e8e2d9] bg-white hover:bg-slate-50 text-[13px] font-semibold text-[#1a3a34] flex items-center justify-center gap-2.5 transition-colors shadow-sm mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Masuk dengan Google</span>
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-[#e8e2d9] w-full" />
            <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-[#575e5b] absolute">
              atau dengan email / wa
            </span>
          </div>

          {/* Banner Pendaftaran Berhasil */}
          {isJustRegistered && (
            <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[12.5px] flex items-start gap-3 shadow-sm animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-emerald-950 text-[13px]">
                  Pendaftaran Akun Berhasil{registeredName ? `, ${registeredName}` : ""}!
                </span>
                <span className="text-[11.5px] text-emerald-800 leading-snug block mt-0.5">
                  Akun Anda telah terdaftar. Silakan masukkan kata sandi Anda di bawah untuk masuk ke dashboard.
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                Alamat Email atau Nomor WhatsApp
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="contoh@gmail.com / 0812..."
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block">
                  Kata Sandi
                </label>
                <Link href="/lupa-sandi" className="text-[11px] text-[#b8653a] hover:underline font-medium">
                  Lupa Sandi?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <span>Masuk ke Akun</span>
              <ArrowRight className="w-4 h-4 text-[#c29d59]" />
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#e8e2d9] text-center text-[13px] text-[#575e5b]">
            Belum memiliki akun?{" "}
            <Link href="/daftar" className="font-semibold text-[#1a3a34] hover:text-[#b8653a]">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="py-4 text-center text-[11px] text-[#575e5b]">
        © 2026 SINDAR TOBA • Kaldera UNESCO • Warisan Batak
      </footer>
    </div>
  );
}
