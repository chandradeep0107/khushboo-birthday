// Web Audio API Synthesizer for cinematic sound effects and romantic ambient background music

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isSfxMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public toggleSfx(): boolean {
    this.isSfxMuted = !this.isSfxMuted;
    return this.isSfxMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsSfxMuted(): boolean {
    return this.isSfxMuted;
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  // SFX 1: Bow string pull tension (subtle hum rising with draw tension)
  public playBowTension(tensionPercent: number) {
    if (this.isSfxMuted || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const freq = 120 + tensionPercent * 180; // 120Hz to 300Hz
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.02 + tensionPercent * 0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      // Audio might fail silently if interaction is blocked
    }
  }

  // SFX 2: Arrow release whoosh
  public playArrowWhoosh() {
    if (this.isSfxMuted || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.35);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  // SFX 3: Heart impact - crystal resonance, harmonic chimes & bass thump
  public playHeartImpact() {
    if (this.isSfxMuted || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;

      // Deep warm heartbeat pulse
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.5);
      subGain.gain.setValueAtTime(0.3, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      subOsc.connect(subGain);
      subGain.connect(this.sfxGain);
      subOsc.start(now);
      subOsc.stop(now + 0.5);

      // Glass / Celestial chimes chord (C6, E6, G6, B6)
      const frequencies = [1046.5, 1318.5, 1567.98, 1975.5, 2093.0];
      frequencies.forEach((f, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(f, now + idx * 0.05);

        chimeGain.gain.setValueAtTime(0.08, now + idx * 0.05);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.1);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.sfxGain);

        chimeOsc.start(now + idx * 0.05);
        chimeOsc.stop(now + 1.4 + idx * 0.1);
      });
    } catch (e) {}
  }

  // SFX 4: Sparkle / wish chime
  public playSparkle() {
    if (this.isSfxMuted || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      const notes = [1318.51, 1567.98, 1760.00, 2093.00, 2637.02]; // E6, G6, A6, C7, E7
      notes.forEach((f, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.06);

        gain.gain.setValueAtTime(0.04, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4 + idx * 0.06);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.06);
        osc.stop(now + 0.5 + idx * 0.06);
      });
    } catch (e) {}
  }

  // SFX 5: Soft click / card flip
  public playSoftClick() {
    if (this.isSfxMuted || this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // Ambient Romantic Music Synthesizer: Ethereal Celesta & Piano Arpeggiator
  public startRomanticMusic() {
    if (this.isMusicPlaying) return;
    this.initContext();
    this.isMusicPlaying = true;

    // Harmonic progression: Cmaj9 -> Am9 -> Fmaj9 -> Gsus4/add9
    // Notes frequencies (Hz):
    const chords = [
      // Cmaj9: C3, G3, E4, B4, D5
      [130.81, 196.00, 329.63, 493.88, 587.33],
      // Am9: A2, E3, C4, G4, B4
      [110.00, 164.81, 261.63, 392.00, 493.88],
      // Fmaj9: F2, C3, A3, E4, G4
      [87.31, 130.81, 220.00, 329.63, 392.00],
      // Gsus4 / G6: G2, D3, C4, E4, A4
      [98.00, 146.83, 261.63, 329.63, 440.00]
    ];

    let chordIndex = 0;
    let step = 0;

    const playStep = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;

      const currentChord = chords[chordIndex];
      const now = this.ctx.currentTime;

      // Bass note every 8 steps
      if (step % 8 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(currentChord[0], now);
        bassGain.gain.setValueAtTime(0.12, now);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
        bassOsc.connect(bassGain);
        bassGain.connect(this.musicGain);
        bassOsc.start(now);
        bassOsc.stop(now + 3.3);
      }

      // Celesta / Rhodes bell note
      const noteNote = currentChord[1 + (step % (currentChord.length - 1))];
      // Random gentle octave jump for organic feel
      const octMult = (step === 3 || step === 7) ? 2 : 1;
      const noteOsc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      noteOsc.type = 'sine';
      noteOsc.frequency.setValueAtTime(noteNote * octMult, now);

      noteGain.gain.setValueAtTime(0.035, now);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      noteOsc.connect(noteGain);
      noteGain.connect(this.musicGain);

      noteOsc.start(now);
      noteOsc.stop(now + 1.5);

      step++;
      if (step >= 8) {
        step = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }
    };

    // Play every 420ms (gentle lullaby tempo)
    playStep();
    this.musicInterval = setInterval(playStep, 450);
  }

  public stopRomanticMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopRomanticMusic();
    } else {
      this.startRomanticMusic();
    }
    return this.isMusicPlaying;
  }
}

export const sounds = new SoundManager();
