# 💖 Khusboo Singh — Cinematic Birthday Experience

An interactive, emotional, and cinematic digital birthday surprise website designed specifically for **Khusboo Singh**, created with love by **Mandeep**.

---

## 🌟 Cinematic Highlights & Features

1. **Chapter 1: The Arrow of the Heart (Interactive Physics Bow & Arrow)**
   - Custom HTML5 Canvas physics engine with drag-to-aim controls for both mouse and mobile touch.
   - Interactive bow string pull tension with realistic audio frequency modulation.
   - Aiming trajectory guide line with stardust particles.
   - Glowing beating heart target with breathing animation and shockwave aura.
   - On impact: Shockwave rings, 360° light ray eruption, sparkling rose petal explosion, soft camera flash, harmonic crystal chime, and seamless transition to Chapter 2.
   - Fallback button *"Enter the Birthday Experience ❤️"* for immediate access.

2. **Chapter 2: Happy Birthday Reveal**
   - Letter-by-letter golden shimmer reveal for **"Khusboo"** with glowing aura.
   - Elegant typography with *Playfair Display*, *Cormorant Garamond*, and *Plus Jakarta Sans*.
   - Celebration confetti burst in rose-gold, blush, and champagne tones.
   - Expandable love letter modal with personal bestie note from **Mandeep**.
   - Prominent CTA to continue the journey.

3. **Chapter 3: Our Memories (Interactive Gallery)**
   - Curated memories with real photographs of Khusboo, dates, locations, categories (*Cherished, Adventures, Laughter, Milestones*), short quotes, and full stories.
   - Desktop 3D glassmorphic tilt cards with hover zoom and glowing borders.
   - Category filtering pills.
   - Full-screen memory modal with high-res photography, complete story, and Previous/Next navigation with keyboard arrow key support (`←`, `→`, `Esc`).

4. **Chapter 4: The Year Ahead (Wishes & Replay)**
   - Personalized blessings: *More Happiness ❤️*, *More Adventures ✨*, *More Success 🚀*, *More Beautiful Memories 📸*, *More Reasons to Smile 😊*, *More Dreams Coming True 🌟*.
   - Interactive *"Make a Birthday Wish"* stardust shrine: whisper a silent wish and release it into the cosmos.
   - Grand finale celebration with celebratory confetti.
   - *"Replay the Experience ↻"* button that rewinds seamlessly back to Chapter 1.
   - Dedicated tribute footer: **"Made with ❤️ by Mandeep for Khusboo"**.

5. **Audio & Media System**
   - Built with the **Web Audio API** — zero external audio dependencies or CORS issues.
   - Generative romantic celesta & piano chord arpeggios that loop peacefully.
   - Sound FX for bow tension, arrow release whoosh, heart chime resonance, wish stardust bells, and card clicks.
   - Persistent top bar with live audio equalizer visualizer, mute toggles, and fullscreen mode.

---

## 🌐 Complete GitHub Pages Deployment Guide

### Can it run on GitHub Pages?
**YES! 100%!** Because this application is built with Vite, React, Tailwind CSS, and Web Audio API, it compiles into 100% static client-side files (HTML, JS, CSS, and images). There is no server required. Everything — sound, music, canvas physics, confetti, and animations — runs directly inside any web browser on both mobile and desktop!

---

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

We have already configured `.github/workflows/deploy.yml` in this repository!

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: personalized birthday website for Khusboo by Mandeep"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click on **Settings** (top tab) → **Pages** (in the left sidebar).
   - Under **Build and deployment**:
     - Change **Source** from *"Deploy from a branch"* to **"GitHub Actions"**.
   - That's it! GitHub will automatically trigger the workflow and deploy your website.
   - In 1–2 minutes, your website will be live at:
     ```
     https://<your-username>.github.io/<your-repo-name>/
     ```

---

### Method 2: Instant Deploy via Vercel (Alternative, 30 Seconds)

If you want an instant deployment without GitHub Pages configuration:
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **"Add New"** → **"Project"**.
3. Select this repository and click **Deploy**.
4. In 30 seconds, Vercel gives you a free live URL (e.g. `https://khusboo-birthday.vercel.app`) with automatic SSL.

---

## 🛠️ Local Development

```bash
# Install packages
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
