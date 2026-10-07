import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { BirthdayConfig } from '../types';
import { sounds } from '../utils/soundEffects';

interface Page3Props {
  config: BirthdayConfig;
  onNext: () => void;
}

export const Page3MemoriesGallery: React.FC<Page3Props> = ({ config, onNext }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMemoryIndex, setActiveMemoryIndex] = useState<number | null>(null);

  const memories = config.memories;

  const filteredMemories = selectedCategory === 'all'
    ? memories
    : memories.filter((m) => m.category === selectedCategory);

  // Keyboard navigation for modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeMemoryIndex === null) return;
      if (e.key === 'Escape') {
        setActiveMemoryIndex(null);
      } else if (e.key === 'ArrowRight') {
        sounds.playSoftClick();
        setActiveMemoryIndex((prev) => (prev !== null ? (prev + 1) % memories.length : null));
      } else if (e.key === 'ArrowLeft') {
        sounds.playSoftClick();
        setActiveMemoryIndex((prev) =>
          prev !== null ? (prev - 1 + memories.length) % memories.length : null
        );
      }
    },
    [activeMemoryIndex, memories.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeMemory = activeMemoryIndex !== null ? memories[activeMemoryIndex] : null;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0a030f] via-[#15061e] to-[#0a030f] text-rose-50 px-4 sm:px-8 py-16 sm:py-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-rose-400/30 text-rose-300 text-xs sm:text-sm uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Dedicated to {config.recipientName}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-rose-100 font-light tracking-wide glow-text-rose"
          >
            {config.memoriesHeading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-rose-200/80 text-base sm:text-xl font-light italic"
          >
            "{config.memoriesSubheading}"
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 pt-4"
          >
            {[
              { id: 'all', label: 'All Memories' },
              { id: 'cherished', label: 'Cherished' },
              { id: 'adventures', label: 'Adventures' },
              { id: 'laughter', label: 'Laughter' },
              { id: 'milestones', label: 'Milestones' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playSoftClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50 scale-105'
                    : 'glass-panel text-rose-200/70 hover:text-rose-100 hover:bg-rose-900/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Memory Grid (Cinematic Masonry Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMemories.map((memory, idx) => {
              const originalIndex = memories.findIndex((m) => m.id === memory.id);
              return (
                <motion.div
                  key={memory.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onClick={() => {
                    sounds.playSoftClick();
                    setActiveMemoryIndex(originalIndex);
                  }}
                  className="group relative cursor-pointer rounded-3xl overflow-hidden glass-panel border border-rose-300/15 glass-panel-hover"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-black/40">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0413] via-[#0d0413]/40 to-transparent" />

                    {/* Expand icon indicator */}
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Category pill */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-950/70 backdrop-blur-md border border-rose-400/20 text-rose-300 text-xs capitalize tracking-wide font-medium">
                      {memory.category}
                    </div>

                    {/* Bottom Content overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-5 space-y-2">
                      <div className="flex items-center gap-3 text-xs text-rose-300/80">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          {memory.date}
                        </span>
                        {memory.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-400" />
                            {memory.location}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-rose-100 font-medium group-hover:text-amber-200 transition-colors">
                        {memory.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-rose-200/70 line-clamp-2 font-light italic">
                        "{memory.shortCaption}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Section Navigation CTA */}
        <div className="text-center pt-8">
          <button
            onClick={() => {
              sounds.playSoftClick();
              onNext();
            }}
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-medium text-white shadow-2xl transition-all duration-300 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 hover:shadow-rose-500/30 hover:scale-105 active:scale-95"
          >
            <span>Continue to The Year Ahead</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-3 text-xs text-rose-300/60 tracking-wider">
            Chapter 3: Wishes, Dreams & What Lies Ahead
          </p>
        </div>
      </div>

      {/* Full-Screen Interactive Memory Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveMemoryIndex(null)}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] glass-panel bg-[#14061d]/95 rounded-3xl border border-rose-300/30 overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMemoryIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-rose-200 hover:text-white transition-all shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Memory Image with Ambient Zoom */}
              <div className="relative md:w-1/2 aspect-[4/3] md:aspect-auto h-64 md:h-auto overflow-hidden bg-black">
                <img
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-[#14061d] opacity-60 pointer-events-none" />
              </div>

              {/* Memory Story Content */}
              <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-rose-300/80">
                    <span className="px-3 py-1 rounded-full bg-rose-900/60 border border-rose-400/30 text-rose-200 capitalize">
                      {activeMemory.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {activeMemory.date}
                    </span>
                    {activeMemory.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        {activeMemory.location}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-medium">
                    {activeMemory.title}
                  </h3>

                  <p className="font-serif text-base text-rose-200/90 italic font-light border-l-2 border-rose-400/40 pl-4 py-1">
                    "{activeMemory.shortCaption}"
                  </p>

                  <div className="text-sm sm:text-base text-rose-100/85 leading-relaxed font-light space-y-3">
                    <p>{activeMemory.fullStory}</p>
                  </div>
                </div>

                {/* Navigation controls (Previous / Next) */}
                <div className="pt-6 border-t border-rose-500/20 flex items-center justify-between">
                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      setActiveMemoryIndex(
                        (activeMemoryIndex! - 1 + memories.length) % memories.length
                      );
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white text-xs sm:text-sm transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="text-xs text-rose-300/60">
                    {activeMemoryIndex! + 1} of {memories.length}
                  </span>

                  <button
                    onClick={() => {
                      sounds.playSoftClick();
                      setActiveMemoryIndex((activeMemoryIndex! + 1) % memories.length);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white text-xs sm:text-sm transition-all"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
