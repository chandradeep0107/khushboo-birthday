import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Music,
  Sliders,
  Maximize,
  Minimize,
  Heart
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  currentChapter: number;
  onSelectChapter: (chapter: number) => void;
  onOpenPersonalize: () => void;
  recipientName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentChapter,
  onSelectChapter,
  onOpenPersonalize,
  recipientName
}) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleMusic = () => {
    sounds.playSoftClick();
    const playing = sounds.toggleMusic();
    setIsMusicPlaying(playing);
  };

  const handleToggleMute = () => {
    sounds.playSoftClick();
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleFullscreen = () => {
    sounds.playSoftClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const chapters = [
    { num: 1, label: 'The Heart', icon: '🏹' },
    { num: 2, label: 'Celebration', icon: '🎂' },
    { num: 3, label: 'Memories', icon: '📸' },
    { num: 4, label: 'Next Chapter', icon: '✨' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 py-3 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand / Dedicated To */}
        <div className="flex items-center gap-2 glass-panel px-3 sm:px-4 py-1.5 rounded-full border border-rose-300/20 shadow-lg">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
          <span className="font-serif text-xs sm:text-sm text-rose-100 font-medium tracking-wide">
            For {recipientName}
          </span>
        </div>

        {/* Story Journey Indicator / Chapter Selector */}
        <nav className="hidden md:flex items-center gap-1.5 glass-panel p-1.5 rounded-full border border-rose-300/20 shadow-lg">
          {chapters.map((ch) => {
            const isActive = currentChapter === ch.num;
            return (
              <button
                key={ch.num}
                onClick={() => {
                  sounds.playSoftClick();
                  onSelectChapter(ch.num);
                }}
                className={`relative px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-rose-200/70 hover:text-rose-100 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-rose-600 to-amber-500 rounded-full -z-10"
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  />
                )}
                <span>{ch.icon}</span>
                <span>{ch.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Media & System Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Ambient Music Player Toggle */}
          <button
            onClick={handleToggleMusic}
            title={isMusicPlaying ? 'Pause Ambient Music' : 'Play Ambient Music'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 glass-panel border ${
              isMusicPlaying
                ? 'bg-rose-900/50 border-rose-400/50 text-rose-200'
                : 'border-white/10 text-rose-300/70 hover:text-rose-100 hover:bg-white/5'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'animate-bounce text-amber-300' : ''}`} />
            <span className="hidden sm:inline">
              {isMusicPlaying ? 'Music ON' : 'Music'}
            </span>
            {isMusicPlaying && (
              <span className="flex items-end gap-0.5 h-3 w-3">
                <span className="w-0.5 h-full bg-rose-400 animate-pulse" />
                <span className="w-0.5 h-2/3 bg-amber-400 animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-4/5 bg-rose-300 animate-pulse" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 rounded-full glass-panel border border-white/10 text-rose-300/80 hover:text-white hover:bg-white/5 transition-all"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="p-2 rounded-full glass-panel border border-white/10 text-rose-300/80 hover:text-white hover:bg-white/5 transition-all hidden sm:block"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>

          {/* Customize / Edit Button */}
          <button
            onClick={() => {
              sounds.playSoftClick();
              onOpenPersonalize();
            }}
            title="Personalize Details"
            className="p-2 rounded-full glass-panel border border-white/10 text-amber-300/90 hover:text-amber-200 hover:bg-white/5 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
