"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, CheckCircle2, KeyRound, ArrowRight } from "lucide-react";
import { findRegisteredUser, resetTravelerPassword } from "@/lib/auth";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function LupaSandiPage() {
  const router = useRouter();
  const [step, setStep] = useState<"request" | "verify" | "success">("request");
  const [identifier, setIdentifier] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const cleanId = identifier.trim();
    if (!cleanId) {
      setErrorMessage("Silakan masukkan email atau nomor WhatsApp Anda.");
      return;
    }

    if (isSupabaseConfigured && supabase && cleanId.includes("@")) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(cleanId.toLowerCase(), {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/lupa-sandi` : undefined,
        });
        if (error) {
          console.warn("Supabase resetPassword error:", error.message);
        }
      } catch (err) {
        console.error("Supabase reset error:", err);
      }
    }

    setErrorMessage(null);
    setStep("verify");
  };

  const handleVerifyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMessage("Silakan masukkan kode OTP verifikasi 6 digit.");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMessage("Kata sandi baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi tidak cocok. Harap periksa kembali.");
      return;
    }

    const res = await resetTravelerPassword({ identifier, newPassword });
    if (!res.ok) {
      setErrorMessage(res.error || "Gagal memperbarui kata sandi.");
      return;
    }

    setErrorMessage(null);
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between py-6 text-[#1a3a34]">
      {/* Top Header Bar */}
      <header className="px-6 max-w-[1280px] w-full mx-auto flex items-center justify-between">
        <Link
          href="/masuk"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1a3a34] hover:text-[#b8653a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Masuk</span>
        </Link>
      </header>

      {/* Main Recovery Form */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white border border-[#e8e2d9] rounded-3xl p-8 sm:p-10 shadow-[0px_20px_45px_-15px_rgba(26,58,52,0.12)]">
          {/* Logo Brand */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="SINDAR TOBA"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Masukkan Email atau WhatsApp */}
          {step === "request" && (
            <div>
              <div className="text-center mb-6">
                <span className="font-cinzel text-[11px] font-semibold text-[#c29d59] tracking-[2.5px] uppercase block mb-1">
                  Keamanan Akun
                </span>
                <h1 className="font-newsreader text-2xl sm:text-3xl font-semibold text-[#1a3a34] tracking-tight">
                  Lupa Kata Sandi?
                </h1>
                <p className="text-[12.5px] sm:text-[13px] text-[#575e5b] mt-2 leading-relaxed">
                  Masukkan alamat email atau nomor WhatsApp terdaftar Anda. Kami akan mengirimkan tautan dan kode OTP verifikasi untuk mengatur ulang kata sandi.
                </p>
              </div>

              <form onSubmit={handleRequestReset} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                    Email atau Nomor WhatsApp Terdaftar
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="contoh@gmail.com / 0812..."
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-4 active:scale-95"
                >
                  <KeyRound className="w-4 h-4 text-[#c29d59]" />
                  <span>Kirim Tautan Pemulihan</span>
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Verifikasi OTP & Atur Sandi Baru */}
          {step === "verify" && (
            <div>
              <div className="text-center mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="font-newsreader text-2xl font-semibold text-[#1a3a34]">
                  Kode Terkirim
                </h2>
                <p className="text-[12px] text-[#575e5b] mt-1">
                  Kode verifikasi 6 digit telah dikirimkan ke <strong className="text-[#1a3a34]">{identifier}</strong>.
                </p>
              </div>

              <form onSubmit={handleVerifyReset} className="space-y-4">
                <div>
                  <label className="text-[11.5px] font-bold text-[#1f2937] uppercase tracking-wider block mb-1">
                    Kode OTP Verifikasi
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Contoh: 123456"
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[15px] font-mono tracking-widest text-center text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                  />
                  <span className="text-[11.5px] text-[#374151] block mt-1.5 text-center">
                    Masukkan 6 digit kode OTP verifikasi keamanan akun Anda.
                  </span>
                </div>

                <div>
                  <label className="text-[11.5px] font-bold text-[#1f2937] uppercase tracking-wider block mb-1">
                    Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#374151] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="Minimal 8 karakter"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11.5px] font-bold text-[#1f2937] uppercase tracking-wider block mb-1">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#374151] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="Ulangi kata sandi baru"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 mt-4 active:scale-95"
                >
                  <span>Simpan Kata Sandi Baru</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("request");
                      setErrorMessage(null);
                    }}
                    className="text-xs text-[#575e5b] hover:text-[#1a3a34] underline"
                  >
                    Ganti nomor/email atau kirim ulang kode
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Sukses */}
          {step === "success" && (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-newsreader text-2xl font-bold text-[#1a3a34] mb-2">
                Kata Sandi Diperbarui!
              </h2>
              <p className="text-[13px] text-[#575e5b] leading-relaxed mb-6">
                Kata sandi baru Anda telah aktif. Anda kini dapat masuk kembali ke akun SINDAR TOBA Anda.
              </p>
              <div className="space-y-3">
                <Link
                  href="/masuk"
                  className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Masuk dengan Kata Sandi Baru</span>
                  <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                </Link>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-8 pt-5 border-t border-[#e8e2d9] text-center">
            <p className="text-[12px] text-[#575e5b]">
              Ingat kata sandi Anda?{" "}
              <Link href="/masuk" className="font-semibold text-[#1a3a34] hover:text-[#b8653a]">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[11px] text-[#575e5b]">
        © 2026 SINDAR TOBA • BPODT (Badan Pelaksana Otorita Danau Toba)
      </footer>
    </div>
  );
}
