"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, Mail, User, Phone, ArrowLeft, ShieldCheck, CheckCircle2, Gift, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();

    // 1. Simpan ke database Supabase Authentication
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signUp({
          email: trimmedEmail,
          password: formData.password,
          options: {
            data: {
              full_name: trimmedName,
              phone: trimmedPhone,
              referral_code: formData.referralCode || null,
            },
          },
        });
      } catch (err) {
        console.error("Supabase auth signup error:", err);
      }
    }

    if (typeof window !== "undefined") {
      // Set user role & exact submitted identity
      localStorage.setItem("sindar_role", "user");
      localStorage.setItem("sindar_user_name", trimmedName);
      localStorage.setItem("sindar_user_phone", trimmedPhone);
      localStorage.setItem("sindar_user_email", trimmedEmail);

      // Pastikan akun baru mulai bersih tanpa tiket, komisi, itinerary, atau favorit dari sesi sebelumnya
      localStorage.removeItem("sindar_purchased_tickets");
      localStorage.removeItem("sindar_referral_balance");
      localStorage.removeItem("sindar_referrals_data");
      localStorage.removeItem("sindar_wishlist");
      localStorage.removeItem("sindar_itineraries");

      // Save referral tracking if code was used
      if (formData.referralCode) {
        localStorage.setItem("sindar_applied_referral", formData.referralCode);
        
        // Add new record to simulated referral network
        const existingReferrals = JSON.parse(localStorage.getItem("sindar_referrals_data") || "[]");
        existingReferrals.unshift({
          id: `REF-${Date.now().toString().slice(-4)}`,
          name: trimmedName,
          date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
          commission: 25000,
          status: "Komisi Masuk",
          phone: trimmedPhone,
        });
        localStorage.setItem("sindar_referrals_data", JSON.stringify(existingReferrals));

        // Increment earnings
        const currentBalance = parseInt(localStorage.getItem("sindar_referral_balance") || "0", 10);
        localStorage.setItem("sindar_referral_balance", (currentBalance + 25000).toString());
      }
    }

    setIsSubmitting(false);

    const refNote = formData.referralCode 
      ? `\n\n🎉 Kode Referral "${formData.referralCode}" aktif! Pengajak Anda menerima komisi Rp 25.000 dan Anda mendapatkan Voucher Diskon Selamat Datang!` 
      : "";

    alert(`Pendaftaran Akun Berhasil!\nSelamat datang di SINDAR TOBA, ${trimmedName}.${refNote}\nAkun Anda telah tersimpan di sistem, silakan masuk.`);
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

          {/* Quick Google SSO */}
          <button
            type="button"
            onClick={() => {
              const gName = prompt("Simulasi Pendaftaran Google SSO. Masukkan Nama Lengkap Anda:", "Wisatawan Baru") || "Wisatawan Baru";
              const cleanGName = gName.trim();
              const gEmail = `${cleanGName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`;
              if (typeof window !== "undefined") {
                localStorage.setItem("sindar_role", "user");
                localStorage.setItem("sindar_user_name", cleanGName);
                localStorage.setItem("sindar_user_email", gEmail);
                localStorage.setItem("sindar_user_phone", "081234567890");
                localStorage.removeItem("sindar_purchased_tickets");
                localStorage.removeItem("sindar_referral_balance");
                localStorage.removeItem("sindar_referrals_data");
              }
              alert(`Pendaftaran Google Berhasil!\nSelamat datang di SINDAR TOBA, ${cleanGName}.`);
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
            <span>Daftar Cepat dengan Google</span>
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-[#e8e2d9] w-full" />
            <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-[#575e5b] absolute">
              atau isi data diri lengkap
            </span>
          </div>

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
              className="w-full py-3.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 mt-4"
            >
              <span>Buat Akun Wisatawan</span>
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
