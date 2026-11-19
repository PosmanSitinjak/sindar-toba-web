"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  MapPin,
  X,
  Navigation,
  Compass,
  ExternalLink,
  Star,
  Layers,
  Search,
  Filter,
  ChevronRight,
  Mountain,
  Landmark,
  ShoppingBag,
  Coffee,
  Car,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  Info,
} from "lucide-react";

const RealCalderaMap = dynamic(() => import("./RealCalderaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d1b18] text-white gap-3 select-none">
      <div className="w-10 h-10 rounded-full border-2 border-[#c29d59] border-t-transparent animate-spin" />
      <span className="text-xs text-white/80 font-medium tracking-wide">
        Memuat Peta Satelit & Topografi Kaldera Danau Toba...
      </span>
    </div>
  ),
});

export interface GeositeItem {
  id: string;
  name: string;
  category: "Geosite Alam" | "Warisan Budaya" | "Kriya & Tenun" | "Kuliner & Kopi";
  regency: string;
  subregion: string;
  unescoNumber?: string;
  lat: number;
  lng: number;
  svgX: number; // percentage in SVG (0 - 100)
  svgY: number; // percentage in SVG (0 - 100)
  elevation: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  highlight: string;
  ticketPrice: string;
  destinasiUrl: string;
}

export const GEOSITES_DATA: GeositeItem[] = [
  {
    id: "sipiso-piso",
    name: "Air Terjun Sipiso-piso & Tongging",
    category: "Geosite Alam",
    regency: "Karo",
    subregion: "Merek, Kabupaten Karo",
    unescoNumber: "01",
    lat: 2.9194,
    lng: 98.5312,
    svgX: 28,
    svgY: 12,
    elevation: "1.300 mdpl",
    rating: 4.9,
    reviews: 1850,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80",
    description: "Air terjun vertikal setinggi 120m yang membelah tebing piroklastik kaldera utara menghadap teluk Tongging.",
    highlight: "Tebing Ignimbrit Kaldera Utara Toba",
    ticketPrice: "Rp 10.000",
    destinasiUrl: "/destinasi/bukit-holbung",
  },
  {
    id: "haranggaol",
    name: "Tebing Haranggaol & Silalahi",
    category: "Geosite Alam",
    regency: "Simalungun",
    subregion: "Haranggaol Horison, Simalungun",
    unescoNumber: "02",
    lat: 2.8712,
    lng: 98.6789,
    svgX: 52,
    svgY: 18,
    elevation: "1.050 mdpl",
    rating: 4.7,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    description: "Perbukitan curam dan teluk tenang dengan hamparan perikanan air tawar serta singkapan batuan andesit purba.",
    highlight: "Singkapan Batuan Piroklastik",
    ticketPrice: "Gratis",
    destinasiUrl: "/destinasi/bukit-holbung",
  },
  {
    id: "menara-tele",
    name: "Menara Pandang Tele & Punggungan Kaldera",
    category: "Geosite Alam",
    regency: "Samosir",
    subregion: "Harian Boho, Samosir",
    unescoNumber: "03",
    lat: 2.5647,
    lng: 98.6253,
    svgX: 22,
    svgY: 42,
    elevation: "1.450 mdpl",
    rating: 4.8,
    reviews: 1420,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80",
    description: "Satu-satunya jalur darat penghubung Sumatera dan Samosir dengan panorama 360° kaldera dan Pulau Samosir.",
    highlight: "Panorama Lengkap Dinding Kaldera Barat",
    ticketPrice: "Rp 15.000",
    destinasiUrl: "/destinasi/bukit-holbung",
  },
  {
    id: "bukit-holbung",
    name: "Bukit Holbung Samosir (Savana Kaldera)",
    category: "Geosite Alam",
    regency: "Samosir",
    subregion: "Harian Boho, Samosir",
    unescoNumber: "04",
    lat: 2.5483,
    lng: 98.6186,
    svgX: 30,
    svgY: 50,
    elevation: "1.200 mdpl",
    rating: 4.9,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Bentang savana hijau bergelombang yang telah ada ratusan ribu tahun sejak letusan supervolcano Toba.",
    highlight: "Bukit Teletubbies & Sunset Spot Kaldera",
    ticketPrice: "Rp 15.000",
    destinasiUrl: "/destinasi/bukit-holbung",
  },
  {
    id: "sibea-bea",
    name: "Panatapan Bukit Sibea-bea",
    category: "Geosite Alam",
    regency: "Samosir",
    subregion: "Harian, Samosir",
    unescoNumber: "05",
    lat: 2.5714,
    lng: 98.6321,
    svgX: 28,
    svgY: 46,
    elevation: "1.020 mdpl",
    rating: 4.8,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    description: "Jalan kelok ikonis berlatar hamparan danau biru dan patung monumen di puncak bukit kaldera.",
    highlight: "Jalan Kelok Arsitektural & Panorama Danau",
    ticketPrice: "Rp 25.000",
    destinasiUrl: "/destinasi/bukit-holbung",
  },
  {
    id: "pusuk-buhit",
    name: "Pusuk Buhit (Titik Asal Leluhur Batak)",
    category: "Warisan Budaya",
    regency: "Samosir",
    subregion: "Sianjur Mula-mula, Samosir",
    unescoNumber: "06",
    lat: 2.5975,
    lng: 98.6538,
    svgX: 36,
    svgY: 43,
    elevation: "1.972 mdpl",
    rating: 4.9,
    reviews: 860,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    description: "Gunung keramat tempat mitologi turunnya Si Raja Batak pertama kali, serta pusat energi spiritual tanah Batak.",
    highlight: "Puncak Sakral & Geologi Kubah Lava Aktif",
    ticketPrice: "Rp 10.000",
    destinasiUrl: "/destinasi/bukit-holbung",
  },
  {
    id: "aek-rangat",
    name: "Pemandian Air Panas Aek Rangat",
    category: "Geosite Alam",
    regency: "Samosir",
    subregion: "Pangururan, Samosir",
    unescoNumber: "07",
    lat: 2.6087,
    lng: 98.6754,
    svgX: 40,
    svgY: 44,
    elevation: "950 mdpl",
    rating: 4.7,
    reviews: 940,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "Mata air belerang geothermal alami yang bersumber langsung dari sistem magma bawah tanah Pusuk Buhit.",
    highlight: "Manifestasi Hidrotermal Gunung Purba",
    ticketPrice: "Rp 15.000",
    destinasiUrl: "/destinasi/bukit-holbung",
  },
  {
    id: "tenun-ulos-suhi-suhi",
    name: "Kampung Penenun Ulos Huta Raja",
    category: "Kriya & Tenun",
    regency: "Samosir",
    subregion: "Lumban Suhi-suhi, Pangururan",
    unescoNumber: "08",
    lat: 2.6289,
    lng: 98.6942,
    svgX: 43,
    svgY: 38,
    elevation: "910 mdpl",
    rating: 4.9,
    reviews: 620,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "Desa cagar budaya dengan barisan Rumah Bolon otentik tempat para Inang menenun kain Ulos tradisional.",
    highlight: "Tenun Gedog Tradisional & Rumah Bolon",
    ticketPrice: "Gratis",
    destinasiUrl: "/destinasi/tenun-ulos-suhi-suhi",
  },
  {
    id: "parbaba",
    name: "Pasir Putih Parbaba Samosir",
    category: "Geosite Alam",
    regency: "Samosir",
    subregion: "Pangururan, Samosir",
    unescoNumber: "09",
    lat: 2.6341,
    lng: 98.7189,
    svgX: 48,
    svgY: 36,
    elevation: "905 mdpl",
    rating: 4.6,
    reviews: 780,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    description: "Hamparan pasir putih langka di tepian danau air tawar dengan latar tebing kaldera yang kokoh.",
    highlight: "Pesisir Danau Berpasir Putih Alami",
    ticketPrice: "Rp 10.000",
    destinasiUrl: "/destinasi/bukit-holbung",
  },
  {
    id: "huta-siallagan",
    name: "Batu Parsidangan Huta Siallagan",
    category: "Warisan Budaya",
    regency: "Samosir",
    subregion: "Ambarita, Simanindo, Samosir",
    unescoNumber: "10",
    lat: 2.6792,
    lng: 98.8354,
    svgX: 58,
    svgY: 42,
    elevation: "910 mdpl",
    rating: 4.9,
    reviews: 1350,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Kompleks perkampungan megalitikum dengan meja dan kursi batu kuno tempat sidang peradilan hukum adat Batak.",
    highlight: "Kursi Sidang Batu Megalitikum & Pohon Hariara",
    ticketPrice: "Rp 15.000",
    destinasiUrl: "/destinasi/desa-tomok",
  },
  {
    id: "desa-tomok",
    name: "Desa Wisata Tomok & Makam Raja Sidabutar",
    category: "Warisan Budaya",
    regency: "Samosir",
    subregion: "Tomok, Simanindo, Samosir",
    unescoNumber: "11",
    lat: 2.6588,
    lng: 98.8654,
    svgX: 62,
    svgY: 48,
    elevation: "915 mdpl",
    rating: 4.8,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "Sarkofagus batu raja Batak berusia ratusan tahun, tarian Sigale-gale magis, dan pasar cinderamata ulos.",
    highlight: "Sarkofagus Monolitik & Patung Sigale-gale",
    ticketPrice: "Rp 25.000",
    destinasiUrl: "/destinasi/desa-tomok",
  },
  {
    id: "parapat",
    name: "Parapat & Tebing Batu Gantung",
    category: "Geosite Alam",
    regency: "Simalungun",
    subregion: "Girsang Sipangan Bolon, Simalungun",
    unescoNumber: "12",
    lat: 2.6635,
    lng: 98.9328,
    svgX: 74,
    svgY: 46,
    elevation: "920 mdpl",
    rating: 4.7,
    reviews: 1670,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80",
    description: "Kota pelabuhan utama gerbang Danau Toba dengan legenda formasi tebing Batu Gantung di dinding kaldera timur.",
    highlight: "Pelabuhan Ajibata & Tebing Batu Gantung",
    ticketPrice: "Gratis",
    destinasiUrl: "/destinasi/bukit-holbung",
  },
  {
    id: "bukit-tarabunga",
    name: "Bukit Tarabunga Balige",
    category: "Geosite Alam",
    regency: "Toba",
    subregion: "Tampahan, Balige, Toba",
    unescoNumber: "13",
    lat: 2.3241,
    lng: 99.0435,
    svgX: 72,
    svgY: 72,
    elevation: "1.150 mdpl",
    rating: 4.8,
    reviews: 410,
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80",
    description: "Pemandangan lengkung perairan danau selatan dengan terasering sawah khas Balige yang membentang indah.",
    highlight: "Lanskap Terasering & Panorama Teluk Balige",
    ticketPrice: "Rp 10.000",
    destinasiUrl: "/destinasi/bukit-tarabunga",
  },
  {
    id: "desa-meat",
    name: "Desa Wisata Meat (Lembah Ulos Harungguan)",
    category: "Kriya & Tenun",
    regency: "Toba",
    subregion: "Tampahan, Toba",
    unescoNumber: "14",
    lat: 2.3418,
    lng: 99.021,
    svgX: 68,
    svgY: 76,
    elevation: "920 mdpl",
    rating: 4.8,
    reviews: 380,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "Desa lembah tenang di tepian danau yang tersohor sebagai pengrajin Ulos Harungguan dengan bentang sawah hijau.",
    highlight: "Penenun Ulos Raja & Lembah Sawah Hijau",
    ticketPrice: "Gratis",
    destinasiUrl: "/destinasi/tenun-ulos-suhi-suhi",
  },
  {
    id: "sipinsur",
    name: "Geosite Sipinsur (Hutan Pinus Kaldera)",
    category: "Geosite Alam",
    regency: "Humbang Hasundutan",
    subregion: "Paranginan, Humbahas",
    unescoNumber: "15",
    lat: 2.2536,
    lng: 98.9102,
    svgX: 49,
    svgY: 82,
    elevation: "1.213 mdpl",
    rating: 4.9,
    reviews: 1530,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    description: "Hutan pinus sejuk di bibir tebing kaldera selatan tempat Presiden RI meresmikan Geopark Kaldera Danau Toba.",
    highlight: "Sudut Pandang Pulau Samosir dari Ketinggian",
    ticketPrice: "Rp 10.000",
    destinasiUrl: "/destinasi/lembah-bakkara",
  },
  {
    id: "kopi-lintong-roastery",
    name: "Sentra Kopi Arabika Lintong & Cupping Room",
    category: "Kuliner & Kopi",
    regency: "Humbang Hasundutan",
    subregion: "Lintongnihuta, Humbahas",
    unescoNumber: "16",
    lat: 2.2472,
    lng: 98.8789,
    svgX: 44,
    svgY: 90,
    elevation: "1.400 mdpl",
    rating: 4.9,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
    description: "Kebun kopi arabika dataran tinggi tanah vulkanik kaldera dengan proses wet-hull giling basah tradisional.",
    highlight: "Specialty Coffee Asli Tanah Vulkanik",
    ticketPrice: "Gratis Tour",
    destinasiUrl: "/destinasi/lembah-bakkara",
  },
  {
    id: "lembah-bakkara",
    name: "Lembah Bakkara & Aek Sipangolu",
    category: "Warisan Budaya",
    regency: "Humbang Hasundutan",
    subregion: "Bakti Raja, Humbahas",
    unescoNumber: "17",
    lat: 2.2798,
    lng: 98.7981,
    svgX: 35,
    svgY: 82,
    elevation: "930 mdpl",
    rating: 4.9,
    reviews: 520,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    description: "Tanah kelahiran Dinasti Sisingamangaraja yang diapit dinding kaldera raksasa dan mata air alami Aek Sipangolu.",
    highlight: "Mata Air Keramat & Lembah Bertabur Bawang",
    ticketPrice: "Rp 20.000",
    destinasiUrl: "/destinasi/lembah-bakkara",
  },
];

export const CALDERA_ROUTES = [
  {
    id: "rute-samosir",
    title: "Jalur Lingkar Samosir Heritage & Savana",
    duration: "1 Hari Penuh (7-8 Jam)",
    badge: "Paling Populer",
    distance: "128 km",
    theme: "Budaya Megalitikum & Bentang Alam Savana",
    stops: [
      { name: "Pelabuhan Tomok", type: "Titik Kumpul Ferry" },
      { name: "Huta Siallagan Ambarita", type: "Megalitikum Batu Parsidangan" },
      { name: "Kampung Ulos Huta Raja", type: "Tenun Gedog Otentik" },
      { name: "Pemandian Aek Rangat", type: "Relaksasi Air Hangat" },
      { name: "Bukit Holbung", type: "Sunset Savana Kaldera" },
    ],
    tips: "Gunakan sepeda motor atau mobil carteran. Jalur aspal lingkar Samosir mulus dan aman.",
  },
  {
    id: "rute-barat",
    title: "Jalur Tebing Kaldera Barat & Dataran Tinggi",
    duration: "2 Hari 1 Malam",
    badge: "Panorama Spektakuler",
    distance: "185 km",
    theme: "Tebing Piroklastik, Air Terjun & Lembah Purba",
    stops: [
      { name: "Air Terjun Sipiso-piso", type: "Pemandangan Kaldera Utara" },
      { name: "Menara Pandang Tele", type: "Gardu Pandang Kaldera 360°" },
      { name: "Bukit Sibea-bea", type: "Jalan Kelok Arsitektur" },
      { name: "Lembah Bakkara", type: "Mata Air & Istana Sisingamangaraja" },
    ],
    tips: "Penuh tanjakan dan kelokan dengan pemandangan dramatis. Pastikan rem kendaraan dalam kondisi prima.",
  },
  {
    id: "rute-selatan",
    title: "Jalur Kopi Lintong, Hutan Pinus & Pengrajin Ulos Toba",
    duration: "1 Hari (6 Jam)",
    badge: "Kriya & Kopi",
    distance: "95 km",
    theme: "Agrowisata Kopi Vulkanik & Sentra Kriya",
    stops: [
      { name: "Geosite Sipinsur", type: "Hutan Pinus & Panorama Kaldera" },
      { name: "Sentra Kopi Lintongnihuta", type: "Cupping Kopi Specialty" },
      { name: "Desa Wisata Meat", type: "Lembah Pengrajin Tenun Ulos" },
      { name: "Bukit Tarabunga Balige", type: "Sunset Teluk Balige & Kuliner" },
    ],
    tips: "Sangat direkomendasikan bagi pecinta fotografi lanskap, kopi single origin, dan kriya tenun.",
  },
];

interface CalderaMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGeositeId?: string;
}

export default function CalderaMapModal({
  isOpen,
  onClose,
  initialGeositeId,
}: CalderaMapModalProps) {
  const [activeTab, setActiveTab] = useState<"map" | "list" | "routes">("map");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedRegency, setSelectedRegency] = useState<string>("Semua Kabupaten");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGeosite, setSelectedGeosite] = useState<GeositeItem | null>(() => {
    if (initialGeositeId) {
      return GEOSITES_DATA.find((g) => g.id === initialGeositeId) || GEOSITES_DATA[3]; // default Holbung
    }
    return GEOSITES_DATA[3]; // Bukit Holbung
  });

  const categories = [
    "Semua",
    "Geosite Alam",
    "Warisan Budaya",
    "Kriya & Tenun",
    "Kuliner & Kopi",
  ];

  const regencies = [
    "Semua Kabupaten",
    "Samosir",
    "Toba",
    "Humbang Hasundutan",
    "Simalungun",
    "Karo",
  ];

  // Filtered Geosites
  const filteredGeosites = useMemo(() => {
    return GEOSITES_DATA.filter((item) => {
      const matchCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const matchRegency =
        selectedRegency === "Semua Kabupaten" ||
        item.regency.toLowerCase().includes(selectedRegency.toLowerCase());
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subregion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.highlight.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchRegency && matchSearch;
    });
  }, [selectedCategory, selectedRegency, searchQuery]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Geosite Alam":
        return <Mountain className="w-3.5 h-3.5 text-emerald-400" />;
      case "Warisan Budaya":
        return <Landmark className="w-3.5 h-3.5 text-amber-400" />;
      case "Kriya & Tenun":
        return <ShoppingBag className="w-3.5 h-3.5 text-rose-400" />;
      case "Kuliner & Kopi":
        return <Coffee className="w-3.5 h-3.5 text-orange-400" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-[#c29d59]" />;
    }
  };

  const getPinColor = (category: string, isSelected: boolean) => {
    if (isSelected) return "bg-[#c29d59] text-[#1a3a34] ring-4 ring-[#c29d59]/50 scale-125 z-30 shadow-lg";
    switch (category) {
      case "Geosite Alam":
        return "bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-110";
      case "Warisan Budaya":
        return "bg-amber-600 text-white hover:bg-amber-500 hover:scale-110";
      case "Kriya & Tenun":
        return "bg-rose-600 text-white hover:bg-rose-500 hover:scale-110";
      case "Kuliner & Kopi":
        return "bg-orange-600 text-white hover:bg-orange-500 hover:scale-110";
      default:
        return "bg-[#1a3a34] text-white hover:bg-[#254e46]";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#122421] border border-[#c29d59]/30 text-white w-full max-w-6xl h-[92vh] max-h-[880px] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
        {/* Top Header Bar */}
        <div className="bg-[#1a3a34] border-b border-[#c29d59]/20 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#c29d59]/15 border border-[#c29d59]/40 flex items-center justify-center text-[#c29d59]">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-newsreader text-lg sm:text-xl font-medium text-white tracking-wide">
                  Peta Digital Kaldera Danau Toba
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#c29d59]/20 border border-[#c29d59]/40 text-[#c29d59] uppercase tracking-wider">
                  UNESCO Global Geopark
                </span>
              </div>
              <p className="text-[11.5px] sm:text-[12px] text-white/70">
                16 Geosite Resmi Kaldera & Sentra UMKM 8 Kabupaten Sekeliling Danau
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs & Close Button */}
          <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-[11px] sm:text-[12px]">
              <button
                onClick={() => setActiveTab("map")}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1.5 ${
                  activeTab === "map"
                    ? "bg-[#c29d59] text-[#1a3a34] shadow-sm font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Peta Interaktif</span>
              </button>
              <button
                onClick={() => setActiveTab("list")}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1.5 ${
                  activeTab === "list"
                    ? "bg-[#c29d59] text-[#1a3a34] shadow-sm font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Katalog ({filteredGeosites.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("routes")}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1.5 ${
                  activeTab === "routes"
                    ? "bg-[#c29d59] text-[#1a3a34] shadow-sm font-semibold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Rute Rekomendasi</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              title="Tutup Peta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Ribbon */}
        <div className="bg-[#152e2a] border-b border-white/10 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[12px] shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-white/50 text-[11px] uppercase tracking-wider font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#c29d59]" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#c29d59] text-[#1a3a34] font-semibold shadow-sm"
                    : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-48">
              <Search className="w-3.5 h-3.5 text-white/50 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari geosite atau kabupaten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-[11.5px] text-white placeholder-white/40 focus:outline-none focus:border-[#c29d59]"
              />
            </div>

            <select
              value={selectedRegency}
              onChange={(e) => setSelectedRegency(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-[11.5px] text-white focus:outline-none focus:border-[#c29d59] cursor-pointer"
            >
              {regencies.map((r) => (
                <option key={r} value={r} className="bg-[#122421] text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 relative overflow-hidden bg-[#0d1b18]">
          {activeTab === "map" && (
            <div className="w-full h-full relative flex flex-col md:flex-row overflow-hidden">
              {/* Real GIS Interactive Map Canvas (Leaflet OpenStreetMap / Esri Satellite) */}
              <div className="flex-1 h-full relative overflow-hidden">
                <RealCalderaMap
                  geosites={filteredGeosites}
                  selectedGeosite={selectedGeosite}
                  onSelectGeosite={(site) => setSelectedGeosite(site)}
                />
              </div>

              {/* Selected Geosite Interactive Detail Panel (Side/Bottom) */}
              {selectedGeosite && (
                <div className="w-full md:w-80 lg:w-96 bg-[#152e2a] border-t md:border-t-0 md:border-l border-[#c29d59]/30 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto shrink-0 z-20 shadow-2xl">
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#c29d59]/20 border border-[#c29d59]/50 text-[#c29d59] uppercase tracking-wider flex items-center gap-1">
                        {getCategoryIcon(selectedGeosite.category)}
                        {selectedGeosite.category}
                      </span>
                      {selectedGeosite.unescoNumber && (
                        <span className="text-[10px] font-semibold text-white/60 tracking-wider">
                          UNESCO #{selectedGeosite.unescoNumber}
                        </span>
                      )}
                    </div>

                    {/* Image Thumbnail */}
                    <div className="relative h-36 sm:h-40 w-full rounded-xl overflow-hidden mb-3 border border-white/10">
                      <img
                        src={selectedGeosite.image}
                        alt={selectedGeosite.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px]">
                        <Star className="w-3 h-3 fill-[#c29d59] text-[#c29d59]" />
                        <span className="font-semibold">{selectedGeosite.rating}</span>
                        <span className="text-white/60 text-[10px]">({selectedGeosite.reviews} ulasan)</span>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#1a3a34]/80 backdrop-blur-sm text-[#c29d59] text-[10.5px] font-medium border border-[#c29d59]/30">
                        {selectedGeosite.elevation}
                      </div>
                    </div>

                    {/* Title & Location */}
                    <h3 className="font-newsreader text-lg sm:text-xl font-medium text-white mb-1 leading-snug">
                      {selectedGeosite.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11.5px] text-[#c29d59] mb-2.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedGeosite.subregion}</span>
                    </div>

                    {/* Highlight Box */}
                    <div className="bg-black/30 border border-white/10 rounded-xl p-2.5 mb-3 text-[11.5px]">
                      <span className="text-[#c29d59] font-semibold block text-[10px] uppercase tracking-wider mb-0.5">
                        Keunikan Geologis & Budaya:
                      </span>
                      <p className="text-white/90 leading-relaxed font-medium">
                        {selectedGeosite.highlight}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-[12px] text-white/75 leading-relaxed mb-4">
                      {selectedGeosite.description}
                    </p>

                    {/* Coordinates & Price row */}
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] mb-4">
                      <div>
                        <span className="text-white/50 block text-[9.5px] uppercase">Koordinat GPS</span>
                        <span className="font-mono text-white/90">
                          {selectedGeosite.lat.toFixed(4)}°, {selectedGeosite.lng.toFixed(4)}°
                        </span>
                      </div>
                      <div>
                        <span className="text-white/50 block text-[9.5px] uppercase">Retribusi / Tiket</span>
                        <span className="font-semibold text-[#c29d59]">
                          {selectedGeosite.ticketPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                    <Link
                      href={selectedGeosite.destinasiUrl}
                      onClick={onClose}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#c29d59] hover:bg-[#b08b47] text-[#1a3a34] font-semibold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 text-center"
                    >
                      <span>Lihat Halaman Destinasi</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedGeosite.lat},${selectedGeosite.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-[11.5px] font-medium transition-colors flex items-center justify-center gap-2 border border-white/15"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Buka Rute Navigasi Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-white/50" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "list" && (
            <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-newsreader text-xl font-normal text-white">
                    Daftar Lengkap Geosite UNESCO & Sentra UMKM ({filteredGeosites.length})
                  </h3>
                  <span className="text-[12px] text-white/60">
                    Urutan berdasarkan sebaran kawasan kaldera
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredGeosites.map((site) => (
                    <div
                      key={site.id}
                      className="bg-[#152e2a] border border-white/10 hover:border-[#c29d59] rounded-2xl p-4 flex flex-col justify-between transition-all group"
                    >
                      <div>
                        <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-black/40">
                          <img
                            src={site.image}
                            alt={site.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#1a3a34]/90 text-[#c29d59] border border-[#c29d59]/40 uppercase">
                            {site.category}
                          </span>
                          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono">
                            {site.elevation}
                          </span>
                        </div>

                        <h4 className="font-newsreader text-base font-semibold text-white mb-1 group-hover:text-[#c29d59] transition-colors">
                          {site.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-[#c29d59] mb-2">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{site.subregion}</span>
                        </div>

                        <p className="text-[11.5px] text-white/70 line-clamp-2 leading-relaxed mb-3">
                          {site.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#c29d59]">
                          {site.ticketPrice}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Navigasi Google Maps"
                          >
                            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                          </a>

                          <Link
                            href={site.destinasiUrl}
                            onClick={onClose}
                            className="px-3 py-1.5 rounded-lg bg-[#c29d59] hover:bg-[#b08b47] text-[#1a3a34] font-semibold text-[11px] uppercase tracking-wider transition-colors"
                          >
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "routes" && (
            <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 text-center sm:text-left">
                  <span className="text-[11px] font-semibold text-[#c29d59] tracking-widest uppercase block mb-1">
                    Itinerary Resmi Kaldera
                  </span>
                  <h3 className="font-newsreader text-xl sm:text-2xl font-normal text-white">
                    3 Rute Perjalanan Tematik Mengelilingi Danau Toba
                  </h3>
                  <p className="text-[12.5px] text-white/70 mt-1">
                    Rute kurasi tim BPODT dan pemandu lokal untuk eksplorasi darat dan pelayaran kaldera.
                  </p>
                </div>

                <div className="space-y-6">
                  {CALDERA_ROUTES.map((route, idx) => (
                    <div
                      key={route.id}
                      className="bg-[#152e2a] border border-[#c29d59]/30 rounded-2xl p-5 sm:p-6 shadow-lg"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#c29d59] text-[#1a3a34] uppercase tracking-wider">
                              Rute #{idx + 1} • {route.badge}
                            </span>
                            <span className="text-[11px] text-white/60">
                              {route.distance}
                            </span>
                          </div>
                          <h4 className="font-newsreader text-lg sm:text-xl font-medium text-white">
                            {route.title}
                          </h4>
                          <span className="text-[12px] text-[#c29d59] block mt-0.5">
                            Tema: {route.theme}
                          </span>
                        </div>

                        <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-center shrink-0">
                          <span className="text-[10px] text-white/60 uppercase block">Durasi</span>
                          <span className="text-[13px] font-semibold text-white">
                            {route.duration}
                          </span>
                        </div>
                      </div>

                      {/* Stops Timeline */}
                      <div className="bg-black/30 rounded-xl p-4 border border-white/10 mb-4">
                        <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider block mb-3">
                          Titik Singgah Utama:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                          {route.stops.map((stop, sIdx) => (
                            <div
                              key={sIdx}
                              className="flex items-start gap-2.5 text-[12px] bg-white/5 p-2.5 rounded-lg border border-white/10"
                            >
                              <div className="w-5 h-5 rounded-full bg-[#c29d59] text-[#1a3a34] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {sIdx + 1}
                              </div>
                              <div>
                                <span className="font-medium text-white block leading-tight">
                                  {stop.name}
                                </span>
                                <span className="text-[10.5px] text-white/60 leading-tight block mt-0.5">
                                  {stop.type}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips & CTA */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/10 text-[11.5px]">
                        <div className="flex items-center gap-2 text-white/70">
                          <Info className="w-4 h-4 text-[#c29d59] shrink-0" />
                          <span>
                            <strong>Tips Perjalanan:</strong> {route.tips}
                          </span>
                        </div>

                        <a
                          href="https://wa.me/6281234567890?text=Halo%20Sindar%20Toba,%20saya%20tertarik%20dengan%20rute%20wisata%20"
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[11px] uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
                        >
                          <span>Konsultasi Rute</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
