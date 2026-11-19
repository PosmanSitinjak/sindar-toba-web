-- ===============================================================
-- IZIN AKSES PENUH CRUD (CREATE, READ, UPDATE, DELETE) SUPABASE
-- Jalankan skrip ini di SQL Editor Supabase agar Admin & Mitra
-- dapat langsung menambah, mengubah, dan MENGHAPUS data real-time!
-- ===============================================================

-- Opsi 1: Nonaktifkan Row Level Security (RLS) pada tabel publik
-- Ini memastikan semua aksi hapus/tambah dari browser langsung berhasil
ALTER TABLE IF EXISTS public.destinations DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.referrals DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reviews DISABLE ROW LEVEL SECURITY;

-- Opsi 2 (Opsional jika RLS diaktifkan kembali di masa mendatang):
DROP POLICY IF EXISTS "Destinasi dapat dibaca siapa saja" ON public.destinations;
DROP POLICY IF EXISTS "Akses penuh destinasi" ON public.destinations;
CREATE POLICY "Akses penuh destinasi" ON public.destinations FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Wisatawan dapat melihat tiket miliknya" ON public.tickets;
DROP POLICY IF EXISTS "Akses penuh tiket" ON public.tickets FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Referral dapat dibaca pemilik kode" ON public.referrals;
DROP POLICY IF EXISTS "Akses penuh referrals" ON public.referrals FOR ALL USING (true) WITH CHECK (true);
