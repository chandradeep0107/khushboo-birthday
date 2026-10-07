import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Heart, Mail, X } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { sounds } from '../utils/soundEffects';

interface Page2Props {
  config: BirthdayConfig;
  onNext: () => void;
}

export const Page2BirthdayReveal: React.FC<Page2Props> = ({ config, onNext }) => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // Trigger refined elegant celebratory confetti burst
  useEffect(() => {
    sounds.playSparkle();

    const count = 200;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#ff758f', '#ffb3c1', '#f4cb80', '#e0aaff', '#ffffff', '#dc8d99']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    // Elegant multi-stage burst
    const timer1 = setTimeout(() => {
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }, 600);

    return () => clearTimeout(timer1);
  }, []);

  // Split name for staggered letter reveal
  const nameLetters = config.recipientName.split("");

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a030f] via-[#1a0726] to-[#0a030f] text-rose-50 flex flex-col justify-center items-center px-4 sm:px-8 py-16">
      {/* Background ambient lighting and soft radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating subtle background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-500/15 text-2xl select-none"
            initial={{
              x: `${(i * 9) % 100}vw`,
              y: '105vh',
              scale: 0.6 + (i % 5) * 0.2
            }}
            animate={{
              y: '-10vh',
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 14 + (i % 7) * 3,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'linear'
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
        
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel border-rose-400/30 text-rose-200 text-xs sm:text-sm tracking-widest uppercase font-medium shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Celebrating A Truly Special Soul</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </motion.div>

        {/* Heading: Happy Birthday */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-rose-200/90 tracking-wide glow-text-rose mb-3">
            {config.page2Heading}
          </h2>

          {/* Focal Point: KHUSBOO (Letter by Letter reveal) */}
          <div className="flex justify-center items-center gap-1 sm:gap-2 my-4 sm:my-6 overflow-hidden py-2">
            {nameLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 60, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + idx * 0.1,
                  type: 'spring',
                  damping: 12
                }}
                className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-gold-gradient tracking-tight drop-shadow-[0_10px_35px_rgba(244,203,128,0.5)] inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-xs sm:text-sm uppercase tracking-[0.3em] text-rose-300/80 font-medium"
          >
            {config.recipientFullName} • {config.birthdayDate}
          </motion.p>
        </motion.div>

        {/* Personalized Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-rose-400/20 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glowing corner accents */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <p className="font-serif text-lg sm:text-2xl text-rose-100 font-light italic leading-relaxed mb-4">
            "Today isn't just another day..."
          </p>

          <p className="text-sm sm:text-base text-rose-200/80 leading-relaxed font-light">
            {config.page2PersonalMessage}
          </p>

          {/* Letter Peek Trigger */}
          <div className="mt-6 pt-5 border-t border-rose-500/20 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                sounds.playSoftClick();
                setIsLetterOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-900/40 hover:bg-rose-800/60 border border-rose-400/30 text-rose-200 text-xs sm:text-sm transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>Read An Unspoken Letter From {config.senderName}</span>
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            </button>
          </div>
        </motion.div>

        {/* Prominent CTA to Continue the Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="pt-4"
        >
          <button
            onClick={() => {
              sounds.playSoftClick();
              onNext();
            }}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-medium text-white shadow-2xl transition-all duration-300 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 hover:shadow-rose-500/30 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3 tracking-wide">
              <span>Continue the Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </button>

          <p className="mt-3 text-xs text-rose-300/60 tracking-wider">
            Chapter 2: A Walk Down Memory Lane
          </p>
        </motion.div>
      </div>

      {/* Expandable Heartfelt Letter Modal */}
      <AnimatePresence>
        {isLetterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsLetterOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full max-h-[88vh] overflow-y-auto glass-panel bg-[#1a0824]/95 p-6 sm:p-10 rounded-3xl border border-rose-300/30 shadow-2xl text-left space-y-5"
            >
              <button
                onClick={() => setIsLetterOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-rose-300 text-xs sm:text-sm uppercase tracking-widest">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span>Personal Letter</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-medium">
                {config.letterTitle}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-rose-100/90 leading-relaxed font-light">
                {config.letterContent.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-rose-500/20 flex justify-between items-center text-xs text-rose-300/70">
                <span>With heartfelt wishes,</span>
                <span className="font-serif text-base text-rose-200 font-semibold italic">
                  — {config.senderName}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
