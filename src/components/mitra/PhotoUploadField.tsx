"use client";

import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Link2, RefreshCw, Check } from "lucide-react";

export const PRESET_TOBA_PHOTOS = [
  { label: "Bukit Holbung", path: "/images/destinations/bukit-holbung.jpg" },
  { label: "Desa Tomok", path: "/images/destinations/desa-tomok.jpg" },
  { label: "Lembah Bakkara", path: "/images/destinations/lembah-bakkara.jpg" },
  { label: "Kopi Lintong", path: "/images/destinations/kopi-lintong.jpg" },
  { label: "Tenun Ulos", path: "/images/destinations/tenun-ulos.jpg" },
  { label: "Bukit Tarabunga", path: "/images/destinations/bukit-tarabunga.jpg" },
  { label: "Sipiso-piso", path: "/images/destinations/sipiso-piso.jpg" },
  { label: "Sigale-gale", path: "/images/destinations/sigale-gale.jpg" },
];

/**
 * Resize and compress a local image file into a compact JPEG Data URL
 * so it persists reliably in both Supabase text columns and localStorage.
 */
export function compressImageToDataUrl(
  file: File,
  maxWidth = 1000,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
    reader.onload = () => {
      const rawUrl = reader.result as string;
      const img = new window.Image();
      img.onerror = () => resolve(rawUrl);
      img.onload = () => {
        try {
          const ratio = img.width > maxWidth ? maxWidth / img.width : 1;
          const targetW = Math.max(1, Math.round(img.width * ratio));
          const targetH = Math.max(1, Math.round(img.height * ratio));
          const canvas = document.createElement("canvas");
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(rawUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, targetW, targetH);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch {
          resolve(rawUrl);
        }
      };
      img.src = rawUrl;
    };
    reader.readAsDataURL(file);
  });
}

interface PhotoUploadFieldProps {
  value: string;
  onChange: (newImageUrl: string) => void;
  label?: string;
}

export default function PhotoUploadField({
  value,
  onChange,
  label = "Foto Utama Layanan / Destinasi",
}: PhotoUploadFieldProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePreview = value || "/images/destinations/bukit-holbung.jpg";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);

    if (!file.type.startsWith("image/")) {
      setUploadError("Mohon pilih file gambar (JPG, PNG, atau WebP).");
      return;
    }

    setIsProcessing(true);
    try {
      const compressed = await compressImageToDataUrl(file);
      onChange(compressed);
    } catch {
      setUploadError("Gagal memproses foto. Silakan coba gambar lain.");
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-semibold text-[#1a3a34] uppercase tracking-wider">
        {label}
      </label>

      {/* Preview Container */}
      <div className="relative h-36 sm:h-40 w-full rounded-2xl overflow-hidden border border-[#e8e2d9] bg-[#faf8f5] group">
        <img
          src={activePreview}
          alt="Preview Foto Layanan"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/destinations/bukit-holbung.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent flex items-end justify-between p-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black/45 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <ImageIcon className="w-3.5 h-3.5 text-[#c29d59]" />
            <span>{value.startsWith("data:") ? "Foto Unggahan Lokal" : "Pratinjau Foto"}</span>
          </span>

          <button
            type="button"
            disabled={isProcessing}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white border border-[#c29d59] text-[11px] font-semibold shadow-md transition-all active:scale-95 disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c29d59]" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 text-[#c29d59]" />
                <span>Unggah Foto</span>
              </>
            )}
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {uploadError && (
        <p className="text-[11px] text-red-600 font-medium">{uploadError}</p>
      )}

      {/* URL Input Alternative */}
      <div className="relative">
        <Link2 className="w-3.5 h-3.5 text-[#575e5b] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Atau tempel URL foto (https://... atau /images/...)"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#1a3a34] placeholder:text-stone-400 focus:outline-none focus:border-[#c29d59]"
        />
      </div>

      {/* Quick Preset Gallery */}
      <div>
        <span className="text-[10.5px] font-semibold text-[#575e5b] block mb-1.5">
          Atau pilih cepat dari Galeri Kaldera Toba:
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {PRESET_TOBA_PHOTOS.map((preset) => {
            const isSelected = value === preset.path;
            return (
              <button
                key={preset.path}
                type="button"
                onClick={() => onChange(preset.path)}
                title={preset.label}
                className={`relative w-14 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  isSelected
                    ? "border-[#1a3a34] ring-2 ring-[#c29d59]/50 scale-105"
                    : "border-[#e8e2d9] hover:border-[#c29d59] opacity-85 hover:opacity-100"
                }`}
              >
                <img
                  src={preset.path}
                  alt={preset.label}
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#1a3a34]/45 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
