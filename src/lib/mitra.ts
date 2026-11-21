export interface MitraProfile {
  name: string;
  owner: string;
  regency: string;
  code: string;
  category: string;
  verifiedDate: string;
  bank: string;
  accountNumber: string;
  accountHolder: string;
  email: string;
  balance: number;
}

export const PRESET_MITRA_LIST: MitraProfile[] = [
  {
    name: "Homestay Rura Batak & Tour Samosir",
    owner: "Mangatur Sitinjak",
    regency: "Kabupaten Samosir",
    code: "MIT-BPODT-0482",
    category: "Homestay & Penginapan",
    verifiedDate: "15 Januari 2024",
    bank: "Bank Sumut",
    accountNumber: "102.02.04.098124-1",
    accountHolder: "Mangatur Sitinjak",
    email: "homestay.rurabatak@gmail.com",
    balance: 0,
  },
  {
    name: "Pokdarwis Savana Bukit Holbung",
    owner: "Poltak Malau",
    regency: "Kabupaten Samosir",
    code: "MIT-BPODT-0104",
    category: "Geosite & Tiket Masuk",
    verifiedDate: "10 Maret 2024",
    bank: "Bank Sumut",
    accountNumber: "102.04.11.892110-3",
    accountHolder: "Pokdarwis Harian Boho",
    email: "pokdarwis.holbung@gmail.com",
    balance: 0,
  },
  {
    name: "Sentra Tenun Ulos Harungguan Meat",
    owner: "Nai Tiurma Tambunan",
    regency: "Kabupaten Toba",
    code: "MIT-BPODT-0238",
    category: "Kriya Tenun & Kerajinan",
    verifiedDate: "05 Mei 2024",
    bank: "Bank Mandiri",
    accountNumber: "107.00.198234-9",
    accountHolder: "Nai Tiurma Tambunan",
    email: "ulos.harungguan@gmail.com",
    balance: 0,
  },
  {
    name: "Kopi Arabika Organik Dolok Sipiak",
    owner: "Jogi Sihombing",
    regency: "Kabupaten Humbang Hasundutan",
    code: "MIT-BPODT-0319",
    category: "Kuliner & Agrowisata",
    verifiedDate: "20 Juni 2024",
    bank: "Bank Sumut",
    accountNumber: "102.05.22.449102-8",
    accountHolder: "Jogi Sihombing",
    email: "kopi.lintong@gmail.com",
    balance: 0,
  },
];
