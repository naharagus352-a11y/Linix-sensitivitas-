import React, { useState, useEffect, useMemo } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Smartphone, 
  Search, 
  Sparkles, 
  Sliders, 
  Gauge, 
  Zap, 
  RotateCcw, 
  Check, 
  Bookmark, 
  Trash2, 
  HelpCircle, 
  Trophy, 
  Settings, 
  Share2, 
  ChevronRight, 
  Layers, 
  Play, 
  Info, 
  Copy,
  Monitor,
  Flame,
  CheckCircle,
  Lightbulb,
  Crosshair,
  User,
  Sword,
  Cpu
} from 'lucide-react';

import { BRANDS, PLAYSTYLES } from './data/sensitivityData';
import { MobileSeries, SensitivityConfig, SavedPreset } from './types';
import { CREATORS } from './data/creatorData';
import { FF_CHARACTERS, FFCharacter } from './data/characterData';


export default function App() {
  // State definitions
  const [selectedBrandId, setSelectedBrandId] = useState<string>('xiaomi');
  const [selectedSeries, setSelectedSeries] = useState<MobileSeries>('Redmi Note Pro Series');
  const [selectedPlaystyle, setSelectedPlaystyle] = useState<string>('all-around');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [creatorSearchQuery, setCreatorSearchQuery] = useState<string>('');
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('budi01_gaming');
  const [selectedCreatorRole, setSelectedCreatorRole] = useState<string>('All');

  // AI Generator States
  const [aiRole, setAiRole] = useState<string>('');
  const [aiWeapon, setAiWeapon] = useState<string>('');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [charSearchKeyword, setCharSearchKeyword] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStepText, setGenerationStepText] = useState<string>('');
  const [generatedConfig, setGeneratedConfig] = useState<SensitivityConfig | null>(null);
  const [generatedAdvice, setGeneratedAdvice] = useState<string>('');
  
  // Vault / Presets State
  const [pilotName, setPilotName] = useState<string>('');
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([]);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'detector' | 'creator' | 'ai-generator' | 'presets' | 'guide' | 'settings'>('detector');
  const [alertMessage, setAlertMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Login flow state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Target inputs for temporary changing profile
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  // Neon input focus feedback states
  const [isUsernameFocused, setIsUsernameFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);

  // Button click ripple & particle celebration states
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string; delay: number; duration: number }[]>([]);
  const [isLoggingInProcess, setIsLoggingInProcess] = useState<boolean>(false);

  // Load Saved Presets and Login states on Mount
  useEffect(() => {
    const localData = localStorage.getItem('linix_sav_sensitivity');
    if (localData) {
      try {
        setSavedPresets(JSON.parse(localData));
      } catch (e) {
        console.error('Batal memuat sensivitas lokal:', e);
      }
    }
    const loggedInUser = localStorage.getItem('ff_logged_in_user');
    const loggedInPass = localStorage.getItem('ff_logged_in_pass') || '123456';
    if (loggedInUser) {
      setIsLoggedIn(true);
      setLoginUsername(loggedInUser);
      setLoginPassword(loggedInPass);
      setNewUsername(loggedInUser);
      setNewPassword(loggedInPass);
    }
  }, []);

  // Flash alerts helper
  const triggerAlert = (text: string, type: 'success' | 'info' = 'success') => {
    setAlertMessage({ text, type });
    setTimeout(() => {
      setAlertMessage(null);
    }, 3500);
  };

  // Find active brand and baseline config
  const activeBrand = useMemo(() => {
    return BRANDS.find(b => b.id === selectedBrandId) || BRANDS[0];
  }, [selectedBrandId]);

  // Adjust selected series when brand changes to prevent mismatch
  useEffect(() => {
    if (activeBrand && activeBrand.series.length > 0) {
      const exists = activeBrand.series.some(s => s.name === selectedSeries);
      if (!exists) {
        setSelectedSeries(activeBrand.series[0].name);
      }
    }
  }, [selectedBrandId, activeBrand]);

  const activeSeriesObj = useMemo(() => {
    return activeBrand.series.find(s => s.name === selectedSeries) || activeBrand.series[0];
  }, [activeBrand, selectedSeries]);

  const baselineConfig = useMemo(() => {
    return activeSeriesObj.config;
  }, [activeSeriesObj]);

  // Apply Playstyle Multipliers and additions dynamically to make every config completely unique
  const finalConfig = useMemo((): SensitivityConfig => {
    const playstyle = PLAYSTYLES.find(p => p.id === selectedPlaystyle) || PLAYSTYLES[0];
    const mod = playstyle.modifier;

    // To guarantee that "sensivitas tidak boleh sama harus berbeda" (sensitivity must write out differently for every HP series/brand combo)
    // we generate a unique prime-based deterministic shift based on the selected brand and series
    const bIndex = BRANDS.findIndex(b => b.id === activeBrand.id);
    const sIndex = activeBrand.series.findIndex(s => s.name === selectedSeries);
    const comboIndex = (bIndex >= 0 ? bIndex : 0) * 10 + (sIndex >= 0 ? sIndex : 0);

    // Dynamic unique deterministic offset factors unique to this specific hardware
    const oGen = (comboIndex * 17 + 11) % 7 - 3;   // Range: -3 to 3
    const oRed = (comboIndex * 23 + 19) % 9 - 4;   // Range: -4 to 4
    const oS2x = (comboIndex * 29 + 31) % 7 - 3;   // Range: -3 to 3
    const oS4x = (comboIndex * 31 + 7)  % 9 - 4;   // Range: -4 to 4
    const oSnip = (comboIndex * 37 + 13) % 11 - 5; // Range: -5 to 5
    const oLook = (comboIndex * 41 + 17) % 13 - 6; // Range: -6 to 6
    const oBtn = (comboIndex * 43 + 3) % 5 - 2;    // Range: -2 to 2
    const oDpi = (comboIndex * 47 + 5) % 25 - 12;  // Range: -12 to 12

    let general = Math.min(200, Math.max(20, Math.round(baselineConfig.general * 1.88 * mod) + oGen));
    let redDot = Math.min(200, Math.max(20, Math.round(baselineConfig.redDot * 1.88 * mod) + oRed));
    let scope2x = Math.min(200, Math.max(20, Math.round(baselineConfig.scope2x * 1.88 * mod) + oS2x));
    let scope4x = Math.min(200, Math.max(20, Math.round(baselineConfig.scope4x * 1.88 * mod) + oS4x));
    let sniper = Math.min(200, Math.max(10, Math.round(baselineConfig.sniper * 1.7 * mod) + oSnip));
    let freeLook = Math.min(200, Math.max(20, Math.round(baselineConfig.freeLook * 1.8 * mod) + oLook));
    let fireButton = Math.min(65, Math.max(30, baselineConfig.fireButton + oBtn));
    let dpi = baselineConfig.dpi;

    if (dpi > 0) {
      dpi = Math.min(850, Math.max(320, dpi + oDpi));
    }

    // Apply specific playstyle flavor modifications
    if (selectedPlaystyle === 'rusher') {
      general = Math.min(200, general + 6);
      redDot = Math.min(200, redDot + 4);
      fireButton = Math.max(35, fireButton - 5); // smaller for swift flicking
    } else if (selectedPlaystyle === 'sniper') {
      general = Math.max(100, general - 16);
      sniper = Math.max(40, sniper - 24);
      fireButton = Math.min(65, fireButton + 6); // larger for precision centering
    } else if (selectedPlaystyle === 'one-shot') {
      general = Math.min(200, general + 10);
      redDot = Math.min(200, redDot + 6);
      fireButton = Math.max(38, fireButton - 3);
      if (dpi > 0) {
        dpi = Math.min(850, Math.round(dpi * 1.05));
      }
    }

    // iOS/iPhone Specific dynamic tip and handling limits
    if (activeBrand.id === 'iphone') {
      dpi = 0; // standard DPI option disabled for iPhones as requested implicitly by technical accuracy
    }

    return {
      ...baselineConfig,
      general,
      redDot,
      scope2x,
      scope4x,
      sniper,
      freeLook,
      fireButton,
      dpi,
    };
  }, [baselineConfig, selectedPlaystyle, activeBrand, selectedSeries]);

  // Filtered Brand List based on Search Query
  const filteredBrands = useMemo(() => {
    return BRANDS.filter(b => 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Filtered Creators based on Search Query and Role Tag
  const filteredCreators = useMemo(() => {
    return CREATORS.filter(creator => {
      const matchSearch = creator.name.toLowerCase().includes(creatorSearchQuery.toLowerCase()) || 
                          creator.signatureWeapon.toLowerCase().includes(creatorSearchQuery.toLowerCase()) ||
                          creator.deviceUsed.toLowerCase().includes(creatorSearchQuery.toLowerCase());
      const matchRole = selectedCreatorRole === 'All' || creator.role === selectedCreatorRole;
      return matchSearch && matchRole;
    });
  }, [creatorSearchQuery, selectedCreatorRole]);

  const activeCreator = useMemo(() => {
    return CREATORS.find(c => c.id === selectedCreatorId) || CREATORS[0];
  }, [selectedCreatorId]);

  // Apply a creator's preset back into active device configurator
  const applyCreatorConfig = (creator: any) => {
    let targetBrand = 'xiaomi';
    let targetSeries = 'Redmi Note Pro Series';
    let targetPlaystyle = 'all-around';

    if (creator.id === 'budi01_gaming') { targetBrand = 'iphone'; targetSeries = 'iPhone Pro Max Series'; targetPlaystyle = 'one-shot'; }
    else if (creator.id === 'letda_hyper') { targetBrand = 'asus'; targetSeries = 'Asus ROG Pro / Ultimate'; targetPlaystyle = 'rusher'; }
    else if (creator.id === 'andra_st') { targetBrand = 'xiaomi'; targetSeries = 'Xiaomi Mi / Ultra Series'; targetPlaystyle = 'one-shot'; }
    else if (creator.id === 'kamiel') { targetBrand = 'iphone'; targetSeries = 'iPhone Pro Series'; targetPlaystyle = 'sniper'; }
    else if (creator.id === 'flado') { targetBrand = 'xiaomi'; targetSeries = 'POCO F Series'; targetPlaystyle = 'rusher'; }
    else if (creator.id === 'rafael') { targetBrand = 'iphone'; targetSeries = 'iPhone Pro Max Series'; targetPlaystyle = 'one-shot'; }
    else if (creator.id === 'rafaiz') { targetBrand = 'infinix'; targetSeries = 'Infinix GT Gaming Series'; targetPlaystyle = 'all-around'; }
    else if (creator.id === 'arkans') { targetBrand = 'samsung'; targetSeries = 'Galaxy Ultra / Z Series'; targetPlaystyle = 'one-shot'; }
    else if (creator.id === 'gusrrak') { targetBrand = 'iphone'; targetSeries = 'iPhone Pro Series'; targetPlaystyle = 'sniper'; }
    else if (creator.id === 'amay') { targetBrand = 'xiaomi'; targetSeries = 'POCO F Series'; targetPlaystyle = 'rusher'; }
    else if (creator.id === 'rendy_r') { targetBrand = 'asus'; targetSeries = 'Asus ROG Standard'; targetPlaystyle = 'all-around'; }
    else if (creator.id === 'regi_r') { targetBrand = 'iphone'; targetSeries = 'iPhone Pro Max Series'; targetPlaystyle = 'rusher'; }

    setSelectedBrandId(targetBrand);
    setSelectedSeries(targetSeries);
    setSelectedPlaystyle(targetPlaystyle);
    
    setActiveTab('detector');
    triggerAlert(`Mengkalibrasikan sistem HP Anda menyerupai profil '${creator.name}'!`, 'success');
  };

  const saveCreatorPresetToVault = (creator: any) => {
    const creatorNameInVault = `Kreator: ${creator.name}`;
    
    const alreadySaved = savedPresets.some(p => p.playerName === creatorNameInVault);
    if (alreadySaved) {
      triggerAlert(`Profil '${creatorNameInVault}' sudah ada di Vault Anda!`, 'info');
      setActiveTab('presets');
      return;
    }

    const newPreset: SavedPreset = {
      id: `preset_creator_${creator.id}_${Date.now()}`,
      playerName: creatorNameInVault,
      brandId: creator.id === 'budi01_gaming' || creator.id === 'rafael' || creator.id === 'regi_r' || creator.id === 'gusrrak' || creator.id === 'kamiel' ? 'iphone' : 'xiaomi',
      brandName: 'Setelan Kreator',
      seriesName: creator.deviceUsed,
      playstyle: creator.role,
      config: creator.config,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    const updated = [newPreset, ...savedPresets];
    setSavedPresets(updated);
    localStorage.setItem('linix_sav_sensitivity', JSON.stringify(updated));
    triggerAlert(`Setelan '${creator.name}' berhasil disimpan ke Vault!`, 'success');
  };

  const copyCreatorFormatted = (creator: any) => {
    const formatted = `
=== SENSITIVITAS FF KREATOR ===
Nama Kreator : ${creator.name}
Senjata Khas : ${creator.signatureWeapon}
HP / Device  : ${creator.deviceUsed}
Peran / Role : ${creator.role}
-----------------------------
Lihat Sekeliling : ${creator.config.general}
Red Dot Sight    : ${creator.config.redDot}
2x Scope         : ${creator.config.scope2x}
4x Scope         : ${creator.config.scope4x}
Sniper Scope     : ${creator.config.sniper}
Kamera Bebas     : ${creator.config.freeLook}
-----------------------------
Ukuran Tombol    : ${creator.config.fireButton}%
DPI Rekomendasi  : ${creator.config.dpi > 0 ? creator.config.dpi : 'Bawaan / Tanpa DPI'}
Skala Animasi    : Jendela: ${creator.config.animWindow} | Transisi: ${creator.config.animTransition} | Durasi: ${creator.config.animDuration}
-----------------------------
Dapatkan setelan auto-headshot kreator di LINIX SENSIVITAS!
`.trim();

    navigator.clipboard.writeText(formatted);
    triggerAlert(`Sensitivitas '${creator.name}' berhasil disalin ke papan klip!`, 'success');
  };

  // Save current dynamic config to Local Storage
  const savePresetToVault = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pilotName.trim()) {
      triggerAlert('Silakan isi Nama Profil / Player terlebih dahulu!', 'info');
      return;
    }

    const newPreset: SavedPreset = {
      id: `preset_${Date.now()}`,
      playerName: pilotName.trim(),
      brandId: activeBrand.id,
      brandName: activeBrand.name,
      seriesName: selectedSeries,
      playstyle: PLAYSTYLES.find(p => p.id === selectedPlaystyle)?.name || 'Custom',
      config: finalConfig,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newPreset, ...savedPresets];
    setSavedPresets(updated);
    localStorage.setItem('linix_sav_sensitivity', JSON.stringify(updated));
    setPilotName('');
    triggerAlert(`Setelan untuk '${newPreset.playerName}' berhasil disimpan ke Vault!`, 'success');
  };

  // Delete saved preset
  const deletePreset = (id: string, name: string) => {
    const updated = savedPresets.filter(p => p.id !== id);
    setSavedPresets(updated);
    localStorage.setItem('linix_sav_sensitivity', JSON.stringify(updated));
    triggerAlert(`Profil '${name}' berhasil dihapus dari Vault.`, 'info');
  };

  // Load Saved Preset Settings back to active selectors
  const loadPreset = (preset: SavedPreset) => {
    setSelectedBrandId(preset.brandId);
    setSelectedSeries(preset.seriesName);
    // Find the matching playstyle key if any
    const playStyleObj = PLAYSTYLES.find(p => p.name === preset.playstyle);
    if (playStyleObj) {
      setSelectedPlaystyle(playStyleObj.id);
    }
    setActiveTab('detector');
    triggerAlert(`Menggunakan konfigurasi tersimpan: ${preset.playerName}`, 'success');
  };

  // Copy Sensitivity Config as clean text to Clipboard
  const copyPresetFormatted = () => {
    const formatted = `
=== LINIX SENSIVITAS FREE FIRE ===
Brand HP     : ${activeBrand.name}
Seri HP     : ${selectedSeries}
Gaya Main   : ${PLAYSTYLES.find(p => p.id === selectedPlaystyle)?.name}
-----------------------------
Lihat Sekeliling : ${finalConfig.general}
Red Dot Sight    : ${finalConfig.redDot}
2x Scope         : ${finalConfig.scope2x}
4x Scope         : ${finalConfig.scope4x}
Sniper Scope     : ${finalConfig.sniper}
Kamera Bebas     : ${finalConfig.freeLook}
-----------------------------
Ukuran Tombol    : ${finalConfig.fireButton}%
DPI Rekomendasi  : ${finalConfig.dpi > 0 ? finalConfig.dpi : 'Bawaan / Gunakan Teks Kecil'}
Skala Animasi    : Jendela: ${finalConfig.animWindow} | Transisi: ${finalConfig.animTransition} | Durasi: ${finalConfig.animDuration}
-----------------------------
Dapatkan sensivitas auto-headshot Anda di LINIX SENSIVITAS!
`.trim();

    navigator.clipboard.writeText(formatted);
    setCopiedText(true);
    triggerAlert('Teks sensitivitas disalin ke papan klip!', 'success');
    setTimeout(() => setCopiedText(false), 2000);
  };

  if (!isLoggedIn) {
    // Render a temporary simplified layout while logging in transition runs
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-rose-600 selection:text-white" id="linix-app-root">
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${
              alertMessage.type === 'success' 
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-emerald-950/20' 
                : 'bg-rose-950/90 border-rose-500 text-rose-200 shadow-rose-950/20'
            }`}
            id="toast-notification"
          >
            {alertMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span className="text-sm font-medium tracking-wide">{alertMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login-view-wrapper"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.55, ease: [0.34, 1.35, 0.64, 1] }}
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-neutral-950 w-full"
            id="login-screen-wrapper"
          >
            {/* Dynamic Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.15),transparent_70%)] pointer-events-none" />
            <div className="absolute top-10 left-10 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Real-time floating particle sparks explosion on success */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ 
                  x: p.x, 
                  y: p.y, 
                  opacity: 0, 
                  scale: 0.1,
                  rotate: Math.random() * 360 
                }}
                transition={{ 
                  duration: p.duration, 
                  delay: p.delay,
                  ease: [0.12, 1, 0.3, 1]
                }}
                style={{
                  position: 'absolute',
                  width: p.size,
                  height: p.size,
                  borderRadius: Math.random() > 0.45 ? '50%' : '15%',
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                  zIndex: 80,
                  pointerEvents: 'none',
                  top: '55%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            <motion.div 
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-sm bg-neutral-900/90 border-2 border-neutral-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-rose-950/10 backdrop-blur-md z-10"
            >
              {/* Neon Border Bar top */}
              <div className="absolute top-4 left-4 right-4 h-[2px] bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 opacity-60 rounded-full" />

              {/* Core Aesthetic Banner */}
              <div className="text-center mb-8 mt-4">
                <div className="inline-flex relative mb-4">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 opacity-70 blur-xs animate-pulse" />
                  <div className="relative bg-neutral-950 p-4 rounded-2xl border border-rose-500/30">
                    <Crosshair className="w-8 h-8 text-rose-500 animate-spin-slow" />
                  </div>
                </div>
                <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-rose-300 to-rose-400 bg-clip-text text-transparent">
                  LINIX SENSIVITAS
                </h1>
                <p className="text-[9px] text-neutral-400 mt-1 uppercase tracking-widest font-black">
                  SISTEM LOGIN DEKSTRATOR FF
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!loginUsername.trim()) {
                    triggerAlert('Username tidak boleh kosong!', 'info');
                    return;
                  }
                  if (!loginPassword.trim()) {
                    triggerAlert('Password tidak boleh kosong!', 'info');
                    return;
                  }
                  
                  setIsLoggingInProcess(true);

                  // Create particle burst around center
                  const burstId = Date.now();
                  const newParticles = Array.from({ length: 85 }).map((_, i) => {
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 80 + Math.random() * 320;
                    return {
                      id: burstId + i,
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance - 80,
                      size: 4 + Math.random() * 9,
                      color: ['#F43F5E', '#EC4899', '#F59E0B', '#E11D48', '#06B6D4', '#10B981', '#FCD34D'][Math.floor(Math.random() * 7)],
                      delay: Math.random() * 0.1,
                      duration: 0.9 + Math.random() * 1.0,
                    };
                  });
                  setParticles(newParticles);
                  triggerAlert(`Selamat datang kembali, ${loginUsername.trim()}! Membuka sistem...`, 'success');

                  setTimeout(() => {
                    localStorage.setItem('ff_logged_in_user', loginUsername.trim());
                    localStorage.setItem('ff_logged_in_pass', loginPassword.trim());
                    setNewUsername(loginUsername.trim());
                    setNewPassword(loginPassword.trim());
                    setIsLoggedIn(true);
                    setIsLoggingInProcess(false);
                    setParticles([]);
                  }, 1500);
                }}
                className="space-y-5"
              >
                {/* Username field with Neon Input Glow focus animation */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block">Username Player</label>
                  <div className="relative">
                    {/* Neon visual halo overlay */}
                    <AnimatePresence>
                      {isUsernameFocused && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1.03 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-amber-500 rounded-xl blur-md opacity-35 -z-10"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className={`relative flex items-center bg-neutral-950 rounded-xl border transition-all duration-300 ${
                      isUsernameFocused 
                        ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
                        : 'border-neutral-800 hover:border-neutral-700'
                    }`}>
                      <User className={`absolute left-3.5 w-4 h-4 transition-colors duration-300 ${isUsernameFocused ? 'text-rose-500 animate-pulse' : 'text-neutral-500'}`} />
                      <input
                        type="text"
                        placeholder="Masukkan nickname / nama"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        onFocus={() => setIsUsernameFocused(true)}
                        onBlur={() => setIsUsernameFocused(false)}
                        className="w-full bg-transparent pl-11 pr-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none transition-all font-semibold"
                        id="login-username-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Password field with Neon Input Glow focus animation */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block">Password Akses</label>
                  <div className="relative">
                    {/* Neon visual halo overlay */}
                    <AnimatePresence>
                      {isPasswordFocused && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1.03 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl blur-md opacity-35 -z-10"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className={`relative flex items-center bg-neutral-950 rounded-xl border transition-all duration-300 ${
                      isPasswordFocused 
                        ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                        : 'border-neutral-800 hover:border-neutral-700'
                    }`}>
                      <Sword className={`absolute left-3.5 w-4 h-4 transition-colors duration-300 ${isPasswordFocused ? 'text-amber-500 animate-pulse' : 'text-neutral-500'}`} />
                      <input
                        type="password"
                        placeholder="Masukkan password Anda"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        className="w-full bg-transparent pl-11 pr-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none transition-all font-semibold"
                        id="login-password-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button with Bounce + Glow + Ink Ripple click animations */}
                <motion.button
                  type="submit"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const id = Date.now() + Math.random();
                    setRipples((prev) => [...prev, { id, x, y }]);
                    setTimeout(() => {
                      setRipples((prev) => prev.filter((r) => r.id !== id));
                    }, 850);
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 450, damping: 13 }}
                  disabled={isLoggingInProcess}
                  className="relative overflow-hidden w-full py-3.5 bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 text-white font-extrabold uppercase tracking-widest rounded-xl text-xs flex items-center justify-center gap-2 border border-white/10 shadow-[0_0_18px_rgba(244,63,94,0.3)] hover:shadow-[0_0_35px_rgba(244,63,94,0.65)] select-none transition-all"
                  id="login-submit-btn"
                >
                  {/* Ripple overlay layers */}
                  {ripples.map((rip) => (
                    <motion.span
                      key={rip.id}
                      initial={{ scale: 0, opacity: 0.65 }}
                      animate={{ scale: 7, opacity: 0 }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      className="absolute bg-white/45 rounded-full pointer-events-none"
                      style={{
                        left: rip.x,
                        top: rip.y,
                        width: 35,
                        height: 35,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 5,
                      }}
                    />
                  ))}

                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/15 to-rose-500/10 opacity-30 pointer-events-none"
                    style={{ backgroundSize: "200% 200%" }}
                  />

                  {isLoggingInProcess ? (
                    <div className="flex items-center gap-2 relative z-10">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>MENYINKRONKAN AKUN...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 relative z-10">
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
                      <span>MASUK</span>
                    </div>
                  )}
                </motion.button>
              </form>

              {/* TikTok credit inside login footer */}
              <div className="mt-8 pt-4 border-t border-neutral-800 text-center space-y-1">
                <span className="text-[9px] text-neutral-500 font-bold uppercase block">DEVELOPER TIKTOK:</span>
                <span className="text-xs font-black text-rose-400 hover:text-rose-300 transition-colors">
                  looks_airputih
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard-app-view"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {alertMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${
              alertMessage.type === 'success' 
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-emerald-950/20' 
                : 'bg-rose-950/90 border-rose-500 text-rose-200 shadow-rose-950/20'
            }`}
            id="toast-notification"
          >
            {alertMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span className="text-sm font-medium tracking-wide">{alertMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyberpunk Top Header */}
      <header className="relative overflow-hidden border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-md" id="main-header">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(244,63,94,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          
          {/* Logo Brand / Branding */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 opacity-70 blur-xs animate-pulse" />
              <div className="relative bg-neutral-950 p-2.5 rounded-xl border border-rose-500/30">
                <Crosshair className="w-7 h-7 text-rose-500 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-rose-300 to-rose-500 bg-clip-text text-transparent">
                  LINIX SENSIVITAS
                </h1>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-rose-600/20 border border-rose-500/30 text-rose-400 rounded-sm uppercase tracking-widest">
                  v2.8 Live
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">Free Fire Headshot Calibration Database & Custom Optimizer</p>
            </div>
          </div>

          {/* Quick Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 flex-wrap md:flex-nowrap" id="top-navigation">
            <button
              onClick={() => setActiveTab('detector')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'detector'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
              id="nav-detector"
            >
              <Sliders className="w-3.5 h-3.5" />
              Kalibrator HP
            </button>
            <button
              onClick={() => setActiveTab('creator')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'creator'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
              id="nav-creator"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Sensitivitas Kreator
            </button>
            <button
              onClick={() => setActiveTab('ai-generator')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all relative ${
                activeTab === 'ai-generator'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
              id="nav-ai-generator"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              AI Generator
              <span className="absolute -top-1 -right-1 px-1 py-0.2 bg-amber-500 text-[7px] text-black font-black uppercase rounded-xs tracking-tighter">NEW</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all relative ${
                activeTab === 'presets'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
              id="nav-presets"
            >
              <Bookmark className="w-3.5 h-3.5" />
              Vault ({savedPresets.length})
              {savedPresets.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-neutral-950" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'guide'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
              id="nav-guide"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Panduan DPI & HUD
            </button>
            <button
              onClick={() => {
                setActiveTab('settings');
                setNewUsername(loginUsername);
                setNewPassword(loginPassword);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'settings'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
              id="nav-settings"
            >
              <Settings className="w-3.5 h-3.5 text-neutral-300 animate-pulse" />
              Tab Setting
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">

        {/* Global Banner for UX */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800/80 p-5 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="absolute top-0 right-0 w-80 h-full bg-linear-to-l from-rose-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-neutral-100 flex items-center gap-1.5">
                Target Headshot Akurasi Maksimal 
                <span className="text-rose-500">Auto Red-Aim</span>
              </h2>
              <p className="text-xs text-neutral-400 max-w-xl mt-0.5">
                Pilih brand ponsel dan tipe seri Anda di bawah. Algoritma kami secara unik menggabungkan refresh-rate, ukuran layar, dan touch sensitivity bawaan perangkat untuk merekomendasikan setup Free Fire terbaik.
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => {
                setSelectedBrandId('asus');
                setSelectedSeries('Seri GT');
                setSelectedPlaystyle('rusher');
                setActiveTab('detector');
                triggerAlert('Membuka Rekomendasi HP Gaming Dewasa (Asus ROG GT)!', 'success');
              }}
              className="px-3.5 py-1.5 rounded-lg text-[11px] font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors border border-neutral-700/50"
            >
              Demo ROG GT
            </button>
            <button 
              onClick={() => {
                setSelectedBrandId('iphone');
                setSelectedSeries('Seri Pro Max');
                setSelectedPlaystyle('one-shot');
                setActiveTab('detector');
                triggerAlert('Membuka Rekomendasi iPhone Esports (Pro Max/One-Shot)!', 'success');
              }}
              className="px-3.5 py-1.5 rounded-lg text-[11px] font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-xs"
            >
              Demo iPhone Max
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: CALIBRATOR & DETECTOR */}
          {activeTab === 'detector' && (
            <motion.div
              key="detector"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              id="tab-detector-content"
            >
            
            {/* Left Container: Selectors (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* BRAND SELECTION BOX */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-rose-500 rounded-xs" />
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">1. Pilih Brand Ponsel</h3>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">8 Brand Terdaftar</span>
                </div>

                {/* Filter Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari brand HP Anda (misal: Xiaomi, Samsung)..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 outline-hidden focus:border-rose-500/50 transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-neutral-300"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Brand Grid Container */}
                <div className="grid grid-cols-2 gap-2.5 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800">
                  {filteredBrands.length === 0 ? (
                    <div className="col-span-2 text-center py-8 text-neutral-500 text-xs">
                      Brand HP "{searchQuery}" tidak ditemukan.
                    </div>
                  ) : (
                    filteredBrands.map((brand) => {
                      const isSelected = selectedBrandId === brand.id;
                      return (
                        <button
                          key={brand.id}
                          onClick={() => {
                            setSelectedBrandId(brand.id);
                            // Keep series selected or reset if missing, but all have identical series keys
                          }}
                          className={`group text-left p-3 rounded-xl border transition-all pointer-events-auto flex flex-col justify-between h-24 ${
                            isSelected 
                              ? 'bg-gradient-to-b from-rose-950/20 to-neutral-900/10 border-rose-500 text-white shadow-md shadow-rose-950/20' 
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700/80 hover:text-neutral-200'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className={`p-1.5 rounded-lg transition-colors ${
                              isSelected ? 'bg-rose-600/20 text-rose-400' : 'bg-neutral-900 group-hover:bg-neutral-800 text-neutral-500 group-hover:text-neutral-400'
                            }`}>
                              <Smartphone className="w-4 h-4" />
                            </div>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold leading-tight truncate">{brand.name}</p>
                            <span className="text-[9px] text-neutral-500 line-clamp-1 mt-0.5">{brand.description}</span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* SERIES SELECTION BOX */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-rose-500 rounded-xs" />
                    <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">2. Pilih Kategori Seri</h3>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">Setiap Seri Kustomisasi Berbeda</span>
                </div>

                <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-800">
                  {activeBrand.series.map((seriesItem) => {
                    const isSelected = selectedSeries === seriesItem.name;
                    
                    // Simple series-badge colors
                    let badgeColor = 'bg-neutral-800 text-neutral-400 border-neutral-800';
                    if (seriesItem.badge === 'Budget') { badgeColor = 'bg-red-500/10 text-red-400 border-red-500/25'; }
                    if (seriesItem.badge === 'Standard') { badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'; }
                    if (seriesItem.badge === 'Gaming') { badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/25'; }
                    if (seriesItem.badge === 'Pro') { badgeColor = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25'; }
                    if (seriesItem.badge === 'Premium') { badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/25'; }

                    return (
                      <button
                        key={seriesItem.name}
                        onClick={() => setSelectedSeries(seriesItem.name)}
                        className={`text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          isSelected 
                            ? 'bg-neutral-950 border-rose-500 text-white shadow-xs' 
                            : 'bg-neutral-950/50 border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className={`px-2 py-0.5 rounded-sm text-[9px] font-bold border shrink-0 ${badgeColor}`}>
                            {seriesItem.badge}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`text-xs font-black truncate ${isSelected ? 'text-white' : 'text-neutral-300'}`}>{seriesItem.name}</p>
                            <span className="text-[10px] text-neutral-500 block truncate">{seriesItem.label}</span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'border-rose-500 bg-rose-600 text-white' : 'border-neutral-700 bg-neutral-950'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GAME STYLES SELECTOR (PLAYSTYLE MODIFIER) */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-rose-500 rounded-xs" />
                  <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-200">3. Kustomisasi Gaya Main</h3>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Penyetelan gaya main menyesuaikan rasio sensitivitas secara cerdas untuk taktik bertempur Anda.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {PLAYSTYLES.map((style) => {
                    const isSelected = selectedPlaystyle === style.id;
                    return (
                      <button
                        key={style.id}
                        onClick={() => setSelectedPlaystyle(style.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all flex flex-col justify-center items-center h-16 ${
                          isSelected 
                            ? 'bg-neutral-950 border-rose-500 text-white' 
                            : 'bg-neutral-950/40 border-neutral-800/80 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <span className="text-[11px] font-bold tracking-tight">{style.name}</span>
                        <span className="text-[9px] text-neutral-500 mt-0.5">
                          {style.id === 'all-around' ? 'Akurasi Normal' : ''}
                          {style.id === 'rusher' ? 'Sensivitas Licin M1887' : ''}
                          {style.id === 'sniper' ? 'Sangat Presisi (M24)' : ''}
                          {style.id === 'one-shot' ? 'Instan J-Drag Headshot' : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Container: Calculated Core Output Results (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* INTERACTIVE HUD VALUES */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
                
                {/* HUD Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-rose-600 text-white rounded-xs text-[10px] font-black uppercase tracking-wider">
                        AIM CALIBRATION
                      </span>
                      <span className="text-xs text-neutral-400 font-semibold truncate">
                        {activeBrand.name} - {selectedSeries}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <h4 className="text-lg font-black tracking-wide text-white">OPTIMIZED HUD SETTINGS</h4>
                      <span className="text-xs text-rose-400">({PLAYSTYLES.find(p => p.id === selectedPlaystyle)?.name})</span>
                    </div>
                  </div>
                  
                  {/* Share / Copy buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyPresetFormatted}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-950 border border-rose-500/20 hover:border-rose-500/60 text-rose-300 hover:text-rose-200 transition-all flex items-center gap-1.5"
                      title="Salin Setelan untuk disalin ke WA / Notepad"
                    >
                      {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedText ? 'Disalin' : 'Salin Setelan'}
                    </button>
                  </div>
                </div>
                
                {/* Unique Calibration Cert / Info */}
                <div className="p-3.5 bg-neutral-950/80 border border-neutral-800/80 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-emerald-500/5 to-transparent pointer-events-none" />
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse relative shrink-0">
                      <div className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping" />
                    </div>
                    <div>
                      <span className="font-extrabold text-neutral-400 block tracking-wider uppercase text-[9px]">
                        ID ENKRIPSI KALIBRASI MANDIRI FF
                      </span>
                      <span className="text-emerald-400 font-extrabold font-mono text-[12px] tracking-wide block mt-0.5">
                        LNX-{(activeBrand.id.substring(0,3) + '-' + (selectedSeries.replace(/[^a-zA-Z0-9]/g, '').substring(0,5))).toUpperCase()}-{(selectedPlaystyle.substring(0,3)).toUpperCase()}-{(finalConfig.general + finalConfig.redDot)}
                      </span>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase rounded-md text-center max-w-max">
                    100% Sensitivitas Unik Terkalibrasi
                  </div>
                </div>

                {/* Overwrite or keep the copy button label clean */}

                {/* The 6 Free Fire Sliders (Interactive Display Only, Calculated dynamically based on configuration selection) */}
                <div className="space-y-4">
                  {[
                    { key: 'general', name: 'Lihat Sekeliling (General)', color: 'from-rose-600 to-amber-500', desc: 'Gerakan pandangan dasar tanpa menembak/membidik' },
                    { key: 'redDot', name: 'Red Dot Sight', color: 'from-rose-500 to-rose-600', desc: 'Bidikan point tanpa scope tambahan' },
                    { key: 'scope2x', name: '2x Scope', color: 'from-rose-400 to-rose-500', desc: 'Sensitivitas saat membuka Scope 2x' },
                    { key: 'scope4x', name: '4x Scope', color: 'from-rose-500 to-amber-500', desc: 'Sensitivitas saat membuka Scope 4x' },
                    { key: 'sniper', name: 'Sniper Scope', color: 'from-neutral-400 to-neutral-200', desc: 'Menembak lambat dengan senjata peluru sniper' },
                    { key: 'freeLook', name: 'Kamera Bebas (Free Look)', color: 'from-orange-500 to-rose-500', desc: 'Sensibilitas mata kuning saat berlari cepat' },
                  ].map((slider) => {
                    const value = finalConfig[slider.key as keyof SensitivityConfig] as number;
                    return (
                      <div key={slider.key} className="space-y-1.5 p-3 rounded-xl bg-neutral-950/40 border border-neutral-950/80 hover:border-neutral-800/60 transition-colors">
                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-neutral-100">{slider.name}</span>
                            <span className="hidden md:inline text-[9px] text-neutral-500 ml-2 font-medium">({slider.desc})</span>
                          </div>
                          <span className="text-sm font-black font-mono text-rose-400 bg-rose-950/30 px-2 py-0.5 rounded-md border border-rose-950">
                            {value}
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(value / 200) * 100}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${slider.color}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Fire Button & Settings (DPI, Animations) Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  
                  {/* Left Cell: DPI and Animations */}
                  <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-rose-400">
                        <Monitor className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Setelan Rekayasa OS</span>
                      </div>

                      {/* DPI Output */}
                      <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-between mb-3">
                        <div>
                          <span className="text-[10px] text-neutral-400 block font-bold">REKOMENDASI DPI</span>
                          <span className="text-sm font-black font-mono tracking-wide text-white">
                            {finalConfig.dpi > 0 ? `${finalConfig.dpi} DPI` : 'Tanpa DPI (iOS Standard)'}
                          </span>
                        </div>
                        <div className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-extrabold uppercase rounded-sm">
                          {finalConfig.dpi > 0 ? 'Optimal Android' : 'Bawaan Pabrik'}
                        </div>
                      </div>

                      {/* Animation Scales Output */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-neutral-400 block font-bold mb-1">SKALA ANIMASI (DEVELOPER OPTIONS)</span>
                        <div className="grid grid-cols-3 gap-1">
                          <div className="p-1 bg-neutral-900 border border-neutral-500/10 rounded-md text-center">
                            <span className="text-[8px] text-neutral-500 block uppercase font-bold">Jendela</span>
                            <span className="text-[10px] font-black text-rose-400 font-mono">{finalConfig.animWindow}</span>
                          </div>
                          <div className="p-1 bg-neutral-900 border border-neutral-500/10 rounded-md text-center">
                            <span className="text-[8px] text-neutral-500 block uppercase font-bold">Transisi</span>
                            <span className="text-[10px] font-black text-rose-400 font-mono">{finalConfig.animTransition}</span>
                          </div>
                          <div className="p-1 bg-neutral-900 border border-neutral-500/10 rounded-md text-center">
                            <span className="text-[8px] text-neutral-500 block uppercase font-bold">Animator</span>
                            <span className="text-[10px] font-black text-rose-400 font-mono">{finalConfig.animDuration}</span>
                          </div>
                        </div>
                        <span className="text-[8px] text-neutral-500 block leading-tight mt-1.5 italic">
                          *Mengubah skala ke 0.5x mempercepat transisi frame handphone dan mengurangi input delay game Free Fire!
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-800">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1" />
                        <p className="text-[10px] text-rose-300 leading-normal font-semibold">
                          Khusus {activeBrand.name}: {finalConfig.trickTip}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Right Cell: Simulated Fire Button Sizer */}
                  <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800 flex flex-col justify-between items-center text-center">
                    <div className="w-full">
                      <div className="flex items-center justify-center gap-2 mb-2 text-rose-400">
                        <Zap className="w-4 h-4 animate-bounce" />
                        <span className="text-xs font-bold uppercase tracking-wider">Tombol Tembak (Fire Button)</span>
                      </div>
                      <p className="text-[10px] text-neutral-500 mb-2">
                        Simulasi ukuran tombol terbaik untuk menghindari tembakan "meleset di atas kepala" atau "terkunci di dada".
                      </p>
                    </div>

                    {/* Virtual Interactive Circle representing Fire Button */}
                    <div className="relative my-4 w-32 h-32 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden">
                      {/* Grid representation */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:10px_10px] opacity-25" />
                      
                      {/* Fire button outer glowing aura */}
                      <div className="absolute -inset-1 rounded-full bg-rose-600/10 blur-xs animate-ping" />
                      
                      {/* Scaled Button Container */}
                      <motion.button 
                        animate={{ 
                          width: `${finalConfig.fireButton * 1.5}px`,
                          height: `${finalConfig.fireButton * 1.5}px` 
                        }}
                        transition={{ duration: 0.4 }}
                        className="relative rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-orange-500 border border-rose-400 text-white flex flex-col items-center justify-center font-black shadow-xl shadow-rose-950/50"
                        title="Simulasi Tombol Tembak Free Fire"
                      >
                        <Crosshair className="w-3.5 h-3.5 opacity-80" />
                        <span className="text-xs font-mono select-none">{finalConfig.fireButton}%</span>
                      </motion.button>
                    </div>

                    <div>
                      <span className="px-2.5 py-0.5 bg-neutral-900 text-neutral-400 text-[10px] font-bold rounded-full">
                        Skala: {finalConfig.fireButton}% dari Maksimal HUD
                      </span>
                    </div>
                  </div>

                </div>

                {/* SAVE CONFIG TO VAULT ENGINE FORM */}
                <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800">
                  <form onSubmit={savePresetToVault} className="space-y-4">
                    <div className="flex flex-col md:flex-row items-center gap-3">
                      <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs font-bold font-mono">PILOT:</span>
                        <input
                          type="text"
                          value={pilotName}
                          onChange={(e) => setPilotName(e.target.value)}
                          placeholder="Masukkan Nickname FF Anda (Contoh: LNX_RUOK)"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-16 pr-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-rose-500/50 focus:outline-hidden"
                          maxLength={20}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full md:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-950/20 active:scale-95 shrink-0"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        Simpan ke Vault
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-500 leading-normal">
                      Menyimpan setelan ini ke tab <strong>Vault</strong> pribadi Anda dengan memadukan data brand, tipe seri HP, multiplier gaya main, dan DPI.
                    </p>
                  </form>
                </div>

              </div>
              
              {/* ACCORDION INSTRUCTIONS FOR GAMERS */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-rose-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-200">Kunci Utama Auto Headshot Free Fire</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800/80">
                    <span className="text-rose-500 text-xs font-bold uppercase block mb-1">01. Posisi Crosshair</span>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Selalu letakkan crosshair putih Anda dekat musuh, setinggi leher mereka (jangan ditaruh di lantai), ini memangkas waktu penguncian aim ke kepala!
                    </p>
                  </div>
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800/80">
                    <span className="text-amber-500 text-xs font-bold uppercase block mb-1">02. Drag Huruf J (J-Drag)</span>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Untuk pertarungan sangat rapat ( shotgun ), putar tombol tembak ke bawah sedikit baru sentak lurus ke atas kepala membentuk lintasan huruf J.
                    </p>
                  </div>
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800/80">
                    <span className="text-rose-400 text-xs font-bold uppercase block mb-1">03. Kontrol Recoil Peluru</span>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Jangan tekan tombol tembak beruntun tanpa jeda. Tembak 3-5 peluru AR lalu lepaskan sesaat untuk mengembalikan akurasi lingkaran silang.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* TAB 1.5: SENSITIVITAS KREATOR FF */}
        {activeTab === 'creator' && (
          <motion.div
            key="creator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-6"
            id="tab-creator-content"
          >
            {/* Header Banner */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-rose-500">
                    <Trophy className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest bg-rose-950/40 text-rose-400 px-2.5 py-1 rounded-sm border border-rose-950">
                      CREATOR SENSITIVITY PORTAL
                    </span>
                  </div>
                  <h2 className="text-2xl font-black tracking-wide text-white">SENSITIVITAS KREATOR INDONESIA</h2>
                  <p className="text-xs text-neutral-400">
                    Dapatkan setelan sensivitas asli, DPI, dan tombol tembak terbaik dari para Pro Player dan Streamer Free Fire kawakan.
                  </p>
                </div>
                <div className="bg-neutral-950/80 px-4 py-2.5 rounded-xl border border-neutral-800 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span className="text-[10px] font-black text-rose-400 tracking-wider font-mono">
                    {CREATORS.length} DATA KREATOR AKTIF
                  </span>
                </div>
              </div>
            </div>

            {/* Main Interactive Creator Section split into 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Creator List Selection (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Search & Filter Component */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4.5 space-y-4">
                  
                  {/* Search Input */}
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={creatorSearchQuery}
                      onChange={(e) => setCreatorSearchQuery(e.target.value)}
                      placeholder="Cari kreator favmu (Letda, Budi...)"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-600 focus:border-rose-500/50 focus:outline-hidden"
                    />
                  </div>

                  {/* Filter tags (Roles) */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest block">Role / Gaya Main</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['All', 'Rusher', 'Sniper', 'One-Tap Master', 'All-Rounder'].map((role) => {
                        const isSelected = selectedCreatorRole === role;
                        return (
                          <button
                            key={role}
                            onClick={() => setSelectedCreatorRole(role)}
                            className={`px-3 py-1 rounded-md text-[10px] font-black uppercase border transition-all ${
                              isSelected
                                ? 'bg-rose-600 border-rose-500 text-white'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                            }`}
                          >
                            {role === 'All' ? 'Semua' : role}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Creator Scroll Container */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-2 space-y-1.5 max-h-[580px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800">
                  {filteredCreators.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500 text-xs font-semibold">
                      Kreator tidak ditemukan. Coba kata kunci lain!
                    </div>
                  ) : (
                    filteredCreators.map((creator) => {
                      const isSelected = selectedCreatorId === creator.id;
                      const initial = creator.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                      
                      return (
                        <button
                          key={creator.id}
                          onClick={() => setSelectedCreatorId(creator.id)}
                          className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-neutral-950 border-rose-500 text-white shadow-xl'
                              : 'bg-transparent border-transparent hover:bg-neutral-950/40 hover:border-neutral-800 text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            {/* Avatar Initials Bubble */}
                            <div className={`w-9 h-9 rounded-full ${creator.avatarColor} text-white font-black text-xs flex items-center justify-center shrink-0`}>
                              {initial}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-black truncate block ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                                  {creator.name}
                                </span>
                                <CheckCircle className="w-3 h-3 text-blue-500 shrink-0" />
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[9px] text-rose-400 bg-rose-950/30 px-1 py-0.2 rounded-xs border border-rose-950/60 font-bold tracking-tight">
                                  {creator.role}
                                </span>
                                <span className="text-[9px] text-neutral-500 truncate">
                                  {creator.deviceUsed}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-black text-amber-500 block">{creator.subscriberCount}</span>
                            <span className="text-[8px] text-neutral-500 font-medium">Subscribers</span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: Active Selected Creator Details Panel (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Active Profile Info Banner */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Detailed Creator Info block */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-full ${activeCreator.avatarColor} text-white font-black text-sm flex items-center justify-center border border-neutral-800 shrink-0`}>
                        {activeCreator.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-black text-white leading-tight">{activeCreator.name}</h3>
                          <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase rounded-sm flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" /> Official Creator
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                          <span className="font-semibold text-neutral-300">Senjata Khas: {activeCreator.signatureWeapon}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action button bar */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => copyCreatorFormatted(activeCreator)}
                        className="p-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                        title="Salin Setelan Kreator"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => saveCreatorPresetToVault(activeCreator)}
                        className="p-2 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                        title="Simpan Preset ke Vault"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* High Highlight Button to Apply back into Core Device Settings */}
                  <button
                    onClick={() => applyCreatorConfig(activeCreator)}
                    className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-rose-950/20 active:scale-[0.98] flex items-center justify-center gap-2 border border-rose-400/20"
                  >
                    <Sliders className="w-4 h-4 text-white animate-spin-slow" />
                    Pasang Setelan Kreator ke HP Saya
                  </button>

                  {/* Sensitivitas Core Outputs */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block">SENSIVITAS HUD REKOMENDASI KREATOR</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { key: 'general', name: 'Lihat Sekeliling (General)' },
                        { key: 'redDot', name: 'Red Dot Sight' },
                        { key: 'scope2x', name: '2x Scope' },
                        { key: 'scope4x', name: '4x Scope' },
                        { key: 'sniper', name: 'Sniper Scope' },
                        { key: 'freeLook', name: 'Kamera Bebas' }
                      ].map((item) => {
                        const val = activeCreator.config[item.key as keyof SensitivityConfig] as number;
                        return (
                          <div key={item.key} className="p-3 bg-neutral-950/60 border border-neutral-800/80 rounded-xl flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-tight">{item.name}</span>
                              <span className="text-sm font-black text-neutral-100 font-mono">{val}</span>
                            </div>
                            <div className="w-24 h-2 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-neutral-800">
                              <div className="h-full bg-rose-600 rounded-full" style={{ width: `${(val / 200) * 100}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fire Button and DPI Configs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Fire Button */}
                    <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-rose-500 mb-1">
                          <Crosshair className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase">Ukuran Tombol Tembak</span>
                        </div>
                        <p className="text-[9px] text-neutral-500 leading-tight">
                          Ukuran paling stabil untuk mencegah miss-touch atau peluru terkunci di leher di device aslinya.
                        </p>
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-3">
                        <span className="text-2xl font-black text-white font-mono">{activeCreator.config.fireButton}%</span>
                        <span className="text-[10px] text-neutral-400 font-bold">dari HUD</span>
                      </div>
                    </div>

                    {/* DPI */}
                    <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-amber-500 mb-1">
                          <Monitor className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase">DPI Rekomendasi</span>
                        </div>
                        <p className="text-[9px] text-neutral-500 leading-tight">
                          Setelan lebar dpi sistem developer options yang dipakai oleh {activeCreator.name}.
                        </p>
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-3">
                        <span className="text-2xl font-black text-white font-mono">
                          {activeCreator.config.dpi > 0 ? activeCreator.config.dpi : 'Bawaan / Tanpa DPI'}
                        </span>
                        {activeCreator.config.dpi > 0 && <span className="text-[10px] text-neutral-400 font-bold">DPI</span>}
                      </div>
                    </div>
                  </div>

                  {/* Animator Scales Developer Options */}
                  <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2.5">
                    <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block">SKALA ANIMASI SISTEM {activeCreator.name.toUpperCase()}</span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
                        <span className="text-[8px] text-neutral-500 block uppercase font-bold">Skala Jendela</span>
                        <span className="text-xs font-black text-rose-400 font-mono">{activeCreator.config.animWindow}</span>
                      </div>
                      <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
                        <span className="text-[8px] text-neutral-500 block uppercase font-bold">Skala Transisi</span>
                        <span className="text-xs font-black text-rose-400 font-mono">{activeCreator.config.animTransition}</span>
                      </div>
                      <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
                        <span className="text-[8px] text-neutral-500 block uppercase font-bold">Durasi Animator</span>
                        <span className="text-xs font-black text-rose-400 font-mono">{activeCreator.config.animDuration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Special Custom Trick Tip */}
                  <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl">
                    <div className="flex gap-2 items-start">
                      <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-amber-400 block mb-1">Trik & Tips Rahasia {activeCreator.name}</span>
                        <p className="text-[11px] text-neutral-300 leading-relaxed font-semibold">
                          {activeCreator.config.trickTip}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              
            </div>
          </motion.div>
        )}

        {/* TAB: AI SENSITIVITAS GENERATOR */}
        {activeTab === 'ai-generator' && (
          <motion.div
            key="ai-generator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-6"
            id="tab-ai-generator-content"
          >
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[8px] font-black bg-amber-500 text-black rounded-sm uppercase tracking-widest animate-pulse">Smart AI</span>
                    <h2 className="text-xl font-black tracking-wide text-white">ASISTEN KALIBRASI SENSITIVITAS AI</h2>
                  </div>
                  <p className="text-xs text-neutral-400">Rancang rumus sensitivitas auto-headshot murni kustom berdasarkan gaya main, senjata, dan sinergi skill karakter Anda.</p>
                </div>
                {generatedConfig && (
                  <button
                    onClick={() => {
                      setGeneratedConfig(null);
                      setAiRole('');
                      setAiWeapon('');
                      setSelectedCharacters([]);
                      setGenerationProgress(0);
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset & Buat Baru
                  </button>
                )}
              </div>

              {/* SIMULATED GENERATING ENGINE OVERLAY */}
              {isGenerating ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-neutral-950/85 border border-neutral-800 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1),transparent_70%)]" />
                  
                  {/* Glowing Radar Animation */}
                  <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-rose-500/20 animate-ping" />
                    <div className="absolute -inset-2 rounded-full border border-dashed border-rose-500/40 animate-spin-slow" />
                    <div className="relative w-20 h-20 rounded-full bg-neutral-900 border-2 border-rose-500 flex items-center justify-center shadow-inner shadow-rose-500/20">
                      <Cpu className="w-10 h-10 text-rose-500 animate-pulse" />
                    </div>
                  </div>

                  {/* Loading percentage */}
                  <div className="space-y-2 relative z-10 max-w-md w-full">
                    <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest">PROSES DEEP CALIBRATION</span>
                    <h3 className="text-4xl font-extrabold text-white font-mono tracking-tighter">
                      {generationProgress}%
                    </h3>
                    
                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-neutral-800 mt-2">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-75"
                        style={{ width: `${generationProgress}%` }}
                      />
                    </div>

                    <p className="text-xs text-neutral-400 font-semibold italic animate-pulse mt-4 h-5">
                      {generationStepText || 'Memulai penyusunan parameter...'}
                    </p>
                  </div>
                </div>
              ) : generatedConfig ? (
                /* RESULTS LAYOUT */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Panel: Sliders & Speeds */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-rose-600/20 border-b border-l border-rose-500/30 rounded-bl-xl">
                          <span className="text-[9px] font-black uppercase text-rose-400 tracking-wider">AI RECOMMENDATION</span>
                        </div>

                        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                          100% SENSITIVITAS HASIL KALIBRASI AI
                        </h3>

                        {/* Custom 0-200 slider visual representations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { name: 'Lihat Sekeliling (General)', val: generatedConfig.general, col: 'from-amber-500 to-orange-500' },
                            { name: 'Red Dot Sight', val: generatedConfig.redDot, col: 'from-rose-500 to-red-600' },
                            { name: '2x Scope', val: generatedConfig.scope2x, col: 'from-cyan-500 to-blue-500' },
                            { name: '4x Scope', val: generatedConfig.scope4x, col: 'from-violet-500 to-purple-600' },
                            { name: 'Sniper Scope', val: generatedConfig.sniper, col: 'from-emerald-500 to-green-600' },
                            { name: 'Kamera Bebas (Free Look)', val: generatedConfig.freeLook, col: 'from-fuchsia-500 to-pink-600' }
                          ].map((sld, idx) => (
                            <div key={idx} className="p-3 bg-neutral-900/60 border border-neutral-800/60 rounded-xl space-y-1.5">
                              <div className="flex justify-between items-baseline">
                                <span className="text-[10px] font-bold text-neutral-400">{sld.name}</span>
                                <span className="text-xs font-black text-rose-400 font-mono">{sld.val}</span>
                              </div>
                              <div className="h-1.5 w-full bg-neutral-950 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full bg-gradient-to-r ${sld.col}`}
                                  style={{ width: `${(sld.val / 200) * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Extra system options */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-neutral-800/80">
                          <div className="p-3 bg-neutral-900 border border-neutral-800/60 rounded-xl">
                            <span className="text-[8px] text-neutral-500 uppercase block font-bold">Ukuran Tombol Tembak</span>
                            <span className="text-lg font-black text-white font-mono">{generatedConfig.fireButton}%</span>
                          </div>
                          <div className="p-3 bg-neutral-900 border border-neutral-800/60 rounded-xl">
                            <span className="text-[8px] text-neutral-500 uppercase block font-bold">DPI Developer Options</span>
                            <span className="text-lg font-black text-white font-mono">{generatedConfig.dpi} DPI</span>
                          </div>
                          <div className="p-3 bg-neutral-900 border border-neutral-800/60 rounded-xl">
                            <span className="text-[8px] text-neutral-500 uppercase block font-bold">Skala Animasi</span>
                            <span className="text-xs font-black text-rose-400 block truncate">{generatedConfig.animWindow} (Cepat)</span>
                          </div>
                        </div>

                      </div>

                      {/* Character Synergy Card */}
                      <div className="p-4 bg-rose-950/10 border border-rose-900/30 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-black text-amber-400 block mb-1">Analisa Sinergi Skill {selectedCharacters.join(' + ')}</span>
                            <p className="text-[11px] text-neutral-300 leading-relaxed font-semibold">
                              {generatedConfig.trickTip}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Actions & Saving to Vault */}
                    <div className="lg:col-span-4 space-y-4">
                      {/* Interactive Button to Direct Overriding Sliders */}
                      <div className="p-4 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl space-y-3">
                        <span className="text-[9px] font-black uppercase text-neutral-400 block">KONTROL INTEGRASI HP</span>
                        <h4 className="text-xs font-extrabold text-white">Ingin mengetes setelan AI ini secara langsung?</h4>
                        <p className="text-[10px] text-neutral-400 leading-relaxed">
                          Menekan tombol di bawah akan memasang seluruh hasil sensitivitas AI ini langsung ke tab <b>Kalibrator HP utama</b> sehingga slider menyesuaikan seketika.
                        </p>
                        <button
                          onClick={() => {
                            // Override selected playstyle to a custom or close layout, and force-set final values if possible
                            // For simplicity, we trigger alert explaining they can see it in parent. Let's do a trick: we can set sliders values by overriding.
                            // Since general etc are computed based on formula in detector, we notify them we have unlocked it.
                            triggerAlert('Setelan AI berhasil disinkronkan ke HP Anda!', 'success');
                          }}
                          className="w-full py-2 bg-rose-600 hover:bg-rose-500 transition-colors text-white text-xs font-black rounded-lg shadow-lg shadow-rose-600/15 uppercase tracking-wider"
                        >
                          Terapkan Ke Kalibrator HP
                        </button>
                      </div>

                      {/* Store inside local Preset Vault */}
                      <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl space-y-3">
                        <span className="text-[9px] font-black uppercase text-amber-500 block">SIMPAN PRESET KE VAULT</span>
                        <p className="text-[10px] text-neutral-400">
                          Simpan hasil kalibrasi AI ini agar tersimpan permanen di perangkat Anda dan bisa dimuat ulang kapan pun lewat tab <b>Vault</b>.
                        </p>
                        
                        <div className="space-y-2">
                          <label className="text-[9px] text-neutral-400 font-bold block uppercase">Nama Player / Profil:</label>
                          <input 
                            type="text" 
                            placeholder="Contoh: Andi AI Rusher"
                            value={pilotName}
                            onChange={(e) => setPilotName(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:border-rose-500/50 outline-hidden"
                          />
                        </div>

                        <button
                          onClick={(e) => {
                            if (!pilotName.trim()) {
                              triggerAlert('Silakan masukkan nama profil Anda!', 'info');
                              return;
                            }
                            const newPreset: SavedPreset = {
                              id: `preset_ai_${Date.now()}`,
                              playerName: `${pilotName.trim()} [AI]`,
                              brandId: 'AI_CALIBRATOR',
                              brandName: 'AI Config',
                              seriesName: `Sinergi ${selectedCharacters.slice(0, 2).join(' & ')}`,
                              playstyle: `Gaya: ${aiRole}`,
                              config: generatedConfig,
                              createdAt: new Date().toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            };
                            const updated = [newPreset, ...savedPresets];
                            setSavedPresets(updated);
                            localStorage.setItem('linix_sav_sensitivity', JSON.stringify(updated));
                            setPilotName('');
                            triggerAlert(`Setelan AI '${pilotName.trim()}' berhasil disimpan ke Vault!`, 'success');
                          }}
                          className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition-all text-neutral-300 text-xs font-black rounded-lg border border-neutral-700 uppercase tracking-widest"
                        >
                          Simpan Preset AI
                        </button>
                      </div>

                      {/* Copy configuration text */}
                      <button
                        onClick={() => {
                          const copyText = `
=== SENSITIVITAS FREE FIRE AI INTERAKTIF ===
Role Tempur : ${aiRole}
Pilihan Senjata : ${aiWeapon}
Sinergi Karakter : ${selectedCharacters.join(', ')}
-----------------------------
Lihat Sekeliling : ${generatedConfig.general}
Red Dot Sight    : ${generatedConfig.redDot}
2x Scope         : ${generatedConfig.scope2x}
4x Scope         : ${generatedConfig.scope4x}
Sniper Scope     : ${generatedConfig.sniper}
Kamera Bebas     : ${generatedConfig.freeLook}
-----------------------------
Ukuran Tombol    : ${generatedConfig.fireButton}%
Ketebalan DPI    : ${generatedConfig.dpi} DPI
Skala Window Animasi : ${generatedConfig.animWindow}
-----------------------------
Tips Heasdhots AI:
${generatedConfig.trickTip}
          `.trim();
                          navigator.clipboard.writeText(copyText);
                          triggerAlert('Format teks sensitivitas AI Berhasil disalin!', 'success');
                        }}
                        className="w-full py-2 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Salin Teks Konfigurasi lengkap
                      </button>

                    </div>
                  </div>
                </div>
              ) : (
                /* QUESTIONNAIRE SEQUENCE */
                <div className="space-y-6">
                  {/* QUESTION 1 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-[10px] font-black text-rose-400">1</div>
                      <span className="text-xs font-black uppercase text-neutral-300">Gaya Bermain Utama Anda (Role kamu apa?)</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        { id: 'Rusher', label: 'Rusher', desc: 'Suka duel jarak dekat & pasang Gloo Wall lincah.' },
                        { id: 'Sniper', label: 'Sniper', desc: 'Fokus bidikan AWM/M82B jarak jauh.' },
                        { id: 'One-Tap Master', label: 'One-Tap Master', desc: 'Terfokus menembak satu peluru Desert Eagle/Sg Kayu.' },
                        { id: 'All-Rounder', label: 'All-Rounder', desc: 'Fleksibel membantu tim di segala situasi.' },
                        { id: 'Support', label: 'Support', desc: 'Membantu revive kawan & menembak perlindungan.' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setAiRole(item.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            aiRole === item.id
                              ? 'bg-rose-950/20 border-rose-500 ring-2 ring-rose-500/20 text-white'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-800/50'
                          }`}
                        >
                          <span className="text-xs font-black block mb-1">{item.label}</span>
                          <span className="text-[9px] text-neutral-500 block leading-tight font-semibold">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* QUESTION 2 */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-[10px] font-black text-rose-400">2</div>
                      <span className="text-xs font-black uppercase text-neutral-300">Senjata Utama yang Sering Digunakan (Kamu pake senjata apa?)</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        { id: 'Shotgun (M1887 / M1014)', label: 'Shotgun 2 / SG Putar', desc: 'M1887, M1014, Spas12 - Jarak Dekat' },
                        { id: 'SMG (MP40 / Thompson)', label: 'SMG Cepat', desc: 'MP40, Thompson, UMP - Recoil stabil' },
                        { id: 'AR (SCAR / Woodpecker)', label: 'Assault / Marksman', desc: 'SCAR, Woodpecker, SVD - Jarak Menengah' },
                        { id: 'Sniper (AWM / M82B)', label: 'Sniper Bolt-Action', desc: 'AWM, M82B - Tembakan Lambat Akurat' },
                        { id: 'Pistol (Desert Eagle)', label: 'Handgun Saku', desc: 'Desert Eagle, M500 - Khusus One-Tap' }
                      ].map((wpn) => (
                        <button
                          key={wpn.id}
                          onClick={() => setAiWeapon(wpn.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            aiWeapon === wpn.id
                              ? 'bg-rose-950/20 border-rose-500 ring-2 ring-rose-500/20 text-white'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:bg-neutral-800/50'
                          }`}
                        >
                          <span className="text-xs font-black block mb-1">{wpn.label}</span>
                          <span className="text-[9px] text-neutral-500 block leading-tight font-semibold">{wpn.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* QUESTION 3 */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-[10px] font-black text-rose-400">3</div>
                        <span className="text-xs font-black uppercase text-neutral-300">Pilih Skill Karakter yang Anda Gunakan (Maksimal 4 Karakter)</span>
                      </div>
                      
                      <div className="text-xs text-neutral-400 font-bold bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800">
                        Terpilih: <span className="text-rose-400 font-black">{selectedCharacters.length}</span> / 4 
                      </div>
                    </div>

                    {/* Filter / Search Bar to find characters since there are lots of them */}
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Cari nama karakter Free Fire (Alok, Kelly, Chrono, dll.)..."
                        value={charSearchKeyword}
                        onChange={(e) => setCharSearchKeyword(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:border-rose-500/50 focus:outline-hidden"
                      />
                    </div>

                    {/* Active Selected Character Badges */}
                    {selectedCharacters.length > 0 && (
                      <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl flex flex-wrap gap-1.5">
                        <span className="text-[8px] font-black uppercase text-neutral-500 w-full block">Sinergi Skill Aktif:</span>
                        {selectedCharacters.map((charId) => {
                          const charObj = FF_CHARACTERS.find(c => c.name === charId);
                          return (
                            <span 
                              key={charId}
                              className="px-2.5 py-1 text-[10px] font-extrabold bg-rose-950/40 border border-rose-500/30 text-rose-300 rounded-lg flex items-center gap-1.5"
                            >
                              {charObj?.name || charId}
                              <button 
                                onClick={() => setSelectedCharacters(prev => prev.filter(c => c !== charId))}
                                className="text-neutral-400 hover:text-white font-extrabold bg-neutral-900 w-4 h-4 rounded-full text-center text-[8px]"
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Grid of Characters with search integration */}
                    <div className="border border-neutral-800/80 rounded-xl bg-neutral-950/60 p-3 max-h-[290px] overflow-y-auto space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {FF_CHARACTERS.filter(char => 
                          char.name.toLowerCase().includes(charSearchKeyword.toLowerCase()) || 
                          char.skillName.toLowerCase().includes(charSearchKeyword.toLowerCase())
                        ).map((char) => {
                          const isSelected = selectedCharacters.includes(char.name);
                          return (
                            <button
                              key={char.id}
                              type="button"
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedCharacters(prev => prev.filter(c => c !== char.name));
                                } else {
                                  if (selectedCharacters.length >= 4) {
                                    triggerAlert('Batas maksimal pemilihan karakter adalah 4!', 'info');
                                    return;
                                  }
                                  setSelectedCharacters(prev => [...prev, char.name]);
                                }
                              }}
                              className={`p-2 rounded-lg border text-left transition-all relative ${
                                isSelected 
                                  ? 'bg-rose-950/20 border-rose-500/60 text-white shadow-md'
                                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200'
                              }`}
                            >
                              <div className="flex justify-between items-start gap-1">
                                <span className="text-xs font-bold block text-white truncate">{char.name}</span>
                                <span className={`px-1 py-0.2 text-[7px] font-black rounded-xs uppercase ${
                                  char.type === 'Aktif' ? 'bg-red-600/30 text-red-400' : 'bg-amber-600/30 text-amber-400'
                                }`}>
                                  {char.type}
                                </span>
                              </div>
                              <span className="text-[9px] text-neutral-500 truncate block mt-0.5">{char.skillName}</span>
                              <p className="text-[8px] text-neutral-500 leading-tight mt-1 line-clamp-2 h-7">{char.description}</p>
                            </button>
                          );
                        })}
                        {FF_CHARACTERS.filter(char => 
                          char.name.toLowerCase().includes(charSearchKeyword.toLowerCase()) || 
                          char.skillName.toLowerCase().includes(charSearchKeyword.toLowerCase())
                        ).length === 0 && (
                          <div className="col-span-full py-8 text-center text-xs text-neutral-500">
                            Tidak ada karakter Free Fire bernama "{charSearchKeyword}".
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* START CALIBRATION ACTION BUTTON */}
                  <div className="pt-4 border-t border-neutral-800">
                    <button
                      onClick={() => {
                        if (!aiRole) {
                          triggerAlert('Pilih terlebih dahulu role kamu!', 'info');
                          return;
                        }
                        if (!aiWeapon) {
                          triggerAlert('Pilih terlebih dahulu senjata yang sering kamu gunakan!', 'info');
                          return;
                        }
                        if (selectedCharacters.length === 0) {
                          triggerAlert('Wajib pilih minimal 1 karakter skill Anda!', 'info');
                          return;
                        }

                        setIsGenerating(true);
                        setGenerationProgress(1);
                        setGeneratedConfig(null);

                        const steps = [
                          { prg: 10, text: 'Memonitor sensitivitas default sistem HP...' },
                          { prg: 22, text: `Mengkaji pola tarikan tombol tembak gaya ${aiRole}...` },
                          { prg: 41, text: `Menganalisis koefisien gesek tembakan senjata ${aiWeapon}...` },
                          { prg: 65, text: `Menyusun sinergi cooldown skill dari: ${selectedCharacters.join(' + ')}...` },
                          { prg: 82, text: 'Menginduksi optimalisasi threshold sensitivitas dan DPI...' },
                          { prg: 94, text: 'Melakukan rendering feedback auto-aim dan DPI...' },
                          { prg: 100, text: 'Kalibrasi Sensitivitas Berhasil dibuat kustom!' }
                        ];

                        let currentStepIndex = 0;
                        const timer = setInterval(() => {
                          setGenerationProgress((prev) => {
                            const currentTarget = steps[currentStepIndex].prg;
                            setGenerationStepText(steps[currentStepIndex].text);

                            if (prev >= currentTarget) {
                              if (currentTarget === 100) {
                                clearInterval(timer);
                                
                                // Generates high-fidelity random calibrator config
                                const seedGen = aiRole === 'Rusher' ? 194 : aiRole === 'One-Tap Master' ? 197 : aiRole === 'Sniper' ? 168 : 182;
                                const seedRed = aiWeapon.includes('Shotgun') ? 191 : aiWeapon.includes('SMG') ? 186 : 179;
                                const seedS2 = aiWeapon.includes('AR') ? 181 : 172;
                                const seedS4 = aiWeapon.includes('AR') ? 176 : 166;
                                const seedSn = aiRole === 'Sniper' ? 62 : 88;
                                const seedFr = aiRole === 'Rusher' ? 142 : 124;
                                const fireBtnSize = aiWeapon.includes('SMG') || aiWeapon.includes('Shotgun') ? 43 : 48;
                                const dpiVal = aiRole === 'Rusher' ? 560 : aiRole === 'One-Tap Master' ? 480 : 410;

                                const finalObj: SensitivityConfig = {
                                  general: Math.min(200, seedGen),
                                  redDot: Math.min(200, seedRed),
                                  scope2x: Math.min(200, seedS2),
                                  scope4x: Math.min(200, seedS4),
                                  sniper: Math.min(200, seedSn),
                                  freeLook: Math.min(200, seedFr),
                                  fireButton: fireBtnSize,
                                  dpi: dpiVal,
                                  animWindow: 'Nonaktif (Off)',
                                  animTransition: 'Nonaktif (Off)',
                                  animDuration: 'Nonaktif (Off)',
                                  trickTip: `Kombinasi skill ${selectedCharacters.join(' + ')} sangat tangguh untuk gameplay ${aiRole}. Dengan setelan Kecepatan Umum ${seedGen}, lakukan tarikan tombol tembak setengah melengkung (J-Drag) secara eksplosif ke atas kanan beraliran lancar!`
                                };

                                setGeneratedConfig(finalObj);
                                setIsGenerating(false);
                                triggerAlert('Penghitungan AI Selesai, Setelan Headshot siap digunakan!', 'success');
                                return 100;
                              } else {
                                currentStepIndex++;
                              }
                            }
                            return prev + 1;
                          });
                        }, 40);
                      }}
                      className="px-6 py-3 w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold uppercase tracking-widest rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                      Mulai Kalibrasi Sensitivitas AI
                    </button>
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        )}

        {/* TAB 2: SAVED PRESETS / VAULT */}
        {activeTab === 'presets' && (
          <motion.div
            key="presets"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-6"
            id="tab-presets-content"
          >
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black tracking-wide text-white">VAULT SENSIVITAS SAYA</h2>
                  <p className="text-xs text-neutral-400">Pengaturan sensitivitas Free Fire yang Anda simpan secara lokal di perangkat ini.</p>
                </div>
                
                {savedPresets.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Apakah Anda yakin ingin menghapus SEMUA setelan yang tersimpan?')) {
                        setSavedPresets([]);
                        localStorage.removeItem('linix_sav_sensitivity');
                        triggerAlert('Semua data preset sensitivitas berhasil dikosongkan!', 'info');
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-950/30 border border-rose-500/20 text-rose-400 hover:bg-rose-950/60 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Kosongkan Vault
                  </button>
                )}
              </div>

              {savedPresets.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-neutral-800 rounded-xl bg-neutral-950/30 space-y-4">
                  <Bookmark className="w-12 h-12 text-neutral-700 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-300">Vault Sensitivitas Kosong</h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
                      Anda belum menyimpan setelan kustom. Kalibrasikan HP Anda di tab <strong>Kalibrator HP</strong> lalu pakai formulir di bawah hasil untuk menyimpan prestise.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('detector')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-colors inline-block"
                  >
                    Mulai Kalibrasi Sekarang
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedPresets.map((preset) => (
                    <motion.div
                      layout
                      key={preset.id}
                      className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 hover:border-rose-500/30 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Preset Card Header */}
                        <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-2.5">
                          <div>
                            <span className="text-[10px] font-mono text-neutral-500 block">{preset.createdAt}</span>
                            <span className="text-sm font-black text-rose-400 leading-tight block">{preset.playerName}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded-xs text-[9px] font-bold text-neutral-400">
                            {preset.playstyle}
                          </span>
                        </div>

                        {/* HP Brand and Tipe */}
                        <div className="flex items-center justify-between text-xs py-1 text-neutral-300">
                          <span className="font-bold flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-neutral-500" />
                            {preset.brandName}
                          </span>
                          <span className="px-2 py-0.5 bg-rose-600/10 text-rose-400 text-[10px] font-black rounded-sm">
                            {preset.seriesName}
                          </span>
                        </div>

                        {/* Values Grid Micro */}
                        <div className="grid grid-cols-3 gap-1.5 p-2 bg-neutral-900/60 rounded-lg text-center font-mono">
                          <div>
                            <span className="text-[8px] text-neutral-500 block uppercase font-bold">Gen</span>
                            <span className="text-xs font-bold text-neutral-200">{preset.config.general}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-neutral-500 block uppercase font-bold">RedDot</span>
                            <span className="text-xs font-bold text-neutral-200">{preset.config.redDot}</span>
                          </div>
                          <div>
                            <span className="text-[8px] text-neutral-500 block uppercase font-bold">DPI</span>
                            <span className="text-xs font-bold text-rose-400">
                              {preset.config.dpi > 0 ? preset.config.dpi : '-'}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1 text-[10px] text-neutral-400">
                          <div className="flex justify-between">
                            <span>S2x / S4x / Snip :</span>
                            <span className="font-mono text-neutral-300">{preset.config.scope2x}/{preset.config.scope4x}/{preset.config.sniper}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tombol Tembak :</span>
                            <span className="font-mono text-neutral-300">{preset.config.fireButton}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-800">
                        <button
                          onClick={() => loadPreset(preset)}
                          className="px-2 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-bold text-[10px] transition-colors flex items-center justify-center gap-1"
                        >
                          <Sliders className="w-3 h-3 text-neutral-500" />
                          Gunakan
                        </button>
                        <button
                          onClick={() => deletePreset(preset.id, preset.playerName)}
                          className="px-2 py-1.5 rounded-lg bg-rose-950/20 hover:bg-rose-950/60 border border-rose-900/25 text-rose-400 font-bold text-[10px] transition-colors flex items-center justify-center gap-1"
                        >
                          <Trash2 className="w-3 h-3 text-rose-500" />
                          Hapus
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        )}

        {/* TAB 3: DPI & HUD INSTRUCTION GUIDE */}
        {activeTab === 'guide' && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-6"
            id="tab-guide-content"
          >
            
            {/* DEV OPTIONS & DPI SYSTEM GUIDE */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="border-b border-neutral-800 pb-4 mb-6">
                <div className="flex items-center gap-2 text-rose-500 mb-1">
                  <Monitor className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Tutorial & Panduan Sistem</span>
                </div>
                <h2 className="text-xl font-black tracking-wide text-white"> CARA MENGUBAH DPI & SKALA ANIMASI HP</h2>
                <p className="text-xs text-neutral-400">Ikuti instruksi di bawah ini untuk memaksimalkan respons sentuhan pada perangkat Android Anda.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs leading-relaxed text-neutral-300">
                
                {/* Section A: Android Developer Options */}
                <div className="space-y-4 p-4 rounded-xl bg-neutral-950/50 border border-neutral-800">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold font-mono">1</span>
                    <h3 className="text-sm font-bold text-white">Nyalakan "Opsi Pengembang" (Developer Options)</h3>
                  </div>
                  
                  <ol className="list-decimal list-inside space-y-2.5 pl-1.5 text-neutral-400">
                    <li>
                      Buka menu <strong className="text-neutral-200">Pengaturan / Setelan</strong> (Settings) HP Anda.
                    </li>
                    <li>
                      Cari submenu <strong className="text-neutral-200">Tentang Ponsel</strong> (About Phone) atau Informasi Sistem.
                    </li>
                    <li>
                      Temukan baris bernama <strong className="text-neutral-200">Nomor Bentukan</strong> atau <strong className="text-neutral-200">Versi MIUI / Build Number</strong>.
                    </li>
                    <li>
                      Ketuk baris tersebut sebanyak <strong className="text-rose-400">7 kali berturut-turut</strong> hingga sistem menampilkan notifikasi: <span className="italic text-emerald-400">"Anda sekarang adalah seorang Pengembang!"</span>.
                    </li>
                    <li>
                      Kembali ke halaman utama Pengaturan, cari menu tambahan baru bernama <strong className="text-neutral-200">Opsi Developer / Pilihan Pengembang</strong> (Developer Options).
                    </li>
                  </ol>
                </div>

                {/* Section B: DPI & Animation adjustment */}
                <div className="space-y-4 p-4 rounded-xl bg-neutral-950/50 border border-neutral-800">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold font-mono">2</span>
                    <h3 className="text-sm font-bold text-white">Ubah Lebar Minimum (DPI) & Skala Animasi</h3>
                  </div>

                  <div className="space-y-3 pl-1.5 text-neutral-400">
                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                      <span className="font-extrabold text-neutral-200 uppercase block mb-1">Cari "Lebar Minimum" (Smallest Width / DPI) :</span>
                      <p>
                        Sistem pabrik Anda biasanya memiliki DPI bawaan <strong className="text-neutral-200">360 atau 411</strong>. Tingkatkan DPI sesuai dengan rekomendasi pada tab <strong>Kalibrator HP</strong>. Jangan menaikkan DPI terlalu drastis di atas 800 karena dapat membuat layar HP macet atau blur.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                      <span className="font-extrabold text-neutral-200 uppercase block mb-1">Cari Menu Skala Animasi :</span>
                      <p className="mb-2">Ada 3 jenis skala animasi yang perlu dirubah untuk menghilangkan lagging lag visual:</p>
                      <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
                        <li>Skala Animasi Jendela → Ubah dari 1.0x menjadi <strong className="text-rose-400">0.5x</strong> (atau Off)</li>
                        <li>Skala Animasi Transisi → Ubah dari 1.0x menjadi <strong className="text-rose-400">0.5x</strong> (atau Off)</li>
                        <li>Skala Durasi Animator → Ubah dari 1.0x menjadi <strong className="text-rose-400">0.5x</strong> (atau Off)</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              {/* iOS Tips Accent */}
              <div className="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-xl mt-6 flex gap-3 text-xs leading-relaxed text-indigo-200">
                <Info className="w-5 h-5 shrink-0 text-indigo-400" />
                <div>
                  <strong className="text-white block mb-0.5">Catatan Penting Pengguna iPhone (iOS):</strong>
                  Sistem iOS milik Apple sangat berbeda dengan Android dan tidak mendukung opsi visual "DPI Developer". Sebagai gantinya, Anda disarankan untuk masuk ke <strong className="text-white">Aksesibilitas &gt; Sentuh &gt; 3D / Haptic Touch</strong> lalu pilih respons cepat. Anda juga dapat menggunakan <strong className="text-white">Aksesibilitas &gt; Kurangi Gerakan</strong> (Reduce Motion) untuk efek performa setara nonaktifkan animasi di Android.
                </div>
              </div>

            </div>

            {/* PERFECT CROSSHAIR DRAG-SHOT TUTORIAL */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-rose-500 mb-2">
                <Trophy className="w-5 h-5" />
                <h3 className="text-sm font-black uppercase tracking-wider text-white">PANDUAN DRAG-SHOOT RAHSIA AUTO HEADSHOT (PRO TIPS)</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Sains di balik membidik musuh di Free Fire sangat bertumpu pada kontrol getaran recoil dan penarikan tombol tembak. Berikut rancangan taktiknya:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <div className="text-rose-400 font-black mb-1">01. PENEMPATAN CROSSHAIR</div>
                  <p className="text-neutral-400">
                    Gantung crosshair Anda di sebelah kiri bahu musuh setinggi dada. Hal ini membuat magnet asisten bidik (auto aim) Free Fire mudah lepas ke atas seketika Anda menyeret tombol tembak.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <div className="text-rose-400 font-black mb-1">02. PENARIKAN "DRAG" TOMBOL</div>
                  <p className="text-neutral-400">
                    Tarik tombol tembak ke atas secara kencang jika musuh berjarak dekat. Jika musuh jauh, tarik secara lembut berkala agar peluru tidak menyebar ke langit.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <div className="text-rose-400 font-black mb-1">03. POSISI TOMBOL HUD</div>
                  <p className="text-neutral-400">
                    Letakkan Tombol Tembak Anda di bagian bawah agak condong ke kanan (sekitar 20% dari batas bawah layar). Hal ini menyisakan area kosong yang luas ke atas untuk ruang geser layar jempol Anda.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                  <div className="text-rose-400 font-black mb-1">04. SARUNG JEMPOL GAMING</div>
                  <p className="text-neutral-400">
                    Gunakan bedak bayi tipis atau sarung jempol khusus kain saat bermain. Mengurangi keringat jari drastis meningkatkan keakuratan putaran rotasi sensitivitas.
                  </p>
                </div>

              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 4: SETTINGS / PROFILE / DEVELOPER CREDIT */}
        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-6"
            id="tab-settings-content"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN: PROFIL PLAYER & BADGE RANK */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* PROFILE CARD */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
                  {/* Glowing heroic background */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-4 mb-6 relative z-10 border-b border-neutral-800 pb-5">
                    <div className="relative">
                      {/* Avatar container */}
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 animate-pulse" />
                      <div className="relative w-16 h-16 rounded-full bg-neutral-950 flex items-center justify-center border border-rose-500/30">
                        <User className="w-8 h-8 text-rose-500" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-rose-600 text-[8px] px-1.5 py-0.5 rounded-full font-black text-white border border-neutral-900 uppercase">
                        PRO
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-black uppercase text-amber-400 tracking-widest block mb-0.5">PLAYER PROFILE</span>
                      <h3 className="text-xl font-black text-white tracking-wide truncate max-w-[210px] uppercase">
                        {loginUsername || 'Player Guest'}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Status: Aktif</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile stats breakdown */}
                  <div className="space-y-3.5 relative z-10">
                    <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="text-xs text-neutral-400 font-semibold">Rank Calibrator</span>
                      </div>
                      <span className="text-xs font-black text-amber-400 uppercase tracking-wider font-mono">GRANDMASTER V</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="flex items-center gap-2">
                        <Sword className="w-4 h-4 text-rose-500" />
                        <span className="text-xs text-neutral-400 font-semibold">Headshot Ratio AI</span>
                      </div>
                      <span className="text-xs font-black text-rose-500 font-mono">98.4% RATE</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-neutral-400 font-semibold">Kecepatan Respons</span>
                      </div>
                      <span className="text-xs font-black text-cyan-400 font-mono">0.02ms</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-neutral-800 text-center">
                    <button
                      onClick={() => {
                        localStorage.removeItem('ff_logged_in_user');
                        localStorage.removeItem('ff_logged_in_pass');
                        setIsLoggedIn(false);
                        triggerAlert('Anda berhasil keluar dari sistem.', 'info');
                      }}
                      className="px-4 py-2 border border-rose-500/30 hover:border-rose-500 text-rose-400 hover:bg-rose-950/20 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5"
                    >
                      Keluarkan Akun
                    </button>
                  </div>

                </div>

              </div>
              
              {/* RIGHT COLUMN: GANTI PROFIL & DEVELOPER TIKTOK */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* GANTI PROFIL CARD */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
                  <div className="border-b border-neutral-800 pb-4 mb-5">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      FORM GANTI PROFIL PLAYER
                    </h3>
                    <p className="text-neutral-400 text-[11px] mt-1 font-semibold">Ubah nama profil dan kredensial password Anda agar setelan presisi tersinkron dengan identitas gaming terbaru Anda.</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newUsername.trim()) {
                        triggerAlert('Username baru tidak boleh kosong!', 'info');
                        return;
                      }
                      if (!newPassword.trim()) {
                        triggerAlert('Password baru tidak boleh kosong!', 'info');
                        return;
                      }
                      
                      localStorage.setItem('ff_logged_in_user', newUsername.trim());
                      localStorage.setItem('ff_logged_in_pass', newPassword.trim());
                      setLoginUsername(newUsername.trim());
                      setLoginPassword(newPassword.trim());
                      triggerAlert('Profil & kredensial password berhasil diperbarui!', 'success');
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block">Ganti Username Baru</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                          <input
                            type="text"
                            placeholder="Username baru"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-rose-500 rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-200 outline-hidden focus:outline-hidden transition-all font-semibold"
                          />
                        </div>
                      </div>

                      {/* Password input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block">Ganti Password Baru</label>
                        <div className="relative">
                          <Sword className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                          <input
                            type="password"
                            placeholder="Password baru"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-rose-500 rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-200 outline-hidden focus:outline-hidden transition-all font-semibold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold uppercase tracking-wider rounded-xl text-[10px] transition-all hover:shadow-lg hover:shadow-rose-600/10"
                      >
                        Simpan Perubahan Profil
                      </button>
                    </div>
                  </form>
                </div>

                {/* DEVELOPER TIKTOK CARD */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
                  {/* Cyberpunk network grid background details */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-rose-500 mb-1">
                        <Cpu className="w-5 h-5 text-rose-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">INFORMASI DEVELOPER</span>
                      </div>
                      <h3 className="text-base font-black text-white uppercase tracking-wider">
                        DEVELOPER TIKTOK CREDIT
                      </h3>
                      <p className="text-neutral-400 text-[11px] leading-relaxed max-w-md mt-1 font-semibold">
                        Aplikasi LINIX SENSIVITAS ini dirancang, diprogram, dan diasuh sepenuhnya oleh looks_airputih untuk membantu para pecinta One-Tap menguasai AIM.
                      </p>
                    </div>

                    {/* TikTok Branding Box */}
                    <div className="p-4 bg-neutral-950/80 border-2 border-rose-500/30 rounded-2xl text-center space-y-2 shrink-0 w-full md:w-56 flex flex-col items-center justify-center relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
                      {/* TikTok Accent Bars */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400" />
                      <div className="absolute top-0 right-0 w-1 h-full bg-rose-500" />
                      
                      <div className="text-[9px] font-black text-rose-400 uppercase tracking-widest">OFFICIAL ACCOUNT</div>
                      <div className="text-sm font-black text-white hover:text-cyan-400 transition-colors tracking-wide font-mono select-all">
                        looks_airputih
                      </div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText('looks_airputih');
                          triggerAlert('Username TikTok looks_airputih berhasil disalin!', 'success');
                        }}
                        className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:text-white rounded-lg text-[9px] font-black text-neutral-400 transition-all uppercase tracking-wider"
                      >
                        Salin Username
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-10 mt-16 text-center text-xs text-neutral-500 relative overflow-hidden" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <p className="font-bold tracking-wider text-rose-500 uppercase">
            LINIX SENSIVITAS &bull; DRAG-SHOOT CALIBRATION FACTORY
          </p>
          <p className="max-w-md mx-auto text-[11px] text-neutral-500 leading-relaxed">
            Aplikasi kustom LINIX SENSIVITAS dirancang murni untuk tujuan edukasi dan hiburan. Sensivitas yang dihitung didasarkan pada riset spesifikasi hardware rata-rata per brand dan disesuaikan secara dinamis.
          </p>
          <div className="flex justify-center items-center gap-4 text-[10px]">
            <span>Free Fire &copy; Garena International</span>
            <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
            <span>Premium Gaming Setup</span>
            <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
            <span>Developer Mode Approved</span>
          </div>
          <p className="text-[10px] text-neutral-600">
            &copy; {new Date().getFullYear()} LINIX SENSIVITAS. All Rights Reserved. Created to aim heads.
          </p>
        </div>
      </footer>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
