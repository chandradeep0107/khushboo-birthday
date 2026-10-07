import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Star, Send } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { sounds } from '../utils/soundEffects';

interface Page4Props {
  config: BirthdayConfig;
  onReplay: () => void;
}

export const Page4YearAhead: React.FC<Page4Props> = ({ config, onReplay }) => {
  const [clickedWishes, setClickedWishes] = useState<Record<string, boolean>>({});
  const [userWish, setUserWish] = useState<string>('');
  const [wishReleased, setWishReleased] = useState<boolean>(false);

  // Trigger grand celebration confetti
  const triggerGrandCelebration = () => {
    sounds.playSparkle();

    const end = Date.now() + 3.5 * 1000;
    const colors = ['#ff758f', '#ffb3c1', '#f4cb80', '#e0aaff', '#ffd166', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleWishCardClick = (id: string) => {
    sounds.playSparkle();
    setClickedWishes((prev) => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#ff758f', '#f4cb80', '#ffffff']
    });
  };

  const handleReleaseWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWish.trim()) return;
    sounds.playSparkle();
    setWishReleased(true);
    triggerGrandCelebration();
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0a030f] via-[#1b0827] to-[#08020b] text-rose-50 px-4 sm:px-8 py-16 sm:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-rose-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-rose-400/30 text-rose-300 text-xs sm:text-sm uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Journey Ahead</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-gold-gradient font-light tracking-wide glow-text-gold"
          >
            {config.page4Heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-serif text-rose-100/90 text-lg sm:text-2xl font-light italic leading-relaxed max-w-2xl mx-auto"
          >
            "{config.page4Message}"
          </motion.p>
        </div>

        {/* Wishes Grid: Revealed one by one with staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {config.wishes.map((wish, idx) => {
            const isToggled = clickedWishes[wish.id];
            return (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                onClick={() => handleWishCardClick(wish.id)}
                className={`relative group cursor-pointer p-6 sm:p-7 rounded-3xl glass-panel border bg-gradient-to-br ${wish.color} transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl shadow-lg`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-black/20 backdrop-blur-md shadow-inner">
                    {wish.icon}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-rose-300/80">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-45 transition-transform" />
                    <span>Tap to Bless</span>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-rose-100 font-medium tracking-wide">
                    {wish.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed font-light">
                    {wish.description}
                  </p>
                </div>

                {isToggled && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-amber-400 text-velvet-950 text-xs font-bold shadow-lg"
                  >
                    Blessed ✨
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Interactive "Make a Birthday Wish" Stardust Shrine */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-amber-400/25 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <Star className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </div>

          <h3 className="font-serif text-2xl text-rose-100 font-medium">
            Make A Quiet Birthday Wish, Khusboo
          </h3>
          <p className="text-xs sm:text-sm text-rose-200/70 mt-1 mb-5 font-light">
            Whisper your deepest dream for this year and release it into the stars
          </p>

          <AnimatePresence mode="wait">
            {!wishReleased ? (
              <form onSubmit={handleReleaseWish} className="space-y-4">
                <input
                  type="text"
                  value={userWish}
                  onChange={(e) => setUserWish(e.target.value)}
                  placeholder="Type a wish (or leave blank for a silent wish)..."
                  className="w-full px-5 py-3 rounded-full bg-black/40 border border-rose-300/30 text-rose-100 placeholder:text-rose-300/40 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white text-sm font-medium shadow-lg hover:shadow-amber-500/30 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Release Wish to the Stars ✨</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 space-y-2"
              >
                <div className="text-3xl">✨🌟💫</div>
                <p className="font-serif text-lg text-amber-200 font-medium">
                  Your wish has been carried into the cosmos!
                </p>
                <p className="text-xs text-rose-200/70 italic">
                  "May the universe align every star in your favor this year."
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grand Finale Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8 space-y-6"
        >
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-6xl md:text-7xl font-semibold text-rose-gradient glow-text-rose tracking-tight">
              {config.finalGreeting}
            </h2>
            <p className="font-serif text-base sm:text-2xl text-amber-200/90 font-light italic">
              "{config.finalSubgreeting}"
            </p>
          </div>

          {/* Celebrate Button & Replay Button */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={triggerGrandCelebration}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-panel border-amber-400/40 hover:bg-amber-500/20 text-amber-200 text-sm font-medium shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Celebrate Again 🎊</span>
            </button>

            <button
              onClick={() => {
                sounds.playSoftClick();
                onReplay();
              }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full overflow-hidden text-sm sm:text-base font-medium text-white transition-all duration-300 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 shadow-2xl hover:shadow-rose-600/40 hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-500" />
              <span>Replay the Experience ↻</span>
            </button>
          </div>
        </motion.div>

        {/* Bottom Credits & Signature */}
        <footer className="text-center pt-16 border-t border-rose-500/15 space-y-3">
          <p className="font-serif text-base sm:text-lg text-rose-300/90 font-medium tracking-wide">
            {config.madeWithLoveText}
          </p>
          <p className="text-xs text-rose-300/40 tracking-widest uppercase">
            Designed with elegance, warmth & memories • Forever Cherished
          </p>
        </footer>
      </div>
    </div>
  );
};
