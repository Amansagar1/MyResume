// Web Audio API ambient cyber-drone generator (No external audio files needed)
class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (typeof window === "undefined") return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (!this.ctx) return;
    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 2.5);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(420, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

      // Create warm harmonic chord notes (D minor / Cyber drone: D2, A2, F3, C4)
      const freqs = [73.42, 110.0, 174.61, 261.63];
      this.oscillators = freqs.map((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();
        osc.type = i % 2 === 0 ? "sawtooth" : "sine";
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        // Gentle subtle detuning for rich chorus
        osc.detune.setValueAtTime((i - 1.5) * 6, this.ctx!.currentTime);

        oscGain.gain.setValueAtTime(0.25 / freqs.length, this.ctx!.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.filter!);
        osc.start();
        return osc;
      });

      // LFO for breathing filter sweep
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // very slow 8-second wave
      lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      lfo.start();
      this.oscillators.push(lfo);

      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
      this.isPlaying = true;
    } catch (e) {
      console.warn("Web Audio ambient error:", e);
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1200);
    } catch {
      this.isPlaying = false;
    }
  }

  public getState(): boolean {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundManager();
