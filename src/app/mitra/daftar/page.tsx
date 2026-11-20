"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  CreditCard,
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function PendaftaranMitraPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    category: "Homestay & Penginapan",
    ownerName: "",
    phone: "",
    email: "",
    regency: "Samosir",
    address: "",
    nikKtp: "",
    bankName: "Bank Sumut",
    accountNumber: "",
    accountHolder: "",
    priceStarting: "",
  });

  const categories = [
    "Homestay & Penginapan Tradisional",
    "Pemandu Wisata & Tur Adat",
    "Kriya Tenun Ulos & Ukir Kayu Gorga",
    "Kuliner Khas & Kedai Kopi Lintong",
    "Transportasi Kapal Danau / Rental Mobil",
  ];

  const regencies = [
    "Samosir",
    "Toba",
    "Humbang Hasundutan",
    "Tapanuli Utara",
    "Simalungun",
    "Karo",
    "Dairi",
    "Pakpak Bharat",
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      const generatedCode = `MIT-BPODT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newMitra = {
        name: formData.businessName || "Mitra Baru Kaldera Toba",
        owner: formData.ownerName || "Pelaku Usaha Lokal",
        category: formData.category,
        regency: `Kabupaten ${formData.regency}`,
        address: formData.address || "Kawasan Danau Toba",
        phone: formData.phone || "6281234567890",
        email: formData.email || "mitra@sindartoba.id",
        code: generatedCode,
        verifiedDate: "Baru Terdaftar (Verifikasi Instan BPODT)",
        bank: formData.bankName || "Bank Sumut",
        accountNumber: formData.accountNumber || "102.04.88.192841-0",
        accountHolder: formData.accountHolder || formData.ownerName,
        balance: 0,
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("sindar_role", "mitra");
          localStorage.setItem("sindar_current_mitra", JSON.stringify(newMitra));
          localStorage.setItem("sindar_mitra_name", newMitra.name);
        } catch (e) {
          console.error(e);
        }
      }

      alert(
        `Pendaftaran Mitra Berhasil!\n\nUsaha: "${newMitra.name}"\nKode Kemitraan: ${generatedCode}\n\nAkun Anda kini telah aktif dengan akses penuh ke Dashboard Mitra & Alat Scanner Loket.`
      );
      router.push("/mitra/dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Navbar />

      <main className="flex-grow max-w-[1000px] w-full mx-auto px-4 sm:px-8 py-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-cinzel text-[11px] font-semibold text-[#c29d59] tracking-[2.5px] uppercase block mb-1">
            Formulir Pendaftaran Resmi
          </span>
          <h1 className="font-newsreader text-3xl sm:text-4xl font-semibold text-[#1a3a34] tracking-tight">
            Registrasi Mitra Usaha Kaldera
          </h1>
          <p className="text-[13px] text-[#575e5b] mt-2">
            Lengkapi data di bawah ini untuk memulai verifikasi akun dan mempublikasikan layanan wisata Anda di platform resmi SINDAR TOBA.
          </p>
        </div>

        {/* Stepper Wizard Indicator */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-10 text-[12px] font-semibold">
          {[
            { num: 1, label: "Profil Usaha", icon: Building2 },
            { num: 2, label: "Wilayah & Legalitas", icon: MapPin },
            { num: 3, label: "Rekening Pencairan", icon: CreditCard },
          ].map((s) => {
            const Icon = s.icon;
            const isCurrent = step === s.num;
            const isDone = step > s.num;
            return (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isDone
                      ? "bg-emerald-600 text-white"
                      : isCurrent
                      ? "bg-[#1a3a34] text-[#c29d59] border-2 border-[#c29d59]"
                      : "bg-[#e8e2d9] text-[#575e5b]"
                  }`}
                >
                  {isDone ? "✓" : s.num}
                </div>
                <span
                  className={`hidden sm:inline ${
                    isCurrent ? "text-[#1a3a34]" : "text-[#575e5b]"
                  }`}
                >
                  {s.label}
                </span>
                {s.num < 3 && <div className="w-8 sm:w-12 h-px bg-[#e8e2d9]" />}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#e8e2d9] rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* STEP 1: Profil Usaha */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="font-newsreader text-2xl font-semibold text-[#1a3a34] pb-3 border-b border-[#e8e2d9]">
                Langkah 1: Identitas & Kategori Usaha
              </h3>

              <div>
                <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Nama Usaha / Homestay / Komunitas Wisata
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Homestay Rura Batak Samosir"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Kategori Layanan
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] font-medium focus:outline-none focus:border-[#1a3a34] cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                    Nama Penanggung Jawab / Pemilik
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap sesuai KTP"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                    Nomor WhatsApp Operasional
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Wilayah & Legalitas */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="font-newsreader text-2xl font-semibold text-[#1a3a34] pb-3 border-b border-[#e8e2d9]">
                Langkah 2: Lokasi Operasional & Legalitas
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                    Kabupaten di Kawasan Kaldera
                  </label>
                  <select
                    value={formData.regency}
                    onChange={(e) => setFormData({ ...formData, regency: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] font-medium focus:outline-none focus:border-[#1a3a34] cursor-pointer"
                  >
                    {regencies.map((r) => (
                      <option key={r} value={r}>
                        Kabupaten {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                    Nomor Induk Kependudukan (NIK KTP)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="16 digit NIK pemilik"
                    value={formData.nikKtp}
                    onChange={(e) => setFormData({ ...formData, nikKtp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Alamat Lengkap Lokasi Usaha
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Jalan, Desa, Kecamatan, dan patokan lokasi dekat geosite kaldera..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-[12px] text-amber-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Bagi UMKM mikro dan kelompok pengrajin lokal yang belum memiliki NIB (Nomor Induk Berusaha), tim fasilitasi BPODT akan membantu proses penerbitan izin gratis setelah pendaftaran ini.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Rekening Pencairan */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="font-newsreader text-2xl font-semibold text-[#1a3a34] pb-3 border-b border-[#e8e2d9]">
                Langkah 3: Informasi Rekening Pencairan Dana
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                    Nama Bank
                  </label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] font-medium focus:outline-none focus:border-[#1a3a34] cursor-pointer"
                  >
                    <option value="Bank Sumut">Bank Sumut</option>
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="Bank BRI">Bank BRI</option>
                    <option value="Bank BCA">Bank BCA</option>
                    <option value="Bank BNI">Bank BNI</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                    Nomor Rekening
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 1234567890"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#575e5b] uppercase tracking-wider block mb-1.5">
                  Nama Pemilik Rekening
                </label>
                <input
                  type="text"
                  required
                  placeholder="Harus sesuai dengan nama buku tabungan"
                  value={formData.accountHolder}
                  onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-[13px] text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-[12px] text-[#575e5b] cursor-pointer">
                  <input type="checkbox" defaultChecked required className="mt-0.5 rounded text-[#1a3a34]" />
                  <span>
                    Saya menyatakan bahwa data yang saya kirimkan adalah sah dan menyetujui Pakta Integritas Pelayanan Pariwisata Ramah & Berstandar Kaldera Danau Toba.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#e8e2d9]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-full border border-[#e8e2d9] hover:bg-[#faf8f5] text-[12px] font-semibold text-[#1a3a34] flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
            >
              <span>{step === 3 ? "Kirim Pendaftaran Mitra" : "Lanjutkan"}</span>
              <ArrowRight className="w-4 h-4 text-[#c29d59]" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
