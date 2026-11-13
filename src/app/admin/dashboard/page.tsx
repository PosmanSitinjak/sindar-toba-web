"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function SuperadminDashboardPage() {
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [weatherAlertActive, setWeatherAlertActive] = useState(false);

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

  const recentTransactions = [
    {
      trxId: "TRX-ST-98214",
      traveler: "Bagus Pratama",
      item: "2x Tiket Bukit Holbung Samosir + Pemandu",
      amount: "Rp 155.000",
      channel: "QRIS Dinamis",
      escrowStatus: "Tertahan di Escrow",
      time: "10 Menit Lalu",
    },
    {
      trxId: "TRX-ST-98213",
      traveler: "Sarah Jenkins",
      item: "Pelayaran Damai Perahu Solu Bolon (2 Pax)",
      amount: "Rp 500.000",
      channel: "VA Bank Mandiri",
      escrowStatus: "Tertahan di Escrow",
      time: "32 Menit Lalu",
    },
    {
      trxId: "TRX-ST-98212",
      traveler: "Rian Sitompul",
      item: "1x Homestay Rura Batak (Check-in Hari Ini)",
      amount: "Rp 350.000",
      channel: "VA Bank Sumut",
      escrowStatus: "Siap Dicairkan ke Mitra",
      time: "2 Jam Lalu",
    },
    {
      trxId: "TRX-ST-98210",
      traveler: "Dewi Lestari",
      item: "Kopi Arabika Lintong Specialty 250g",
      amount: "Rp 95.000",
      channel: "GoPay / E-Wallet",
      escrowStatus: "Selesai",
      time: "4 Jam Lalu",
    },
  ];

  const handleApprovePartner = (id: string) => {
    setPartners(
      partners.map((p) => (p.id === id ? { ...p, status: "Disetujui" } : p))
    );
    alert(`Mitra ${id} berhasil diverifikasi dan diterbitkan ke ekosistem publik SINDAR TOBA!`);
  };

  const handleRejectPartner = (id: string) => {
    setPartners(
      partners.map((p) => (p.id === id ? { ...p, status: "Ditolak / Perlu Revisi" } : p))
    );
    alert(`Mitra ${id} ditandai untuk revisi dokumen NIB/KTP.`);
  };

  const filteredPartners =
    partnerFilter === "all"
      ? partners
      : partnerFilter === "pending"
      ? partners.filter((p) => p.status === "Menunggu Verifikasi")
      : partners.filter((p) => p.status === "Disetujui");

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a3a34]">
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
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 font-medium">Gateway: Aktif</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/70 hidden sm:inline">
                Admin: <strong>Christofer</strong>
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
              { label: "Geosite", value: "48 Destinasi", change: "8 Kabupaten", icon: Compass, color: "text-[#1a3a34]" },
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

        {/* Two-Column Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Left Column: Partner Approval & Transactions */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Critical Action: Verifikasi Pendaftaran Mitra Terbaru */}
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

            {/* Production Data Table: Transaksi & Monitoring */}
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

              {/* Table with responsive horizontal scroll */}
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
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9.5px] font-bold">
                            {tx.escrowStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Modular Admin Quick-Controls */}
          <div className="space-y-5 sm:space-y-6">
            {/* Quick Control Widget 1: Weather Warning */}
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-6 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-[#e8e2d9]">
                <Radio className="w-4 h-4 text-[#c29d59]" />
                <h4 className="font-cinzel text-xs font-bold text-[#1a3a34] uppercase tracking-wider">
                  Siaran Peringatan Cuaca
                </h4>
              </div>

              <p className="text-[12px] text-[#575e5b] leading-relaxed">
                Aktifkan banner peringatan darurat ke seluruh pengunjung website jika terjadi cuaca ekstrem atau gelombang tinggi di kaldera.
              </p>

              <button
                onClick={() => setWeatherAlertActive(!weatherAlertActive)}
                className={`w-full py-2.5 px-4 rounded-xl text-[11.5px] font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-95 ${
                  weatherAlertActive
                    ? "bg-red-700 text-white hover:bg-red-800"
                    : "bg-[#1a3a34] text-white hover:bg-[#122a25]"
                }`}
              >
                <span>{weatherAlertActive ? "Matikan Siaga Cuaca" : "Aktifkan Siaga Cuaca"}</span>
              </button>
            </div>

            {/* Quick Control Widget 2: Kategori Master Data */}
            <div className="bg-white border border-[#e8e2d9] rounded-3xl p-5 sm:p-6 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 pb-2.5 border-b border-[#e8e2d9]">
                <Compass className="w-4 h-4 text-[#c29d59]" />
                <h4 className="font-cinzel text-xs font-bold text-[#1a3a34] uppercase tracking-wider">
                  Master Kategori Geosite
                </h4>
              </div>

              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between items-center p-2 rounded-xl bg-[#faf8f5]">
                  <span>Wisata Alam & Savana</span>
                  <span className="font-bold text-[#1a3a34]">18 Geosite</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-[#faf8f5]">
                  <span>Cagar Budaya Batak</span>
                  <span className="font-bold text-[#1a3a34]">14 Situs</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-[#faf8f5]">
                  <span>Sentra UMKM Kriya & Kopi</span>
                  <span className="font-bold text-[#1a3a34]">16 Sentra</span>
                </div>
              </div>
            </div>

            {/* Quick Control Widget 3: Official Reports Export */}
            <div className="bg-[#1a3a34] text-white rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
              <span className="font-cinzel text-[10.5px] font-bold text-[#c29d59] uppercase tracking-wider block">
                Laporan Eksekutif Dinas
              </span>
              <h4 className="font-newsreader text-base sm:text-lg font-semibold">
                Ekspor Laporan Kinerja Bulanan
              </h4>
              <p className="text-[12px] text-white/80 leading-relaxed">
                Format resmi berstandar Kemenparekraf memuat rekapitulasi pengunjung, retribusi PAD, dan sebaran UMKM 8 kabupaten.
              </p>
              <button
                onClick={() => alert("Mengenerate dokumen PDF Laporan Eksekutif BPODT...")}
                className="w-full py-2.5 rounded-full bg-[#c29d59] hover:bg-[#b08b47] text-[#1a3a34] font-bold text-[11px] uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Laporan (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}