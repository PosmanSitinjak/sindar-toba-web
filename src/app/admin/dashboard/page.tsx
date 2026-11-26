"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Users,
  Compass,
  AlertTriangle,
  Building,
  CheckCircle2,
  Download,
  LogOut,
  Radio,
  Trash2,
  Edit,
  Plus,
  Database,
  Sparkles,
  RefreshCw,
  ExternalLink,
  X,
  MapPin,
  Tag,
  Check,
  Camera,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { fallbackDestinations } from "@/lib/destinations";

export default function SuperadminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"destinasi" | "mitra" | "transaksi">("destinasi");
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [weatherAlertActive, setWeatherAlertActive] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Supabase Destinations State
  const [destinations, setDestinations] = useState<any[]>(fallbackDestinations);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(false);
  const [isAddDestModalOpen, setIsAddDestModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<any | null>(null);

  // Form State for Adding Destination
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Geosite Alam");
  const [newRegency, setNewRegency] = useState("Samosir");
  const [newSubregion, setNewSubregion] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newPriceUnit, setNewPriceUnit] = useState("orang");
  const [newImage, setNewImage] = useState("/images/destinations/bukit-holbung.jpg");
  const [newDescription, setNewDescription] = useState("");

  // Fetch Destinations from Supabase
  const fetchDestinationsData = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    setIsLoadingDestinations(true);
    try {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        setDestinations(data);
      }
    } catch (err) {
      console.error("Error fetching destinations:", err);
    } finally {
      setIsLoadingDestinations(false);
    }
  };

  useEffect(() => {
    fetchDestinationsData();
  }, []);

  // Handle Delete Destination (Direct Supabase Cloud Deletion)
  const handleDeleteDestination = async (id: string, title: string) => {
    if (!window.confirm(`Hapus destinasi "${title}" secara permanen dari database Supabase?`)) {
      return;
    }

    // Optimistic UI update
    setDestinations((prev) => prev.filter((d) => d.id !== id));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from("destinations")
          .delete()
          .eq("id", id);

        if (error) {
          console.error("Supabase delete error:", error);
          showToast(`Gagal menghapus dari Supabase: ${error.message}`);
          fetchDestinationsData(); // Rollback
        } else {
          showToast(`Destinasi "${title}" BERHASIL dihapus permanen dari Supabase PostgreSQL!`);
        }
      } catch (err: any) {
        console.error("Delete exception:", err);
        showToast(`Terjadi kesalahan: ${err.message}`);
      }
    } else {
      showToast(`Destinasi "${title}" telah dihapus secara lokal.`);
    }
  };

  // Handle Add Destination Submit
  const handleAddDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast("Judul destinasi tidak boleh kosong!");
      return;
    }

    const rawNum = parseInt(newPrice.replace(/\D/g, "")) || 0;
    const generatedSlug =
      newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") || `destinasi-${Date.now()}`;

    const newDest = {
      id: generatedSlug,
      title: newTitle.trim(),
      category: newCategory,
      regency: newRegency,
      subregion: newSubregion.trim() || `${newRegency}, Danau Toba`,
      rating: 4.9,
      reviews: 1,
      price: rawNum,
      price_unit: newPriceUnit,
      image: newImage || "/images/destinations/bukit-holbung.jpg",
      description: newDescription.trim() || "Destinasi terverifikasi BPODT Danau Toba.",
      tags: [newCategory, newRegency],
    };

    setDestinations([newDest, ...destinations]);
    setIsAddDestModalOpen(false);
    setNewTitle("");
    setNewPrice("");
    setNewSubregion("");
    setNewDescription("");

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("destinations").insert(newDest);
        if (error) {
          console.error("Supabase insert error:", error);
          showToast(`Gagal menyimpan ke database: ${error.message}`);
        } else {
          showToast(`Destinasi "${newDest.title}" BERHASIL ditambahkan ke Supabase PostgreSQL!`);
        }
      } catch (err: any) {
        console.error("Insert error:", err);
      }
    } else {
      showToast(`Destinasi "${newDest.title}" berhasil ditambahkan.`);
    }
  };

  // Handle Update Destination Submit
  const handleUpdateDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;

    const rawNum =
      typeof editingDest.price === "string"
        ? parseInt(editingDest.price.replace(/\D/g, "")) || 0
        : editingDest.price;

    setDestinations((prev) =>
      prev.map((d) => (d.id === editingDest.id ? { ...editingDest, price: rawNum } : d))
    );
    const target = { ...editingDest, price: rawNum };
    setEditingDest(null);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from("destinations")
          .update({
            title: target.title,
            category: target.category,
            regency: target.regency,
            subregion: target.subregion,
            price: rawNum,
            price_unit: target.price_unit,
            description: target.description,
          })
          .eq("id", target.id);

        if (error) {
          console.error("Supabase update error:", error);
          showToast(`Gagal update database: ${error.message}`);
        } else {
          showToast(`Destinasi "${target.title}" BERHASIL diupdate di Supabase!`);
        }
      } catch (err: any) {
        console.error("Update error:", err);
      }
    } else {
      showToast(`Perubahan pada "${target.title}" berhasil disimpan.`);
    }
  };

  const [partners, setPartners] = useState([
    {
      id: "MTR-2026-081",
      businessName: "Homestay Tao Silalahi",
      owner: "Jansen Silalahi",
      regency: "Dairi",
      category: "Homestay Tepi Danau",
      dateApplied: "12 Nov 2026",
      status: "Menunggu Verifikasi",
      nib: "91203049182",
    },
    {
      id: "MTR-2026-082",
      businessName: "Sanggar Ulos Harungguan Tarutung",
      owner: "Inang Tiurma Hutabarat",
      regency: "Tapanuli Utara",
      category: "Kriya & Tenun",
      dateApplied: "11 Nov 2026",
      status: "Menunggu Verifikasi",
      nib: "81920194812",
    },
    {
      id: "MTR-2026-083",
      businessName: "Tur Perahu Tradisional Solu Tipang",
      owner: "Maruba Purba",
      regency: "Humbang Hasundutan",
      category: "Transportasi Danau",
      dateApplied: "10 Nov 2026",
      status: "Menunggu Verifikasi",
      nib: "71029381923",
    },
    {
      id: "MTR-2026-079",
      businessName: "Homestay Rura Batak Samosir",
      owner: "Mangatur Sitinjak",
      regency: "Samosir",
      category: "Homestay",
      dateApplied: "05 Nov 2026",
      status: "Disetujui",
      nib: "91827361920",
    },
  ]);

  // Default empty escrow transactions for fresh state
  const defaultTransactions: any[] = [];

  const [recentTransactions, setRecentTransactions] = useState<any[]>(defaultTransactions);

  // Sync Transactions from LocalStorage & Supabase tickets
  useEffect(() => {
    let list: any[] = [];
    if (typeof window !== "undefined") {
      try {
        const storedTrx = localStorage.getItem("sindar_transactions");
        if (storedTrx) {
          const parsed = JSON.parse(storedTrx);
          if (Array.isArray(parsed) && parsed.length > 0) {
            list = parsed;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (isSupabaseConfigured && supabase) {
      supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const mapped = data.map((d: any) => ({
              trxId: `TRX-${d.booking_code}`,
              traveler: "Wisatawan Terverifikasi",
              item: `${d.visitors}x ${d.destination_name}`,
              amount: `Rp ${Number(d.total_paid).toLocaleString("id-ID")}`,
              channel: "QRIS Dinamis",
              escrowStatus: d.status?.includes("Selesai")
                ? "Siap Dicairkan ke Mitra"
                : d.status?.includes("Menunggu")
                ? "Menunggu Verifikasi Transfer"
                : "Tertahan di Escrow",
              time: "Baru saja",
            }));
            const existing = new Set(list.map((l: any) => l.trxId));
            const combined = [...list];
            mapped.forEach((m: any) => {
              if (!existing.has(m.trxId)) combined.push(m);
            });
            setRecentTransactions(combined);
          } else {
            setRecentTransactions(list);
          }
        });
    } else {
      setRecentTransactions(list);
    }
  }, []);

  const handleApprovePartner = (id: string) => {
    setPartners(
      partners.map((p) => (p.id === id ? { ...p, status: "Disetujui" } : p))
    );
    showToast(`Mitra ${id} berhasil diverifikasi dan aktif di sistem!`);
  };

  const handleRejectPartner = (id: string) => {
    setPartners(
      partners.map((p) => (p.id === id ? { ...p, status: "Ditolak / Perlu Revisi" } : p))
    );
    showToast(`Mitra ${id} ditandai untuk revisi dokumen NIB/KTP.`);
  };

  const handleVerifyPayment = async (trxId: string) => {
    const bookingCode = trxId.replace(/^TRX-/, "");
    setRecentTransactions((prev) =>
      prev.map((tx) =>
        tx.trxId === trxId ? { ...tx, escrowStatus: "Tertahan di Escrow" } : tx
      )
    );

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from("tickets")
          .update({ status: "Lunas (Siap Digunakan)" })
          .eq("booking_code", bookingCode);
      } catch (err) {
        console.error("Verify payment Supabase error:", err);
      }
    }

    if (typeof window !== "undefined") {
      try {
        const storedTkt = JSON.parse(localStorage.getItem("sindar_purchased_tickets") || "[]");
        const updatedTkt = storedTkt.map((t: any) =>
          t.bookingCode === bookingCode ? { ...t, status: "Lunas (Siap Digunakan)" } : t
        );
        localStorage.setItem("sindar_purchased_tickets", JSON.stringify(updatedTkt));

        const storedTrx = JSON.parse(localStorage.getItem("sindar_transactions") || "[]");
        const updatedTrx = storedTrx.map((tx: any) =>
          tx.trxId === trxId ? { ...tx, escrowStatus: "Tertahan di Escrow" } : tx
        );
        localStorage.setItem("sindar_transactions", JSON.stringify(updatedTrx));
      } catch (err) {
        console.error(err);
      }
    }

    showToast(`Pembayaran ${bookingCode} berhasil diverifikasi Lunas!`);
  };

  const filteredPartners =
    partnerFilter === "all"
      ? partners
      : partnerFilter === "pending"
      ? partners.filter((p) => p.status === "Menunggu Verifikasi")
      : partners.filter((p) => p.status === "Disetujui");

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a3a34]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 max-w-md bg-[#1a3a34] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#c29d59] flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <Database className="w-5 h-5 text-[#c29d59] shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Top Operational Bar */}
      <header className="bg-[#1a3a34] text-white px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#c29d59]/30 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#122a25] border border-[#c29d59] flex items-center justify-center font-cinzel font-bold text-xs text-[#c29d59] shrink-0">
              BP
            </div>
            <div>
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest block text-white truncate">
                PUSAT KENDALI BPODT — SINDAR TOBA
              </span>
              <span className="text-[9.5px] sm:text-[10px] text-[#c29d59] tracking-wider uppercase block">
                Otorita Danau Toba • Marketplace UMKM
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-[11.5px] sm:text-[12px]">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">
                {isSupabaseConfigured ? "Supabase Live: Terhubung" : "Database: Siap Sinkron"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/mitra/scan"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#122a25] hover:bg-[#0c1f1b] border border-[#c29d59]/60 text-[#c29d59] text-[11px] sm:text-[11.5px] font-medium transition-colors"
                title="Buka Scanner Gerbang / Validasi Tiket"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Scanner Gerbang</span>
              </Link>

              <span className="text-white/70 hidden sm:inline">
                Admin: <strong>Otorita BPODT</strong>
              </span>

              <Link
                href="/admin/login"
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Keluar Konsol"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Weather Alert Banner */}
        {weatherAlertActive && (
          <div className="bg-red-900/90 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg animate-in fade-in">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />
              <div>
                <span className="font-bold text-xs sm:text-sm block">PERINGATAN SIAGA CUACA KALDERA AKTIF</span>
                <span className="text-[11.5px] sm:text-xs text-white/90">
                  Angin kencang terpantau di perairan Parapat & Samosir. Seluruh kapal solu & feri dihimbau waspada.
                </span>
              </div>
            </div>
            <button
              onClick={() => setWeatherAlertActive(false)}
              className="self-start sm:self-auto px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold shrink-0"
            >
              Tutup Siaga
            </button>
          </div>
        )}

        {/* 7-Item Responsive Admin Metric Cards */}
        <section className="space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-cinzel text-[11px] font-bold text-[#575e5b] tracking-[2px] uppercase">
              Metrik Ekosistem Kawasan Danau Toba
            </h2>
            <span className="text-[10.5px] sm:text-[11px] text-[#575e5b]">Real-Time (November 2026)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { label: "Total GMV", value: "Rp 482,5 Jt", change: "+24.5%", icon: TrendingUp, color: "text-emerald-700" },
              { label: "Transaksi", value: "3.240 Trx", change: "Bulan Ini", icon: CreditCard, color: "text-[#1a3a34]" },
              { label: "Mitra Aktif", value: "152 Mitra", change: "+8 Baru", icon: Building, color: "text-[#c29d59]" },
              { label: "Wisatawan", value: "12.850 Org", change: "+1.2k Aktif", icon: Users, color: "text-[#3d6b75]" },
              { label: "Retribusi", value: "Rp 48,2 Jt", change: "Kas Pemda", icon: ShieldCheck, color: "text-emerald-800" },
              { label: "Laporan", value: "2 Kasus", change: "Respons Cepat", icon: AlertTriangle, color: "text-amber-700" },
              { label: "Geosite", value: `${destinations.length} Destinasi`, change: "Tersinkron", icon: Compass, color: "text-[#1a3a34]" },
            ].map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="bg-white border border-[#e8e2d9] rounded-2xl p-3.5 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-[#575e5b] uppercase tracking-wider truncate">
                      {m.label}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${m.color} shrink-0`} />
                  </div>
                  <div>
                    <span className="font-cinzel text-base sm:text-lg font-bold text-[#1a3a34] block">
                      {m.value}
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] text-emerald-700 font-semibold block mt-0.5">
                      {m.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#e8e2d9] pb-3">
          <button
            onClick={() => setActiveTab("destinasi")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "destinasi"
                ? "bg-[#1a3a34] text-white shadow-sm"
                : "bg-white text-[#575e5b] hover:bg-[#faf8f5] border border-[#e8e2d9]"
            }`}
          >
            <Database className="w-4 h-4 text-[#c29d59]" />
            <span>Kelola Destinasi & Layanan ({destinations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("mitra")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "mitra"
                ? "bg-[#1a3a34] text-white shadow-sm"
                : "bg-white text-[#575e5b] hover:bg-[#faf8f5] border border-[#e8e2d9]"
            }`}
          >
            <Users className="w-4 h-4 text-[#c29d59]" />
            <span>Verifikasi Mitra ({partners.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("transaksi")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "transaksi"
                ? "bg-[#1a3a34] text-white shadow-sm"
                : "bg-white text-[#575e5b] hover:bg-[#faf8f5] border border-[#e8e2d9]"
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#c29d59]" />
            <span>Audit Transaksi ({recentTransactions.length})</span>
          </button>
        </div>

        {/* TAB 1: KELOLA DESTINASI (SUPABASE POSTGRESQL CRUD) */}
        {activeTab === "destinasi" && (
          <div className="space-y-6">
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8e2d9] mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-cinzel text-[10.5px] font-bold text-[#b8653a] uppercase tracking-wider">
                      Master Database Cloud
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Tabel: public.destinations
                    </span>
                  </div>
                  <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                    Manajemen Katalog Destinasi & Layanan Wisata
                  </h3>
                  <p className="text-[12px] text-[#575e5b] mt-0.5">
                    Data yang dihapus atau ditambah di sini langsung tersinkronisasi ke PostgreSQL Supabase & seluruh halaman web.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <button
                    onClick={fetchDestinationsData}
                    disabled={isLoadingDestinations}
                    className="p-2.5 rounded-full border border-[#e8e2d9] hover:bg-[#faf8f5] text-[#1a3a34] transition-colors"
                    title="Refresh Data dari Supabase"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingDestinations ? "animate-spin" : ""}`} />
                  </button>

                  <button
                    onClick={() => setIsAddDestModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[11.5px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
                  >
                    <Plus className="w-4 h-4 text-[#c29d59]" />
                    <span>Tambah Destinasi Baru</span>
                  </button>
                </div>
              </div>

              {/* Destinations Table / Cards */}
              <div className="space-y-3.5">
                {destinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="p-4 sm:p-5 rounded-2xl border border-[#e8e2d9] bg-[#faf8f5] hover:border-[#c29d59] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {dest.image && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-[#e8e2d9]">
                          <img
                            src={dest.image}
                            alt={dest.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/destinations/bukit-holbung.jpg";
                            }}
                          />
                        </div>
                      )}

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-[#b8653a]">
                            ID: {dest.id}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {dest.category}
                          </span>
                          <span className="text-[11px] text-[#575e5b] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#c29d59]" />
                            {dest.regency}
                          </span>
                        </div>

                        <h4 className="font-newsreader text-base sm:text-lg font-semibold text-[#1a3a34]">
                          {dest.title}
                        </h4>

                        <p className="text-[12px] text-[#575e5b] line-clamp-1 mt-0.5">
                          {dest.description || "Destinasi terdaftar di kawasan Danau Toba."}
                        </p>

                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#1a3a34]">
                          <span>
                            Tarif: <strong>Rp {dest.price ? Number(dest.price).toLocaleString("id-ID") : "Gratis"}</strong> / {dest.price_unit || "orang"}
                          </span>
                          <span>•</span>
                          <span>Rating: ★ {dest.rating || 4.9} ({dest.reviews || 0} Ulasan)</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Edit & Delete */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <Link
                        href={`/destinasi/${dest.id}`}
                        target="_blank"
                        className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#e8e2d9] hover:bg-white text-[#1a3a34] text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Lihat Halaman Publik"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Pratinjau</span>
                      </Link>

                      <button
                        onClick={() => setEditingDest({ ...dest })}
                        className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#c29d59]/50 hover:bg-[#c29d59]/10 text-[#1a3a34] text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Edit Data Destinasi"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#c29d59]" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteDestination(dest.id, dest.title)}
                        className="p-2 sm:px-3.5 sm:py-1.5 rounded-xl border border-red-300 hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-1 transition-colors active:scale-95"
                        title="Hapus Permanen dari Supabase"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VERIFIKASI MITRA */}
        {activeTab === "mitra" && (
          <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#e8e2d9] mb-4">
              <div>
                <span className="font-cinzel text-[10.5px] font-bold text-[#b8653a] uppercase tracking-wider block mb-0.5">
                  Tindakan Prioritas
                </span>
                <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                  Verifikasi Pendaftaran Mitra Baru
                </h3>
              </div>

              <div className="flex items-center gap-1 bg-[#faf8f5] border border-[#e8e2d9] p-1 rounded-full text-[10.5px] sm:text-[11px] self-start sm:self-auto">
                <button
                  onClick={() => setPartnerFilter("all")}
                  className={`px-3 py-1 rounded-full font-semibold transition-all ${
                    partnerFilter === "all" ? "bg-[#1a3a34] text-white" : "text-[#575e5b]"
                  }`}
                >
                  Semua ({partners.length})
                </button>
                <button
                  onClick={() => setPartnerFilter("pending")}
                  className={`px-3 py-1 rounded-full font-semibold transition-all ${
                    partnerFilter === "pending" ? "bg-[#1a3a34] text-white" : "text-[#575e5b]"
                  }`}
                >
                  Menunggu ({partners.filter((p) => p.status === "Menunggu Verifikasi").length})
                </button>
              </div>
            </div>

            {/* Partner Verification List */}
            <div className="space-y-3">
              {filteredPartners.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-[#e8e2d9] hover:border-[#c29d59] bg-[#faf8f5] flex flex-col md:flex-row md:items-center justify-between gap-3.5 transition-all"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-[#1a3a34]">
                        {item.id}
                      </span>
                      <span
                        className={`text-[9.5px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === "Disetujui"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "Menunggu Verifikasi"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-[11px] text-[#575e5b]">NIB: {item.nib}</span>
                    </div>
                    <h4 className="font-newsreader text-base sm:text-lg font-semibold text-[#1a3a34]">
                      {item.businessName}
                    </h4>
                    <p className="text-[11.5px] sm:text-[12px] text-[#575e5b]">
                      Pemilik: <strong>{item.owner}</strong> • Kab. {item.regency} • {item.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.status === "Menunggu Verifikasi" ? (
                      <>
                        <button
                          onClick={() => handleApprovePartner(item.id)}
                          className="px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 shadow-sm transition-colors active:scale-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Setujui</span>
                        </button>
                        <button
                          onClick={() => handleRejectPartner(item.id)}
                          className="px-3 py-1.5 rounded-full border border-red-300 hover:bg-red-50 text-red-700 text-[11px] font-semibold uppercase tracking-wider transition-colors active:scale-95"
                        >
                          Revisi
                        </button>
                      </>
                    ) : (
                      <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Terverifikasi
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AUDIT TRANSAKSI */}
        {activeTab === "transaksi" && (
          <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#e8e2d9] mb-4">
              <div>
                <span className="font-cinzel text-[10.5px] font-bold text-[#b8653a] uppercase tracking-wider block mb-0.5">
                  Audit Arus Kas
                </span>
                <h3 className="font-newsreader text-xl sm:text-2xl font-semibold text-[#1a3a34]">
                  Monitoring Transaksi Real-Time
                </h3>
              </div>
              <button
                onClick={() => alert("Mengunduh rekap transaksi format Excel dinas...")}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#e8e2d9] hover:bg-[#faf8f5] text-[11px] font-semibold uppercase tracking-wider transition-colors active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Rekap</span>
              </button>
            </div>

            {/* Table with responsive horizontal scroll or empty state */}
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center bg-[#faf8f5] rounded-2xl border border-dashed border-[#e8e2d9] space-y-2">
                <Database className="w-8 h-8 text-[#c29d59] mx-auto opacity-70" />
                <h4 className="font-semibold text-sm text-[#1a3a34]">Belum Ada Transaksi Escrow</h4>
                <p className="text-xs text-[#575e5b] max-w-sm mx-auto">
                  Rekening bersama BPODT aktif dan siap menampung pembayaran tiket wisatawan secara otomatis. Transaksi baru akan tercatat di sini secara real-time.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto no-scrollbar w-full">
                <table className="w-full text-left text-[12px] min-w-[580px]">
                  <thead>
                    <tr className="border-b border-[#e8e2d9] text-[#575e5b] uppercase text-[10px] tracking-wider">
                      <th className="pb-2.5">ID Transaksi</th>
                      <th className="pb-2.5">Wisatawan</th>
                      <th className="pb-2.5">Layanan</th>
                      <th className="pb-2.5">Nominal</th>
                      <th className="pb-2.5">Kanal</th>
                      <th className="pb-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8e2d9]/60">
                    {recentTransactions.map((tx) => (
                      <tr key={tx.trxId} className="hover:bg-[#faf8f5]">
                        <td className="py-2.5 font-mono font-bold text-[#1a3a34]">{tx.trxId}</td>
                        <td className="py-2.5 font-semibold text-[#1a3a34]">{tx.traveler}</td>
                        <td className="py-2.5 text-[#575e5b] max-w-[160px] truncate">{tx.item}</td>
                        <td className="py-2.5 font-bold text-[#1a3a34]">{tx.amount}</td>
                        <td className="py-2.5 text-[#575e5b]">{tx.channel}</td>
                        <td className="py-2.5 text-right">
                          <div className="inline-flex items-center gap-2 justify-end">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold ${
                                tx.escrowStatus?.toLowerCase().includes("menunggu")
                                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                                  : "bg-emerald-50 text-emerald-800"
                              }`}
                            >
                              {tx.escrowStatus}
                            </span>
                            {tx.escrowStatus?.toLowerCase().includes("menunggu") && (
                              <button
                                type="button"
                                onClick={() => handleVerifyPayment(tx.trxId)}
                                className="px-2.5 py-1 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-[9.5px] font-bold uppercase tracking-wider transition-colors"
                              >
                                Verifikasi Lunas
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* MODAL: TAMBAH DESTINASI BARU */}
        {isAddDestModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#c29d59]/40 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#e8e2d9]">
                <div>
                  <h3 className="font-newsreader text-xl font-bold text-[#1a3a34]">
                    Tambah Destinasi Baru
                  </h3>
                  <p className="text-xs text-[#575e5b]">
                    Data akan langsung tersimpan di Supabase PostgreSQL
                  </p>
                </div>
                <button
                  onClick={() => setIsAddDestModalOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddDestination} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1 text-[#1a3a34]">Judul Destinasi / Layanan *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Menara Pandang Tele Samosir"
                    className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-[#1a3a34]">Kategori *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                    >
                      <option value="Geosite Alam">Geosite Alam</option>
                      <option value="Warisan Budaya">Warisan Budaya</option>
                      <option value="Kriya & Tenun">Kriya & Tenun</option>
                      <option value="Kuliner Khas">Kuliner Khas</option>
                      <option value="Homestay Tepi Danau">Homestay</option>
                      <option value="Tur & Pemandu">Tur & Pemandu</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-[#1a3a34]">Kabupaten *</label>
                    <select
                      value={newRegency}
                      onChange={(e) => setNewRegency(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                    >
                      <option value="Samosir">Samosir</option>
                      <option value="Toba (Balige)">Toba (Balige)</option>
                      <option value="Humbang Hasundutan">Humbang Hasundutan</option>
                      <option value="Simalungun">Simalungun</option>
                      <option value="Karo">Karo</option>
                      <option value="Dairi">Dairi</option>
                      <option value="Tapanuli Utara">Tapanuli Utara</option>
                      <option value="Pakpak Bharat">Pakpak Bharat</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-[#1a3a34]">Tarif (Rp)</label>
                    <input
                      type="text"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="15000"
                      className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-[#1a3a34]">Satuan</label>
                    <input
                      type="text"
                      value={newPriceUnit}
                      onChange={(e) => setNewPriceUnit(e.target.value)}
                      placeholder="orang / tiket / malam"
                      className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-[#1a3a34]">Lokasi / Sub-wilayah</label>
                  <input
                    type="text"
                    value={newSubregion}
                    onChange={(e) => setNewSubregion(e.target.value)}
                    placeholder="Contoh: Harian Boho, Samosir"
                    className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-[#1a3a34]">Foto Destinasi</label>
                  <select
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                  >
                    <option value="/images/destinations/bukit-holbung.jpg">Bukit Holbung</option>
                    <option value="/images/destinations/desa-tomok.jpg">Desa Tomok</option>
                    <option value="/images/destinations/lembah-bakkara.jpg">Lembah Bakkara</option>
                    <option value="/images/destinations/kopi-lintong.jpg">Kopi Lintong</option>
                    <option value="/images/destinations/tenun-ulos.jpg">Tenun Ulos Huta Raja</option>
                    <option value="/images/destinations/bukit-tarabunga.jpg">Bukit Tarabunga</option>
                    <option value="/images/destinations/sipiso-piso.jpg">Air Terjun Sipiso-piso</option>
                    <option value="/images/destinations/sigale-gale.jpg">Patung Sigale-gale</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-[#1a3a34]">Deskripsi Singkat</label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Tuliskan daya tarik dan sejarah singkat destinasi ini..."
                    className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e8e2d9]">
                  <button
                    type="button"
                    onClick={() => setIsAddDestModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#c29d59]" />
                    <span>Simpan ke Database</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT DESTINASI */}
        {editingDest && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#c29d59]/40 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#e8e2d9]">
                <div>
                  <h3 className="font-newsreader text-xl font-bold text-[#1a3a34]">
                    Edit Data Destinasi
                  </h3>
                  <p className="text-xs text-[#575e5b]">
                    ID: <code className="font-mono text-[#b8653a]">{editingDest.id}</code>
                  </p>
                </div>
                <button
                  onClick={() => setEditingDest(null)}
                  className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateDestination} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1 text-[#1a3a34]">Judul Destinasi *</label>
                  <input
                    type="text"
                    required
                    value={editingDest.title}
                    onChange={(e) => setEditingDest({ ...editingDest, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-[#1a3a34]">Kategori</label>
                    <input
                      type="text"
                      value={editingDest.category}
                      onChange={(e) => setEditingDest({ ...editingDest, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-[#1a3a34]">Kabupaten</label>
                    <input
                      type="text"
                      value={editingDest.regency}
                      onChange={(e) => setEditingDest({ ...editingDest, regency: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-[#1a3a34]">Tarif (Rp)</label>
                    <input
                      type="text"
                      value={editingDest.price || ""}
                      onChange={(e) => setEditingDest({ ...editingDest, price: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1 text-[#1a3a34]">Satuan</label>
                    <input
                      type="text"
                      value={editingDest.price_unit || "orang"}
                      onChange={(e) => setEditingDest({ ...editingDest, price_unit: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-[#1a3a34]">Deskripsi Singkat</label>
                  <textarea
                    rows={3}
                    value={editingDest.description || ""}
                    onChange={(e) => setEditingDest({ ...editingDest, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#e8e2d9] focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#e8e2d9]">
                  <button
                    type="button"
                    onClick={() => handleDeleteDestination(editingDest.id, editingDest.title)}
                    className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Hapus Permanen</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingDest(null)}
                      className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
