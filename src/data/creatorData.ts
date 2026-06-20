import { SensitivityConfig } from '../types';

export interface CreatorData {
  id: string;
  name: string;
  signatureWeapon: string;
  deviceUsed: string;
  avatarColor: string; // Tailwind bg color class
  role: 'Rusher' | 'Sniper' | 'All-Rounder' | 'Support' | 'One-Tap Master';
  subscriberCount: string;
  config: SensitivityConfig;
}

export const CREATORS: CreatorData[] = [
  {
    id: 'budi01_gaming',
    name: 'Budi01 Gaming',
    signatureWeapon: 'M1014 & MP40',
    deviceUsed: 'iPhone 13 Pro Max',
    avatarColor: 'bg-red-600',
    role: 'One-Tap Master',
    subscriberCount: '12.8M+',
    config: {
      general: 188,
      redDot: 180,
      scope2x: 176,
      scope4x: 170,
      sniper: 80,
      freeLook: 130,
      fireButton: 43,
      dpi: 120, // iOS standard
      animWindow: 'Kurangi Gerakan (On)',
      animTransition: 'Kurangi Gerakan (On)',
      animDuration: 'Kurangi Gerakan (On)',
      trickTip: 'J-Drag cepat setengah melingkar di skala 200. Tarik tombol tembak dari pojok kanan bawah lalu sentak tajam ke arah tengah atas layar.'
    }
  },
  {
    id: 'letda_hyper',
    name: 'Letda Hyper',
    signatureWeapon: 'MP40 & Woodpecker',
    deviceUsed: 'ROG Phone 8 Pro',
    avatarColor: 'bg-amber-600',
    role: 'Rusher',
    subscriberCount: '9.4M+',
    config: {
      general: 172,
      redDot: 164,
      scope2x: 158,
      scope4x: 152,
      sniper: 70,
      freeLook: 110,
      fireButton: 40,
      dpi: 620,
      animWindow: 'Nonaktif (Off)',
      animTransition: 'Nonaktif (Off)',
      animDuration: 'Nonaktif (Off)',
      trickTip: 'Sensitivitas 170+ di asus ROG dipadu DPI tinggi 620 dengan tombol tembak kecil 40%. Sangat lincah dan berputar sangat licin!'
    }
  },
  {
    id: 'andra_st',
    name: 'Andra ST',
    signatureWeapon: 'M1887 & SVD',
    deviceUsed: 'Xiaomi 13T Pro',
    avatarColor: 'bg-rose-600',
    role: 'One-Tap Master',
    subscriberCount: '3.1M+',
    config: {
      general: 196,
      redDot: 188,
      scope2x: 182,
      scope4x: 176,
      sniper: 96,
      freeLook: 140,
      fireButton: 47,
      dpi: 490,
      animWindow: '0.5x',
      animTransition: '0.5x',
      animDuration: '0.5x',
      trickTip: 'Skala sensitivitas tertinggi menyerupai 196 untuk mengunci leher ke kepala. Tarik tombol ke atas secara tegak lurus secepat kilat.'
    }
  },
  {
    id: 'kamiel',
    name: 'Kamiel',
    signatureWeapon: 'AWM & M24',
    deviceUsed: 'iPad Pro M2',
    avatarColor: 'bg-indigo-600',
    role: 'Sniper',
    subscriberCount: '1.2M+',
    config: {
      general: 164,
      redDot: 156,
      scope2x: 150,
      scope4x: 144,
      sniper: 56,
      freeLook: 100,
      fireButton: 52,
      dpi: 120, // iOS
      animWindow: 'Kurangi Gerakan (On)',
      animTransition: 'Kurangi Gerakan (On)',
      animDuration: 'Kurangi Gerakan (On)',
      trickTip: 'Sensitivitas medium-high (164) pada iPad sangat mulus untuk rolling aim zoom scope AWM tanpa goyang berlebih.'
    }
  },
  {
    id: 'flado',
    name: 'Flado',
    signatureWeapon: 'Thompson & SCAR',
    deviceUsed: 'POCO F6',
    avatarColor: 'bg-emerald-600',
    role: 'Rusher',
    subscriberCount: '850K+',
    config: {
      general: 180,
      redDot: 174,
      scope2x: 168,
      scope4x: 164,
      sniper: 90,
      freeLook: 130,
      fireButton: 45,
      dpi: 512,
      animWindow: '0.5x',
      animTransition: '0.5x',
      animDuration: '0.5x',
      trickTip: 'Optimal untuk tracking SMG jarak dekat pada angka kembar stabil 180-an di POCO F Series terbaru.'
    }
  },
  {
    id: 'rafael',
    name: 'Rafael',
    signatureWeapon: 'M1887 & Desert Eagle',
    deviceUsed: 'iPhone 14 Pro Max',
    avatarColor: 'bg-cyan-600',
    role: 'One-Tap Master',
    subscriberCount: '1.5M+',
    config: {
      general: 192,
      redDot: 184,
      scope2x: 176,
      scope4x: 170,
      sniper: 84,
      freeLook: 136,
      fireButton: 42,
      dpi: 120,
      animWindow: 'Kurangi Gerakan (On)',
      animTransition: 'Kurangi Gerakan (On)',
      animDuration: 'Kurangi Gerakan (On)',
      trickTip: 'Setelan licin headshot satu peluru 192 untuk shotgun dan pistol gurun di layar sensitif tinggi iOS.'
    }
  },
  {
    id: 'rafaiz',
    name: 'Rafaiz',
    signatureWeapon: 'SCAR & MP5-III',
    deviceUsed: 'Infinix GT 20 Pro',
    avatarColor: 'bg-yellow-600',
    role: 'All-Rounder',
    subscriberCount: '720K+',
    config: {
      general: 190,
      redDot: 180,
      scope2x: 172,
      scope4x: 166,
      sniper: 92,
      freeLook: 134,
      fireButton: 46,
      dpi: 520,
      animWindow: 'Nonaktif (Off)',
      animTransition: 'Nonaktif (Off)',
      animDuration: 'Nonaktif (Off)',
      trickTip: 'Perpaduan seimbang recoil senjata AR di sensitivitas 190. Menembak stabil jarak menengah dengan presisi tinggi.'
    }
  },
  {
    id: 'arkans',
    name: 'Arkans',
    signatureWeapon: 'M1014 & Woodpecker',
    deviceUsed: 'Galaxy S23 Ultra',
    avatarColor: 'bg-purple-600',
    role: 'One-Tap Master',
    subscriberCount: '1.1M+',
    config: {
      general: 182,
      redDot: 172,
      scope2x: 164,
      scope4x: 160,
      sniper: 86,
      freeLook: 120,
      fireButton: 48,
      dpi: 500,
      animWindow: '0.5x',
      animTransition: '0.5x',
      animDuration: '0.5x',
      trickTip: 'Posisi tombol tembak ditaruh agak bawah (25% dari layar bawah) dikawinkan dengan general sensitivity 182.'
    }
  },
  {
    id: 'gusrrak',
    name: 'Gusrrak',
    signatureWeapon: 'AWM & Desert Eagle',
    deviceUsed: 'iPhone 15 Pro',
    avatarColor: 'bg-teal-600',
    role: 'Sniper',
    subscriberCount: '1.9M+',
    config: {
      general: 176,
      redDot: 166,
      scope2x: 158,
      scope4x: 152,
      sniper: 66,
      freeLook: 116,
      fireButton: 44,
      dpi: 120,
      animWindow: 'Kurangi Gerakan (On)',
      animTransition: 'Kurangi Gerakan (On)',
      animDuration: 'Kurangi Gerakan (On)',
      trickTip: 'Seting khusus dual sniper fast-switching pada sensitivitas scope 66 agar perpindahan target terasa murni instan.'
    }
  },
  {
    id: 'amay',
    name: 'Amay GT',
    signatureWeapon: 'M1887 & MP40',
    deviceUsed: 'POCO F5',
    avatarColor: 'bg-fuchsia-600',
    role: 'Rusher',
    subscriberCount: '2.5M+',
    config: {
      general: 194,
      redDot: 186,
      scope2x: 178,
      scope4x: 172,
      sniper: 98,
      freeLook: 142,
      fireButton: 49,
      dpi: 540,
      animWindow: 'Nonaktif (Off)',
      animTransition: 'Nonaktif (Off)',
      animDuration: 'Nonaktif (Off)',
      trickTip: 'Sangat responsif untuk pertarungan lompat goyang (jiggle jump-shoot). Sensitivitas 194+ memberikan reflex putaran kilat.'
    }
  },
  {
    id: 'rendy_r',
    name: 'Rendy R',
    signatureWeapon: 'AK47 & G18',
    deviceUsed: 'ASUS ROG Phone 7',
    avatarColor: 'bg-blue-600',
    role: 'All-Rounder',
    subscriberCount: '4.8M+',
    config: {
      general: 174,
      redDot: 166,
      scope2x: 160,
      scope4x: 156,
      sniper: 78,
      freeLook: 118,
      fireButton: 46,
      dpi: 560,
      animWindow: 'Nonaktif (Off)',
      animTransition: 'Nonaktif (Off)',
      animDuration: 'Nonaktif (Off)',
      trickTip: 'Khusus mengendalikan recoil senjata berat semacam AK47 / Groza di sensitivitas 174. Tarik halus tombol tembak.'
    }
  },
  {
    id: 'regi_r',
    name: 'Regi R',
    signatureWeapon: 'M1887 & Mini Uzi',
    deviceUsed: 'iPhone 15 Pro Max',
    avatarColor: 'bg-orange-600',
    role: 'Rusher',
    subscriberCount: '3.6M+',
    config: {
      general: 198,
      redDot: 190,
      scope2x: 184,
      scope4x: 178,
      sniper: 102,
      freeLook: 148,
      fireButton: 39,
      dpi: 120,
      animWindow: 'Kurangi Gerakan (On)',
      animTransition: 'Kurangi Gerakan (On)',
      animDuration: 'Kurangi Gerakan (On)',
      trickTip: 'Sensitivitas ultra licin 198 agar refleks memasang besi Gloo Wall pelindung instan 0.01 detik dari sekeliling.'
    }
  }
];
