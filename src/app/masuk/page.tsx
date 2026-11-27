"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, ArrowLeft, CheckCircle2, AlertCircle, LogIn } from "lucide-react";
import { getLastRegisteredEmail, findRegisteredUser, loginTraveler } from "@/lib/auth";

export default function MasukPage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isJustRegistered, setIsJustRegistered] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");
      if (redirect) {
        setRedirectPath(redirect);
      }
      if (params.get("registered") === "true") {
        setIsJustRegistered(true);
        const lastEmail = getLastRegisteredEmail();
        if (lastEmail) {
          setEmailOrPhone(lastEmail);
          const regUser = findRegisteredUser(lastEmail);
          if (regUser?.name) setRegisteredName(regUser.name);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await loginTraveler({
      identifier: emailOrPhone,
      password,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMessage(result.error || "Gagal masuk. Periksa kembali email dan kata sandi Anda.");
      return;
    }

    const targetUrl = redirectPath || "/dashboard";
    router.push(targetUrl);
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

          {/* Banner Menuju Pemesanan Tiket */}
          {redirectPath && (
            <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5 shadow-sm">
              <LogIn className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Silakan masuk terlebih dahulu untuk melanjutkan pemesanan E-Tiket resmi Anda.</span>
            </div>
          )}

          {/* Banner Error Login */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-[12.5px] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="block">{errorMessage}</span>
                {errorMessage.toLowerCase().includes("daftar") && (
                  <Link
                    href={redirectPath ? `/daftar?redirect=${encodeURIComponent(redirectPath)}` : "/daftar"}
                    className="font-bold underline text-red-900 mt-1 inline-block"
                  >
                    Daftar Akun Baru →
                  </Link>
                )}
              </div>
            </div>
          )}

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
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? "Memverifikasi..." : "Masuk ke Akun"}</span>
              <ArrowRight className="w-4 h-4 text-[#c29d59]" />
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#e8e2d9] text-center text-[13px] text-[#575e5b]">
            Belum memiliki akun?{" "}
            <Link
              href={redirectPath ? `/daftar?redirect=${encodeURIComponent(redirectPath)}` : "/daftar"}
              className="font-semibold text-[#1a3a34] hover:text-[#b8653a]"
            >
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
