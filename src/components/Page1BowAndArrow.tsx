import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Page1Props {
  onComplete: () => void;
  recipientName: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export const Page1BowAndArrow: React.FC<Page1Props> = ({ onComplete, recipientName }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isAiming, setIsAiming] = useState(false);
  const [arrowInFlight, setArrowInFlight] = useState(false);
  const [hasHit, setHasHit] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  // Bow & Arrow physics state
  const stateRef = useRef({
    // Target Heart
    heart: { x: 0, y: 0, radius: 45, pulse: 0 },
    // Bow Anchor
    bow: { x: 0, y: 0, radius: 70 },
    // Arrow
    arrow: {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      vx: 0,
      vy: 0,
      angle: 0,
      pullDistance: 0,
      maxPull: 110
    },
    // Impact shockwave
    shockwaves: [] as { radius: number; maxRadius: number; alpha: number; color: string }[],
    // Particles
    particles: [] as Particle[],
    // Rays of light
    rays: [] as { angle: number; length: number; alpha: number; speed: number }[],
    isDragging: false,
    dragStart: { x: 0, y: 0 }
  });

  // Calculate layout coordinates based on canvas size
  const updateLayout = useCallback((width: number, height: number) => {
    const s = stateRef.current;
    const isMobile = width < 768;

    if (isMobile) {
      // Mobile: Bow placed in mid-lower left, heart toward upper-right
      s.bow.x = width * 0.25;
      s.bow.y = height * 0.58;
      s.heart.x = width * 0.74;
      s.heart.y = height * 0.31;
      s.heart.radius = 38;
      s.bow.radius = 58;
    } else {
      // Desktop: Bow on left-center, heart on right-center
      s.bow.x = width * 0.22;
      s.bow.y = height * 0.58;
      s.heart.x = width * 0.74;
      s.heart.y = height * 0.44;
      s.heart.radius = 52;
      s.bow.radius = 80;
    }

    // Default arrow angle pointing directly at heart
    const dx = s.heart.x - s.bow.x;
    const dy = s.heart.y - s.bow.y;
    s.arrow.angle = Math.atan2(dy, dx);
    s.arrow.startX = s.bow.x;
    s.arrow.startY = s.bow.y;
    s.arrow.currentX = s.bow.x;
    s.arrow.currentY = s.bow.y;
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      updateLayout(rect.width, rect.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const s = stateRef.current;

    // Pre-populate ambient floating dust particles
    const ambientParticles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      ambientParticles.push({
        x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
        y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.5,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? '#f4d9dc' : '#f4cb80',
        alpha: Math.random() * 0.6 + 0.2,
        life: 0,
        maxLife: 200 + Math.random() * 100
      });
    }

    const render = () => {
      time += 0.025;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // 1. Draw ambient floating stardust
      ambientParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.y < -10 || p.life > p.maxLife) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.life = 0;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time + p.x));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw Glowing Heart Target
      const heartPulse = 1 + Math.sin(time * 3) * 0.08;
      const hx = s.heart.x;
      const hy = s.heart.y;
      const hr = s.heart.radius * heartPulse;

      ctx.save();
      // Outer ambient glowing aura
      const auraGrad = ctx.createRadialGradient(hx, hy, 10, hx, hy, hr * 2.8);
      auraGrad.addColorStop(0, 'rgba(235, 110, 140, 0.45)');
      auraGrad.addColorStop(0.4, 'rgba(219, 70, 110, 0.2)');
      auraGrad.addColorStop(1, 'rgba(219, 70, 110, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(hx, hy, hr * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing stardust ring around heart
      ctx.strokeStyle = 'rgba(244, 203, 128, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(hx, hy, hr * 1.5 + Math.sin(time * 2) * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw SVG-like Heart Shape
      ctx.translate(hx, hy);
      const scale = hr / 36;
      ctx.scale(scale, scale);

      ctx.shadowColor = '#e11d48';
      ctx.shadowBlur = 25;
      ctx.fillStyle = '#dc2626';

      // Path for Heart
      ctx.beginPath();
      ctx.moveTo(0, 8);
      // top left curve
      ctx.bezierCurveTo(-18, -14, -36, 6, 0, 36);
      // top right curve
      ctx.bezierCurveTo(36, 6, 18, -14, 0, 8);
      ctx.closePath();

      // Rich romantic gradient inside heart
      const heartGrad = ctx.createLinearGradient(-25, -20, 25, 35);
      heartGrad.addColorStop(0, '#ff758c');
      heartGrad.addColorStop(0.4, '#e11d48');
      heartGrad.addColorStop(1, '#881337');
      ctx.fillStyle = heartGrad;
      ctx.fill();

      // Inner highlight
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.ellipse(-8, 3, 6, 12, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 3. Draw Trajectory Guide when Aiming
      if (s.isDragging && !s.shockwaves.length) {
        ctx.save();
        const startX = s.bow.x;
        const startY = s.bow.y;
        const aimAngle = s.arrow.angle;
        const distance = Math.hypot(s.heart.x - startX, s.heart.y - startY);

        ctx.strokeStyle = 'rgba(244, 203, 128, 0.65)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 8]);
        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // Calculate aim line forward
        const targetX = startX + Math.cos(aimAngle) * distance * 1.05;
        const targetY = startY + Math.sin(aimAngle) * distance * 1.05;
        ctx.lineTo(targetX, targetY);
        ctx.stroke();

        // Glowing crosshair on heart if aimed well
        const angleToHeart = Math.atan2(s.heart.y - startY, s.heart.x - startX);
        const angleDiff = Math.abs(aimAngle - angleToHeart);
        if (angleDiff < 0.25) {
          ctx.strokeStyle = 'rgba(255, 215, 0, 0.9)';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(s.heart.x, s.heart.y, hr * 1.3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4. Draw Bow & String
      ctx.save();
      const bowX = s.bow.x;
      const bowY = s.bow.y;
      const bowRadius = s.bow.radius;
      const bowAngle = s.arrow.angle;

      ctx.translate(bowX, bowY);
      ctx.rotate(bowAngle);

      // Bow tips coordinates relative to bow center
      const topTip = { x: 0, y: -bowRadius };
      const bottomTip = { x: 0, y: bowRadius };

      // Arrow pull-back point for string
      const pullOffset = s.isDragging ? -s.arrow.pullDistance : 0;
      const stringCenter = { x: pullOffset, y: 0 };

      // Bow limb curvature
      const bowCurvePush = 28 - (s.isDragging ? (s.arrow.pullDistance / s.arrow.maxPull) * 8 : 0);

      // Draw Bow Frame (Golden curved limb)
      ctx.shadowColor = 'rgba(244, 203, 128, 0.6)';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = '#f4cb80';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(topTip.x, topTip.y);
      ctx.quadraticCurveTo(bowCurvePush, 0, bottomTip.x, bottomTip.y);
      ctx.stroke();

      // Inner rose gold accent line
      ctx.strokeStyle = '#dc8d99';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(topTip.x, topTip.y);
      ctx.quadraticCurveTo(bowCurvePush - 3, 0, bottomTip.x, bottomTip.y);
      ctx.stroke();

      // Grip wrapped with silk
      ctx.strokeStyle = '#943849';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(bowCurvePush - 2, -12);
      ctx.lineTo(bowCurvePush - 2, 12);
      ctx.stroke();

      // Bow String (elastic line attached to top, pull point, and bottom)
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#fff';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(topTip.x, topTip.y);
      ctx.lineTo(stringCenter.x, stringCenter.y);
      ctx.lineTo(bottomTip.x, bottomTip.y);
      ctx.stroke();

      ctx.restore();

      // 5. Draw Arrow (if not hit)
      if (!s.shockwaves.length) {
        ctx.save();
        const ax = s.arrow.currentX;
        const ay = s.arrow.currentY;
        const aAngle = s.arrow.angle;

        ctx.translate(ax, ay);
        ctx.rotate(aAngle);

        const arrowLen = 75;
        // Arrow shaft
        ctx.strokeStyle = '#f9e1b0';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-arrowLen * 0.35, 0);
        ctx.lineTo(arrowLen * 0.65, 0);
        ctx.stroke();

        // Arrowhead (Gleaming Rose-Heart Tip)
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#fb7185';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(arrowLen * 0.65, 0);
        ctx.lineTo(arrowLen * 0.52, -8);
        ctx.lineTo(arrowLen * 0.58, 0);
        ctx.lineTo(arrowLen * 0.52, 8);
        ctx.closePath();
        ctx.fill();

        // Feather fletching
        ctx.fillStyle = '#ebb9c0';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(-arrowLen * 0.35, 0);
        ctx.lineTo(-arrowLen * 0.28, -7);
        ctx.lineTo(-arrowLen * 0.15, -7);
        ctx.lineTo(-arrowLen * 0.22, 0);
        ctx.lineTo(-arrowLen * 0.15, 7);
        ctx.lineTo(-arrowLen * 0.28, 7);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      // 6. Arrow Physics & Trajectory Flight
      if (s.arrow.vx !== 0 || s.arrow.vy !== 0) {
        s.arrow.currentX += s.arrow.vx;
        s.arrow.currentY += s.arrow.vy;

        // Sparkle trail behind arrow
        s.particles.push({
          x: s.arrow.currentX - Math.cos(s.arrow.angle) * 20 + (Math.random() - 0.5) * 8,
          y: s.arrow.currentY - Math.sin(s.arrow.angle) * 20 + (Math.random() - 0.5) * 8,
          vx: -s.arrow.vx * 0.1 + (Math.random() - 0.5) * 1.5,
          vy: -s.arrow.vy * 0.1 + (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 1.5,
          color: Math.random() > 0.5 ? '#f43f5e' : '#f4cb80',
          alpha: 1,
          life: 0,
          maxLife: 30
        });

        // Check collision with glowing heart
        const distToHeart = Math.hypot(s.arrow.currentX - s.heart.x, s.arrow.currentY - s.heart.y);
        if (distToHeart <= s.heart.radius + 15) {
          // HIT!
          s.arrow.vx = 0;
          s.arrow.vy = 0;
          triggerImpact();
        }

        // If arrow goes way off screen without hitting (safety net)
        if (
          s.arrow.currentX > width + 100 ||
          s.arrow.currentX < -100 ||
          s.arrow.currentY > height + 100 ||
          s.arrow.currentY < -100
        ) {
          // Reset arrow to bow
          s.arrow.vx = 0;
          s.arrow.vy = 0;
          s.arrow.currentX = s.bow.x;
          s.arrow.currentY = s.bow.y;
          setArrowInFlight(false);
        }
      }

      // 7. Render Particles (trail & impact explosions)
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          s.particles.splice(i, 1);
        }
      }

      // 8. Render Shockwaves & Light Rays upon Impact
      for (let i = s.shockwaves.length - 1; i >= 0; i--) {
        const sw = s.shockwaves[i];
        sw.radius += 9;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        ctx.save();
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(s.heart.x, s.heart.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (sw.radius >= sw.maxRadius) {
          s.shockwaves.splice(i, 1);
        }
      }

      // Render 360-degree light beams
      if (s.rays.length > 0) {
        ctx.save();
        s.rays.forEach((ray) => {
          ray.length += ray.speed;
          ray.alpha = Math.max(0, ray.alpha - 0.015);
          ctx.strokeStyle = 'rgba(255, 235, 180, ' + ray.alpha + ')';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(s.heart.x, s.heart.y);
          ctx.lineTo(
            s.heart.x + Math.cos(ray.angle) * ray.length,
            s.heart.y + Math.sin(ray.angle) * ray.length
          );
          ctx.stroke();
        });
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateLayout]);

  // Trigger impact effects
  const triggerImpact = () => {
    setHasHit(true);
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 300);

    // Audio SFX
    sounds.playHeartImpact();
    // Auto-start background romantic music upon the user's first interactive moment!
    sounds.startRomanticMusic();

    const s = stateRef.current;

    // Shockwaves
    s.shockwaves.push(
      { radius: 20, maxRadius: 400, alpha: 1, color: 'rgba(255, 120, 160, 0.9)' },
      { radius: 10, maxRadius: 320, alpha: 1, color: 'rgba(255, 215, 0, 0.9)' },
      { radius: 5, maxRadius: 220, alpha: 1, color: 'rgba(255, 255, 255, 0.95)' }
    );

    // Light rays
    s.rays = [];
    for (let i = 0; i < 28; i++) {
      s.rays.push({
        angle: (Math.PI * 2 * i) / 28 + (Math.random() - 0.5) * 0.1,
        length: 20,
        alpha: 0.9,
        speed: 12 + Math.random() * 8
      });
    }

    // Explosion particles (heart dust & gold sparkles)
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3;
      s.particles.push({
        x: s.heart.x,
        y: s.heart.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: ['#ff4d6d', '#ff758f', '#ffb3c1', '#f4cb80', '#ffffff', '#e0aaff'][
          Math.floor(Math.random() * 6)
        ],
        alpha: 1,
        life: 0,
        maxLife: 60 + Math.random() * 40
      });
    }

    // Wait 1.4s for cinematic payoff, then transition to Page 2
    setTimeout(() => {
      onComplete();
    }, 1400);
  };

  // User Drag Handlers (Mouse & Touch)
  const handlePointerDown = (clientX: number, clientY: number) => {
    if (arrowInFlight || hasHit) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const s = stateRef.current;
    // Check if click/touch is within range of the bow or arrow
    const dist = Math.hypot(x - s.bow.x, y - s.bow.y);
    if (dist < 120) {
      s.isDragging = true;
      s.dragStart = { x, y };
      setIsAiming(true);
      sounds.playBowTension(0.2);
    }
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    const s = stateRef.current;
    if (!s.isDragging || arrowInFlight || hasHit) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Pull vector: user drags backwards relative to the heart
    const pullX = s.bow.x - x;
    const pullY = s.bow.y - y;
    const pullDist = Math.min(s.arrow.maxPull, Math.hypot(pullX, pullY));

    // Arrow aims in direction of pullback (or toward heart with slight player adjustment)
    // If pulled back to the left, arrow points to the right
    const pullAngle = Math.atan2(pullY, pullX);
    s.arrow.angle = pullAngle;
    s.arrow.pullDistance = pullDist;

    // Bow tension sound
    sounds.playBowTension(pullDist / s.arrow.maxPull);
  };

  const handlePointerUp = () => {
    const s = stateRef.current;
    if (!s.isDragging || arrowInFlight || hasHit) return;

    s.isDragging = false;
    setIsAiming(false);

    if (s.arrow.pullDistance > 25) {
      // Fire arrow!
      setArrowInFlight(true);
      sounds.playArrowWhoosh();

      const speed = Math.max(16, (s.arrow.pullDistance / s.arrow.maxPull) * 26);
      s.arrow.vx = Math.cos(s.arrow.angle) * speed;
      s.arrow.vy = Math.sin(s.arrow.angle) * speed;
      s.arrow.pullDistance = 0;
    } else {
      // Released without sufficient pull
      s.arrow.pullDistance = 0;
      s.arrow.currentX = s.bow.x;
      s.arrow.currentY = s.bow.y;
    }
  };

  // Instant trigger for fallback button
  const handleDirectLaunch = () => {
    if (arrowInFlight || hasHit) return;
    const s = stateRef.current;
    setArrowInFlight(true);
    sounds.playArrowWhoosh();

    // Aim directly at heart
    const angle = Math.atan2(s.heart.y - s.bow.y, s.heart.x - s.bow.x);
    s.arrow.angle = angle;
    s.arrow.vx = Math.cos(angle) * 22;
    s.arrow.vy = Math.sin(angle) * 22;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none bg-gradient-to-b from-[#0a030f] via-[#160621] to-[#0a030f] flex flex-col justify-between"
      onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
      onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      onMouseUp={handlePointerUp}
      onTouchStart={(e) => {
        if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={handlePointerUp}
    >
      {/* Background canvas for bow, arrow, heart, and particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair z-10" />

      {/* Screen flash on impact */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-rose-200/40 z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Atmospheric Vignette & Soft Gradient Overlays */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Text with Cinematic Typography */}
      <header className="relative z-20 pt-10 sm:pt-16 px-6 text-center max-w-3xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/20 text-rose-300 text-xs sm:text-sm tracking-widest uppercase font-medium shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Dedicated to {recipientName}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-rose-100 tracking-wide glow-text-rose leading-tight">
            "Some moments deserve to be remembered forever..."
          </h1>

          <p className="text-rose-200/70 text-sm sm:text-base font-light italic">
            An interactive birthday journey created for you
          </p>
        </motion.div>
      </header>

      {/* Bottom Interactive Prompt & Fallback Controls */}
      <footer className="relative z-20 pb-8 sm:pb-12 px-6 text-center max-w-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Instruction Pill */}
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border-rose-400/30 text-rose-100 text-sm sm:text-base shadow-xl">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="text-rose-400"
            >
              ❤️
            </motion.span>
            <span className="font-medium tracking-wide">
              {isAiming ? "Release to shoot the arrow!" : "Drag the arrow & shoot the heart ❤️"}
            </span>
          </div>

          <p className="text-xs text-rose-300/50 max-w-xs">
            Pull the bow back with your finger or cursor to aim directly at the glowing heart
          </p>

          {/* Fallback button */}
          <button
            onClick={handleDirectLaunch}
            disabled={arrowInFlight || hasHit}
            className="group relative mt-2 inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full overflow-hidden text-sm font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-500 shadow-lg shadow-rose-900/40 hover:shadow-rose-600/50 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-white/80 group-hover:scale-110 transition-transform" />
              <span>Enter the Birthday Experience ❤️</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>
      </footer>
    </div>
  );
};
