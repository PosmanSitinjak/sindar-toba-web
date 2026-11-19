-- ===============================================================
-- SKEMA DATABASE SINDAR TOBA (SUPABASE POSTGRESQL)
-- Salin dan jalankan seluruh script ini di SQL Editor Supabase
-- ===============================================================

-- 1. Tabel Profil Pengguna (Wisatawan & Mitra)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'wisatawan' CHECK (role IN ('wisatawan', 'mitra', 'admin')),
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profil dapat dibaca oleh publik" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Pengguna dapat mengedit profil sendiri" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 2. Tabel Destinasi Wisata & Cagar Budaya
CREATE TABLE IF NOT EXISTS public.destinations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  regency TEXT NOT NULL,
  subregion TEXT NOT NULL,
  rating NUMERIC(2, 1) DEFAULT 4.9,
  reviews INT DEFAULT 0,
  price NUMERIC DEFAULT 0,
  price_unit TEXT DEFAULT 'orang',
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Destinasi dapat dibaca siapa saja" ON public.destinations FOR SELECT USING (true);

-- 3. Tabel Pemesanan & E-Tiket Wisatawan
CREATE TABLE IF NOT EXISTS public.tickets (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  booking_code TEXT UNIQUE NOT NULL,
  destination_id TEXT REFERENCES public.destinations(id) ON DELETE CASCADE,
  destination_name TEXT NOT NULL,
  geosite_label TEXT,
  visit_date DATE NOT NULL,
  visit_time TEXT DEFAULT '08:00 - 17:00 WIB',
  visitors INT DEFAULT 1,
  addons TEXT[] DEFAULT '{}',
  total_paid NUMERIC NOT NULL,
  status TEXT DEFAULT 'Lunas (Siap Digunakan)',
  location TEXT,
  organizer_phone TEXT,
  organizer_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Wisatawan dapat melihat tiket miliknya" 
  ON public.tickets FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- 4. Tabel Program Referral & Komisi
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_code TEXT NOT NULL,
  referee_name TEXT NOT NULL,
  referee_phone TEXT,
  commission_amount NUMERIC DEFAULT 25000,
  reward_description TEXT DEFAULT 'Pendaftaran Akun Baru',
  status TEXT DEFAULT 'Selesai (Komisi Cair)',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Referral dapat dibaca pemilik kode" 
  ON public.referrals FOR SELECT 
  USING (true);

-- 5. Tabel Ulasan Wisatawan
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  destination_id TEXT REFERENCES public.destinations(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  date TEXT DEFAULT TO_CHAR(NOW(), 'DD Mon YYYY'),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ulasan dapat dibaca semua orang" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Pengguna dapat menulis ulasan" ON public.reviews FOR INSERT WITH CHECK (true);

-- ===============================================================
-- SEED DATA (DATA AWAL RESMI DANAU TOBA)
-- ===============================================================

INSERT INTO public.destinations (id, title, category, regency, subregion, rating, reviews, price, price_unit, image, description, tags)
VALUES
  (
    'bukit-holbung',
    'Bukit Holbung Samosir',
    'Geosite Alam',
    'Samosir',
    'Harian Boho, Samosir',
    4.9,
    1240,
    15000,
    'tiket',
    '/images/destinations/bukit-holbung.jpg',
    'Pemandangan bukit savana hijau yang membentang luas berhadapan langsung dengan bentang kaldera Danau Toba.',
    ARRAY['Geosite UNESCO', 'Sunset Point', 'Trekking Ringan']
  ),
  (
    'desa-tomok',
    'Desa Wisata Tomok & Makam Raja Sidabutar',
    'Warisan Budaya',
    'Samosir',
    'Simanindo, Samosir',
    4.8,
    890,
    25000,
    'orang',
    '/images/destinations/desa-tomok.jpg',
    'Pusat kebudayaan Batak kuno, makam sarkofagus batu Raja Sidabutar, dan pertunjukan sakral Patung Sigale-gale.',
    ARRAY['Cagar Budaya', 'Museum Batak', 'Sigale-gale']
  ),
  (
    'lembah-bakkara',
    'Lembah Bakkara & Aek Sipangolu',
    'Geosite Alam',
    'Humbang Hasundutan',
    'Bakti Raja, Humbahas',
    4.9,
    520,
    20000,
    'orang',
    '/images/destinations/lembah-bakkara.jpg',
    'Lembah subur diapit tebing kaldera, mata air abadi Aek Sipangolu, dan istana pahlawan Raja Sisingamangaraja.',
    ARRAY['Mata Air Alami', 'Situs Sejarah', 'Bawang Bakkara']
  ),
  (
    'kopi-lintong-roastery',
    'Sentra Kopi Arabika Lintong & Cupping Room',
    'Kuliner Khas',
    'Humbang Hasundutan',
    'Lintongnihuta, Humbahas',
    4.9,
    310,
    45000,
    'porsi',
    '/images/destinations/kopi-lintong.jpg',
    'Cicipi kemurnian kopi specialty dataran tinggi 1.400 mdpl dengan aroma rempah tanah vulkanik yang mendunia.',
    ARRAY['Specialty Coffee', 'Agrowisata', 'Oleh-oleh']
  ),
  (
    'tenun-ulos-suhi-suhi',
    'Kampung Penenun Ulos Huta Raja Suhi-suhi',
    'Kriya & Tenun',
    'Samosir',
    'Pangururan, Samosir',
    4.9,
    620,
    0,
    'kunjungan',
    '/images/destinations/tenun-ulos.jpg',
    'Deretan rumah adat Batak tradisional tempat para inang menenun kain Ulos Harungguan dan Sadum secara turun-temurun.',
    ARRAY['Rumah Adat Bolon', 'Penenun Asli', 'Kriya Budaya']
  ),
  (
    'bukit-tarabunga',
    'Bukit Tarabunga Balige',
    'Geosite Alam',
    'Toba (Balige)',
    'Tampahan, Balige',
    4.8,
    410,
    10000,
    'orang',
    '/images/destinations/bukit-tarabunga.jpg',
    'Titik terbaik menikmati panorama lengkung air danau kebiruan yang dipagari terasering persawahan hijau.',
    ARRAY['Spot Foto', 'Sunset Point', 'Persawahan']
  )
ON CONFLICT (id) DO NOTHING;
