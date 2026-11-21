"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Globe,
  User,
  Menu,
  X,
  Compass,
  Sparkles,
  Map,
  Briefcase,
  HelpCircle,
  BookOpen,
  ArrowRight,
  LogOut,
  Building2,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authRole, setAuthRole] = useState<"guest" | "mitra" | "user">("guest");
  const [userName, setUserName] = useState("Wisatawan");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync auth state based on current route or localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("sindar_user_name");
      if (storedName) setUserName(storedName);
    }

    if (pathname.startsWith("/mitra/dashboard")) {
      setAuthRole("mitra");
    } else if (pathname.startsWith("/dashboard")) {
      setAuthRole("user");
    } else {
      const stored = localStorage.getItem("sindar_role");
      if (stored === "mitra") setAuthRole("mitra");
      else if (stored === "user") setAuthRole("user");
      else setAuthRole("guest");
    }
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLogout = (role: "mitra" | "user") => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sindar_role");
      localStorage.removeItem("sindar_mitra_name");
      localStorage.removeItem("sindar_user_name");
      localStorage.removeItem("sindar_user_email");
      localStorage.removeItem("sindar_user_phone");
      localStorage.removeItem("sindar_purchased_tickets");
      localStorage.removeItem("sindar_referral_balance");
      localStorage.removeItem("sindar_referrals_data");
      localStorage.removeItem("sindar_current_mitra");
    }
    setAuthRole("guest");
    setUserName("");
    if (role === "mitra") {
      router.push("/mitra/login");
    } else {
      router.push("/masuk");
    }
  };

  const navLinks = [
    { href: "/jelajahi", label: "Jelajahi", icon: Compass },
    { href: "/pengalaman", label: "Pengalaman", icon: Sparkles },
    { href: "/rencana-perjalanan", label: "Rencana Perjalanan", icon: Map },
    { href: "/mitra", label: "Untuk Mitra", icon: Briefcase },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#faf8f5]/95 backdrop-blur-md shadow-sm border-b border-[#e8e2d9]"
            : "bg-[#faf8f5]/90 backdrop-blur-sm border-b border-[#e8e2d9]"
        }`}
      >
        {/* Subtle Batak Geometric Line Accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#c29d59] to-transparent" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Official Brand Logo - Asli & Utuh */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative h-11 sm:h-14 w-11 sm:w-14 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="SINDAR TOBA"
                width={64}
                height={64}
                className="w-full h-full object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-[15px] sm:text-[18px] font-bold text-[#1a3a34] tracking-[2px] sm:tracking-[3.2px] leading-tight group-hover:text-[#b8653a] transition-colors">
                SINDAR TOBA
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-semibold text-[#575e5b] tracking-[1.2px] sm:tracking-[1.8px] uppercase">
                Dari Toba, Untuk Masa Depan
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Pill Style on Desktop) */}
          <nav className="hidden lg:flex items-center bg-[#f2ede5]/80 border border-[#e8e2d9] rounded-full p-1 gap-1 shadow-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.5px] transition-all ${
                    isActive
                      ? "bg-[#1a3a34] text-white shadow-sm"
                      : "text-[#575e5b] hover:text-[#1a3a34] hover:bg-[#e8e2d9]/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Utility Actions (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-2.5">
            {authRole === "mitra" ? (
              /* LOGGED IN AS MITRA */
              <div className="flex items-center gap-2.5">
                <Link
                  href="/mitra/dashboard"
                  className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-white border border-[#e8e2d9] hover:border-[#c29d59] shadow-sm transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1a3a34] text-[#c29d59] border border-[#c29d59]/50 flex items-center justify-center font-cinzel text-[10.5px] font-bold shrink-0">
                    HR
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[12px] font-bold text-[#1a3a34] leading-tight">
                      Homestay Rura Batak
                    </span>
                    <span className="text-[9px] text-emerald-700 font-semibold uppercase tracking-wider">
                      Mitra Terverifikasi
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => handleLogout("mitra")}
                  className="px-3.5 py-1.5 rounded-full border border-[#e8e2d9] hover:border-red-300 hover:bg-red-50 text-[11px] font-semibold text-[#575e5b] hover:text-red-700 uppercase tracking-wider transition-colors"
                  title="Keluar dari akun mitra"
                >
                  Keluar
                </button>
              </div>
            ) : authRole === "user" ? (
              /* LOGGED IN AS WISATAWAN */
              <div className="flex items-center gap-2.5">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-white border border-[#e8e2d9] hover:border-[#c29d59] shadow-sm transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1a3a34]/10 text-[#1a3a34] border border-[#c29d59]/50 flex items-center justify-center text-[11px] font-bold shrink-0">
                    {userName
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((w: string) => w[0])
                      .join("")
                      .toUpperCase() || "BP"}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[12px] font-bold text-[#1a3a34] leading-tight">
                      {userName}
                    </span>
                    <span className="text-[9px] text-[#575e5b] font-medium">
                      Wisatawan
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => handleLogout("user")}
                  className="px-3.5 py-1.5 rounded-full border border-[#e8e2d9] hover:border-red-300 hover:bg-red-50 text-[11px] font-semibold text-[#575e5b] hover:text-red-700 uppercase tracking-wider transition-colors"
                  title="Keluar dari akun"
                >
                  Keluar
                </button>
              </div>
            ) : (
              /* GUEST (NOT LOGGED IN) */
              <div className="flex items-center gap-2">
                <Link
                  href="/masuk"
                  className="px-4 py-2 text-[12.5px] font-semibold text-[#1a3a34] hover:text-[#b8653a] uppercase tracking-wider transition-colors"
                >
                  Masuk
                </Link>

                <Link
                  href="/daftar"
                  className="px-5 py-2 rounded-full bg-[#1a3a34] hover:bg-[#122a25] text-white text-[12px] font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            {authRole === "mitra" ? (
              <Link
                href="/mitra/dashboard"
                className="w-8 h-8 rounded-full bg-[#1a3a34] text-[#c29d59] border border-[#c29d59] flex items-center justify-center font-cinzel text-xs font-bold shadow-sm"
                title="Dashboard Mitra"
              >
                HR
              </Link>
            ) : authRole === "user" ? (
              <Link
                href="/dashboard"
                className="w-8 h-8 rounded-full bg-[#1a3a34] text-white border border-[#c29d59] flex items-center justify-center text-xs font-bold shadow-sm"
                title="Dashboard Wisatawan"
              >
                CS
              </Link>
            ) : (
              <Link
                href="/masuk"
                className="px-3 py-1 rounded-full border border-[#e8e2d9] text-[11px] font-semibold text-[#1a3a34] uppercase bg-white shadow-sm"
              >
                Masuk
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1a3a34] hover:bg-[#f2ede5] border border-[#e8e2d9] bg-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#1a3a34]" /> : <Menu className="w-5 h-5 text-[#1a3a34]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Side Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#faf8f5] shadow-2xl flex flex-col justify-between z-50 p-6 overflow-y-auto border-l border-[#e8e2d9]">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#e8e2d9] mb-5">
                <Link
                  href="/"
                  className="flex items-center gap-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 shrink-0">
                    <Image
                      src="/logo.png"
                      alt="SINDAR TOBA"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-cinzel text-sm font-bold text-[#1a3a34] tracking-widest">
                    SINDAR TOBA
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#575e5b] hover:text-[#1a3a34] hover:bg-[#f2ede5]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Nav Links */}
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[13px] font-semibold uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-[#1a3a34] text-white shadow-sm"
                          : "text-[#1a3a34] hover:bg-[#f2ede5]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-[#c29d59]" : "text-[#575e5b]"}`} />
                        <span>{link.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </Link>
                  );
                })}

                <div className="h-px bg-[#e8e2d9] my-2" />

                <Link
                  href="/etika-budaya"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-medium text-[#575e5b] hover:text-[#1a3a34] hover:bg-[#f2ede5]"
                >
                  <BookOpen className="w-4 h-4 text-[#c29d59]" />
                  <span>Etika Budaya Batak</span>
                </Link>

                <Link
                  href="/bantuan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[13px] font-medium text-[#575e5b] hover:text-[#1a3a34] hover:bg-[#f2ede5]"
                >
                  <HelpCircle className="w-4 h-4 text-[#c29d59]" />
                  <span>Pusat Bantuan & FAQ</span>
                </Link>
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-[#e8e2d9] space-y-3">
              {authRole === "mitra" ? (
                <>
                  <div className="p-3.5 rounded-2xl bg-white border border-[#e8e2d9] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1a3a34] text-[#c29d59] flex items-center justify-center font-cinzel font-bold text-xs shrink-0">
                      HR
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[12.5px] font-bold text-[#1a3a34] truncate">
                        Homestay Rura Batak
                      </span>
                      <span className="text-[9.5px] text-emerald-700 font-semibold uppercase">
                        Mitra Terverifikasi
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout("mitra");
                    }}
                    className="w-full py-2.5 rounded-full border border-red-200 text-red-700 text-center text-[12px] font-semibold uppercase tracking-wider block bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    Keluar dari Akun Mitra
                  </button>
                </>
              ) : authRole === "user" ? (
                <>
                  <div className="p-3.5 rounded-2xl bg-white border border-[#e8e2d9] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1a3a34]/10 text-[#1a3a34] flex items-center justify-center font-bold text-xs shrink-0">
                      {userName
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w: string) => w[0])
                        .join("")
                        .toUpperCase() || "BP"}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-[12.5px] font-bold text-[#1a3a34] truncate">
                        {userName}
                      </span>
                      <span className="text-[9.5px] text-[#575e5b]">
                        Wisatawan Baru
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout("user");
                    }}
                    className="w-full py-2.5 rounded-full border border-red-200 text-red-700 text-center text-[12px] font-semibold uppercase tracking-wider block bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    Keluar Akun
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/masuk"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 rounded-full bg-[#1a3a34] text-white text-center text-[12px] font-semibold uppercase tracking-wider block shadow-sm"
                  >
                    Masuk ke Akun
                  </Link>
                  <Link
                    href="/daftar"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-full border border-[#e8e2d9] text-[#1a3a34] text-center text-[12px] font-semibold uppercase tracking-wider block bg-white"
                  >
                    Daftar Akun Baru
                  </Link>
                </>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#575e5b] pt-1">
                <Globe className="w-3.5 h-3.5 text-[#c29d59]" />
                <span>IDR · Kawasan Kaldera Danau Toba</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}