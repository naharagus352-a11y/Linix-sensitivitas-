export type MobileSeries = string;

export interface SensitivityConfig {
  general: number;      // Lihat Sekeliling
  redDot: number;       // Red Dot Sight
  scope2x: number;      // 2x Scope
  scope4x: number;      // 4x Scope
  sniper: number;       // Sniper Scope
  freeLook: number;     // Kamera Bebas
  fireButton: number;   // Ukuran Tombol Tembak (%)
  dpi: number;          // DPI Rekomendasi
  animWindow: string;   // Skala Animasi Jendela
  animTransition: string; // Skala Animasi Transisi
  animDuration: string; // Skala Durasi Animator
  trickTip: string;     // Tips khusus untuk seri ini
}

export interface SeriesConfig {
  name: string;           // Nama seri asli (misal: "Redmi Note", "Galaxy S")
  label: string;          // Deskripsi singkat kategori
  badge: "Budget" | "Standard" | "Gaming" | "Pro" | "Premium"; // Label badge tipe
  config: SensitivityConfig;
}

export interface BrandData {
  id: string;
  name: string;
  logo: string;
  description: string;
  series: SeriesConfig[]; // List of dynamic genuine series
}

export interface SavedPreset {
  id: string;
  playerName: string;
  brandId: string;
  brandName: string;
  seriesName: string;
  playstyle: string;
  config: SensitivityConfig;
  createdAt: string;
}

