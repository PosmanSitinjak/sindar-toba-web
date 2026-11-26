"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Building2,
  CreditCard,
  Lock,
  Copy,
  Check,
  Clock,
  X,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  MessageCircle,
  User,
  Phone,
  Mail,
} from "lucide-react";

export type PaymentChannel = "qris" | "va_sumut" | "va_mandiri" | "va_bca";

export interface CheckoutItem {
  id: string;
  title: string;
  geositeLabel: string;
  visitDate: string;
  visitTime: string;
  visitorsCount: number;
  visitorsLabel: string;
  addons: string[];
  totalAmount: number;
  location: string;
  organizerName: string;
  organizerPhone: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CheckoutItem;
}

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

const VA_ACCOUNTS: Record<Exclude<PaymentChannel, "qris">, { bank: string; number: string; copyValue: string }> = {
  va_sumut: {
    bank: "Virtual Account Bank Sumut",
    number: "102 889 0481 9281",
    copyValue: "10288904819281",
  },
  va_mandiri: {
    bank: "Virtual Account Bank Mandiri",
    number: "8890 8123 4567 8901",
    copyValue: "8890812345678901",
  },
  va_bca: {
    bank: "Virtual Account BCA",
    number: "8077 7123 4567 8901",
    copyValue: "8077712345678901",
  },
};

function getChannelLabel(method: PaymentChannel): string {
  switch (method) {
    case "qris":
      return "QRIS Resmi";
    case "va_sumut":
      return "VA Bank Sumut";
    case "va_mandiri":
      return "VA Bank Mandiri";
    case "va_bca":
      return "VA Bank BCA";
  }
}

function loadMidtransSnapScript(clientKey: string, isProduction: boolean): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.snap) {
      resolve(true);
      return;
    }
    const scriptId = "midtrans-snap-script";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(Boolean(window.snap)));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = isProduction
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.onload = () => resolve(Boolean(window.snap));
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentModal({ isOpen, onClose, item }: PaymentModalProps) {
  const [step, setStep] = useState<"method" | "pay" | "success">("method");
  const [selectedMethod, setSelectedMethod] = useState<PaymentChannel>("qris");
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [vaCopied, setVaCopied] = useState(false);

  // Traveler identity (prefilled from session if logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Payment session details
  const [bookingCode, setBookingCode] = useState("");
  const [finalAmount, setFinalAmount] = useState(item.totalAmount);
  const [paymentRefInput, setPaymentRefInput] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(900); // 15 minutes
  const [issuedTicket, setIssuedTicket] = useState<any | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setStep("method");
    setErrorMessage(null);
    setPaymentRefInput("");
    setIssuedTicket(null);
    setSecondsLeft(900);

    if (typeof window !== "undefined") {
      const role = localStorage.getItem("sindar_role");
      const name = localStorage.getItem("sindar_user_name") || "";
      const email = localStorage.getItem("sindar_user_email") || "";
      const phone = localStorage.getItem("sindar_user_phone") || "";
      setIsLoggedIn(role === "user");
      setCustomerName(name);
      setCustomerEmail(email);
      setCustomerPhone(phone === "-" ? "" : phone);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || step !== "pay") return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const formatCountdown = (sec: number) => {
    const mins = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const secs = (sec % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const persistBooking = async (params: {
    code: string;
    paidAmount: number;
    status: string;
    escrowStatus: string;
    referenceNote?: string;
  }) => {
    const ticketId = `TKT-${Date.now().toString().slice(-6)}`;
    const channelLabel = getChannelLabel(selectedMethod);

    const newTicket = {
      id: ticketId,
      bookingCode: params.code,
      destination: item.title,
      geosite: item.geositeLabel,
      date: item.visitDate,
      time: item.visitTime,
      visitors: item.visitorsLabel,
      addons: item.addons,
      totalPaid: `Rp ${params.paidAmount.toLocaleString("id-ID")}`,
      status: params.status,
      location: item.location,
      organizerPhone: item.organizerPhone,
      organizerName: item.organizerName,
      paymentChannel: channelLabel,
      paymentReference: params.referenceNote || params.code,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      purchasedAt: new Date().toISOString(),
    };

    const newTrx = {
      trxId: `TRX-${params.code}`,
      traveler: customerName.trim() || "Wisatawan",
      item: `${item.visitorsCount}x ${item.title}${item.addons.length > 0 ? " + " + item.addons[0] : ""}`,
      amount: `Rp ${params.paidAmount.toLocaleString("id-ID")}`,
      channel: channelLabel,
      escrowStatus: params.escrowStatus,
      referenceNote: params.referenceNote || "-",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("tickets").insert({
          id: ticketId,
          booking_code: params.code,
          destination_id: item.id,
          destination_name: item.title,
          geosite_label: item.geositeLabel,
          visit_date: item.visitDate,
          visit_time: item.visitTime,
          visitors: item.visitorsCount,
          addons: item.addons,
          total_paid: params.paidAmount,
          status: params.status,
          location: item.location,
          organizer_name: item.organizerName,
          organizer_phone: item.organizerPhone,
        });
      } catch (err) {
        console.error("Supabase ticket insert error:", err);
      }
    }

    if (typeof window !== "undefined") {
      try {
        const storedTkt = JSON.parse(localStorage.getItem("sindar_purchased_tickets") || "[]");
        localStorage.setItem("sindar_purchased_tickets", JSON.stringify([newTicket, ...storedTkt]));

        const storedTrx = JSON.parse(localStorage.getItem("sindar_transactions") || "[]");
        localStorage.setItem("sindar_transactions", JSON.stringify([newTrx, ...storedTrx]));
      } catch (err) {
        console.error("LocalStorage write error:", err);
      }
    }

    setIssuedTicket(newTicket);
    setStep("success");
  };

  const handleProceedToPayment = async () => {
    setErrorMessage(null);
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage("Mohon lengkapi nama pemesan dan nomor WhatsApp aktif untuk pengiriman E-Tiket.");
      return;
    }

    setIsInitializing(true);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBookingCode = `ST-${new Date().getFullYear()}-${randomSuffix}`;
    setBookingCode(newBookingCode);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: newBookingCode,
          amount: item.totalAmount,
          itemTitle: item.title,
          quantity: item.visitorsCount,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim() || undefined,
          customerPhone: customerPhone.trim(),
          paymentMethod: selectedMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMessage(data?.error || "Gagal memulai sesi pembayaran. Silakan coba lagi.");
        setIsInitializing(false);
        return;
      }

      if (data.mode === "midtrans" && data.token && data.clientKey) {
        const loaded = await loadMidtransSnapScript(data.clientKey, Boolean(data.isProduction));
        if (loaded && window.snap) {
          setIsInitializing(false);
          window.snap.pay(data.token, {
            onSuccess: async () => {
              await persistBooking({
                code: newBookingCode,
                paidAmount: item.totalAmount,
                status: "Lunas (Siap Digunakan)",
                escrowStatus: "Tertahan di Escrow",
              });
            },
            onPending: async () => {
              await persistBooking({
                code: newBookingCode,
                paidAmount: item.totalAmount,
                status: "Menunggu Verifikasi Pembayaran",
                escrowStatus: "Menunggu Penyelesaian Gateway",
              });
            },
            onError: () => {
              setErrorMessage("Pembayaran gagal diproses oleh gateway. Silakan coba metode lain.");
            },
            onClose: () => {
              setErrorMessage("Jendela pembayaran ditutup sebelum transaksi selesai.");
            },
          });
          return;
        }
        if (data.redirectUrl) {
          window.open(data.redirectUrl, "_blank", "noopener,noreferrer");
        }
      }

      setFinalAmount(data.finalAmount || item.totalAmount);
      setSecondsLeft(900);
      setStep("pay");
    } catch (err) {
      console.error("Payment init error:", err);
      setErrorMessage("Tidak dapat terhubung ke layanan checkout. Periksa koneksi Anda.");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleConfirmManualPayment = async () => {
    setErrorMessage(null);
    if (selectedMethod !== "qris" && paymentRefInput.trim().length < 3) {
      setErrorMessage("Masukkan nama pengirim atau nomor referensi transfer agar admin dapat memverifikasi pembayaran Anda.");
      return;
    }

    setIsSubmitting(true);
    try {
      await persistBooking({
        code: bookingCode,
        paidAmount: finalAmount,
        status: "Menunggu Verifikasi Pembayaran",
        escrowStatus: "Menunggu Verifikasi Transfer",
        referenceNote: paymentRefInput.trim() || `QRIS-${bookingCode}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappConfirmUrl = issuedTicket
    ? `https://wa.me/${item.organizerPhone}?text=${encodeURIComponent(
        `Halo ${item.organizerName}, saya telah melakukan pemesanan & konfirmasi pembayaran:\n\n` +
          `Kode Booking: ${issuedTicket.bookingCode}\n` +
          `Nama: ${customerName.trim()}\n` +
          `Layanan: ${item.title}\n` +
          `Jadwal: ${item.visitDate} (${item.visitorsLabel})\n` +
          `Total Bayar: ${issuedTicket.totalPaid} (${issuedTicket.paymentChannel})\n` +
          `Ref Transfer: ${issuedTicket.paymentReference}\n\n` +
          `Mohon verifikasi pembayaran saya. Terima kasih.`
      )}`
    : "#";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-[#faf8f5] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-[#c29d59]/50 overflow-hidden text-[#1a3a34] max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#e8e2d9] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1a3a34] text-[#c29d59] font-cinzel font-bold text-[11px] flex items-center justify-center border border-[#c29d59]">
              ST
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold text-[#1a3a34] tracking-wider block">
                CHECKOUT PEMBAYARAN SINDAR TOBA
              </span>
              <span className="text-[9.5px] text-[#575e5b] uppercase tracking-wider">
                Escrow Resmi BPODT • Transaksi Terenkripsi
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="grid grid-cols-3 gap-2 mb-5 text-[10px] sm:text-[11px] font-semibold text-center uppercase tracking-wider">
          <div
            className={`pb-1.5 border-b-2 transition-all ${
              step === "method"
                ? "border-[#1a3a34] text-[#1a3a34] font-bold"
                : "border-emerald-700 text-emerald-800"
            }`}
          >
            1. Data & Metode
          </div>
          <div
            className={`pb-1.5 border-b-2 transition-all ${
              step === "pay"
                ? "border-[#1a3a34] text-[#1a3a34] font-bold"
                : step === "success"
                ? "border-emerald-700 text-emerald-800"
                : "border-stone-300 text-stone-400"
            }`}
          >
            2. Pembayaran
          </div>
          <div
            className={`pb-1.5 border-b-2 transition-all ${
              step === "success"
                ? "border-emerald-700 text-emerald-800 font-bold"
                : "border-stone-300 text-stone-400"
            }`}
          >
            3. Konfirmasi & Tiket
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: DATA PEMESAN & METODE PEMBAYARAN */}
        {step === "method" && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-white border border-[#e8e2d9] space-y-1 text-xs">
              <div className="flex justify-between font-semibold text-[#1a3a34] gap-2">
                <span>{item.title}</span>
                <span className="shrink-0">Rp {item.totalAmount.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-[#575e5b] text-[11px]">
                <span>
                  {item.visitDate} • {item.visitorsLabel}
                </span>
                <span>{item.addons.length > 0 ? "+Layanan Tambahan" : item.geositeLabel}</span>
              </div>
            </div>

            {/* Data Pemesan */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#e8e2d9] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#575e5b]">
                  Data Pemesan E-Tiket
                </span>
                {!isLoggedIn && (
                  <Link href="/masuk" className="text-[11px] font-semibold text-[#b8653a] hover:underline">
                    Masuk Akun
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#575e5b] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Nama Lengkap *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-xs text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                  />
                </div>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#575e5b] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="No. WhatsApp *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-xs text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                  />
                </div>
              </div>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#575e5b] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Email (opsional untuk salinan invoice)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-xs text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#575e5b] block mb-2">
                Pilih Kanal Pembayaran Resmi:
              </label>

              <div className="space-y-2.5">
                <label
                  onClick={() => setSelectedMethod("qris")}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    selectedMethod === "qris"
                      ? "bg-white border-[#1a3a34] shadow-sm"
                      : "bg-white/60 border-[#e8e2d9] hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold text-xs border border-red-200">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-[#1a3a34]">QRIS Nasional</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          Rekomendasi
                        </span>
                      </div>
                      <span className="text-[10.5px] text-[#575e5b] block">
                        GoPay, OVO, Dana, ShopeePay, BCA Mobile & Semua M-Banking
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="checkoutMethod"
                    checked={selectedMethod === "qris"}
                    onChange={() => setSelectedMethod("qris")}
                    className="accent-[#1a3a34]"
                  />
                </label>

                <label
                  onClick={() => setSelectedMethod("va_sumut")}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    selectedMethod === "va_sumut"
                      ? "bg-white border-[#1a3a34] shadow-sm"
                      : "bg-white/60 border-[#e8e2d9] hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-xs border border-amber-200 font-cinzel">
                      BS
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-[#1a3a34]">Virtual Account Bank Sumut</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                          Bank Daerah Sumut
                        </span>
                      </div>
                      <span className="text-[10.5px] text-[#575e5b] block">
                        Transfer melalui ATM / Mobile Banking Bank Sumut
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="checkoutMethod"
                    checked={selectedMethod === "va_sumut"}
                    onChange={() => setSelectedMethod("va_sumut")}
                    className="accent-[#1a3a34]"
                  />
                </label>

                <label
                  onClick={() => setSelectedMethod("va_mandiri")}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    selectedMethod === "va_mandiri"
                      ? "bg-white border-[#1a3a34] shadow-sm"
                      : "bg-white/60 border-[#e8e2d9] hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-xs border border-blue-200">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#1a3a34] block">
                        Virtual Account Bank Mandiri
                      </span>
                      <span className="text-[10.5px] text-[#575e5b] block">
                        Livin&apos; by Mandiri & ATM Mandiri
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="checkoutMethod"
                    checked={selectedMethod === "va_mandiri"}
                    onChange={() => setSelectedMethod("va_mandiri")}
                    className="accent-[#1a3a34]"
                  />
                </label>

                <label
                  onClick={() => setSelectedMethod("va_bca")}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    selectedMethod === "va_bca"
                      ? "bg-white border-[#1a3a34] shadow-sm"
                      : "bg-white/60 border-[#e8e2d9] hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center font-bold text-xs border border-indigo-200">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#1a3a34] block">
                        Virtual Account BCA
                      </span>
                      <span className="text-[10.5px] text-[#575e5b] block">
                        BCA Mobile, myBCA & KlikBCA
                      </span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="checkoutMethod"
                    checked={selectedMethod === "va_bca"}
                    onChange={() => setSelectedMethod("va_bca")}
                    className="accent-[#1a3a34]"
                  />
                </label>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 flex items-start gap-2.5 text-[11px] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Jaminan Keamanan Escrow BPODT:</strong>
                Dana ditampung di rekening resmi SINDAR TOBA dan baru diteruskan ke pengelola/mitra setelah e-tiket terverifikasi.
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToPayment}
              disabled={isInitializing}
              className="w-full py-3.5 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isInitializing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menyiapkan Pembayaran...</span>
                </>
              ) : (
                <>
                  <span>Lanjutkan Pembayaran (Rp {item.totalAmount.toLocaleString("id-ID")})</span>
                  <ArrowRight className="w-4 h-4 text-[#c29d59]" />
                </>
              )}
            </button>
          </div>
        )}

        {/* STEP 2: INSTRUKSI & KONFIRMASI PEMBAYARAN */}
        {step === "pay" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep("method")}
                className="text-xs text-[#575e5b] hover:text-[#1a3a34] flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ganti Metode</span>
              </button>
              <div className="flex items-center gap-1 text-[11px] text-amber-700 font-mono font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>Sisa Waktu: {formatCountdown(secondsLeft)}</span>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-white border border-[#e8e2d9] flex items-center justify-between text-xs">
              <span className="text-[#575e5b]">Kode Referensi Pesanan:</span>
              <span className="font-mono font-bold text-[#b8653a]">{bookingCode}</span>
            </div>

            {selectedMethod === "qris" ? (
              <div className="bg-white rounded-3xl p-5 border border-[#e8e2d9] shadow-sm text-center space-y-3">
                <div className="flex items-center justify-center gap-1.5 pb-2 border-b border-[#e8e2d9]">
                  <span className="font-bold text-xs tracking-widest text-[#1a3a34]">QRIS RESMI SINDAR TOBA</span>
                </div>

                <div className="w-48 h-48 mx-auto bg-stone-50 rounded-2xl p-3 border-2 border-dashed border-[#1a3a34] flex flex-col items-center justify-center relative shadow-inner">
                  <QrCode className="w-36 h-36 text-[#1a3a34]" />
                  <span className="text-[9px] font-mono text-[#575e5b] mt-1">BPODT ESCROW • {bookingCode}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] text-[#575e5b]">Total Transfer (Termasuk Kode Unik Verifikasi):</span>
                  <div className="font-cinzel text-2xl font-bold text-[#1a3a34]">
                    Rp {finalAmount.toLocaleString("id-ID")}
                  </div>
                </div>

                <p className="text-[11px] text-[#575e5b] leading-relaxed">
                  Transfer tepat hingga 3 digit terakhir agar tim verifikasi BPODT dapat mencocokkan pembayaran Anda secara cepat.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-5 border border-[#e8e2d9] shadow-sm space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#e8e2d9]">
                  <span className="font-bold text-xs text-[#1a3a34]">
                    {VA_ACCOUNTS[selectedMethod].bank}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Rekening Escrow Resmi
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-[#575e5b] block">Nomor Rekening / Virtual Account:</span>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf8f5] border border-[#e8e2d9]">
                    <span className="font-mono text-base font-bold text-[#1a3a34] tracking-wider">
                      {VA_ACCOUNTS[selectedMethod].number}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(VA_ACCOUNTS[selectedMethod].copyValue);
                        setVaCopied(true);
                        setTimeout(() => setVaCopied(false), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#e8e2d9] text-[11px] font-semibold text-[#1a3a34] hover:bg-slate-50 flex items-center gap-1"
                    >
                      {vaCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{vaCopied ? "Tersalin!" : "Salin"}</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-[#575e5b]">Atas Nama:</span>
                  <span className="font-semibold text-[#1a3a34]">BPODT ESCROW — SINDAR TOBA</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#575e5b]">Total Transfer (dengan Kode Unik):</span>
                  <span className="font-bold text-[#1a3a34] font-cinzel text-base">
                    Rp {finalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            )}

            {/* Konfirmasi Pembayaran */}
            <div className="p-4 rounded-2xl bg-white border border-[#e8e2d9] text-[#1a3a34] space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#1a3a34] uppercase tracking-wider block mb-1">
                  Nama Pengirim / Nomor Referensi Transfer {selectedMethod === "qris" ? "(Opsional)" : "*"}
                </label>
                <input
                  type="text"
                  placeholder="Contoh: BCA a.n. Budi / Ref 928174"
                  value={paymentRefInput}
                  onChange={(e) => setPaymentRefInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-xs text-[#1a3a34] focus:outline-none focus:border-[#1a3a34]"
                />
              </div>

              <button
                type="button"
                onClick={handleConfirmManualPayment}
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Mengirim Konfirmasi...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#c29d59]" />
                    <span>Saya Sudah Membayar — Kirim Konfirmasi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PESANAN TERCATAT & MENUNGGU VERIFIKASI / E-TIKET */}
        {step === "success" && issuedTicket && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">
                {issuedTicket.status.includes("Lunas") ? "Transaksi Selesai & Lunas" : "Konfirmasi Pembayaran Diterima"}
              </span>
              <h3 className="font-newsreader text-2xl font-bold text-[#1a3a34]">
                {issuedTicket.status.includes("Lunas")
                  ? "Pembayaran Berhasil Diverifikasi!"
                  : "Pesanan Menunggu Verifikasi"}
              </h3>
              <p className="text-xs text-[#575e5b] mt-1">
                {issuedTicket.status.includes("Lunas")
                  ? "E-Tiket resmi Anda sudah aktif dan siap dipindai di lokasi."
                  : "Pesanan Anda telah dicatat. Tim verifikasi BPODT akan mengaktifkan E-Tiket setelah dana transfer terkonfirmasi."}
              </p>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-[#e8e2d9] shadow-sm text-left space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#e8e2d9] gap-2">
                <div>
                  <span className="text-[9.5px] text-[#575e5b] uppercase tracking-wider block">Kode Booking</span>
                  <span className="font-mono text-sm font-bold text-[#b8653a]">
                    {issuedTicket.bookingCode}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    issuedTicket.status.includes("Lunas")
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}
                >
                  {issuedTicket.status}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <div className="font-semibold text-sm text-[#1a3a34]">{issuedTicket.destination}</div>
                <div className="text-[#575e5b] text-[11.5px]">
                  Tanggal: <strong>{issuedTicket.date}</strong> ({issuedTicket.visitors})
                </div>
                {issuedTicket.addons?.length > 0 && (
                  <div className="text-[#575e5b] text-[11px]">
                    Layanan: {issuedTicket.addons.join(", ")}
                  </div>
                )}
                <div className="text-[#1a3a34] font-bold text-xs pt-1">
                  Total Biaya: {issuedTicket.totalPaid} ({issuedTicket.paymentChannel})
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] flex items-center justify-between text-[11px]">
                <span className="text-[#575e5b]">Perlindungan Dana:</span>
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-700" /> Escrow Resmi BPODT
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {!issuedTicket.status.includes("Lunas") && (
                <a
                  href={whatsappConfirmUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Bukti Bayar via WhatsApp</span>
                </a>
              )}

              <Link
                href={isLoggedIn ? "/dashboard" : "/masuk"}
                className="w-full py-3 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{isLoggedIn ? "Lihat Tiket di Dashboard Saya" : "Masuk untuk Lihat E-Tiket"}</span>
                <ArrowRight className="w-4 h-4 text-[#c29d59]" />
              </Link>

              <Link
                href="/admin/dashboard"
                target="_blank"
                className="w-full py-2.5 rounded-full border border-[#c29d59] text-[#1a3a34] hover:bg-[#c29d59]/10 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#c29d59]" />
                <span>Cek Status di Konsol Admin BPODT</span>
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#575e5b] hover:text-[#1a3a34] pt-1 block mx-auto"
              >
                Selesai & Tutup Jendela Ini
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
