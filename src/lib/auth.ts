import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface RegisteredUser {
  name: string;
  email: string;
  phone: string;
  passwordDigest: string;
  referralCode?: string | null;
  createdAt: string;
}

const REGISTERED_USERS_KEY = "sindar_registered_users";
const LAST_REGISTERED_EMAIL_KEY = "sindar_last_registered_email";

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("62")) return "0" + digits.slice(2);
  return digits;
}

export async function hashPassword(password: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const data = new TextEncoder().encode(`sindar-toba:${password}`);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  // Deterministic fallback for non-secure contexts
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0;
  }
  return `fb_${hash.toString(16)}`;
}

export function getRegisteredUsers(): RegisteredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users: RegisteredUser[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

export function findRegisteredUser(identifier: string): RegisteredUser | undefined {
  const trimmed = identifier.trim();
  const lower = trimmed.toLowerCase();
  const normPhone = normalizePhone(trimmed);
  return getRegisteredUsers().find(
    (u) =>
      u.email.toLowerCase() === lower ||
      (normPhone.length >= 8 && normalizePhone(u.phone) === normPhone)
  );
}

export function setActiveUserSession(user: {
  name: string;
  email: string;
  phone?: string;
}) {
  if (typeof window === "undefined") return;
  localStorage.setItem("sindar_role", "user");
  localStorage.setItem("sindar_user_name", user.name);
  localStorage.setItem("sindar_user_email", user.email);
  if (user.phone) {
    localStorage.setItem("sindar_user_phone", user.phone);
  }
  localStorage.removeItem(LAST_REGISTERED_EMAIL_KEY);
  window.dispatchEvent(new Event("sindar_mitra_changed"));
}

export function clearActiveUserSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("sindar_role");
  localStorage.removeItem("sindar_mitra_name");
  localStorage.removeItem("sindar_user_name");
  localStorage.removeItem("sindar_user_email");
  localStorage.removeItem("sindar_user_phone");
  localStorage.removeItem("sindar_purchased_tickets");
  localStorage.removeItem("sindar_referral_balance");
  localStorage.removeItem("sindar_referrals_data");
  localStorage.removeItem("sindar_wishlist");
  localStorage.removeItem("sindar_itineraries");
  localStorage.removeItem("sindar_current_mitra");
  window.dispatchEvent(new Event("sindar_mitra_changed"));
}

export function getLastRegisteredEmail(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(LAST_REGISTERED_EMAIL_KEY) || "";
}

export async function registerTraveler(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
  referralCode?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim().toLowerCase();
  const trimmedPhone = input.phone.trim();
  const refCode = input.referralCode?.trim().toUpperCase() || "";

  if (trimmedName.length < 2) {
    return { ok: false, error: "Nama lengkap minimal 2 karakter." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { ok: false, error: "Format alamat email tidak valid." };
  }
  if (normalizePhone(trimmedPhone).length < 9) {
    return { ok: false, error: "Nomor WhatsApp minimal 9 digit angka." };
  }
  if (input.password.length < 8) {
    return { ok: false, error: "Kata sandi minimal 8 karakter." };
  }

  const existing = findRegisteredUser(trimmedEmail) || findRegisteredUser(trimmedPhone);
  if (existing) {
    return {
      ok: false,
      error: "Email atau nomor WhatsApp ini sudah terdaftar. Silakan masuk menggunakan akun Anda.",
    };
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: input.password,
        options: {
          data: {
            full_name: trimmedName,
            phone: trimmedPhone,
            referral_code: refCode || null,
          },
        },
      });

      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes("already registered") || msg.includes("already exists")) {
          return {
            ok: false,
            error: "Email ini sudah terdaftar di sistem. Silakan masuk.",
          };
        }
        return { ok: false, error: error.message };
      }

      if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        return {
          ok: false,
          error: "Email ini sudah terdaftar di sistem. Silakan masuk.",
        };
      }
    } catch (err) {
      console.error("Supabase auth signup error:", err);
      return {
        ok: false,
        error: "Gagal menghubungi server autentikasi. Silakan coba lagi.",
      };
    }
  }

  const passwordDigest = await hashPassword(input.password);
  const users = getRegisteredUsers();
  users.push({
    name: trimmedName,
    email: trimmedEmail,
    phone: trimmedPhone,
    passwordDigest,
    referralCode: refCode || null,
    createdAt: new Date().toISOString(),
  });
  saveRegisteredUsers(users);

  if (typeof window !== "undefined") {
    // Bersihkan sesi lama agar pengguna baru wajib login lewat /masuk
    localStorage.removeItem("sindar_role");
    localStorage.removeItem("sindar_user_name");
    localStorage.removeItem("sindar_user_phone");
    localStorage.removeItem("sindar_user_email");
    localStorage.removeItem("sindar_purchased_tickets");
    localStorage.removeItem("sindar_referral_balance");
    localStorage.removeItem("sindar_referrals_data");
    localStorage.removeItem("sindar_wishlist");
    localStorage.removeItem("sindar_itineraries");
    localStorage.setItem(LAST_REGISTERED_EMAIL_KEY, trimmedEmail);

    if (refCode) {
      localStorage.setItem("sindar_applied_referral", refCode);
      const existingReferrals = JSON.parse(localStorage.getItem("sindar_referrals_data") || "[]");
      existingReferrals.unshift({
        id: `REF-${Date.now().toString().slice(-4)}`,
        name: trimmedName,
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        commission: 25000,
        status: "Komisi Masuk",
        phone: trimmedPhone,
      });
      localStorage.setItem("sindar_referrals_data", JSON.stringify(existingReferrals));
      const currentBalance = parseInt(localStorage.getItem("sindar_referral_balance") || "0", 10);
      localStorage.setItem("sindar_referral_balance", (currentBalance + 25000).toString());
    }
  }

  return { ok: true };
}

export async function loginTraveler(input: {
  identifier: string;
  password: string;
}): Promise<{ ok: boolean; error?: string }> {
  const cleanIdentifier = input.identifier.trim();
  if (!cleanIdentifier || !input.password) {
    return { ok: false, error: "Masukkan email/nomor WhatsApp dan kata sandi Anda." };
  }

  // 1. Coba autentikasi via Supabase Auth jika format email dan Supabase aktif
  let supabaseAuthSuccessful = false;
  let supabaseErrorMessage: string | null = null;

  if (isSupabaseConfigured && supabase && cleanIdentifier.includes("@")) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanIdentifier.toLowerCase(),
        password: input.password,
      });

      if (!error && data?.user) {
        supabaseAuthSuccessful = true;
        const meta = data.user.user_metadata || {};
        const matchedLocal = findRegisteredUser(cleanIdentifier);
        setActiveUserSession({
          name: meta.full_name || matchedLocal?.name || cleanIdentifier.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          email: data.user.email || cleanIdentifier.toLowerCase(),
          phone: meta.phone || matchedLocal?.phone || "-",
        });
        return { ok: true };
      }

      if (error) {
        supabaseErrorMessage = error.message;
        console.warn("Supabase auth response:", error.message);
      }
    } catch (err) {
      console.error("Supabase login error:", err);
    }
  }

  // 2. Fallback ke Registry Pengguna Terdaftar (Lokal / Web / Akun yang Baru Diperbarui)
  const registered = findRegisteredUser(cleanIdentifier);
  if (registered) {
    const inputDigest = await hashPassword(input.password);
    if (inputDigest === registered.passwordDigest) {
      setActiveUserSession({
        name: registered.name,
        email: registered.email,
        phone: registered.phone,
      });
      return { ok: true };
    } else {
      return {
        ok: false,
        error: "Kata sandi yang Anda masukkan salah. Silakan periksa kembali atau gunakan menu Lupa Sandi.",
      };
    }
  }

  // 3. Fallback jika akun terdaftar di sesi pendaftaran terakhir atau localStorage email
  if (typeof window !== "undefined") {
    const lastEmail = localStorage.getItem("sindar_last_registered_email");
    const savedEmail = localStorage.getItem("sindar_user_email");
    const savedName = localStorage.getItem("sindar_user_name");

    const isKnownEmail =
      (lastEmail && lastEmail.toLowerCase() === cleanIdentifier.toLowerCase()) ||
      (savedEmail && savedEmail.toLowerCase() === cleanIdentifier.toLowerCase());

    if (isKnownEmail) {
      // Simpan ke registry agar sesi selanjutnya selalu valid
      const newDigest = await hashPassword(input.password);
      const users = getRegisteredUsers();
      users.push({
        name: savedName || cleanIdentifier.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: cleanIdentifier.toLowerCase(),
        phone: "-",
        passwordDigest: newDigest,
        createdAt: new Date().toISOString(),
      });
      saveRegisteredUsers(users);

      setActiveUserSession({
        name: savedName || cleanIdentifier.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: cleanIdentifier.toLowerCase(),
        phone: "-",
      });
      return { ok: true };
    }
  }

  // 4. Jika Supabase mengindikasikan email belum dikonfirmasi
  if (supabaseErrorMessage && supabaseErrorMessage.toLowerCase().includes("email not confirmed")) {
    return {
      ok: false,
      error: "Email Anda belum dikonfirmasi melalui tautan aktivasi. Silakan periksa kotak masuk email Anda (" + cleanIdentifier + "), atau gunakan menu Lupa Sandi.",
    };
  }

  // 5. Jika akun benar-benar tidak terdaftar di mana pun
  return {
    ok: false,
    error: "Akun belum terdaftar atau kata sandi salah. Silakan daftar terlebih dahulu jika belum memiliki akun.",
  };
}

export async function resetTravelerPassword(input: {
  identifier: string;
  newPassword: string;
}): Promise<{ ok: boolean; error?: string }> {
  const cleanIdentifier = input.identifier.trim();
  if (input.newPassword.length < 8) {
    return { ok: false, error: "Kata sandi baru minimal 8 karakter." };
  }

  // Coba update di Supabase Auth jika session aktif
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.updateUser({ password: input.newPassword });
    } catch (err) {
      console.warn("Supabase updateUser error:", err);
    }
  }

  const users = getRegisteredUsers();
  const idx = users.findIndex(
    (u) =>
      u.email.toLowerCase() === cleanIdentifier.toLowerCase() ||
      (normalizePhone(cleanIdentifier).length >= 8 &&
        normalizePhone(u.phone) === normalizePhone(cleanIdentifier))
  );

  const digest = await hashPassword(input.newPassword);

  if (idx >= 0) {
    users[idx] = {
      ...users[idx],
      passwordDigest: digest,
    };
  } else {
    // Daftarkan/sinkronisasikan pengguna agar dapat langsung login dengan kata sandi barunya
    users.push({
      name: cleanIdentifier.includes("@") ? cleanIdentifier.split("@")[0] : "Wisatawan",
      email: cleanIdentifier.includes("@") ? cleanIdentifier.toLowerCase() : `${cleanIdentifier}@sindartoba.id`,
      phone: cleanIdentifier.includes("@") ? "-" : cleanIdentifier,
      passwordDigest: digest,
      createdAt: new Date().toISOString(),
    });
  }

  saveRegisteredUsers(users);
  return { ok: true };
}
