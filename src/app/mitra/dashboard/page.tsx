"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Plus,
  ShieldCheck,
  Edit,
  ArrowUpRight,
  MessageCircle,
  X,
  CheckCircle2,
  AlertCircle,
  Building2,
  Sparkles,
  CreditCard,
  FileText,
  Trash2,
} from "lucide-react";

interface ListingItem {
  id: string;
  title: string;
  category: string;
  price: string;
  quota: string;
  status: "Aktif" | "Nonaktif";
}

export default function DashboardMitraPage() {
  // Business information
  const business = {
    name: "Homestay Rura Batak & Tour Samosir",
    owner: "Mangatur Sitinjak",
    regency: "Kabupaten Samosir",
    code: "MIT-BPODT-0482",
    verifiedDate: "15 Januari 2024",
    bank: "Bank Sumut",
    accountNumber: "102.02.04.098124-1",
    accountHolder: "Mangatur Sitinjak",
  };

  // State: Balance & Listings
  const [balance, setBalance] = useState<number>(5250000);
  const [listings, setListings] = useState<ListingItem[]>([
    {
      id: "LIST-01",
      title: "Kamar Tradisional Arsitektur Rumah Bolon",
      category: "Homestay Tepi Danau",
      price: "Rp 350.000 / malam",
      quota: "3 Kamar Tersedia",
      status: "Aktif",
    },
    {
      id: "LIST-02",
      title: "Paket Tur Bersepeda Keliling Samosir & Belajar Ulos",
      category: "Tur & Pemandu",
      price: "Rp 150.000 / orang",
      quota: "Maks. 8 orang / hari",
      status: "Aktif",
    },
  ]);

  // State: Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<ListingItem | null>(null);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  // State: Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Form State for Add Listing
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Homestay Tepi Danau");
  const [newPrice, setNewPrice] = useState("");
  const [newUnit, setNewUnit] = useState("/ malam");
  const [newQuota, setNewQuota] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Form State for Withdraw
  const [withdrawAmount, setWithdrawAmount] = useState<string>("5250000");

  // Handle Add Listing Submit
  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrice.trim() || !newQuota.trim()) {
      showToast("Mohon lengkapi judul, tarif harga, dan kuota layanan!");
      return;
    }

    const rawNum = parseInt(newPrice.replace(/\D/g, "")) || 0;
    const formattedPrice = `Rp ${rawNum.toLocaleString("id-ID")} ${newUnit}`;

    const newId = `LIST-0${listings.length + 1}`;
    const newEntry: ListingItem = {
      id: newId,
      title: newTitle.trim(),
      category: newCategory,
      price: formattedPrice,
      quota: newQuota.trim(),
      status: "Aktif",
    };

    setListings([newEntry, ...listings]);
    setIsAddModalOpen(false);

    // Reset Form
    setNewTitle("");
    setNewPrice("");
    setNewQuota("");
    setNewDesc("");

    showToast(`Layanan "${newEntry.title}" berhasil diterbitkan ke katalog SINDAR TOBA!`);
  };

  // Handle Update / Edit Listing
  const handleUpdateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingListing) return;

    setListings(
      listings.map((l) => (l.id === editingListing.id ? editingListing : l))
    );
    const updatedTitle = editingListing.title;
    setEditingListing(null);
    showToast(`Perubahan pada "${updatedTitle}" berhasil disimpan!`);
  };

  // Handle Delete Listing
  const handleDeleteListing = (id: string) => {
    const target = listings.find((l) => l.id === id);
    setListings(listings.filter((l) => l.id !== id));
    setEditingListing(null);
    showToast(`Layanan "${target?.title || id}" telah dihapus.`);
  };

  // Handle Withdraw Submit
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(withdrawAmount.replace(/\D/g, "")) || 0;
    if (amountNum <= 0) {
      showToast("Nominal penarikan tidak valid!");
      return;
    }
    if (amountNum > balance) {
      showToast("Saldo siap tarik tidak mencukupi!");
      return;
    }

    setBalance(balance - amountNum);
    setIsWithdrawModalOpen(false);
    showToast(
      `Pengajuan penarikan Rp ${amountNum.toLocaleString(
        "id-ID"
      )} ke rekening ${business.bank} berhasil diajukan!`
    );
  };

  const metrics = [
    {
      label: "Omzet Bulan Ini",
      value: "Rp 14,8 Juta",
      change: "+18.4%",
      desc: "vs bln lalu",
      icon: DollarSign,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Reservasi Aktif",
      value: "8 Pesanan",
      change: "4 Menunggu",
      desc: "check-in",
      icon: Calendar,
      color: "text-[#1a3a34]",
      bgColor: "bg-[#1a3a34]/10",
    },
    {
      label: "Total Wisatawan",
      value: "64 Tamu",
      change: "+12 Tamu",
      desc: "bulan ini",
      icon: Users,
      color: "text-[#c29d59]",
      bgColor: "bg-[#c29d59]/10",
    },
    {
      label: "Skor Kepuasan",
      value: "4.9 / 5.0",
      change: "88 Ulasan",
      desc: "100% respons",
      icon: TrendingUp,
      color: "text-[#b8653a]",
      bgColor: "bg-[#b8653a]/10",
    },
  ];

  const recentBookings = [
    {
      code: "ST-BK-9182",
      guest: "Bagus Pratama",
      service: "Kamar Rumah Bolon (2 Malam)",
      checkIn: "20 Nov 2026",
      guests: "2 Tamu",
      total: "Rp 700.000",
      status: "Lunas (Siap Datang)",
      phone: "6281234567890",
    },
    {
      code: "ST-BK-9183",
      guest: "Sarah Jenkins",
      service: "Tur Bersepeda & Ulos",
      checkIn: "21 Nov 2026",
      guests: "3 Tamu",
      total: "Rp 450.000",
      status: "Lunas (Siap Datang)",
      phone: "6281234567892",
    },
    {
      code: "ST-BK-9180",
      guest: "Rian Sitompul",
      service: "Kamar Rumah Bolon (1 Malam)",
      checkIn: "18 Nov 2026",
      guests: "2 Tamu",
      total: "Rp 350.000",
      status: "Selesai",
      phone: "6281234567893",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5] text-[#1a3a34]">
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#1a3a34] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-[#c29d59]/40 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#c29d59] shrink-0" />
          <p className="text-[12.5px] font-medium leading-snug">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Header Card */}
        <section className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-sm mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1a3a34] text-[#c29d59] border border-[#c29d59] flex items-center justify-center font-cinzel text-lg sm:text-xl font-bold shadow-sm shrink-0">
              HR
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="font-newsreader text-xl sm:text-2xl md:text-3xl font-semibold text-[#1a3a34]">
                  {business.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {business.code}
                </span>
              </div>
              <p className="text-[11.5px] sm:text-[12px] text-[#575e5b]">
                Pemilik: {business.owner} • {business.regency}
              </p>
            </div>
          </div>

          {/* Quick Balance & Payout Box */}
          <div className="flex items-center justify-between sm:justify-start gap-4 bg-[#faf8f5] border border-[#e8e2d9] p-3.5 sm:p-4 rounded-2xl">
            <div>
              <span className="text-[10px] text-[#575e5b] uppercase tracking-wider block font-semibold">
                Saldo Siap Tarik
              </span>
              <span className="font-cinzel text-lg sm:text-xl font-bold text-[#1a3a34]">
                Rp {balance.toLocaleString("id-ID")}
              </span>
            </div>
            <button
              onClick={() => {
                setWithdrawAmount(balance.toString());
                setIsWithdrawModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11.5px] font-semibold uppercase tracking-wider transition-colors shadow-sm active:scale-95"
            >
              Tarik Dana
            </button>
          </div>
        </section>

        {/* 4 Metric Cards (Responsive Grid) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-8 sm:mb-10">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#e8e2d9] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[11px] sm:text-[12px] font-semibold text-[#575e5b] leading-tight">
                    {m.label}
                  </span>
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${m.bgColor} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${m.color}`} />
                  </div>
                </div>
                <div>
                  <div className="font-cinzel text-lg sm:text-2xl font-bold text-[#1a3a34]">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-[#575e5b] mt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="text-emerald-700 font-semibold">{m.change}</span>
                    <span>{m.desc}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Two-Column Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Left Column: Recent Bookings & Listings (2 Cols) */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Recent Bookings */}
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#e8e2d9] mb-4">
                <div>
                  <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                    Pemesanan & Tamu Terkini
                  </h3>
                  <p className="text-[11.5px] sm:text-[12px] text-[#575e5b]">
                    Konfirmasi kedatangan tamu dari platform SINDAR TOBA
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#1a3a34] text-white text-[10.5px] font-semibold">
                  {recentBookings.length} Pesanan
                </span>
              </div>

              <div className="space-y-3">
                {recentBookings.map((bk) => (
                  <div
                    key={bk.code}
                    className="p-3.5 sm:p-4 rounded-2xl border border-[#e8e2d9] hover:border-[#c29d59] bg-[#faf8f5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-[#b8653a]">
                          {bk.code}
                        </span>
                        <span className="text-white bg-[#1a3a34] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          {bk.checkIn}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-[#1a3a34]">{bk.guest}</h4>
                      <p className="text-[12px] text-[#575e5b]">
                        {bk.service} • {bk.guests}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#e8e2d9]/60">
                      <div className="text-left sm:text-right">
                        <span className="text-sm font-bold text-[#1a3a34] block">
                          {bk.total}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          {bk.status}
                        </span>
                      </div>
                      <a
                        href={`https://wa.me/${bk.phone}?text=Halo%20${encodeURIComponent(
                          bk.guest
                        )},%20kami%20dari%20Homestay%20Rura%20Batak`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#e8e2d9] hover:bg-emerald-50 text-emerald-700 transition-colors"
                        title="Chat Tamu via WA"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Listings Management */}
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#e8e2d9] mb-4">
                <div>
                  <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                    Kelola Destinasi & Layanan Wisata
                  </h3>
                  <p className="text-[11.5px] sm:text-[12px] text-[#575e5b]">
                    Atur tarif harga, kuota harian kamar atau tur Anda
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="self-start sm:self-auto px-4 py-2 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[11.5px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4 text-[#c29d59]" />
                  <span>Tambah Listing</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {listings.map((lst) => (
                  <div
                    key={lst.id}
                    className="p-4 sm:p-5 rounded-2xl border border-[#e8e2d9] bg-white hover:border-[#c29d59] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#b8653a]">
                          {lst.category}
                        </span>
                        <span className="text-[10px] text-[#575e5b] font-mono">
                          {lst.id}
                        </span>
                      </div>
                      <h4 className="font-newsreader text-base sm:text-lg font-semibold text-[#1a3a34] mb-1">
                        {lst.title}
                      </h4>
                      <p className="text-[12px] text-[#575e5b]">
                        Tarif: <strong className="text-[#1a3a34]">{lst.price}</strong> •{" "}
                        {lst.quota}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold mr-1 ${
                          lst.status === "Aktif"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-stone-100 text-stone-600 border border-stone-200"
                        }`}
                      >
                        {lst.status}
                      </span>
                      <button
                        onClick={() => setEditingListing({ ...lst })}
                        className="p-2 rounded-xl border border-[#e8e2d9] hover:bg-[#faf8f5] text-[#1a3a34] hover:border-[#c29d59] transition-colors"
                        title="Edit Listing"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Operational Controls & Help */}
          <div className="space-y-5 sm:space-y-6">
            {/* Fast Actions Card */}
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-6 shadow-sm">
              <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#1a3a34] uppercase tracking-wider mb-3 pb-2 border-b border-[#e8e2d9]">
                Pengaturan Cepat Mitra
              </h4>
              <div className="space-y-2 text-[12.5px] sm:text-[13px]">
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="w-full text-left p-2.5 sm:p-3 rounded-xl hover:bg-[#faf8f5] border border-[#e8e2d9]/60 hover:border-[#c29d59] flex items-center justify-between transition-colors"
                >
                  <span className="font-medium text-[#1a3a34]">Profil & Foto Properti</span>
                  <ArrowUpRight className="w-4 h-4 text-[#575e5b]" />
                </button>
                <button
                  onClick={() => setIsBankModalOpen(true)}
                  className="w-full text-left p-2.5 sm:p-3 rounded-xl hover:bg-[#faf8f5] border border-[#e8e2d9]/60 hover:border-[#c29d59] flex items-center justify-between transition-colors"
                >
                  <span className="font-medium text-[#1a3a34]">Rekening Bank Sumut</span>
                  <ArrowUpRight className="w-4 h-4 text-[#575e5b]" />
                </button>
                <button
                  onClick={() =>
                    showToast(
                      "Laporan keuangan periode berjalan (PDF/Excel) sedang diunduh..."
                    )
                  }
                  className="w-full text-left p-2.5 sm:p-3 rounded-xl hover:bg-[#faf8f5] border border-[#e8e2d9]/60 hover:border-[#c29d59] flex items-center justify-between transition-colors"
                >
                  <span className="font-medium text-[#1a3a34]">Unduh Laporan Keuangan</span>
                  <ArrowUpRight className="w-4 h-4 text-[#575e5b]" />
                </button>
              </div>
            </div>

            {/* BPODT Assistance Box */}
            <div className="bg-[#1a3a34] text-white rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2.5">
                <ShieldCheck className="w-5 h-5 text-[#c29d59]" />
                <h4 className="font-cinzel text-xs sm:text-sm font-semibold tracking-wide">
                  Dukungan Pendamping BPODT
                </h4>
              </div>
              <p className="text-[12px] text-white/80 leading-relaxed mb-4">
                Butuh bantuan pengambilan foto profesional, penerbitan NIB UMKM, atau promosi
                paket tur Anda di pameran pariwisata?
              </p>
              <a
                href="https://wa.me/6281234567899?text=Halo%20BPODT,%20saya%20mitra%20Homestay%20Rura%20Batak%20butuh%20pendampingan"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full bg-[#c29d59] hover:bg-[#b08b47] text-[#1a3a34] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center"
              >
                <span>Hubungi Pendamping Mitra</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: TAMBAH LISTING BARU                             */}
      {/* ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#e8e2d9] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#1a3a34] text-white p-5 sm:p-6 flex items-start justify-between border-b border-[#c29d59]/30">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#c29d59] tracking-wider block mb-1">
                  Portal Mitra BPODT
                </span>
                <h3 className="font-newsreader text-xl sm:text-2xl font-bold">
                  Tambah Layanan Wisata Baru
                </h3>
                <p className="text-white/75 text-[11.5px] mt-0.5">
                  Layanan baru akan langsung tampil di pencarian wisatawan SINDAR TOBA.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleAddListing} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                  Kategori Layanan *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm font-medium text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                >
                  <option value="Homestay Tepi Danau">Homestay & Penginapan Batak</option>
                  <option value="Tur & Pemandu">Tur & Pemandu Wisata Budaya</option>
                  <option value="Kuliner Tradisional">Kuliner & Kuliner Khas Toba</option>
                  <option value="Sewa Transportasi">Sewa Kapal & Kendaraan Danau</option>
                  <option value="Kerajinan & Ulos">Kerajinan Tangan & Tenun Ulos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                  Nama Layanan / Properti *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kamar Rumah Bolon View Danau"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] placeholder:text-stone-400 focus:outline-none focus:border-[#c29d59]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                    Tarif Harga (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 350000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] placeholder:text-stone-400 focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                    Satuan Tarif *
                  </label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm font-medium text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                  >
                    <option value="/ malam">/ malam (Penginapan)</option>
                    <option value="/ orang">/ orang (Tur/Kuliner)</option>
                    <option value="/ hari">/ hari (Sewa)</option>
                    <option value="/ paket">/ paket (Layanan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                  Kapasitas / Kuota Harian *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 3 Kamar Tersedia / Maks. 8 orang"
                  value={newQuota}
                  onChange={(e) => setNewQuota(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] placeholder:text-stone-400 focus:outline-none focus:border-[#c29d59]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                  Deskripsi & Fasilitas (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Sebutkan fasilitas unggulan seperti air hangat, sarapan khas, wifi, dsb."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] placeholder:text-stone-400 focus:outline-none focus:border-[#c29d59] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#e8e2d9]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-full border border-[#e8e2d9] text-xs font-semibold text-[#575e5b] hover:bg-[#faf8f5] uppercase tracking-wider transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-[#c29d59] border border-[#c29d59] text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
                >
                  Simpan & Terbitkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: EDIT LISTING                                    */}
      {/* ======================================================== */}
      {editingListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#e8e2d9] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1a3a34] text-white p-5 sm:p-6 flex items-start justify-between border-b border-[#c29d59]/30">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#c29d59] tracking-wider block mb-1">
                  ID: {editingListing.id}
                </span>
                <h3 className="font-newsreader text-xl sm:text-2xl font-bold">
                  Edit Layanan Wisata
                </h3>
              </div>
              <button
                onClick={() => setEditingListing(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateListing} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                  Nama Layanan
                </label>
                <input
                  type="text"
                  required
                  value={editingListing.title}
                  onChange={(e) =>
                    setEditingListing({ ...editingListing, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                    Tarif Display
                  </label>
                  <input
                    type="text"
                    required
                    value={editingListing.price}
                    onChange={(e) =>
                      setEditingListing({ ...editingListing, price: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                    Status Layanan
                  </label>
                  <select
                    value={editingListing.status}
                    onChange={(e) =>
                      setEditingListing({
                        ...editingListing,
                        status: e.target.value as "Aktif" | "Nonaktif",
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm font-medium text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                  >
                    <option value="Aktif">Aktif (Dapat Dipesan)</option>
                    <option value="Nonaktif">Nonaktif (Ditutup Sementara)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider mb-1">
                  Kuota / Kapasitas
                </label>
                <input
                  type="text"
                  required
                  value={editingListing.quota}
                  onChange={(e) =>
                    setEditingListing({ ...editingListing, quota: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#e8e2d9]">
                <button
                  type="button"
                  onClick={() => handleDeleteListing(editingListing.id)}
                  className="px-3.5 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingListing(null)}
                    className="px-4 py-2 rounded-full border border-[#e8e2d9] text-xs font-semibold text-[#575e5b] hover:bg-[#faf8f5] transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-[#c29d59] border border-[#c29d59] text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Perbarui
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: PENARIKAN DANA (TARIK DANA)                     */}
      {/* ======================================================== */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#e8e2d9] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1a3a34] text-white p-5 flex items-start justify-between border-b border-[#c29d59]/30">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#c29d59] tracking-wider block mb-1">
                  Pencairan Pendapatan
                </span>
                <h3 className="font-newsreader text-xl font-bold">Tarik Saldo Rekening</h3>
              </div>
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="p-5 space-y-4">
              {/* Account Info Box */}
              <div className="p-3.5 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] space-y-1">
                <span className="text-[10.5px] font-semibold text-[#575e5b] uppercase tracking-wider block">
                  Rekening Penerima Terdaftar
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#1a3a34] block">
                      {business.bank} - {business.accountNumber}
                    </span>
                    <span className="text-xs text-[#575e5b]">a.n. {business.accountHolder}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    Terverifikasi
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#1a3a34] uppercase tracking-wider">
                    Nominal Penarikan
                  </label>
                  <span className="text-xs text-[#575e5b]">
                    Maks: <strong>Rp {balance.toLocaleString("id-ID")}</strong>
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-sm text-[#1a3a34]">
                    Rp
                  </span>
                  <input
                    type="number"
                    required
                    min={50000}
                    max={balance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm font-bold text-[#1a3a34] focus:outline-none focus:border-[#c29d59]"
                  />
                </div>
              </div>

              {/* Quick Select Chips */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setWithdrawAmount("1000000")}
                  className="flex-1 py-1 rounded-lg border border-[#e8e2d9] text-[11px] font-medium hover:bg-[#faf8f5]"
                >
                  1 Juta
                </button>
                <button
                  type="button"
                  onClick={() => setWithdrawAmount("2500000")}
                  className="flex-1 py-1 rounded-lg border border-[#e8e2d9] text-[11px] font-medium hover:bg-[#faf8f5]"
                >
                  2.5 Juta
                </button>
                <button
                  type="button"
                  onClick={() => setWithdrawAmount(balance.toString())}
                  className="flex-1 py-1 rounded-lg border border-[#c29d59] bg-[#c29d59]/10 text-[#1a3a34] text-[11px] font-bold"
                >
                  Tarik Semua
                </button>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-snug">
                Pencairan dana langsung diproses melalui transfer kliring Bank Sumut dalam 1x24 jam kerja tanpa biaya admin platform.
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#e8e2d9]">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#e8e2d9] text-xs font-semibold text-[#575e5b] hover:bg-[#faf8f5]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
                >
                  Konfirmasi Tarik Dana
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: PROFIL & FOTO PROPERTI                          */}
      {/* ======================================================== */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#e8e2d9] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1a3a34] text-white p-5 flex items-start justify-between border-b border-[#c29d59]/30">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#c29d59] tracking-wider block mb-1">
                  Pengaturan Identitas
                </span>
                <h3 className="font-newsreader text-xl font-bold">Profil & Foto Usaha Mitra</h3>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#1a3a34] text-[#c29d59] border border-[#c29d59] flex items-center justify-center font-cinzel text-xl font-bold shadow-sm shrink-0">
                  HR
                </div>
                <div>
                  <h4 className="font-newsreader text-lg font-bold text-[#1a3a34]">
                    {business.name}
                  </h4>
                  <p className="text-xs text-[#575e5b]">
                    Kode Mitra: <strong>{business.code}</strong> (BPODT Terverifikasi)
                  </p>
                  <span className="text-[10.5px] text-emerald-700 font-semibold mt-0.5 block">
                    Aktif sejak {business.verifiedDate}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#e8e2d9]">
                <div>
                  <label className="text-xs font-semibold text-[#575e5b] block mb-1">
                    Nama Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    defaultValue={business.owner}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#575e5b] block mb-1">
                    Wilayah Operasional
                  </label>
                  <input
                    type="text"
                    defaultValue="Kabupaten Samosir, Sumatera Utara"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs sm:text-sm text-[#1a3a34]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#575e5b] block mb-1">
                    Galeri Foto Properti
                  </label>
                  <div className="p-4 rounded-xl border-2 border-dashed border-[#e8e2d9] bg-[#faf8f5] text-center text-xs text-[#575e5b]">
                    <Building2 className="w-6 h-6 mx-auto mb-1 text-[#c29d59]" />
                    <p className="font-medium text-[#1a3a34]">Foto Homestay & Kamar Aktif (4 Foto)</p>
                    <p className="text-[11px] text-[#575e5b] mt-0.5">
                      Untuk pembaruan foto berstandar kurasi BPODT, hubungi pendamping lapangan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-[#e8e2d9]">
                <button
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    showToast("Profil mitra berhasil diperbarui!");
                  }}
                  className="px-5 py-2 rounded-full bg-[#1a3a34] text-[#c29d59] border border-[#c29d59] text-xs font-bold uppercase tracking-wider"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: REKENING BANK SUMUT                             */}
      {/* ======================================================== */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#e8e2d9] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#1a3a34] text-white p-5 flex items-start justify-between border-b border-[#c29d59]/30">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#c29d59] tracking-wider block mb-1">
                  Rekening Mitra Resmi
                </span>
                <h3 className="font-newsreader text-xl font-bold">Rekening Bank Sumut</h3>
              </div>
              <button
                onClick={() => setIsBankModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1a3a34] to-[#122a25] text-white border border-[#c29d59]/40 shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-cinzel text-xs font-bold text-[#c29d59] tracking-widest uppercase">
                    BANK SUMUT
                  </span>
                  <span className="text-[9.5px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-semibold">
                    AKTIF
                  </span>
                </div>
                <div className="font-mono text-base tracking-widest mb-2">
                  {business.accountNumber}
                </div>
                <div className="flex justify-between items-end text-xs">
                  <div>
                    <span className="text-[9px] text-white/60 block uppercase">Pemegang Rekening</span>
                    <span className="font-semibold">{business.accountHolder}</span>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#c29d59]" />
                </div>
              </div>

              <p className="text-xs text-[#575e5b] leading-relaxed">
                Rekening Bank Sumut ini telah terintegrasi dengan sistem settlement otomatis SINDAR TOBA dan disahkan oleh BPODT untuk pembayaran reservasi tamu.
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsBankModalOpen(false)}
                  className="px-5 py-2 rounded-full bg-[#1a3a34] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
