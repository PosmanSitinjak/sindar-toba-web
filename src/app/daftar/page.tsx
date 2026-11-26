"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Mail, User, Phone, ArrowLeft, CheckCircle2, Gift, Sparkles, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { registerTraveler } from "@/lib/auth";

export default function DaftarPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referralCode: "",
    agreeTerms: true,
  });
  const [referralValid, setReferralValid] = useState(false);

  // Auto-detect referral code from query string: ?ref=KODE
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const refParam = params.get("ref");
      if (refParam) {
        setFormData((prev) => ({ ...prev, referralCode: refParam.toUpperCase() }));
        setReferralValid(true);
      }
    }
  }, []);

  const handleReferralChange = (val: string) => {
    const code = val.toUpperCase().trim();
    setFormData((prev) => ({ ...prev, referralCode: code }));
    setReferralValid(code.length >= 4);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const trimmedName = formData.name.trim();
    const result = await registerTraveler({
      name: trimmedName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      referralCode: formData.referralCode,
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMessage(result.error || "Pendaftaran gagal. Silakan periksa kembali data Anda.");
      return;
    }

    router.push("/masuk?registered=true");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between py-6">
      {/* Top Bar */}
      <header className="px-6 max-w-[1280px] w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1a3a34] hover:text-[#b8653a] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </header>

      {/* Main Registration Form Center */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-white border border-[#e8e2d9] rounded-3xl p-8 sm:p-10 shadow-[0px_20px_45px_-15px_rgba(26,58,52,0.12)]">
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
              Registrasi Wisatawan
            </span>
            <h1 className="font-newsreader text-3xl font-semibold text-[#1a3a34] tracking-tight">
              Daftar Akun Baru
            </h1>
            <p className="text-[13px] text-[#575e5b] mt-2">
              Dapatkan akses e-tiket instan, rencana perjalanan tersimpan, dan kurasi eksklusif seputar kaldera.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-[12.5px] flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Nama sesuai KTP / Paspor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="contoh@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block">
                  Nomor WhatsApp Aktif
                </label>
                <span className="text-[10px] text-emerald-700 font-medium">
                  E-Tiket dikirim ke nomor ini
                </span>
              </div>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#575e5b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Minimal 8 karakter"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            {/* Kode Referral Field */}
            <div className="p-3.5 rounded-2xl bg-[#f5efe6]/70 border border-[#c29d59]/40">
              <div className="mb-1.5">
                <label className="text-[11px] font-bold text-[#1a3a34] uppercase tracking-wider flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#b8653a]" />
                  <span>Kode Referral Teman (Opsional)</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Contoh: TOBA-BUDI2026"
                  value={formData.referralCode}
                  onChange={(e) => handleReferralChange(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#e8e2d9] text-[13px] font-mono tracking-wider font-semibold text-[#1a3a34] placeholder:font-sans placeholder:font-normal placeholder:text-gray-400 focus:outline-none focus:border-[#c29d59]"
                />
                {referralValid && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Aktif</span>
                  </div>
                )}
              </div>
              {referralValid && (
                <p className="text-[11px] text-emerald-800 mt-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c29d59] shrink-0" />
                  <span>
                    Kode valid! Pengajak Anda akan mendapatkan <strong>komisi Rp 25.000</strong> dan Anda mendapatkan voucher sambutan Danau Toba.
                  </span>
                </p>
              )}
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 text-[12px] text-[#575e5b] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded text-[#1a3a34]"
                  required
                />
                <span>
                  Saya menyetujui{" "}
                  <Link href="/syarat-ketentuan" className="text-[#1a3a34] underline font-medium">
                    Syarat & Ketentuan Layanan
                  </Link>{" "}
                  serta berkomitmen menjaga kelestarian alam dan kearifan budaya kaldera Danau Toba.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              <span>{isSubmitting ? "Memproses Pendaftaran..." : "Buat Akun Wisatawan"}</span>
              <ArrowRight className="w-4 h-4 text-[#c29d59]" />
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-[#e8e2d9] text-center text-[13px] text-[#575e5b]">
            Sudah memiliki akun?{" "}
            <Link href="/masuk" className="font-semibold text-[#1a3a34] hover:text-[#b8653a]">
              Masuk di sini
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
