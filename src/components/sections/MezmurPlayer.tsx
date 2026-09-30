import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { mezmurData } from '../../data/mezmurData';
import { EthiopianCross } from '../common/EthiopianCross';
import { Mezmur } from '../../types';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  FileText, Music, Sparkles, X 
} from 'lucide-react';

export const MezmurPlayer: React.FC = () => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // default fallback
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [lyricsOpen, setLyricsOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeMezmur: Mezmur = mezmurData[currentIndex] || mezmurData[0];

  // Web Audio fallback synthesizer for reliable harmonic spiritual begena/bell ambiance
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const playSynthesizedBegena = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Pentatonic Tizita/Ambassel sacred scale frequencies: E3, F#3, G#3, B3, C#4
      const notes = [164.81, 185.00, 207.65, 246.94, 277.18, 329.63];
      const note = notes[Math.floor(Math.random() * notes.length)];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, ctx.currentTime);

      gain.gain.setValueAtTime(0.25 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.6);
    } catch (e) {
      // AudioContext not allowed or not ready
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // If network audio blocked or failed, run harmonic synth ambiance
          playSynthesizedBegena();
          if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
          synthIntervalRef.current = window.setInterval(playSynthesizedBegena, 1800);
        });
      }
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mezmurData.length);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mezmurData.length) % mezmurData.length);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 240);
    const onEnded = () => handleNext();

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    if (isPlaying) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
    };
  }, [currentIndex, isPlaying]);

  return (
    <section id="mezmur" className="py-24 bg-[#061514] relative overflow-hidden">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={activeMezmur.audioSrc}
        preload="metadata"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <EthiopianCross size={14} variant="simple" />
            <span>{isAmharic ? "መንፈሳዊ ዝማሬ" : "Sacred Hymns"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.mezmurTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-emerald-200/80 text-base sm:text-lg">
            {t.mezmurSubtitle}
          </p>
        </div>

        {/* Player Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Active Player Deck */}
          <div className="lg:col-span-7 bg-[#09201e] border-2 border-amber-500/35 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Visualizer Wave Animation */}
            <div className="flex items-center justify-center gap-1.5 h-14 mb-6">
              {[35, 60, 45, 80, 50, 95, 70, 40, 85, 55, 65, 90, 45, 60].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? 'bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-300 animate-pulse'
                      : 'bg-emerald-900/60'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.min(100, h * (0.6 + Math.random() * 0.8))}%` : '20%',
                    animationDelay: `${i * 70}ms`
                  }}
                />
              ))}
            </div>

            {/* Currently Playing Track Info */}
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {isAmharic ? activeMezmur.categoryAm : activeMezmur.categoryEn}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-1">
                {isAmharic ? activeMezmur.titleAm : activeMezmur.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/70">
                {isAmharic ? activeMezmur.artistAm : activeMezmur.artistEn}
              </p>
            </div>

            {/* Progress Bar & Timestamps */}
            <div className="space-y-1 mb-6">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-xs text-emerald-300/70 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {/* Lyrics Button */}
              <button
                onClick={() => setLyricsOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#061514] border border-amber-500/30 text-amber-300 hover:text-white hover:border-amber-400 text-xs font-semibold transition-all cursor-pointer"
              >
                <FileText size={16} />
                <span className="hidden sm:inline">{t.mezmurLyricsBtn}</span>
                <span className="sm:hidden">{isAmharic ? 'ግጥም' : 'Lyrics'}</span>
              </button>

              {/* Main Play / Prev / Next */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full hover:bg-emerald-900/50 text-emerald-200 hover:text-white transition-colors cursor-pointer"
                  title="Previous"
                >
                  <SkipBack size={20} />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full hover:bg-emerald-900/50 text-emerald-200 hover:text-white transition-colors cursor-pointer"
                  title="Next"
                >
                  <SkipForward size={20} />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-emerald-300 hover:text-amber-400 transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="w-18 h-1.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Playlist Column */}
          <div className="lg:col-span-5 space-y-3 text-left">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Music size={14} />
              <span>{isAmharic ? "የመዝሙራት ማውጫ" : "Hymn Playlist"}</span>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {mezmurData.map((item, idx) => {
                const isSelected = idx === currentIndex;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#103b36] border-amber-400 shadow-md text-white'
                        : 'bg-[#09201e]/80 border-emerald-900 hover:border-amber-500/40 text-emerald-100/90'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-amber-500 text-black' : 'bg-emerald-900 text-amber-400'
                      }`}>
                        {isSelected && isPlaying ? (
                          <Sparkles size={14} className="animate-spin" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold leading-snug">
                          {isAmharic ? item.titleAm : item.titleEn}
                        </div>
                        <div className="text-[11px] text-emerald-300/70">
                          {isAmharic ? item.artistAm : item.artistEn}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-amber-400/80 font-mono">
                      {item.duration}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lyrics Modal */}
      {lyricsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#09201e] border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col text-left">
            <div className="px-6 py-4 bg-[#061514] border-b border-amber-500/20 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">
                  {isAmharic ? activeMezmur.titleAm : activeMezmur.titleEn}
                </h4>
                <p className="text-xs text-amber-400">
                  {isAmharic ? activeMezmur.artistAm : activeMezmur.artistEn}
                </p>
              </div>
              <button
                onClick={() => setLyricsOpen(false)}
                className="p-1 rounded-full text-emerald-300 hover:text-white hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3 font-serif text-sm sm:text-base leading-relaxed text-emerald-100/90 text-center">
              {(isAmharic ? activeMezmur.lyricsAm : activeMezmur.lyricsEn).map((line, i) => (
                <div key={i} className={line === '' ? 'h-4' : 'py-0.5'}>
                  {line}
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#061514] border-t border-emerald-900/60 flex justify-center">
              <button
                onClick={() => setLyricsOpen(false)}
                className="px-6 py-2 rounded-full bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer"
              >
                {t.mezmurCloseLyrics}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
