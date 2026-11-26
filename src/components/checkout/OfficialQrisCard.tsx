"use client";

import React, { useState, useEffect } from "react";
import { buildQrisPayload, generateQrDataUrl } from "@/lib/qris";
import {
  Download,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

interface OfficialQrisCardProps {
  amount: number;
  bookingCode: string;
  merchantName?: string;
  customQrisImage?: string | null;
  onDownloaded?: () => void;
}

export default function OfficialQrisCard({
  amount,
  bookingCode,
  merchantName = "SINDAR TOBA BPODT ESCROW",
  customQrisImage,
  onDownloaded,
}: OfficialQrisCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [qrisPayload, setQrisPayload] = useState<string>("");
  const [copiedNominal, setCopiedNominal] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [viewMode, setViewMode] = useState<"standard" | "custom">(
    customQrisImage ? "custom" : "standard"
  );
  const [isGenerating, setIsGenerating] = useState(true);

  const nmid = "ID1024350123456";

  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);

    const payload = buildQrisPayload({
      nmid,
      merchantName,
      city: "SAMOSIR",
      postalCode: "22395",
      amount,
      bookingCode,
      isStatic: true, // Static QRIS (Tidak Dinamis) sesuai standar UMKM & ASPI
    });

    setQrisPayload(payload);

    generateQrDataUrl(payload, 380).then((url) => {
      if (isMounted) {
        setQrDataUrl(url);
        setIsGenerating(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [amount, bookingCode, merchantName]);

  const handleCopyNominal = () => {
    navigator.clipboard.writeText(amount.toString());
    setCopiedNominal(true);
    setTimeout(() => setCopiedNominal(false), 2000);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qrisPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleDownloadQr = () => {
    const link = document.createElement("a");
    link.download = `QRIS-${bookingCode}.png`;
    link.href = viewMode === "custom" && customQrisImage ? customQrisImage : qrDataUrl;
    link.click();
    if (onDownloaded) onDownloaded();
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      {/* If Mitra has custom uploaded QRIS image, provide toggle */}
      {customQrisImage && (
        <div className="flex rounded-xl bg-stone-100 p-1 border border-[#e8e2d9] text-xs">
          <button
            type="button"
            onClick={() => setViewMode("standard")}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
              viewMode === "standard"
                ? "bg-white text-[#1a3a34] shadow-sm"
                : "text-[#575e5b] hover:text-[#1a3a34]"
            }`}
          >
            QRIS Nasional SINDAR TOBA
          </button>
          <button
            type="button"
            onClick={() => setViewMode("custom")}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
              viewMode === "custom"
                ? "bg-white text-[#1a3a34] shadow-sm"
                : "text-[#575e5b] hover:text-[#1a3a34]"
            }`}
          >
            QRIS Langsung Mitra
          </button>
        </div>
      )}

      {/* Official Standar QRIS Stand Frame */}
      <div className="bg-white rounded-3xl border-2 border-stone-300 shadow-xl overflow-hidden transition-all text-center">
        {/* Top Official Red Banner */}
        <div className="bg-gradient-to-r from-[#c01d24] via-[#d3222a] to-[#c01d24] text-white px-5 py-3 flex items-center justify-between border-b-2 border-[#8f1217]">
          {/* QRIS Logo */}
          <div className="text-left leading-none">
            <div className="flex items-center gap-0.5 tracking-tighter font-extrabold text-2xl font-sans">
              <span>QR</span>
              <span className="inline-block relative">
                I<span className="w-1.5 h-1.5 bg-white absolute -top-1 left-1/2 -translate-x-1/2 rounded-none"></span>
              </span>
              <span>S</span>
            </div>
            <span className="text-[7.5px] font-bold tracking-[0.2em] uppercase opacity-90 block mt-1">
              PEMBAYARAN NASIONAL
            </span>
          </div>

          {/* GPN Logo Badge */}
          <div className="flex items-center gap-1.5 bg-white text-[#c01d24] px-2.5 py-1 rounded-lg shadow-sm border border-white/60">
            <div className="w-4 h-4 bg-[#c01d24] text-white rounded-full flex items-center justify-center font-bold text-[9px] shadow-sm">
              G
            </div>
            <div className="text-left leading-tight">
              <span className="font-extrabold text-[11px] block font-sans tracking-tight text-[#1a1a1a]">
                GPN
              </span>
            </div>
          </div>
        </div>

        {/* Merchant Identity Header */}
        <div className="px-5 pt-3.5 pb-2 text-center border-b border-stone-100 bg-[#fcfbfa]">
          <h4 className="font-bold text-sm text-[#1a1a1a] uppercase tracking-wide truncate">
            {merchantName}
          </h4>
          <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 font-mono mt-0.5">
            <span>NMID: {nmid}</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">A01</span>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="p-4 bg-white flex flex-col items-center justify-center">
          {viewMode === "custom" && customQrisImage ? (
            <div className="w-60 h-60 rounded-2xl overflow-hidden border border-stone-200 p-2 flex items-center justify-center bg-white shadow-sm">
              <img
                src={customQrisImage}
                alt="Barcode QRIS Mitra"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="relative w-60 h-60 rounded-2xl overflow-hidden border border-stone-200 p-2.5 flex items-center justify-center bg-white shadow-sm group">
              {isGenerating || !qrDataUrl ? (
                <div className="flex flex-col items-center justify-center gap-2 text-stone-400">
                  <RefreshCw className="w-8 h-8 animate-spin text-[#c29d59]" />
                  <span className="text-xs">Menyiapkan QRIS Nasional...</span>
                </div>
              ) : (
                <>
                  <img
                    src={qrDataUrl}
                    alt="QRIS Nasional Standar ASPI"
                    className="w-full h-full object-contain"
                  />
                  {/* Small Official Center Badge (Like genuine QRIS) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white p-0.5 rounded-lg border-2 border-stone-300 flex items-center justify-center shadow-md">
                    <div className="w-full h-full bg-[#c01d24] text-white flex flex-col items-center justify-center rounded-[4px] leading-none">
                      <span className="font-extrabold text-[8px] tracking-tighter">QRIS</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tagline */}
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-2 block">
            SATU QRIS UNTUK SEMUA
          </span>
          <span className="text-[9px] text-stone-400 font-mono mt-0.5 block">
            Ref: {bookingCode}
          </span>
        </div>

        {/* Nominal Transfer Box */}
        <div className="mx-4 mb-3.5 p-3 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] text-[#575e5b] uppercase font-semibold block">
              Nominal Transaksi:
            </span>
            <div className="font-cinzel text-xl font-bold text-[#1a3a34]">
              Rp {amount.toLocaleString("id-ID")}
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyNominal}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#e8e2d9] text-[11px] font-semibold text-[#1a3a34] hover:bg-stone-50 flex items-center gap-1 shadow-sm active:scale-95 transition-all"
            title="Salin Nominal"
          >
            {copiedNominal ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>

        {/* Bank & e-Wallet Logos Ribbon */}
        <div className="px-4 py-2 bg-stone-50 border-t border-stone-200/80">
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
            Dapat Di-Scan Semua Aplikasi Pembayaran:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1 text-[9.5px] font-semibold text-stone-600">
            <span className="px-1.5 py-0.5 bg-white rounded border border-stone-200">BCA Mobile</span>
            <span className="px-1.5 py-0.5 bg-white rounded border border-stone-200">Livin Mandiri</span>
            <span className="px-1.5 py-0.5 bg-white rounded border border-stone-200">BRImo</span>
            <span className="px-1.5 py-0.5 bg-white rounded border border-stone-200">BNI Mobile</span>
            <span className="px-1.5 py-0.5 bg-amber-50 rounded border border-amber-200 text-amber-900 font-bold">Bank Sumut</span>
            <span className="px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-200 text-emerald-800">GoPay</span>
            <span className="px-1.5 py-0.5 bg-purple-50 rounded border border-purple-200 text-purple-800">OVO</span>
            <span className="px-1.5 py-0.5 bg-blue-50 rounded border border-blue-200 text-blue-800">DANA</span>
            <span className="px-1.5 py-0.5 bg-orange-50 rounded border border-orange-200 text-orange-800">ShopeePay</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Unduh & Salin QRIS */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDownloadQr}
          disabled={!qrDataUrl && !customQrisImage}
          className="flex-1 py-2 px-3 rounded-xl bg-white border border-[#e8e2d9] hover:bg-stone-50 text-[#1a3a34] text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <Download className="w-3.5 h-3.5 text-[#c29d59]" />
          <span>Unduh Gambar QRIS</span>
        </button>

        <button
          type="button"
          onClick={handleCopyPayload}
          disabled={!qrisPayload}
          className="py-2 px-3 rounded-xl bg-white border border-[#e8e2d9] hover:bg-stone-50 text-[#575e5b] text-[11px] font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
          title="Salin Data String QRIS"
        >
          {copiedPayload ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-stone-500" />
          )}
          <span>{copiedPayload ? "Tersalin!" : "Salin QR"}</span>
        </button>
      </div>

      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-[11px] leading-relaxed flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <strong>Cara Bayar:</strong> Buka aplikasi m-banking atau e-wallet Anda (BCA, Livin, GoPay, OVO, dll), pilih menu <strong>Scan QRIS</strong>, arahkan kamera ke barcode di atas, lalu masukkan nominal transfer.
        </div>
      </div>
    </div>
  );
}
