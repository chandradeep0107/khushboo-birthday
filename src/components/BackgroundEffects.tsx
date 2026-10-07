import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep velvet ambient glow spots */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-700/10 rounded-full blur-[130px]" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px]" />
      <div className="absolute -bottom-32 left-1/3 w-[550px] h-[550px] bg-amber-700/10 rounded-full blur-[150px]" />

      {/* Floating subtle stardust particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-rose-200/40"
          style={{
            width: `${(i % 3) + 2}px`,
            height: `${(i % 3) + 2}px`,
            top: `${(i * 17) % 100}%`,
            left: `${(i * 23) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + (i % 5) * 2,
            repeat: Infinity,
            delay: (i * 0.4) % 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
