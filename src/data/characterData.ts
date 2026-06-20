export interface FFCharacter {
  id: string;
  name: string;
  skillName: string;
  type: 'Aktif' | 'Pasif';
  description: string;
  color: string; // Tailwind color theme for card highlight
}

export const FF_CHARACTERS: FFCharacter[] = [
  // AKTIF
  {
    id: 'alok',
    name: 'Alok',
    skillName: 'Drop the Beat',
    type: 'Aktif',
    description: 'Membuat aura 5m meningkatkan kecepatan lari 15% dan memulihkan 5 HP/detik selama 10 detik.',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'chrono',
    name: 'Chrono',
    skillName: 'Time Turner',
    type: 'Aktif',
    description: 'Membuat medan pelindung bulat yang menembak balik 800 damage, kecepatan lari bertambah 10%.',
    color: 'from-indigo-600 to-blue-500'
  },
  {
    id: 'wukong',
    name: 'Wukong',
    skillName: 'Camouflage',
    type: 'Aktif',
    description: 'Berubah menjadi semak rumput selama 15 detik, mengurangi kecepatan gerak sebesar 10% dan me-reset cooldown jika membunuh musuh.',
    color: 'from-emerald-500 to-green-400'
  },
  {
    id: 'tatsuya',
    name: 'Tatsuya',
    skillName: 'Rebel Rush',
    type: 'Aktif',
    description: 'Melaju cepat ke depan seketika selama 0.3 detik. Slot tumpukan isi ulang hingga 2/3 kali.',
    color: 'from-rose-500 to-orange-400'
  },
  {
    id: 'orion',
    name: 'Orion',
    skillName: 'Crimson Crush',
    type: 'Aktif',
    description: 'Mengonsumsi EP untuk memasuki mode kebal peluru dan menyerap HP musuh terdekat secara bertahap.',
    color: 'from-red-600 to-rose-500'
  },
  {
    id: 'homer',
    name: 'Homer',
    skillName: 'Senses Shock',
    type: 'Aktif',
    description: 'Melepaskan drone ke arah musuh terdekat, menciptakan ledakan pulsa mengurangi gerak & menembak musuh.',
    color: 'from-zinc-500 to-neutral-400'
  },
  {
    id: 'iris',
    name: 'Iris',
    skillName: 'Wall Brawl',
    type: 'Aktif',
    description: 'Bisa menembaki musuh yang bersembunyi di balik Gloo Wall sekaligus menandai lokasinya.',
    color: 'from-teal-500 to-cyan-400'
  },
  {
    id: 'dimitri',
    name: 'Dimitri',
    skillName: 'Healing Heartbeat',
    type: 'Aktif',
    description: 'Membuat zona penyembuhan 3.5m di tanah, memulihkan HP dan mengizinkan bangkit mandiri jika down.',
    color: 'from-violet-500 to-purple-400'
  },
  {
    id: 'skyler',
    name: 'Skyler',
    skillName: 'Riptide Rhythm',
    type: 'Aktif',
    description: 'Melepaskan gelombang sonar ke depan yang menghancurkan hingga 5 Gloo Wall sekaligus.',
    color: 'from-sky-400 to-indigo-500'
  },
  {
    id: 'steffie',
    name: 'Steffie',
    skillName: 'Painted Refuge',
    type: 'Aktif',
    description: 'Membuat lingkaran seni lukis pelindung yang menetralkan serangan granat & memulihkan ketahanan armor.',
    color: 'from-pink-500 to-rose-400'
  },
  {
    id: 'santino',
    name: 'Santino',
    skillName: 'Shape Splitter',
    type: 'Aktif',
    description: 'Memunculkan manekin bayangan sejauh 12m yang bisa diteleportasi secara cepat.',
    color: 'from-amber-500 to-yellow-400'
  },
  {
    id: 'clu',
    name: 'Clu',
    skillName: 'Tracing Steps',
    type: 'Aktif',
    description: 'Menemukan posisi musuh dalam jarak 75m yang sedang berdiri atau bergerak cepat.',
    color: 'from-yellow-600 to-amber-500'
  },
  {
    id: 'a124',
    name: 'A124',
    skillName: 'Thrill of Battle',
    type: 'Aktif',
    description: 'Meluncurkan gelombang elektromagnetik berdurasi 30 detik untuk melumpuhkan skill aktif musuh.',
    color: 'from-purple-600 to-indigo-500'
  },

  // PASIF
  {
    id: 'kelly',
    name: 'Kelly',
    skillName: 'Dash / Deadly Velocity',
    type: 'Pasif',
    description: 'Meningkatkan kecepatan berlari sebanyak 6% secara permanen.',
    color: 'from-orange-500 to-amber-400'
  },
  {
    id: 'hayato',
    name: 'Hayato',
    skillName: 'Bushido / Art of Blades',
    type: 'Pasif',
    description: 'Semakin rendah HP, penetrasi armor senjata Anda meningkat 10% dan mengurangi damage dari depan.',
    color: 'from-blue-700 to-indigo-600'
  },
  {
    id: 'andrew',
    name: 'Andrew',
    skillName: 'Armor Specialist',
    type: 'Pasif',
    description: 'Mengurangi penurunan ketahanan vest pelindung tubuh dan helm hingga 11%.',
    color: 'from-slate-600 to-zinc-500'
  },
  {
    id: 'sonia',
    name: 'Sonia',
    skillName: 'Nano Shield',
    type: 'Pasif',
    description: 'Memasuki kondisi terlindung perisai 150 HP selama 3 detik sebelum mati, membunuh musuh akan mengembalikannya.',
    color: 'from-cyan-500 to-blue-400'
  },
  {
    id: 'jota',
    name: 'Jota',
    skillName: 'Sustained Raids',
    type: 'Pasif',
    description: 'Melukai musuh mengembalikan HP pengguna, menumbangkan musuh memulihkan 20% HP tambahan.',
    color: 'from-red-500 to-rose-400'
  },
  {
    id: 'maxim',
    name: 'Maxim',
    skillName: 'Gluttony',
    type: 'Pasif',
    description: 'Menghemat waktu memakan jamur dan menggunakan Med Kit sebanyak 25%.',
    color: 'from-gray-400 to-slate-300'
  },
  {
    id: 'moco',
    name: 'Moco',
    skillName: 'Hacker\'s Eye',
    type: 'Pasif',
    description: 'Menandai koordinat musuh yang Anda tembak selama 5/6.5 detik untuk seluruh rekan tim.',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'shirou',
    name: 'Shirou',
    skillName: 'Damage Delivered',
    type: 'Pasif',
    description: 'Saat diserang musuh dari jarak 80m, posisi penembak akan tertandai dan tembakan balasan menembus armor.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'wolfrahh',
    name: 'Wolfrahh',
    skillName: 'Limelight',
    type: 'Pasif',
    description: 'Setiap kill meningkatkan damage headshot ke musuh dan mengurangi damage headshot yang diterima.',
    color: 'from-purple-500 to-indigo-400'
  },
  {
    id: 'luqueta',
    name: 'Luqueta',
    skillName: 'Hat-Trick',
    type: 'Pasif',
    description: 'Setiap kill meningkatkan max HP sebanyak 25, batas maksimal peningkatan 50 HP.',
    color: 'from-indigo-500 to-violet-400'
  },
  {
    id: 'dbee',
    name: 'D-Bee',
    skillName: 'Bullet Beats',
    type: 'Pasif',
    description: 'Saat bergerak sambil menembak, kecepatan gerak naik 15% dan akurasi tembakan meroket 45%.',
    color: 'from-yellow-500 to-amber-400'
  },
  {
    id: 'laura',
    name: 'Laura',
    skillName: 'Sharp Shooter',
    type: 'Pasif',
    description: 'Meningkatkan akurasi tembakan Anda secara drastis sebesar 50% saat menggunakan scope keker.',
    color: 'from-emerald-600 to-teal-400'
  },
  {
    id: 'maro',
    name: 'Maro',
    skillName: 'Falcon Fervor',
    type: 'Pasif',
    description: 'Meningkatkan damage seiring jarak kejauhan target musuh hingga 25%, pada target tertandai naik 3.5%.',
    color: 'from-amber-700 to-orange-600'
  },
  {
    id: 'thiva',
    name: 'Thiva',
    skillName: 'Vital Vibes',
    type: 'Pasif',
    description: 'Membantu menyelamatkan rekan satu tim yang down 70% lebih cepat.',
    color: 'from-teal-400 to-green-300'
  },
  {
    id: 'rafael',
    name: 'Rafael',
    skillName: 'Dead Silent',
    type: 'Pasif',
    description: 'Efek peredam suara suara otomatis pada senapan Sniper & Marksman, membuat musuh down kehilangan HP 90% lebih cepat.',
    color: 'from-sky-700 to-blue-600'
  },
  {
    id: 'alvaro',
    name: 'Alvaro',
    skillName: 'Art of Demolition',
    type: 'Pasif',
    description: 'Kerusakan senjata peledak (granat/launcher) melambung 20% dan jangkauan meledak naik 10%.',
    color: 'from-orange-600 to-red-500'
  },
  {
    id: 'nairi',
    name: 'Nairi',
    skillName: 'Ice Iron',
    type: 'Pasif',
    description: 'Gloo Wall yang dipasang memulihkan daya tahan sendiri tiap kejatuhan peluru dan meningkatkan damage pada Gloo Wall lawan.',
    color: 'from-blue-400 to-sky-300'
  },
  {
    id: 'luna',
    name: 'Luna',
    skillName: 'Fight or Flight',
    type: 'Pasif',
    description: 'Meningkatkan kecepatan menembak 8%. Kecepatan gerak bertambah saat menembak.',
    color: 'from-violet-400 to-fuchsia-300'
  },
  {
    id: 'shani',
    name: 'Shani',
    skillName: 'Gear Recycle',
    type: 'Pasif',
    description: 'Memulihkan durabilitas armor rompi/vest setelah mendapatkan kill atau assist.',
    color: 'from-violet-500 to-blue-400'
  },
  {
    id: 'nikita',
    name: 'Nikita',
    skillName: 'Firearms Master',
    type: 'Pasif',
    description: 'Meningkatkan kecepatan reload senjata 20%. Beberapa peluru terakhir senapan SMG mendapat tambahan damage.',
    color: 'from-purple-400 to-rose-400'
  },
  {
    id: 'caroline',
    name: 'Caroline',
    skillName: 'Agility',
    type: 'Pasif',
    description: 'Saat memegang senjata Shotgun, kecepatan berjalan meningkat sebanyak 13%.',
    color: 'from-pink-400 to-fuchsia-300'
  },
  {
    id: 'ford',
    name: 'Ford',
    skillName: 'Iron Will',
    type: 'Pasif',
    description: 'Mengurangi damage yang diterima di luar zona aman sebanyak 24%.',
    color: 'from-emerald-700 to-teal-600'
  },
  {
    id: 'olivia',
    name: 'Olivia',
    skillName: 'Healing Touch',
    type: 'Pasif',
    description: 'Rekan satu tim yang Anda hidupkan kembali akan menerima tambahan HP sebesar 80.',
    color: 'from-teal-300 to-cyan-300'
  },
  {
    id: 'paloma',
    name: 'Paloma',
    skillName: 'Arms Dealing',
    type: 'Pasif',
    description: 'Mampu membawa ratusan amunisi peluru tanpa memakan slot kapasitas ransel tas AR.',
    color: 'from-slate-500 to-slate-400'
  },
  {
    id: 'kapella',
    name: 'Kapella',
    skillName: 'Healing Song',
    type: 'Pasif',
    description: 'Meningkatkan efek item penyembuh 20% dan skill penyembuh 10%. Mengurangi kehilangan HP rekan jika knock.',
    color: 'from-pink-300 to-rose-300'
  },
  {
    id: 'dasha',
    name: 'Dasha',
    skillName: 'Partying On',
    type: 'Pasif',
    description: 'Mengurangi recoil saat menembak terus menerus dan memperkecil kerusakan akibat terjatuh dari ketinggian.',
    color: 'from-cyan-400 to-blue-400'
  },
  {
    id: 'miguel',
    name: 'Miguel',
    skillName: 'Crazy Slayer',
    type: 'Pasif',
    description: 'Mendapatkan 80 EP secara instan untuk setiap musuh yang dijatuhkan.',
    color: 'from-zinc-600 to-neutral-500'
  },
  {
    id: 'joseph',
    name: 'Joseph',
    skillName: 'Nutty Movement',
    type: 'Pasif',
    description: 'Meningkatkan kecepatan bergerak dan berlari sebesar 15% seketika saat menerima damage musuh.',
    color: 'from-amber-500 to-orange-400'
  },
  {
    id: 'antonio',
    name: 'Antonio',
    skillName: 'Gangster\'s Spirit',
    type: 'Pasif',
    description: 'Mendapatkan shield HP tambahan di awal setiap ronde pertarungan berkala.',
    color: 'from-red-700 to-orange-700'
  },
  {
    id: 'kla',
    name: 'Kla',
    skillName: 'Muay Thai',
    type: 'Pasif',
    description: 'Meningkatkan damage tinju kosong sebesar 400% untuk merubuhkan lawan tanpa senjata.',
    color: 'from-red-800 to-amber-700'
  },
  {
    id: 'notora',
    name: 'Notora',
    skillName: 'Thriller\'s Blessing',
    type: 'Pasif',
    description: 'Saat mengendarai kendaraan, memulihkan HP seluruh rekan di dalam mobil berkala.',
    color: 'from-yellow-400 to-amber-600'
  },
  {
    id: 'leon',
    name: 'Leon',
    skillName: 'Buzzer Beater',
    type: 'Pasif',
    description: 'Memulihkan HP secara mandiri setelah berhasil selamat atau menyelesaikan pertempuran.',
    color: 'from-orange-400 to-amber-500'
  },
  {
    id: 'otho',
    name: 'Otho',
    skillName: 'Memory Mist',
    type: 'Pasif',
    description: 'Membentuk kabut memori di sekeliling musuh knock untuk menyatakan posisi kawan-kawannya.',
    color: 'from-violet-300 to-indigo-300'
  },
  {
    id: 'suzy',
    name: 'Suzy',
    skillName: 'Money Mark',
    type: 'Pasif',
    description: 'Rekan satu tim atau Anda akan mendapatkan koin bounty setelah menembak musuh tertandai.',
    color: 'from-emerald-300 to-emerald-400'
  },
  {
    id: 'ryoden',
    name: 'Ryoden',
    skillName: 'Spider Trap',
    type: 'Pasif',
    description: 'Memasang ranjau musuh berupa laba-laba mikro yang merepotkan laju lari lawan.',
    color: 'from-teal-600 to-emerald-700'
  },
  {
    id: 'ignis',
    name: 'Ignis',
    skillName: 'Flame Wall',
    type: 'Pasif',
    description: 'Menciptakan tirai api yang bertahan di satu titik untuk memblokir pandangan musuh.',
    color: 'from-red-500 to-yellow-500'
  },
  {
    id: 'kairos',
    name: 'Kairos',
    skillName: 'Breaker Soul',
    type: 'Pasif',
    description: 'Memasuki kondisi tempur setelah EP Anda penuh, melipatgandakan poin penembus pertahanan rompi.',
    color: 'from-rose-500 to-fuchsia-500'
  },
  {
    id: 'lila',
    name: 'Lila',
    skillName: 'Gloo Strike',
    type: 'Pasif',
    description: 'Meningkatkan hantaman serangan senjata terhadap pertahanan Gloo Wall lawan secara masif.',
    color: 'from-indigo-400 to-blue-400'
  }
];
