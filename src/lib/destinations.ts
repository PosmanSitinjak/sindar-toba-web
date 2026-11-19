import { supabase, isSupabaseConfigured } from "./supabase";

export interface Destination {
  id: string;
  title: string;
  category: string;
  regency: string;
  subregion: string;
  rating: number;
  reviews: number;
  price: string;
  priceUnit: string;
  image: string;
  description: string;
  tags: string[];
}

export const fallbackDestinations: Destination[] = [
  {
    id: "bukit-holbung",
    title: "Bukit Holbung Samosir",
    category: "Geosite Alam",
    regency: "Samosir",
    subregion: "Harian Boho, Samosir",
    rating: 4.9,
    reviews: 1240,
    price: "15.000",
    priceUnit: "tiket",
    image: "/images/destinations/bukit-holbung.jpg",
    description: "Pemandangan bukit savana hijau yang membentang luas berhadapan langsung dengan bentang kaldera Danau Toba.",
    tags: ["Geosite UNESCO", "Sunset Point", "Trekking Ringan"],
  },
  {
    id: "desa-tomok",
    title: "Desa Wisata Tomok & Makam Raja Sidabutar",
    category: "Warisan Budaya",
    regency: "Samosir",
    subregion: "Simanindo, Samosir",
    rating: 4.8,
    reviews: 890,
    price: "25.000",
    priceUnit: "orang",
    image: "/images/destinations/desa-tomok.jpg",
    description: "Pusat kebudayaan Batak kuno, makam sarkofagus batu Raja Sidabutar, dan pertunjukan sakral Patung Sigale-gale.",
    tags: ["Cagar Budaya", "Museum Batak", "Sigale-gale"],
  },
  {
    id: "lembah-bakkara",
    title: "Lembah Bakkara & Aek Sipangolu",
    category: "Geosite Alam",
    regency: "Humbang Hasundutan",
    subregion: "Bakti Raja, Humbahas",
    rating: 4.9,
    reviews: 520,
    price: "20.000",
    priceUnit: "orang",
    image: "/images/destinations/lembah-bakkara.jpg",
    description: "Lembah subur diapit tebing kaldera, mata air abadi Aek Sipangolu, dan istana pahlawan Raja Sisingamangaraja.",
    tags: ["Mata Air Alami", "Situs Sejarah", "Bawang Bakkara"],
  },
  {
    id: "kopi-lintong-roastery",
    title: "Sentra Kopi Arabika Lintong & Cupping Room",
    category: "Kuliner Khas",
    regency: "Humbang Hasundutan",
    subregion: "Lintongnihuta, Humbahas",
    rating: 4.9,
    reviews: 310,
    price: "45.000",
    priceUnit: "porsi",
    image: "/images/destinations/kopi-lintong.jpg",
    description: "Cicipi kemurnian kopi specialty dataran tinggi 1.400 mdpl dengan aroma rempah tanah vulkanik yang mendunia.",
    tags: ["Specialty Coffee", "Agrowisata", "Oleh-oleh"],
  },
  {
    id: "tenun-ulos-suhi-suhi",
    title: "Kampung Penenun Ulos Huta Raja Suhi-suhi",
    category: "Kriya & Tenun",
    regency: "Samosir",
    subregion: "Pangururan, Samosir",
    rating: 4.9,
    reviews: 620,
    price: "Free",
    priceUnit: "kunjungan",
    image: "/images/destinations/tenun-ulos.jpg",
    description: "Deretan rumah adat Batak tradisional tempat para inang menenun kain Ulos Harungguan dan Sadum secara turun-temurun.",
    tags: ["Rumah Adat Bolon", "Penenun Asli", "Kriya Budaya"],
  },
  {
    id: "bukit-tarabunga",
    title: "Bukit Tarabunga Balige",
    category: "Geosite Alam",
    regency: "Toba (Balige)",
    subregion: "Tampahan, Balige",
    rating: 4.8,
    reviews: 410,
    price: "10.000",
    priceUnit: "orang",
    image: "/images/destinations/bukit-tarabunga.jpg",
    description: "Titik terbaik menikmati panorama lengkung air danau kebiruan yang dipagari terasering persawahan hijau.",
    tags: ["Spot Foto", "Sunset Point", "Persawahan"],
  },
];

export async function fetchDestinations(): Promise<Destination[]> {
  if (!isSupabaseConfigured || !supabase) {
    return fallbackDestinations;
  }

  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("rating", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackDestinations;
    }

    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      regency: d.regency,
      subregion: d.subregion,
      rating: Number(d.rating),
      reviews: d.reviews,
      price: d.price ? Number(d.price).toLocaleString("id-ID") : "Free",
      priceUnit: d.price_unit,
      image: d.image,
      description: d.description,
      tags: d.tags || [],
    }));
  } catch {
    return fallbackDestinations;
  }
}
