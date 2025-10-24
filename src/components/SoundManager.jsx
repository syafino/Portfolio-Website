import { useEffect, useRef, useState } from 'react';

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.enabled = false;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      // Only create audio context after user interaction
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.enabled = true;
      this.initialized = true;
    } catch (error) {
      console.log('Audio not supported:', error);
      this.enabled = false;
    }
  }

  createTone(frequency, duration = 0.1, type = 'sine', volume = 0.1) {
    if (!this.enabled || !this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  playHoverSound() {
    this.createTone(800, 0.1, 'sine', 0.05);
  }

  playClickSound() {
    this.createTone(1000, 0.15, 'sine', 0.08);
    // Add a second harmonic for richness
    setTimeout(() => this.createTone(1200, 0.1, 'sine', 0.04), 50);
  }

  playSuccessSound() {
    this.createTone(523, 0.2, 'sine', 0.06); // C5
    setTimeout(() => this.createTone(659, 0.2, 'sine', 0.06), 100); // E5
    setTimeout(() => this.createTone(784, 0.3, 'sine', 0.06), 200); // G5
  }

  playNotificationSound() {
    this.createTone(880, 0.15, 'sine', 0.07);
    setTimeout(() => this.createTone(660, 0.15, 'sine', 0.05), 200);
  }

  playScrollSound() {
    this.createTone(400, 0.05, 'sine', 0.03);
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  toggle() {
    this.enabled = !this.enabled;
  }
}

// Create global sound manager instance
const soundManager = new SoundManager();

// Custom hook for sound effects
export const useSounds = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    const initializeAudio = async () => {
      if (!isInitialized.current) {
        await soundManager.initialize();
        isInitialized.current = true;
      }
    };

    // Initialize audio on first user interaction
    const handleFirstInteraction = () => {
      initializeAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return {
    playHover: () => soundManager.playHoverSound(),
    playClick: () => soundManager.playClickSound(),
    playSuccess: () => soundManager.playSuccessSound(),
    playNotification: () => soundManager.playNotificationSound(),
    playScroll: () => soundManager.playScrollSound(),
    enable: () => soundManager.enable(),
    disable: () => soundManager.disable(),
    toggle: () => soundManager.toggle(),
  };
};

// Sound toggle button component
export const SoundToggle = () => {
  const sounds = useSounds();
  const [isEnabled, setIsEnabled] = useState(soundManager.enabled);

  const handleToggle = () => {
    sounds.toggle();
    setIsEnabled(soundManager.enabled);
    if (soundManager.enabled) {
      sounds.playSuccess();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
      title={isEnabled ? 'Disable Sounds' : 'Enable Sounds'}
    >
      {isEnabled ? '🔊' : '🔇'}
    </button>
  );
};

export default soundManager;