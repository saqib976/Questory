/**
 * Haptic and tactile sensory feedback engine
 * Supports Web Vibration API with audio synthesis fallback
 */

type HapticStyle = 'light' | 'medium' | 'heavy' | 'selection' | 'success';

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function setSoundHapticsEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundHapticsEnabled(): boolean {
  return soundEnabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playSubtleClick(frequency = 700, duration = 0.02, gainValue = 0.08) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + duration);

    gain.gain.setValueAtTime(gainValue, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio autoplay restrictions gracefully
  }
}

export function triggerHaptic(style: HapticStyle = 'light') {
  if (typeof window === 'undefined') return;

  // 1. Hardware vibration API
  if (navigator && typeof navigator.vibrate === 'function') {
    try {
      switch (style) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'selection':
          navigator.vibrate(8);
          break;
        case 'medium':
          navigator.vibrate(22);
          break;
        case 'heavy':
          navigator.vibrate(40);
          break;
        case 'success':
          navigator.vibrate([15, 30, 20]);
          break;
      }
    } catch {
      // Ignore vibration error
    }
  }

  // 2. Tactile audio feedback (especially for iOS Safari and desktop touchpads)
  switch (style) {
    case 'light':
    case 'selection':
      playSubtleClick(880, 0.015, 0.05);
      break;
    case 'medium':
      playSubtleClick(580, 0.025, 0.07);
      break;
    case 'heavy':
      playSubtleClick(340, 0.035, 0.09);
      break;
    case 'success':
      playSubtleClick(940, 0.02, 0.06);
      setTimeout(() => playSubtleClick(1200, 0.03, 0.07), 40);
      break;
  }
}
