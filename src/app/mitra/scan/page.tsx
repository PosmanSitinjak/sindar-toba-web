"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  QrCode,
  Camera,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Lock,
  Unlock,
  Users,
  Calendar,
  MapPin,
  X,
  Check,
  Search,
  ExternalLink,
  Building2,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { PRESET_MITRA_LIST } from "@/lib/mitra";

export default function MitraScanPage() {
  const [bookingCodeInput, setBookingCodeInput] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    alreadyUsed?: boolean;
    ticket?: any;
    message: string;
  } | null>(null);

  const [currentMitra, setCurrentMitra] = useState({
    name: "Homestay Rura Batak & Tour Samosir",
    code: "MIT-BPODT-0482",
    category: "Homestay & Penginapan",
    owner: "Mangatur Sitinjak",
  });
  const [isSwitchLoketOpen, setIsSwitchLoketOpen] = useState(false);

  const [waitingTickets, setWaitingTickets] = useState<any[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync active Mitra profile
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sindar_current_mitra");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.name) {
            setCurrentMitra(parsed);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const switchLoket = (m: any) => {
    setCurrentMitra(m);
    if (typeof window !== "undefined") {
      localStorage.setItem("sindar_role", "mitra");
      localStorage.setItem("sindar_current_mitra", JSON.stringify(m));
      localStorage.setItem("sindar_mitra_name", m.name);
    }
    setIsSwitchLoketOpen(false);
  };

  // Load tickets that are waiting for check-in
  const loadWaitingTickets = () => {
    let localList: any[] = [];
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sindar_purchased_tickets");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            localList = parsed;
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
              id: d.id,
              bookingCode: d.booking_code,
              destination: d.destination_name,
              geosite: d.geosite_label || "Geosite Kaldera Toba",
              date: d.visit_date,
              time: d.visit_time || "08:00 - 17:00 WIB",
              visitors: `${d.visitors} Orang`,
              addons: d.addons || [],
              totalPaid: `Rp ${Number(d.total_paid).toLocaleString("id-ID")}`,
              status: d.status || "Lunas (Siap Digunakan)",
              location: d.location || "Danau Toba",
              organizerPhone: d.organizer_phone || "6281234567890",
              organizerName: d.organizer_name || "Pokdarwis Danau Toba",
            }));

            // Merge uniquely
            const merged = [...localList];
            const existingCodes = new Set(localList.map((t: any) => t.bookingCode));
            mapped.forEach((m: any) => {
              if (!existingCodes.has(m.bookingCode)) {
                merged.push(m);
              }
            });
            setWaitingTickets(merged);
            return;
          }
          setWaitingTickets(localList);
        });
    } else {
      setWaitingTickets(localList);
    }
  };

  useEffect(() => {
    loadWaitingTickets();
  }, []);

  // Web camera activation toggle
  const toggleCamera = async () => {
    if (isCameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      setCameraError(null);
    } else {
      setCameraError(null);
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
          setIsCameraActive(true);
        } else {
          setCameraError("Perangkat tidak mendukung akses kamera browser.");
        }
      } catch (err: any) {
        console.error("Camera access error:", err);
        setCameraError(
          "Izin kamera belum diberikan. Anda tetap bisa menggunakan mode input kode booking atau simulasi di bawah!"
        );
      }
    }
  };

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Play audio chime on success
  const playSuccessChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // AudioContext fallback
    }
  };

  // Perform ticket validation
  const validateTicket = async (codeToValidate: string) => {
    const cleanCode = codeToValidate.trim().toUpperCase();
    if (!cleanCode) return;

    setIsValidating(true);
    setValidationResult(null);

    // Look up ticket from memory / localStorage
    let allTickets = [...waitingTickets];
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sindar_purchased_tickets");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            allTickets = [...parsed, ...allTickets];
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Default mock ticket if testing with random code
    let target = allTickets.find(
      (t) => t.bookingCode?.toUpperCase() === cleanCode || t.id?.toUpperCase() === cleanCode
    );

    if (!target) {
      // Create a sensible valid fallback for demo testing
      target = {
        id: `TKT-${cleanCode.slice(-4) || "0912"}`,
        bookingCode: cleanCode,
        destination: "Bukit Holbung Samosir (Savana Kaldera)",
        geosite: "Geosite UNESCO #04",
        date: "Hari Ini (20 Nov 2026)",
        time: "08:00 - 17:00 WIB",
        visitors: "2 Orang",
        addons: ["Pemandu Cerita Adat Lokal", "Sewa 2 Kain Ulos"],
        totalPaid: "Rp 155.000",
        status: "Lunas (Siap Digunakan)",
        location: "Harian Boho, Samosir",
        organizerName: "Pokdarwis Harian Boho",
        organizerPhone: "6281234567890",
      };
    }

    // Check if already used
    const isAlreadyUsed =
      target.status?.toLowerCase().includes("selesai") ||
      target.status?.toLowerCase().includes("digunakan");

    if (isAlreadyUsed) {
      setTimeout(() => {
        setIsValidating(false);
        setValidationResult({
          success: false,
          alreadyUsed: true,
          ticket: target,
          message: `Tiket dengan kode ${cleanCode} SUDAH PERNAH DIGUNAKAN sebelumnya!`,
        });
      }, 700);
      return;
    }

    // Mark as used & update Supabase
    const updatedTicket = {
      ...target,
      status: "Selesai (Sudah Digunakan)",
      checkInTime: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
      validatedBy: currentMitra.name,
      mitraCode: currentMitra.code,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from("tickets")
          .update({
            status: "Selesai (Sudah Digunakan)",
            organizer_name: currentMitra.name,
          })
          .eq("booking_code", cleanCode);
      } catch (err) {
        console.error("Supabase ticket status update error:", err);
      }
    }

    // Update LocalStorage
    if (typeof window !== "undefined") {
      try {
        const storedTkt = JSON.parse(localStorage.getItem("sindar_purchased_tickets") || "[]");
        const updatedList = storedTkt.map((t: any) =>
          t.bookingCode?.toUpperCase() === cleanCode ? updatedTicket : t
        );
        localStorage.setItem("sindar_purchased_tickets", JSON.stringify(updatedList));

        // Update Escrow status in transactions and credit to current active partner
        const storedTrx = JSON.parse(localStorage.getItem("sindar_transactions") || "[]");
        const updatedTrx = storedTrx.map((tx: any) =>
          tx.trxId?.includes(cleanCode) || tx.item?.includes(target.destination)
            ? {
                ...tx,
                escrowStatus: "Siap Dicairkan ke Mitra",
                partner: currentMitra.name,
              }
            : tx
        );
        localStorage.setItem("sindar_transactions", JSON.stringify(updatedTrx));
      } catch (e) {
        console.error(e);
      }
    }

    // Update state
    setWaitingTickets((prev) =>
      prev.map((t) => (t.bookingCode?.toUpperCase() === cleanCode ? updatedTicket : t))
    );

    setTimeout(() => {
      setIsValidating(false);
      playSuccessChime();
      setValidationResult({
        success: true,
        alreadyUsed: false,
        ticket: updatedTicket,
        message: "Check-in Berhasil! Wisatawan dipersilakan masuk kawasan wisata.",
      });
      setBookingCodeInput("");
    }, 850);
  };

  return (
    <div className="min-h-screen bg-[#122a25] text-white flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-[#1a3a34] px-4 sm:px-6 py-4 border-b border-[#c29d59]/30 sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <Link
            href="/mitra/dashboard"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#c29d59] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Dashboard Mitra</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSwitchLoketOpen(true)}
              className="text-right hidden sm:block hover:opacity-90 transition-opacity bg-black/25 px-3 py-1 rounded-xl border border-white/10"
              title="Klik untuk mengganti akun mitra yang sedang bertugas di loket"
            >
              <span className="text-[9.5px] text-white/60 uppercase tracking-wider block">
                Petugas Loket Aktif ▾
              </span>
              <span className="text-xs font-semibold text-[#c29d59] truncate max-w-[200px] block">
                {currentMitra.name}
              </span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10.5px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold uppercase tracking-wider">Akses Gerbang Sah</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Scanner Section */}
      <main className="max-w-2xl w-full mx-auto px-4 py-6 sm:py-8 space-y-6 flex-grow flex flex-col justify-center">
        {/* Title & Badge */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#c29d59]/40 text-[#c29d59] text-[10.5px] font-bold tracking-widest uppercase mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Hak Akses Loket Setara Seluruh Mitra BPODT</span>
          </div>
          <h1 className="font-newsreader text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Scanner E-Tiket & Verifikasi Kedatangan
          </h1>
          <p className="text-xs text-white/75 max-w-md mx-auto">
            Petugas Loket: <strong className="text-white">{currentMitra.name}</strong> ({currentMitra.code})
          </p>
          <div className="sm:hidden pt-0.5">
            <button
              onClick={() => setIsSwitchLoketOpen(true)}
              className="text-[11px] text-[#c29d59] underline font-semibold"
            >
              Ganti Akun Mitra Bertugas (Demo Multi-Mitra)
            </button>
          </div>
        </div>

        {/* Viewport Scanner Card */}
        <div className="bg-[#1a3a34] border border-[#c29d59]/40 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          {/* Subtle Batak Ornament Ambient */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#c29d59]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Scanner Viewport Box */}
          <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] mx-auto bg-black/60 rounded-2xl overflow-hidden border-2 border-[#c29d59]/60 shadow-inner flex flex-col items-center justify-center">
            {/* Live Camera Video (if active) */}
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${isCameraActive ? "block" : "hidden"}`}
              playsInline
              muted
            />

            {/* Static Simulated Viewport (if camera off) */}
            {!isCameraActive && (
              <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <QrCode className="w-8 h-8 text-[#c29d59]" />
                </div>
                <div>
                  <span className="font-semibold text-xs block text-white">
                    Kamera Siap Digunakan
                  </span>
                  <span className="text-[10.5px] text-white/60">
                    Arahkan kamera ke QR Code pada layar HP wisatawan
                  </span>
                </div>
              </div>
            )}

            {/* Animated Laser Scanning Line */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-[bounce_2s_infinite]" />

            {/* Viewport Target Corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#c29d59]" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#c29d59]" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#c29d59]" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#c29d59]" />
          </div>

          {/* Camera Error Message (if any) */}
          {cameraError && (
            <p className="text-[11px] text-amber-300 text-center mt-3 bg-amber-950/60 p-2 rounded-xl border border-amber-600/50">
              {cameraError}
            </p>
          )}

          {/* Toggle Camera Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={toggleCamera}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95 ${
                isCameraActive
                  ? "bg-red-700 hover:bg-red-800 text-white"
                  : "bg-[#c29d59] hover:bg-[#b08b47] text-[#1a3a34]"
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{isCameraActive ? "Matikan Kamera" : "Aktifkan Kamera Scanner"}</span>
            </button>
          </div>
        </div>

        {/* Manual Quick Validation / Demo Simulator */}
        <div className="bg-[#1a3a34] border border-[#e8e2d9]/20 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Search className="w-4 h-4 text-[#c29d59]" />
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-white">
              Validasi Cepat / Input Kode Booking (Mode Demo)
            </h3>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              validateTicket(bookingCodeInput);
            }}
            className="flex flex-col sm:flex-row gap-2.5"
          >
            <input
              type="text"
              value={bookingCodeInput}
              onChange={(e) => setBookingCodeInput(e.target.value)}
              placeholder="Contoh: ST-2026-HB0491"
              className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder:text-white/40 text-xs sm:text-sm font-mono uppercase focus:outline-none focus:border-[#c29d59]"
            />
            <button
              type="submit"
              disabled={isValidating || !bookingCodeInput.trim()}
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 shrink-0"
            >
              {isValidating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memeriksa...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Validasi Masuk</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Select Ticket Waiting for Check-in */}
          {waitingTickets.length > 0 && (
            <div className="pt-2">
              <span className="text-[10.5px] text-white/60 uppercase tracking-wider block mb-2 font-semibold">
                Pilih Tiket yang Sedang Menunggu di Loket:
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar">
                {waitingTickets.map((tkt) => {
                  const isDone = tkt.status?.toLowerCase().includes("selesai");
                  return (
                    <button
                      key={tkt.bookingCode || tkt.id}
                      onClick={() => validateTicket(tkt.bookingCode)}
                      disabled={isDone || isValidating}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                        isDone
                          ? "bg-white/5 border-white/10 opacity-60 cursor-not-allowed"
                          : "bg-white/10 border-white/20 hover:border-[#c29d59] hover:bg-white/20"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-mono font-bold text-[#c29d59] mr-2">
                          {tkt.bookingCode}
                        </span>
                        <span className="text-white/90 truncate">{tkt.destination}</span>
                      </div>
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isDone
                            ? "bg-stone-800 text-stone-400"
                            : "bg-emerald-900/80 text-emerald-300 border border-emerald-500/40"
                        }`}
                      >
                        {isDone ? "Sudah Hadir" : "Klik Validasi"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* VALIDATION RESULT POPUP MODAL */}
        {validationResult && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-[#1a3a34] shadow-2xl relative animate-in zoom-in-95">
              <button
                onClick={() => setValidationResult(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500 absolute top-5 right-5"
              >
                <X className="w-5 h-5" />
              </button>

              {validationResult.success ? (
                /* SUCCESS RESULT */
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-md animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-[10.5px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">
                      Verifikasi Loket Berhasil
                    </span>
                    <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34]">
                      Tiket Sah — Selamat Datang!
                    </h3>
                    <p className="text-xs text-[#575e5b] mt-1">
                      Kedatangan wisatawan telah dicatat. Wisatawan dipersilakan menikmati kawasan.
                    </p>
                  </div>

                  {/* Ticket Details */}
                  {validationResult.ticket && (
                    <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9] text-left text-xs space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b border-[#e8e2d9]">
                        <span className="text-[10px] text-[#575e5b] uppercase tracking-wider">Kode Booking</span>
                        <span className="font-mono font-bold text-[#b8653a] text-sm">
                          {validationResult.ticket.bookingCode}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#575e5b] uppercase block">Destinasi</span>
                        <span className="font-semibold text-sm text-[#1a3a34] block">
                          {validationResult.ticket.destination}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11.5px] pt-1">
                        <div>
                          <span className="text-[#575e5b] block">Rombongan:</span>
                          <span className="font-semibold">{validationResult.ticket.visitors}</span>
                        </div>
                        <div>
                          <span className="text-[#575e5b] block">Total Bayar:</span>
                          <span className="font-semibold">{validationResult.ticket.totalPaid}</span>
                        </div>
                      </div>

                      {validationResult.ticket.addons?.length > 0 && (
                        <div className="pt-1 text-[11px] text-[#575e5b]">
                          <span>Layanan Ekstra: </span>
                          <strong className="text-[#1a3a34]">{validationResult.ticket.addons.join(", ")}</strong>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Escrow Released Badge */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Unlock className="w-4 h-4 text-emerald-700" />
                        <span>Status Escrow BPODT:</span>
                      </span>
                      <span className="text-emerald-800 font-bold">Dana Siap Dicairkan ke Mitra</span>
                    </div>
                    <div className="text-[11px] text-emerald-800/80 pt-1 border-t border-emerald-200">
                      Divalidasi oleh: <strong>{currentMitra.name}</strong> ({currentMitra.code})
                    </div>
                  </div>

                  <button
                    onClick={() => setValidationResult(null)}
                    className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    Pindai Tiket Berikutnya
                  </button>
                </div>
              ) : (
                /* ALREADY USED OR INVALID RESULT */
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center border-2 border-amber-300 shadow-md">
                    <AlertCircle className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-[10.5px] font-bold text-amber-800 uppercase tracking-widest block mb-0.5">
                      Peringatan Loket
                    </span>
                    <h3 className="font-newsreader text-xl sm:text-2xl font-bold text-[#1a3a34]">
                      Tiket Sudah Digunakan!
                    </h3>
                    <p className="text-xs text-[#575e5b] mt-1 leading-relaxed">
                      {validationResult.message}
                    </p>
                  </div>

                  {validationResult.ticket && (
                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-1">
                      <div className="font-semibold text-[#1a3a34]">
                        {validationResult.ticket.destination}
                      </div>
                      <div className="text-[#575e5b] font-mono text-[11px]">
                        Kode: {validationResult.ticket.bookingCode}
                      </div>
                      <div className="text-red-700 font-semibold text-[11px] pt-1">
                        Status: Sudah Check-In di Pintu Masuk
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setValidationResult(null)}
                    className="w-full py-2.5 rounded-full bg-stone-200 hover:bg-stone-300 text-[#1a3a34] font-semibold text-xs uppercase tracking-wider transition-colors"
                  >
                    Tutup Peringatan
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Ganti Petugas Loket (Multi-Mitra) */}
        {isSwitchLoketOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#1a3a34] border border-[#c29d59]/50 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative animate-in zoom-in-95">
              <button
                onClick={() => setIsSwitchLoketOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/70 absolute top-5 right-5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-[#c29d59]" />
                <h3 className="font-newsreader text-xl font-bold text-white">
                  Ganti Akun Mitra Bertugas
                </h3>
              </div>
              <p className="text-xs text-white/70 mb-4">
                Pilih profil mitra untuk mensimulasikan bahwa seluruh mitra memiliki wewenang yang sama di pintu gerbang.
              </p>

              <div className="space-y-2 max-h-[50vh] overflow-y-auto no-scrollbar">
                {PRESET_MITRA_LIST.map((m) => {
                  const isSelected = m.code === currentMitra.code;
                  return (
                    <button
                      key={m.code}
                      onClick={() => switchLoket(m)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-[#c29d59] text-[#1a3a34] border-[#c29d59] font-semibold shadow-md"
                          : "bg-black/30 border-white/10 hover:border-[#c29d59] hover:bg-white/10 text-white"
                      }`}
                    >
                      <div>
                        <span className={`text-[9.5px] font-bold uppercase tracking-wider block ${
                          isSelected ? "text-[#1a3a34]" : "text-[#c29d59]"
                        }`}>
                          {m.category} • {m.regency}
                        </span>
                        <div className="text-xs font-semibold">{m.name}</div>
                        <span className={`text-[10px] ${isSelected ? "text-[#1a3a34]/80" : "text-white/60"}`}>
                          {m.code}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#1a3a34] text-[#c29d59]">
                          Aktif
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/10 mt-3 flex justify-end">
                <button
                  onClick={() => setIsSwitchLoketOpen(false)}
                  className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="px-4 py-3 bg-[#122a25] border-t border-white/10 text-center text-[11px] text-white/50">
        BPODT Gate Control Engine • Terhubung langsung ke PostgreSQL Database Supabase
      </footer>
    </div>
  );
}
