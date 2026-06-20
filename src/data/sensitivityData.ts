import { BrandData } from '../types';

export const BRANDS: BrandData[] = [
  {
    id: 'xiaomi',
    name: 'Xiaomi / POCO',
    logo: 'Smartphone',
    description: 'Terkenal dengan layar responsif tinggi dan performa gaming ekstrem (POCO/Redmi/Mi).',
    series: [
      {
        name: 'Redmi Seri C / A',
        label: 'Redmi 9C, 10C, 12C, A1, A2, A3',
        badge: 'Budget',
        config: {
          general: 98,
          redDot: 95,
          scope2x: 92,
          scope4x: 88,
          sniper: 50,
          freeLook: 70,
          fireButton: 55,
          dpi: 410,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Gunakan teknik drag cepat (flick drag). Touch sampling rate standard pada seri ini optimal dengan ukuran tombol tembak 55%.'
        }
      },
      {
        name: 'Redmi Standard / Note',
        label: 'Redmi 10, Note 11, Note 12, Note 13',
        badge: 'Standard',
        config: {
          general: 95,
          redDot: 92,
          scope2x: 88,
          scope4x: 85,
          sniper: 48,
          freeLook: 68,
          fireButton: 50,
          dpi: 430,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Sangat cocok untuk pertempuran jarak menengah. Gunakan DPI 430 untuk mengunci bidikan di atas bahu musuh.'
        }
      },
      {
        name: 'Redmi Note Pro Series',
        label: 'Redmi Note 10 Pro, 11 Pro, 12 Pro, 13 Pro',
        badge: 'Pro',
        config: {
          general: 92,
          redDot: 88,
          scope2x: 84,
          scope4x: 82,
          sniper: 45,
          freeLook: 65,
          fireButton: 48,
          dpi: 480,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Layar AMOLED 120Hz yang sangat stabil. Sempurna untuk "one-tap shot" dengan shotgun M1887 atau Woodpecker.'
        }
      },
      {
        name: 'POCO M / X Series',
        label: 'POCO M5, M6, X3 Pro, X5, X6 Pro',
        badge: 'Standard',
        config: {
          general: 94,
          redDot: 90,
          scope2x: 86,
          scope4x: 84,
          sniper: 47,
          freeLook: 67,
          fireButton: 47,
          dpi: 490,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Khusus POCO X3 Pro, kurangi sensitivitas 2 poin jika aim Anda sering melewati kepala musuh (recoil tinggi).'
        }
      },
      {
        name: 'POCO F Series',
        label: 'POCO F3, F4, F5, F6',
        badge: 'Pro',
        config: {
          general: 90,
          redDot: 86,
          scope2x: 82,
          scope4x: 80,
          sniper: 42,
          freeLook: 62,
          fireButton: 45,
          dpi: 510,
          animWindow: 'Nonaktif (Off)',
          animTransition: 'Nonaktif (Off)',
          animDuration: 'Nonaktif (Off)',
          trickTip: 'Layar sentuh kelas flagship POCO F. Tembakan headshot satu ketukan (One-shot) terasa responsif instan.'
        }
      },
      {
        name: 'POCO GT Series',
        label: 'POCO F3 GT, F4 GT, X4 GT',
        badge: 'Gaming',
        config: {
          general: 88,
          redDot: 85,
          scope2x: 80,
          scope4x: 78,
          sniper: 40,
          freeLook: 60,
          fireButton: 44,
          dpi: 550,
          animWindow: 'Nonaktif (Off)',
          animTransition: 'Nonaktif (Off)',
          animDuration: 'Nonaktif (Off)',
          trickTip: 'Edisi GT khusus gaming. Gunakan DPI 550 untuk presisi pixel-perfect saat melakukan spray senjata SMG (MP40, Thompson).'
        }
      },
      {
        name: 'Xiaomi Mi / Ultra Series',
        label: 'Xiaomi Mi 11, 12, 13T, 14, 14 Ultra',
        badge: 'Premium',
        config: {
          general: 89,
          redDot: 86,
          scope2x: 82,
          scope4x: 79,
          sniper: 43,
          freeLook: 63,
          fireButton: 43,
          dpi: 500,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Layar WQHD+ premium. Kurangi pointer speed bawaan Android 1 bar ke arah kiri untuk stabilitas bidikan scope 4x.'
        }
      }
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung',
    logo: 'Smartphone',
    description: 'Kualitas layar Super AMOLED legendaris yang memerlukan sensitivitas licin namun kontrol presisi.',
    series: [
      {
        name: 'Galaxy Core / Seri M / J',
        label: 'Galaxy A03 Core, M12, M23, J7 Prime',
        badge: 'Budget',
        config: {
          general: 99,
          redDot: 96,
          scope2x: 91,
          scope4x: 89,
          sniper: 52,
          freeLook: 72,
          fireButton: 54,
          dpi: 420,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Gunakan DPI 420 agar scroll terasa mulus. Tarik tombol tembak condong membentuk huruf J jika jarak dekat.'
        }
      },
      {
        name: 'Galaxy Seri A (Entry)',
        label: 'Galaxy A04, A05s, A14, A15',
        badge: 'Standard',
        config: {
          general: 97,
          redDot: 94,
          scope2x: 90,
          scope4x: 87,
          sniper: 50,
          freeLook: 70,
          fireButton: 52,
          dpi: 440,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Setelan stabil untuk pemula. Drag tombol tembak ke atas secara konstan (tidak disentak terlalu keras).'
        }
      },
      {
        name: 'Galaxy Seri A (Mid/High)',
        label: 'Galaxy A25, A34, A35, A54, A55',
        badge: 'Pro',
        config: {
          general: 94,
          redDot: 91,
          scope2x: 87,
          scope4x: 84,
          sniper: 46,
          freeLook: 65,
          fireButton: 49,
          dpi: 470,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Sangat cocok untuk ketukan satu sentuhan. Sensor gyro Galaxy A sangat stabil untuk kontrol scope 2x.'
        }
      },
      {
        name: 'Galaxy Seri S / FE Series',
        label: 'Galaxy S20 FE, S21 FE, S22, S23, S24',
        badge: 'Pro',
        config: {
          general: 90,
          redDot: 86,
          scope2x: 82,
          scope4x: 80,
          sniper: 42,
          freeLook: 62,
          fireButton: 45,
          dpi: 495,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Kombinasi refresh rate 120Hz. Sangat presisi untuk tracking musuh yang berlari mengitari Gloo Wall.'
        }
      },
      {
        name: 'Galaxy Ultra / Z Series',
        label: 'Galaxy S22 Ultra, S23 Ultra, S24 Ultra, Z Fold',
        badge: 'Premium',
        config: {
          general: 92,
          redDot: 88,
          scope2x: 84,
          scope4x: 81,
          sniper: 45,
          freeLook: 65,
          fireButton: 44,
          dpi: 512,
          animWindow: 'Nonaktif (Off)',
          animTransition: 'Nonaktif (Off)',
          animDuration: 'Nonaktif (Off)',
          trickTip: 'Layar super lebar & resolusi tinggi. Gunakan jempol agak ke tengah layar untuk ruang geser (drag area) yang luas.'
        }
      }
    ]
  },
  {
    id: 'realme',
    name: 'Realme',
    logo: 'Smartphone',
    description: 'Sistem Realme UI yang sangat dinamis untuk sentuhan jari yang super halus dan akselerasi cepat.',
    series: [
      {
        name: 'Realme Seri C / Note',
        label: 'Realme C30, C33, C53, C55, Note 50',
        badge: 'Budget',
        config: {
          general: 98,
          redDot: 95,
          scope2x: 91,
          scope4x: 88,
          sniper: 50,
          freeLook: 70,
          fireButton: 54,
          dpi: 415,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Maksimalkan kecepatan sentuh dengan mematikan fitur gestur screenshot 3-jari sewaktu bermain game.'
        }
      },
      {
        name: 'Realme Narzo Series',
        label: 'Narzo 30A, 50i, 50, 60 Pro',
        badge: 'Standard',
        config: {
          general: 96,
          redDot: 92,
          scope2x: 89,
          scope4x: 86,
          sniper: 48,
          freeLook: 67,
          fireButton: 51,
          dpi: 435,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Sangat cocok untuk shotgun. Bidik crosshair putih di samping kanan badan musuh, lalu lesatkan tombol bulat ke kiri leher.'
        }
      },
      {
        name: 'Realme Number Series',
        label: 'Realme 9, 10, 11, 12, 12+ 5G',
        badge: 'Standard',
        config: {
          general: 93,
          redDot: 89,
          scope2x: 85,
          scope4x: 82,
          sniper: 45,
          freeLook: 65,
          fireButton: 48,
          dpi: 460,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Sistem UI seimbang. Gunakan teknik setengah lingkaran (C-Drag) di pertarungan jarak sangat rapat.'
        }
      },
      {
        name: 'Realme Pro / Pro+ Series',
        label: 'Realme 9 Pro+, 11 Pro+, 12 Pro+ Ultra',
        badge: 'Pro',
        config: {
          general: 91,
          redDot: 87,
          scope2x: 83,
          scope4x: 80,
          sniper: 42,
          freeLook: 63,
          fireButton: 46,
          dpi: 490,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Kestabilan bidikan luar biasa. Sentakan tipis beruntun (flickering) dengan MP40 sangat direkomendasikan.'
        }
      },
      {
        name: 'Realme GT / Neo Series',
        label: 'Realme GT Master Edition, GT Neo 3, GT 6',
        badge: 'Gaming',
        config: {
          general: 86,
          redDot: 82,
          scope2x: 78,
          scope4x: 75,
          sniper: 38,
          freeLook: 58,
          fireButton: 42,
          dpi: 600,
          animWindow: 'Nonaktif (Off)',
          animTransition: 'Nonaktif (Off)',
          animDuration: 'Nonaktif (Off)',
          trickTip: 'Layar super sensitif 120Hz/144Hz. Gunakan DPI tinggi 600 agar refleks berputar 360 derajat instan.'
        }
      }
    ]
  },
  {
    id: 'oppo',
    name: 'Oppo',
    logo: 'Smartphone',
    description: 'ColorOS memberikan kestabilan sentuh luar biasa dengan optimasi grafis yang halus.',
    series: [
      {
        name: 'Oppo Seri A (Entry)',
        label: 'Oppo A16, A17, A18, A38, A54',
        badge: 'Budget',
        config: {
          general: 99,
          redDot: 96,
          scope2x: 91,
          scope4x: 89,
          sniper: 52,
          freeLook: 72,
          fireButton: 56,
          dpi: 410,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Disarankan mengoleskan sedikit bedak bayi / menggunakan sarung jempol agar ayunan tidak terhambat layar seret.'
        }
      },
      {
        name: 'Oppo Seri A (Mid-Range)',
        label: 'Oppo A57, A58, A77s, A78, A98',
        badge: 'Standard',
        config: {
          general: 96,
          redDot: 93,
          scope2x: 88,
          scope4x: 86,
          sniper: 48,
          freeLook: 68,
          fireButton: 51,
          dpi: 440,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Sangat mantap untuk M1887. Sentak tombol tembak dengan cepat membentuk kurva parabola lurus ke atas.'
        }
      },
      {
        name: 'Oppo Reno Series',
        label: 'Oppo Reno 6, Reno 7, Reno 8, Reno 10',
        badge: 'Pro',
        config: {
          general: 91,
          redDot: 87,
          scope2x: 84,
          scope4x: 81,
          sniper: 44,
          freeLook: 64,
          fireButton: 47,
          dpi: 490,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Ketepatan bidikan (aim lock) Reno sangat rekat. Jarak menengah gunakan semi-drag perlahan saja.'
        }
      },
      {
        name: 'Oppo Reno Pro Series',
        label: 'Oppo Reno 8 Pro, Reno 10 Pro+, Reno 11 Pro',
        badge: 'Pro',
        config: {
          general: 89,
          redDot: 85,
          scope2x: 81,
          scope4x: 78,
          sniper: 41,
          freeLook: 60,
          fireButton: 45,
          dpi: 520,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Waktu respons sangat kilat. Aktifkan setelan grafis FPS Tinggi demi respons tombol tembak yang instan.'
        }
      },
      {
        name: 'Oppo Find X Series',
        label: 'Oppo Find X3 Pro, Find X5 Pro, Find X7 Ultra',
        badge: 'Premium',
        config: {
          general: 90,
          redDot: 86,
          scope2x: 82,
          scope4x: 80,
          sniper: 43,
          freeLook: 62,
          fireButton: 43,
          dpi: 510,
          animWindow: 'Nonaktif (Off)',
          animTransition: 'Nonaktif (Off)',
          animDuration: 'Nonaktif (Off)',
          trickTip: 'Optimalisasi layar lipat/flagship LTPO. Desain tombol tembak melingkar 43% menghindari salah klik.'
        }
      }
    ]
  },
  {
    id: 'vivo',
    name: 'Vivo',
    logo: 'Smartphone',
    description: 'Funtouch OS dengan akselerasi Ultra Game Mode memoles stabilitas bidikan di setiap rilisnya.',
    series: [
      {
        name: 'Vivo Seri Y (Low)',
        label: 'Vivo Y01, Y02, Y15s, Y16, Y17s',
        badge: 'Budget',
        config: {
          general: 98,
          redDot: 95,
          scope2x: 91,
          scope4x: 89,
          sniper: 52,
          freeLook: 72,
          fireButton: 57,
          dpi: 405,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Tembak sesaat setelah karakter mencapai titik puncak lompatan (jump shot) untuk menekan getaran bidikan.'
        }
      },
      {
        name: 'Vivo Seri Y / T (Mid)',
        label: 'Vivo Y27, Y36, Y100, T1 5G, T3 Pro',
        badge: 'Standard',
        config: {
          general: 94,
          redDot: 90,
          scope2x: 87,
          scope4x: 84,
          sniper: 47,
          freeLook: 66,
          fireButton: 51,
          dpi: 445,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Hidupkan optimasi game "Multi-Turbo" bawaan Vivo demi mengamankan frame-rate saat pertarungan ramai.'
        }
      },
      {
        name: 'Vivo Seri V (Standard)',
        label: 'Vivo V23, V25, V27, V29, V30 5G',
        badge: 'Pro',
        config: {
          general: 91,
          redDot: 87,
          scope2x: 83,
          scope4x: 80,
          sniper: 43,
          freeLook: 63,
          fireButton: 46,
          dpi: 490,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Akurasi sensor gyro-nya mantap. Sangat stabil untuk menembak jarak jauh memakai Woodpecker / SVD.'
        }
      },
      {
        name: 'Vivo Seri V / X Pro',
        label: 'Vivo V27 Pro, V29 Pro, V30 Pro, X80 Pro, X100',
        badge: 'Premium',
        config: {
          general: 89,
          redDot: 85,
          scope2x: 81,
          scope4x: 78,
          sniper: 41,
          freeLook: 61,
          fireButton: 44,
          dpi: 520,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Rasio layar lengkung premium. Tempatkan posisi tombol tembak agak ke area dalam layar untuk mencegah miss-touch.'
        }
      },
      {
        name: 'iQOO Gaming Series',
        label: 'iQOO Z7, Z9, iQOO 11, iQOO 12',
        badge: 'Gaming',
        config: {
          general: 85,
          redDot: 81,
          scope2x: 77,
          scope4x: 74,
          sniper: 37,
          freeLook: 57,
          fireButton: 41,
          dpi: 610,
          animWindow: 'Nonaktif (Off)',
          animTransition: 'Nonaktif (Off)',
          animDuration: 'Nonaktif (Off)',
          trickTip: 'Perangkat sub-brand gaming Vivo. Tarikan peluru berkecepatan monster. DPI 610 membuat refleks pasang Gloo Wall super kilat.'
        }
      }
    ]
  },
  {
    id: 'infinix',
    name: 'Infinix',
    logo: 'Smartphone',
    description: 'HP gaming murah berfitur melimpah dengan setelan lincah yang mudah disesuaikan.',
    series: [
      {
        name: 'Infinix Smart Series',
        label: 'Smart 6, Smart 7, Smart 8, Smart 8 Pro',
        badge: 'Budget',
        config: {
          general: 100,
          redDot: 98,
          scope2x: 94,
          scope4x: 91,
          sniper: 55,
          freeLook: 75,
          fireButton: 59,
          dpi: 400,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Gunakan sensitivitas penuh 100. Posisikan bidikan di bawah kaki musuh lalu sentak mendadak ke atas kepala.'
        }
      },
      {
        name: 'Infinix Hot Series',
        label: 'Hot 11, Hot 12, Hot 20, Hot 30, Hot 40i, Hot 40 Pro',
        badge: 'Standard',
        config: {
          general: 97,
          redDot: 94,
          scope2x: 90,
          scope4x: 87,
          sniper: 50,
          freeLook: 68,
          fireButton: 53,
          dpi: 430,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Sangat cocok untuk Infinix Seri Hot. Tombol ukuran 53% menjaga peluru tetap tertata rapi di kepala musuh.'
        }
      },
      {
        name: 'Infinix Note Series',
        label: 'Note 12, Note 30, Note 40, Note 40 Pro',
        badge: 'Pro',
        config: {
          general: 93,
          redDot: 89,
          scope2x: 85,
          scope4x: 82,
          sniper: 45,
          freeLook: 65,
          fireButton: 47,
          dpi: 480,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Menggunakan panel 120Hz Infinix Note. Buka fitur Akselerator Sentuh di XArena UI bawaan HP Anda.'
        }
      },
      {
        name: 'Infinix GT Gaming Series',
        label: 'Infinix GT 10 Pro, GT 20 Pro Ultra',
        badge: 'Gaming',
        config: {
          general: 89,
          redDot: 85,
          scope2x: 81,
          scope4x: 78,
          sniper: 40,
          freeLook: 60,
          fireButton: 44,
          dpi: 540,
          animWindow: 'Nonaktif (Off)',
          animTransition: 'Nonaktif (Off)',
          animDuration: 'Nonaktif (Off)',
          trickTip: 'Seri GT andalan gamer. Matikan opsi "Pointer Speed" penuh di pengaturan sistem Android HP Anda.'
        }
      },
      {
        name: 'Infinix Zero Series',
        label: 'Infinix Zero 5G, Zero 30, Zero Ultra',
        badge: 'Premium',
        config: {
          general: 91,
          redDot: 87,
          scope2x: 83,
          scope4x: 81,
          sniper: 43,
          freeLook: 62,
          fireButton: 45,
          dpi: 510,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Resolusi layar lebar. Latih teknik flick drag searah jarum jam untuk mematahkan pertahanan musuh di depan mata.'
        }
      }
    ]
  },
  {
    id: 'asus',
    name: 'Asus (ROG / Zenfone)',
    logo: 'Smartphone',
    description: 'Hardware gaming kelas dewa dengan touch response ultra instan dan gyroscope presisi militer.',
    series: [
      {
        name: 'Asus Zenfone Series',
        label: 'Zenfone 8, Zenfone 9, Zenfone 10',
        badge: 'Standard',
        config: {
          general: 92,
          redDot: 88,
          scope2x: 85,
          scope4x: 82,
          sniper: 45,
          freeLook: 62,
          fireButton: 48,
          dpi: 460,
          animWindow: '0.5x',
          animTransition: '0.5x',
          animDuration: '0.5x',
          trickTip: 'Layar ringkas respons tinggi. Drag menembak seimbang, menembak smg jarak jauh sangat mulus.'
        }
      },
      {
        name: 'Asus ROG Standard',
        label: 'ROG Phone 2, 3, ROG 5, ROG 5s',
        badge: 'Gaming',
        config: {
          general: 88,
          redDot: 84,
          scope2x: 80,
          scope4x: 78,
          sniper: 38,
          freeLook: 55,
          fireButton: 44,
          dpi: 580,
          animWindow: 'Nonaktif (Off)',
          animTransition: 'Nonaktif (Off)',
          animDuration: 'Nonaktif (Off)',
          trickTip: 'Setel refresh rate ke 144Hz solid. Tarikan ringan saja sudah mengunci bidikan di titik kritis musuh.'
        }
      },
      {
        name: 'Asus ROG Pro / Ultimate',
        label: 'ROG Phone 6 Pro, 7 Ultimate, 8 Pro',
        badge: 'Premium',
        config: {
          general: 84,
          redDot: 80,
          scope2x: 75,
          scope4x: 72,
          sniper: 35,
          freeLook: 52,
          fireButton: 40,
          dpi: 680,
          animWindow: 'Nonaktif (Off)',
          animTransition: 'Nonaktif (Off)',
          animDuration: 'Nonaktif (Off)',
          trickTip: 'Aktifkan performa X-Mode di ROG Armoury Crate. Gunakan DPI 680 untuk pergerakan recoil SMG lurus tiada getar.'
        }
      }
    ]
  },
  {
    id: 'iphone',
    name: 'iPhone (Apple)',
    logo: 'Smartphone',
    description: 'Sistem iOS legendaris yang super responsif, anti-frame drop, dan memiliki sensitivitas sentuhan bawaan sangat licin.',
    series: [
      {
        name: 'iPhone SE / Mini',
        label: 'iPhone SE, SE 2022, 12 Mini, 13 Mini',
        badge: 'Budget',
        config: {
          general: 92,
          redDot: 89,
          scope2x: 85,
          scope4x: 82,
          sniper: 45,
          freeLook: 65,
          fireButton: 50,
          dpi: 120,
          animWindow: 'Kurangi Gerakan (On)',
          animTransition: 'Kurangi Gerakan (On)',
          animDuration: 'Kurangi Gerakan (On)',
          trickTip: 'iOS tidak memakai sistem DPI bawaan Android. Disarankan mengaktifkan fitur "Kurangi Gerakan" pada menu Aksesibilitas.'
        }
      },
      {
        name: 'iPhone Standard Series',
        label: 'iPhone 11, iPhone 12, iPhone 13, iPhone 14, iPhone 15',
        badge: 'Standard',
        config: {
          general: 94,
          redDot: 90,
          scope2x: 86,
          scope4x: 84,
          sniper: 47,
          freeLook: 67,
          fireButton: 48,
          dpi: 120,
          animWindow: 'Kurangi Gerakan (On)',
          animTransition: 'Kurangi Gerakan (On)',
          animDuration: 'Kurangi Gerakan (On)',
          trickTip: 'Sangat mantap untuk M1887. Kecepatan sentuh optimal, arahkan rotasi jari melingkar tipis untuk Auto-Headshot.'
        }
      },
      {
        name: 'iPhone Plus Series',
        label: 'iPhone 14 Plus, iPhone 15 Plus',
        badge: 'Standard',
        config: {
          general: 91,
          redDot: 87,
          scope2x: 83,
          scope4x: 80,
          sniper: 44,
          freeLook: 63,
          fireButton: 46,
          dpi: 120,
          animWindow: 'Kurangi Gerakan (On)',
          animTransition: 'Kurangi Gerakan (On)',
          animDuration: 'Kurangi Gerakan (On)',
          trickTip: 'Layar lebar standard 60Hz. Aktifkan fitur "Sentuhan Assistive" dan atur "Kecepatan Pelacakan" (Tracking Speed) ke 85%.'
        }
      },
      {
        name: 'iPhone Pro Series',
        label: 'iPhone 11 Pro, 12 Pro, 13 Pro, 14 Pro, 15 Pro',
        badge: 'Pro',
        config: {
          general: 88,
          redDot: 84,
          scope2x: 80,
          scope4x: 78,
          sniper: 38,
          freeLook: 58,
          fireButton: 43,
          dpi: 120,
          animWindow: 'Kurangi Gerakan (On)',
          animTransition: 'Kurangi Gerakan (On)',
          animDuration: 'Kurangi Gerakan (On)',
          trickTip: 'Refresh rate 120Hz ProMotion yang super stabil. Setel Haptic Touch pada Aksesibilitas ponsel menjadi "Durasi Pendek/Cepat".'
        }
      },
      {
        name: 'iPhone Pro Max Series',
        label: 'iPhone 11 Pro Max, 12 Pro Max, 13 Pro Max, 14 Pro Max, 15 Pro Max',
        badge: 'Premium',
        config: {
          general: 90,
          redDot: 86,
          scope2x: 82,
          scope4x: 80,
          sniper: 40,
          freeLook: 60,
          fireButton: 41,
          dpi: 120,
          animWindow: 'Kurangi Gerakan (On)',
          animTransition: 'Kurangi Gerakan (On)',
          animDuration: 'Kurangi Gerakan (On)',
          trickTip: 'Sempurna untuk Pro Max Esports. Mengatur "Zoom Tampilan" (Display Zoom) ke "Kondensasi / Lebih Banyak Teks" melipatgandakan respons drag.'
        }
      }
    ]
  }
];

export const PLAYSTYLES = [
  { id: 'all-around', name: 'Seimbang (Default)', modifier: 1.0 },
  { id: 'rusher', name: 'Rusher (Shotgun / SMG Jarak Dekat)', modifier: 1.05 }, // Slightly faster general
  { id: 'sniper', name: 'Sniper (Bidikan Lambat & Presisi)', modifier: 0.9 },   // Slightly slower sniper & general
  { id: 'one-shot', name: 'One-Tap / J-Drag (Slow Swipe)', modifier: 1.02 } // Tailored for headshot drag
];
