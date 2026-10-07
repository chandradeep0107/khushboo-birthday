import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initialBirthdayConfig } from './config/birthdayData';
import { BirthdayConfig } from './types';
import { Page1BowAndArrow } from './components/Page1BowAndArrow';
import { Page2BirthdayReveal } from './components/Page2BirthdayReveal';
import { Page3MemoriesGallery } from './components/Page3MemoriesGallery';
import { Page4YearAhead } from './components/Page4YearAhead';
import { Navbar } from './components/Navbar';
import { PersonalizeModal } from './components/PersonalizeModal';
import { BackgroundEffects } from './components/BackgroundEffects';

export function App() {
  const [config, setConfig] = useState<BirthdayConfig>(initialBirthdayConfig);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState<boolean>(false);

  // Transitions: cinematic fade and slight scale
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
      y: 20
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      y: -20,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const handleNextChapter = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentChapter((prev) => Math.min(prev + 1, 4));
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentChapter(1);
  };

  return (
    <div className="relative min-h-screen bg-[#08020b] text-rose-50 selection:bg-rose-500/30 selection:text-white">
      {/* Ambient background particles & glows */}
      <BackgroundEffects />

      {/* Persistent Navigation & Media Controls */}
      <Navbar
        currentChapter={currentChapter}
        onSelectChapter={(chap) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setCurrentChapter(chap);
        }}
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
        recipientName={config.recipientName}
      />

      {/* Main Continuous Cinematic Story */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentChapter === 1 && (
            <motion.div
              key="chapter-1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page1BowAndArrow
                recipientName={config.recipientName}
                onComplete={() => setCurrentChapter(2)}
              />
            </motion.div>
          )}

          {currentChapter === 2 && (
            <motion.div
              key="chapter-2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page2BirthdayReveal
                config={config}
                onNext={handleNextChapter}
              />
            </motion.div>
          )}

          {currentChapter === 3 && (
            <motion.div
              key="chapter-3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page3MemoriesGallery
                config={config}
                onNext={handleNextChapter}
              />
            </motion.div>
          )}

          {currentChapter === 4 && (
            <motion.div
              key="chapter-4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Page4YearAhead
                config={config}
                onReplay={handleReplay}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Personalize / Live Edit Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        config={config}
        onSave={(newConfig) => setConfig(newConfig)}
      />
    </div>
  );
}

export default App;
