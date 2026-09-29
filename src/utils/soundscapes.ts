// Synthesized ambient audio generator using native Web Audio API
// Hermetic and resilient: Zero external network requests or broken audio links!

class SoundscapeManager {
  private ctx: AudioContext | null = null;
  private oceanNode: AudioNode | null = null;
  private thetaNode: AudioNode | null = null;
  private isPlayingOcean = false;
  private isPlayingTheta = false;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a soft, resonant singing bowl chime
  playSingingBowl(freq = 432) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Fundamental and harmonics
      const harmonics = [1, 2.01, 3.02, 4.1];
      const gains = [0.4, 0.15, 0.08, 0.03];

      harmonics.forEach((mult, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * mult, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(gains[i] * 0.35, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 4.6);
      });
    } catch {
      // Audio context might fail if not permitted
    }
  }

  // Toggle soothing pink-noise ocean waves
  toggleOceanWaves(enable?: boolean): boolean {
    try {
      const ctx = this.getContext();
      const target = enable !== undefined ? enable : !this.isPlayingOcean;

      if (!target) {
        if (this.oceanNode) {
          try {
            (this.oceanNode as AudioBufferSourceNode).stop();
          } catch {
            // Already stopped
          }
          this.oceanNode.disconnect();
          this.oceanNode = null;
        }
        this.isPlayingOcean = false;
        return false;
      }

      // Generate 5 seconds of soft looped pink/brown noise
      const bufferSize = ctx.sampleRate * 5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 1.8;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Low pass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      // LFO for wave swelling
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec ocean swell
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(250, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.18, ctx.currentTime);

      noise.connect(filter);
      filter.connect(mainGain);
      mainGain.connect(ctx.destination);

      lfo.start();
      noise.start();

      this.oceanNode = noise;
      this.isPlayingOcean = true;
      return true;
    } catch {
      return false;
    }
  }

  // Toggle soft 6Hz Theta frequency binaural harmonic drone
  toggleThetaWave(enable?: boolean): boolean {
    try {
      const ctx = this.getContext();
      const target = enable !== undefined ? enable : !this.isPlayingTheta;

      if (!target) {
        if (this.thetaNode) {
          try {
            (this.thetaNode as AudioNode).disconnect();
          } catch {
            // already disconnected
          }
          this.thetaNode = null;
        }
        this.isPlayingTheta = false;
        return false;
      }

      const oscLeft = ctx.createOscillator();
      const oscRight = ctx.createOscillator();
      const merger = ctx.createChannelMerger(2);
      const gain = ctx.createGain();

      oscLeft.type = 'sine';
      oscRight.type = 'sine';

      // 108Hz and 114Hz (6 Hz Theta beat)
      oscLeft.frequency.setValueAtTime(108, ctx.currentTime);
      oscRight.frequency.setValueAtTime(114, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      oscLeft.connect(merger, 0, 0);
      oscRight.connect(merger, 0, 1);
      merger.connect(gain);
      gain.connect(ctx.destination);

      oscLeft.start();
      oscRight.start();

      this.thetaNode = gain;
      this.isPlayingTheta = true;
      return true;
    } catch {
      return false;
    }
  }

  stopAll() {
    this.toggleOceanWaves(false);
    this.toggleThetaWave(false);
  }

  isOceanActive() {
    return this.isPlayingOcean;
  }

  isThetaActive() {
    return this.isPlayingTheta;
  }
}

export const soundscapes = new SoundscapeManager();
